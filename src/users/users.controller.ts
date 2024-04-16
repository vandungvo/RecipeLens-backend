import {
  Controller,
  Param,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './users.service';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userService.fetchUserByID(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
