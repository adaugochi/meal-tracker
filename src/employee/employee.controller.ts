import {Controller, Get, UseGuards} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ValidationError} from "../common/validation-error.dto";
import {UnauthorizedError} from "../common/unauthorized-error.dto";
import {NotFoundError} from "../common/not-found-error.dto";
import {User, UserDecorator} from "../users/user.decorator";
import {AuthGuard} from "@nestjs/passport";
import {EmployeeService} from "./employee.service";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('employees')
@ApiTags('Employees')
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService
    ){}
}