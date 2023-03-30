import {Controller, Get, Injectable, Post, UseGuards} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {AdminService} from "./admin.service";
import {UnauthorizedError} from "../common/unauthorized-error.dto";
import {NotFoundError} from "../common/not-found-error.dto";
import {User, UserDecorator} from "../users/user.decorator";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('admin')
@ApiTags('Admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {
    }

    @Get('employees')
    @ApiOperation({ description: 'API endpoint to get all employees' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    public async getAllEmployees(@User() user: UserDecorator)
    {
        return this.adminService.getEmployees(user)
    }

    @Get('employee-details')
    @ApiOperation({ description: 'API endpoint to get employees summary detail' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    public async getEmployeeDetails(@User() user: UserDecorator)
    {
        return this.adminService.getEmployeeDetails(user)
    }
}