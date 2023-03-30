import {Injectable} from "@nestjs/common";
import {UserDecorator} from "../users/user.decorator";
import {CatererRequestDto} from "./dto/caterer-request.dto";
import {DataSource} from "typeorm";
import {UserTypeEnum} from "../users/user-type.entity";
import {AppConstants} from "../constants";
import {UserStatusEnum} from "../users/user.entity";
import {EmployeeMealEntity} from "../employee/employee-meal.entity";
import {Helpers} from "../common/helpers";
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
            return { success: false, message: e.message }
        }
    }

}