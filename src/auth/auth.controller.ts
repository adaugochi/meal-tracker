import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {UnauthorizedError} from "../common/unauthorized-error.dto";
import {NotFoundError} from "../common/not-found-error.dto";
import {ValidationError} from "../common/validation-error.dto";
import {CreatedResponseDto} from "../common/created-response.dto";
import {
    CreateEmployeeRequestDto, DeleteEmployeeRequestDto,
    EditEmployeeRequestDto,
    loginData,
    SetNewPasswordRequestDto
} from "./dto/auth.request.dto";
import {User, UserDecorator} from "../users/user.decorator";

@ApiTags('Login')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @ApiBody({ type: loginData })
    async login(@Body() body: loginData) {
        return await this.authService.login(body);
    }

    @Post('create-employee')
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({ type: CreatedResponseDto })
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to create new user' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateEmployeeRequestDto})
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async createUser(
        @User() user: UserDecorator,
        @Body() body: CreateEmployeeRequestDto
    ) {
        return await this.authService.createEmployee(user, body);
    }

    @Post('edit-employee')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBody({ type: EditEmployeeRequestDto})
    @ApiCreatedResponse({ type: CreatedResponseDto })
    @ApiBadRequestResponse({ type: ValidationError})
    @ApiOperation({ description: 'API endpoint to edit existing employee' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async editUser(
        @User() user: UserDecorator,
        @Body() body: EditEmployeeRequestDto
    ) {
        return await this.authService.editUser(body, user);
    }


    @Post('set-new-password')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBadRequestResponse({ type: ValidationError})
    @ApiOperation({ description: 'API endpoint to set new password for a user' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async setNewPassword(@Body() body: SetNewPasswordRequestDto)
    {
        return this.authService.setNewPassword(body)
    }

    @Post('delete-employee')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBadRequestResponse({ type: ValidationError})
    @ApiOperation({ description: 'API endpoint to delete employee' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async deletePassword(
        @User() user: UserDecorator,
        @Body() body: DeleteEmployeeRequestDto
    ) {
        return this.authService.deleteUser(body, user)
    }
}
