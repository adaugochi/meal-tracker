import {CatererService} from "./caterer.service";
import {User, UserDecorator} from "../users/user.decorator";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CatererRequestDto, GenerateCodeRequestDto} from "./dto/caterer-request.dto";
import {AuthGuard} from "@nestjs/passport";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse, ApiNotFoundResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {CreatedResponseDto} from "../common/created-response.dto";
import {ValidationError} from "../common/validation-error.dto";
import {CreateEmployeeRequestDto} from "../auth/dto/auth.request.dto";
import {UnauthorizedError} from "../common/unauthorized-error.dto";
import {NotFoundError} from "../common/not-found-error.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('caterers')
@ApiTags('Caterers')
export class CatererController {
    constructor(
        private readonly catererService: CatererService
    ) {
    }

    @Get('employees')
    @ApiOperation({ description: 'API endpoint to get all employees' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    public async getEmployees()
    {
        return this.catererService.getEmployees();
    }

    @Post('generate-code')
    @ApiBadRequestResponse({ type: ValidationError})
    @ApiBody({ type: GenerateCodeRequestDto })
    @ApiOperation({ description: 'API endpoint to generate meal ticket code' })
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async generateCode(@User() user: UserDecorator, @Body() body: GenerateCodeRequestDto) {
        return await this.catererService.generateCode(user, body)
    }

    @Post('verify-meal-code')
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({ type: CreatedResponseDto })
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to verify code' })
    @ApiBearerAuth()
    @ApiBody({ type: CatererRequestDto})
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    public async verifyCode(@User() user: UserDecorator, @Body() body: CatererRequestDto)
    {
        return this.catererService.verifyCode(user, body)
    }
}