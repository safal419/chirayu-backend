import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGaurd } from '../../common/gaurds/auth.guard';

import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('change-password')
  @UseGuards(AuthGaurd)
  async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    // AuthGaurd attaches payload to request.user (payload.sub is user id)
    const payload: any = (req as any).user;
    const userId = payload?.sub;
    return this.authService.changePassword(userId, dto.currentPassword, dto.newPassword);
  }
}
