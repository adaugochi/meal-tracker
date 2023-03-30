import {DataSource} from 'typeorm';
import {UserTypeEnum} from "../users/user-type.entity";
import {AppConstants} from "../constants";
import {Helpers} from "../common/helpers";
import {EmployeeMealEntity} from "./employee-meal.entity";
import {UserDecorator} from "../users/user.decorator";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EmployeeService {
    constructor(
        private readonly dataSource: DataSource
    ){}

    public async generateCode(user: UserDecorator)
    {
        try {
            if (user.user_type != UserTypeEnum.EMPLOYEE) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let em = await EmployeeMealEntity.createQueryBuilder('employeeMeal')
                .where(
                    "Date(created_at) = :currentDate AND employee_id = :employeeId",
                    {currentDate: Helpers.getCurrentDate(), employeeId: user.employee_id}
                )
                .getOne();

            if (em) {
                if (em.status) {
                    throw new Error(AppConstants.Messages.EATEN_ALEADY);
                } else {
                    throw new Error(AppConstants.Messages.CODE_EXIST);
                }
            }

            let code =  Helpers.generateRandomCode().toUpperCase();

            await this.dataSource.createQueryBuilder()
                .insert()
                .into("employee_meals")
                .values([{
                    employeeId: user.employee_id,
                    code: code,
                    createdAt: Helpers.getCurrentDate()
                }])
                .execute();

            return { success: true, message: 'Success', data: {code: code}}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }
}