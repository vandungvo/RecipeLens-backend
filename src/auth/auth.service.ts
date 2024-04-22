import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const flag = await bcrypt.compare(pass, user?.password);
    if (!flag) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user._id, name: user.name, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: await this.usersService.findOneWithoutPassword(email),
    };
  }

  async signUp(name: string, email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_GATEWAY);
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      throw new HttpException('Error creating user', HttpStatus.BAD_GATEWAY);
    }
    const createdUser = await this.usersService.findOne(email);
    const payload = {
      sub: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: await this.usersService.findOneWithoutPassword(email),
    };
  }
}
