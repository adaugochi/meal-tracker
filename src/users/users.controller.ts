import {Controller, UseGuards} from '@nestjs/common';;
import {
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from './users.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}
}
