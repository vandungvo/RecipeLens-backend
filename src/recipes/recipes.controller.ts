import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async getAll() {
    return await this.recipesService.findAll();
  }

  @Get('/getbyId/:id')
  async findRecipeById(@Param('id') id: number) {
    const recipe = await this.recipesService.findRecipeById(id);

    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }

  @Get('/getbyCategory')
  async findRecipeByCategory(@Query('category') category: string) {
    const recipe = await this.recipesService.findRecipeByCategory(category);

    if (!recipe) throw new NotFoundException('Recipe Category does not exist!');
    return recipe;
  }
}
