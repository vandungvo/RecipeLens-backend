import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find();
    let retUsers = [];
    for (let i = 0; i < users.length; i++) {
      const { password, ...retUser } = users[i].toObject();
      password;
      retUsers = [...retUsers, retUser];
    }
    return retUsers;
  }

  async fetchUserByID(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(id);
    const { password, ...retUser } = user.toObject();
    password;
    return retUser;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async addFavorite(id: string, favorites: number[]) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(id);
    for (let i = 0; i < favorites.length; i++) {
      if (user.favorite.includes(favorites[i])) {
        throw new HttpException(
          'Favorite already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.favorite.push(favorites[i]);
    }
    return user.save();
  }

  async removeFavorite(id: string, favorites: number[]) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.findById(id);
    for (let i = 0; i < favorites.length; i++) {
      if (!user.favorite.includes(favorites[i])) {
        throw new HttpException('Favorite not found', HttpStatus.BAD_REQUEST);
      }
      user.favorite = user.favorite.filter(
        (favorite) => favorite !== favorites[i],
      );
    }
    return user.save();
  }
}
