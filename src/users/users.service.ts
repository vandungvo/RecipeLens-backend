import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  fetchUserByID(id: string) {
    return this.userModel.findById(id);
  }
  async findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOneWithoutPassword(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      const { password, ...userWithoutPassword } = user.toObject();
      password;
      return userWithoutPassword;
    }
    return null;
  }
}
