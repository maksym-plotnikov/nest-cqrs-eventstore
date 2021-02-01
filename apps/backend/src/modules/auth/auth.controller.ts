import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiNotFoundResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    BadRequestException,
    Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlainResponseDto } from '../../dtos';
import { User } from '../users/user.entity';
import { UsersService } from '../users';
import { AuthGuard, RolesGuard } from '../../guards';
import {
    UserLoginDto,
    LoginPayloadDto,
    ResetPasswordDto,
    ChangePasswordDto,
    LoginResponseErrorDto,
} from './dto';
import { AuthUser, Roles } from '../../decorators';
import { RoleType } from '@smplct-view/shared/constants';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly usersService: UsersService,
        public readonly authService: AuthService,
    ) {}

    /**
     * User Login
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'User info with access token',
    })
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    @ApiNotFoundResponse({
        type: LoginResponseErrorDto,
        description:
            'User not found or password is reset. If response.statusCode == 204 then password is reset',
    })
    async userLogin(@Body() userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
        const User = await this.authService.validateUser(userLoginDto);
        const [user, token] = await Promise.all([
            User,
            this.authService.createToken(User),
        ]);
        return new LoginPayloadDto(user, token);
    }

    /**
     * Reset password
     */
    @Post('resetPassword')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.Admin)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Password was successfully reset' })
    @ApiNotFoundResponse({
        type: LoginResponseErrorDto,
        description:
            'User not found or password is reset. If response.statusCode == 204 then password is already reset',
    })
    async resetPassword(
        @Body() userToResetPassword: ResetPasswordDto,
        @AuthUser() user: User,
    ): Promise<PlainResponseDto> {
        if (user.id === userToResetPassword.id) {
            throw new BadRequestException("You can't reset own password");
        }
        await this.usersService.resetPassword(userToResetPassword.id);
        return { message: 'Successfully reset' };
    }

    /**
     * Change password
     */
    @Put('changePassword')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Password was successfully changed' })
    @ApiNotFoundResponse({
        type: LoginResponseErrorDto,
        description:
            'User not found or old password is wrong. If response.statusCode == 204 then password was wrong',
    })
    async changePassword(
        @AuthUser() user: User,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<PlainResponseDto> {
        await this.usersService.changePassword({
            ...changePasswordDto,
            id: user.id,
        });
        return { message: 'Successfully changed' };
    }

    /**
     * Set new password
     */
    @Post('setPassword')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'Password was successfully set' })
    async setPassword(@Body() changePasswordDto: UserLoginDto): Promise<LoginPayloadDto> {
        const User = await this.usersService.setNewPassword(changePasswordDto);

        const [user, token] = await Promise.all([
            User,
            this.authService.createToken(User),
        ]);
        return new LoginPayloadDto(user, token);
    }
}
