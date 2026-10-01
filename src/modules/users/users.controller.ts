import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { Roles } from '../auth/custom.decorator/role.decorator.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserActiveDto } from './dto/update-user-active.dto.js';
import { UserRole } from './entities/user-role.js';
import { User } from './entities/user.entity.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([UserRole.Owner])
  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.present(user);
  }

  @Roles([UserRole.Owner])
  @Get()
  @ApiOkResponse({ description: 'All users' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => this.present(user));
  }

  @Roles([UserRole.Owner])
  @Patch(':id/active')
  @ApiOkResponse({ description: 'Active flag updated' })
  async setActive(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserActiveDto,
    @Req() request: Request & { user?: { sub: number } },
  ) {
    if (request.user?.sub === id) {
      throw new BadRequestException('You cannot change your own active status');
    }

    const user = await this.usersService.setActive(id, dto.isActive);
    return this.present(user);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found' })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    return user;
  }

  private present(user: User) {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}
