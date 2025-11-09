import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email }).exec();
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(dto.password, salt);

    const created = new this.userModel({ email: dto.email, password: hashed, name: dto.name });
    const saved = await created.save();

    // return basic user info (without password)
    // and an access token
  const payload = { sub: (saved as any)._id.toString(), email: saved.email, role: saved.role };
    return {
      user: { id: saved._id, email: saved.email, name: saved.name, role: saved.role },
      accessToken: this.jwtService.sign(payload),
      role: saved.role,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: (user as any)._id.toString(), email: user.email, role: user.role };
    return {
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
      accessToken: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new UnauthorizedException('User not found');

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new UnauthorizedException('Current password is incorrect');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed as any;
    await user.save();

    return { success: true };
  }
}
