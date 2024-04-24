import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateFavoriteDto } from './dto/UpdateFavorite.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.fetchUserByID(id);
  }

  @Post(':id/favorites')
  addFavorite(@Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.userService.addFavorite(
      updateFavoriteDto.id,
      updateFavoriteDto.favorite,
    );
  }
}
