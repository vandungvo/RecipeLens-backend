import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { filterRecipeDto } from './dto/filter-recipe.dto';
import { RecipesService } from './recipes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get('/:id')
  async findRecipeById(@Param('id') id: number) {
    const recipe = await this.recipesService.findRecipeById(id);

    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }

  @Get('/')
  async getRecipes(@Query() filterDto: filterRecipeDto) {
    if (!filterDto.text && !filterDto.category) {
      // console.log('No recipe category')
      return await this.recipesService.findAll();
    }

    const filteredRecipes =
      await this.recipesService.getFilteredRecipes(filterDto);
    return filteredRecipes;
  }
}
