import {Injectable} from "@nestjs/common";
import {UserDecorator} from "../users/user.decorator";
import {CatererRequestDto, GenerateCodeRequestDto} from "./dto/caterer-request.dto";
import {DataSource} from "typeorm";
import {UserTypeEnum} from "../users/user-type.entity";
import {AppConstants, ResponseCodes} from "../constants";
import {UserEntity, UserStatusEnum} from "../users/user.entity";
import {EmployeeMealEntity} from "../employee/employee-meal.entity";
import {Helpers} from "../common/helpers";
import {EmployeeEntity} from "../employee/employee.entity";
import {Nodemailer} from "../common/nodemailer";
import {CustomError} from "../common/custom.error";
const mysql = require('mysql');

@Injectable()
export class CatererService {
    constructor(
        private readonly dataSource: DataSource
    ) {
    }

    public async getEmployees()
    {
        try {
            let sql = await mysql.format(AppConstants.SQL.GET_EMPLOYEES_FOR_MEAL, [Helpers.getCurrentDate().toString()]);
            let result = await this.dataSource.query(sql);

            return { success: true, message: 'Success', data: result}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    public async generateCode(user: UserDecorator, payload: GenerateCodeRequestDto)
    {
        try {
            if (user.user_type != UserTypeEnum.CATERER) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let employee = await EmployeeEntity.findOne({ where: {identity: payload.employee_identity, active: UserStatusEnum.YES}});
            if (!employee) throw new Error(AppConstants.Messages.INVALID_USER);

            let em = await EmployeeMealEntity.createQueryBuilder('em')
                .where(
                    "em.created_at = :currentDate AND employee_id = :employeeId",
                    {currentDate: Helpers.getCurrentDate().toString(), employeeId: employee.id}
                )
                .getOne();


            if (em?.status) throw new Error(AppConstants.Messages.EATEN_ALEADY);

            let code =  Helpers.generateRandomCode(4).toUpperCase();

            if (em) {
                await EmployeeMealEntity.update(em.id, {code: code, expiresAt: Helpers.addSeconds()})
            } else {
                await this.dataSource.createQueryBuilder()
                    .insert()
                    .into("employee_meals")
                    .values([{
                        employeeId: employee.id,
                        code: code,
                        expiresAt: Helpers.addSeconds(),
                        createdAt: Helpers.getCurrentDate()
                    }])
                    .execute();
            }

            let userCred = await UserEntity.findOne({ where: {id: employee.userAuthId}});
            await Nodemailer.send(code, 'Meal ticket code', userCred.email);

            return { success: true, message: 'Success', data: {code: code, employee_id: employee.id}}
        } catch (e) {
            throw new CustomError(e.message)
        }
    }

    public async verifyCode(user: UserDecorator, payload: CatererRequestDto)
    {
        try {
            if (user.user_type != UserTypeEnum.CATERER) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let meal = await EmployeeMealEntity.findOne({ where: {
                    status: UserStatusEnum.NO,
                    code: payload.code,
                    employeeId: payload.employee_id,
                    createdAt: Helpers.getCurrentDate().toString()
                }})
            if (!meal) {
                throw new Error(AppConstants.Messages.EATEN_ALEADY);
            }

            if (Helpers.isSameOrAfter(meal.expiresAt)) throw new Error(AppConstants.Messages.INVALID_CODE);

            await EmployeeMealEntity.update(
                {
                    status: UserStatusEnum.NO,
                    code: payload.code,
                    employeeId: payload.employee_id,
                    createdAt: Helpers.getCurrentDate().toString()
                },{
                status: UserStatusEnum.YES
            });

            return { success: true, message: 'Success'}
        } catch (e) {
            throw new CustomError(e.message)
        }
    }

}