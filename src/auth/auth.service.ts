import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {AppConstants} from '../constants';
import * as bcrypt from 'bcrypt';
import {
    CreateEmployeeRequestDto, DeleteEmployeeRequestDto,
    EditEmployeeRequestDto,
    loginData, SetNewPasswordRequestDto
} from "./dto/auth.request.dto";
import {UserTypeEntity, UserTypeEnum} from "../users/user-type.entity";
import { DataSource } from "typeorm";
import {Nodemailer} from "../common/nodemailer";
import {Helpers} from "../common/helpers";
import {UserEntity, UserStatusEnum} from "../users/user.entity";
import {EmployeeEntity} from "../employee/employee.entity";
import {AdminEntity} from "../admin/admin.entity";
import {CatererEntity} from "../caterer/caterer.entity";
import {User, UserDecorator} from "../users/user.decorator";
const md5 = require('md5');

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await UserEntity.findOne({ where: {email: email}});

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    public async login(body: loginData) {
        const user = await this.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException();
        }

        if(user?.active == UserStatusEnum.YES) {
            let userType = await UserTypeEntity.findOne({ where: {id: user.userTypeId}})
            let payload = {
                id: user.id,
                name: null,
                email: user.email,
                phone_number: null,
                employee_id: null,
                job_title: null,
                user_type: userType.key,
                identity: null
            };

            var userDetail;
            if (userType.key == UserTypeEnum.EMPLOYEE) {
                userDetail = await EmployeeEntity.findOne({ where: {userAuthId: user.id}})
                payload.employee_id = userDetail?.id;
                payload.job_title = userDetail?.job_title;
                payload.identity = userDetail.identity
            } else if (userType.key == UserTypeEnum.ADMIN) {
                userDetail = await AdminEntity.findOne({ where: {userAuthId: user.id}})
            } else {
                userDetail = await CatererEntity.findOne({ where: {userAuthId: user.id}})
            }

            payload.name = userDetail.name;
            payload.phone_number = userDetail?.phoneNumber

            return {
                code: 200,
                access_token: this.jwtService.sign(payload),
                user: payload,
            };
        } else {
            return {
                success: false,
                message: AppConstants.Messages.INVALID_USER,
            };
        }
    }

    public async createEmployee(user, payload: CreateEmployeeRequestDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (user.user_type != UserTypeEnum.ADMIN) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }
            let existing = await UserEntity.findOne({
                where: { email: payload.email }
            });
            if (existing) {
                throw new Error('User already exit');
            } else {
                let password = Helpers.generateRandomPassword();
                const hash = await bcrypt.hash(password, AppConstants.SaltOrRounds);
                let userType = await UserTypeEntity.findOne({where: {key: UserTypeEnum.EMPLOYEE}})

                let user = await this.dataSource.createQueryBuilder(queryRunner)
                    .insert()
                    .into("user_credentials")
                    .values([{
                        email: payload.email,
                        userTypeId: userType.id,
                        password: hash
                    }])
                    .execute();

                await this.dataSource.createQueryBuilder(queryRunner)
                    .insert()
                    .into("employees")
                    .values([{
                        name: payload.name,
                        jobTitle: payload.job_title,
                        userAuthId: user.raw.insertId,
                        identity: Helpers.generateRandomCode()
                    }])
                    .execute();

                let signupLink = `https://localhost:3000/employee/set-password?identity=${payload.email}`;
                let text = `
                Hello ${payload.name} 
                \n
                You now have access to the Yellow Box Employee Portal
                \n
                ------
                \n
                Sign-in URL: ${signupLink}
                User name: ${payload.email}
                Your one time password will be provided separately by your system administrator.
                Password: ${password}
                \n
                ------
                \n
                Sincerely,
                \n
                Your Yellow Box Account Administrator
                `;

                await Nodemailer.send(text, 'Sign Up', payload.email);

                await queryRunner.commitTransaction();
                return { success: true, message: 'Success', link: signupLink}
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            return { success: false, message: e.message }
        } finally {
            await queryRunner.release();
        }
    }

    public async editUser(payload: EditEmployeeRequestDto , user) {
        try {
            if (user.user_type != UserTypeEnum.ADMIN) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let checkUserExist = await UserEntity.findOne({ where: {email: payload.email }});
            if (!checkUserExist) {
                throw new Error(AppConstants.Messages.INVALID_USER)
            }

            await this.dataSource.createQueryBuilder()
                .update('employees')
                .set({
                    jobTitle: payload.job_title,
                    name: payload.name,
                    phoneNumber: payload.phone_number
                })
                .where({ userAuthId: checkUserExist.id })
                .execute();

            return { success: true, message: 'Success'}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    public async deleteUser(payload: DeleteEmployeeRequestDto , user) {
        try {
            if (user.user_type != UserTypeEnum.ADMIN) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let checkUserExist = await UserEntity.findOne({ where: {email: payload.email }});
            if (!checkUserExist) {
                throw new Error(AppConstants.Messages.INVALID_USER)
            }

            await UserEntity.update(checkUserExist.id,{
                active: UserStatusEnum.NO,
                status: 'inactive'
            });

            await EmployeeEntity.update({userAuthId: parseInt(checkUserExist.id)},{
                active: UserStatusEnum.NO
            });

            return { success: true, message: 'Success'}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    public async setNewPassword(payload: SetNewPasswordRequestDto)
    {
        let validUser = await this.validateUser(payload.email, payload.old_password);
        try {
            if (validUser) {
                const hash = await bcrypt.hash(payload.new_password, AppConstants.SaltOrRounds);
                await UserEntity.update(validUser.id,{
                    password: hash,
                    active: UserStatusEnum.YES,
                    status: 'active'
                });
                await EmployeeEntity.update({userAuthId: validUser.id},{
                    active: UserStatusEnum.YES
                });
                return {
                    'statusCode': 201,
                    'message': AppConstants.Messages.PASSWORD_SET_SUCCESSFULLY
                };
            } else {
                throw new Error(AppConstants.Messages.INVALID_USER)
            }
        } catch (e) {
            return { success: false, message: e.message }
        }
    }
}
