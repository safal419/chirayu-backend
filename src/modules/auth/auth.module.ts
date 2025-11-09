import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGaurd } from '../../common/gaurds/auth.guard';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { jwtConfig } from '../../~config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, AuthGaurd],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
