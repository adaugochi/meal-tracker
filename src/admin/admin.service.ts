import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {UserTypeEnum} from "../users/user-type.entity";
import {AppConstants} from "../constants";
import {UserDecorator} from "../users/user.decorator";
import {Helpers} from "../common/helpers";
const mysql = require('mysql');

@Injectable()
export class AdminService {
    constructor(
        private readonly dataSource: DataSource
    ){}

    public async getEmployees(user: UserDecorator)
    {
        try {
            if (user.user_type != UserTypeEnum.ADMIN) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let sql = await mysql.format(AppConstants.SQL.GET_EMLOYEES);
            let result = await this.dataSource.query(sql);

            return { success: true, message: 'Success', data: result}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    public async getEmployeeDetails(user: UserDecorator)
    {
        try {
            if (user.user_type != UserTypeEnum.ADMIN) {
                throw new Error(AppConstants.Messages.PERMISSION_DENIED);
            }

            let sql1 = await mysql.format(AppConstants.SQL.GET_EMLOYEES);
            let result1 = await this.dataSource.query(sql1);

            let sql2 = await mysql.format(AppConstants.SQL.GET_EMPLOYEES_THAT_HAS_EATEN_PER_DAY, [Helpers.getCurrentDate().toString()]);
            let result2 = await this.dataSource.query(sql2);

            let result = {
                total_employee: result1.length,
                total_employee_eaten: result2.length,
                total_employee_not_eaten: result1.length - result2.length
            }

            return { success: true, message: 'Success', data: result}
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

}