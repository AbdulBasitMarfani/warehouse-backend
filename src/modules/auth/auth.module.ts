import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthGuard } from './guards/auth.guard.js';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.getOrThrow<number>('JWT_EXPIRES_IN')},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AuthModule {}