import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    const user = await this.userService.create(createUserDto);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, ...tokens };
  }
  async login(loginDto: LoginDto): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, ...tokens };
  }

  private async generateTokens(userId: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email, role };
    const secret = this.configService.get<string>('jwt.secret');
    const refreshSecret = this.configService.get<string>('jwt.refreshSecret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn') as any;
    const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn') as any;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { secret, expiresIn }),
      this.jwtService.signAsync(payload, { secret: refreshSecret, expiresIn: refreshExpiresIn }),
    ]);
    return { accessToken, refreshToken };
  }
}
