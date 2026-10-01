import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './custom.decorator/public.decorator.js';
import { Roles } from './custom.decorator/role.decorator.js';
import { UserRole } from '../users/entities/user-role.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ description: 'User logged in' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user from the token' })
  me(@Req() request: Request & { user: any }) {
    console.log(request['user']);
    return request['user'];
  }

  @Get('owner')
  @Roles([UserRole.Owner])
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Owner area' })
  ownerArea() {
    return { message: 'owner area' };
  }
}
