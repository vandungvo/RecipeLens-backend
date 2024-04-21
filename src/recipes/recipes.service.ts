import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filterRecipeDto } from './dto/filter-recipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipes.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('recipes') private readonly recipemodel: Model<RecipeDocument>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return await this.recipemodel.find().exec();
  }
  async findOne(id: string): Promise<Recipe> {
    return await this.recipemodel.findById(id).exec();
  }

  async findRecipeById(recipeId: number): Promise<Recipe | null> {
    try {
      const recipe = await this.recipemodel
        .findOne({ RecipeId: recipeId })
        .exec();
      return recipe;
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues, etc.)
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  }

  async findRecipeByCategory(category: string): Promise<Recipe[] | null> {
    try {
      const recipes = await this.recipemodel
        .find({ RecipeCategory: category })
        .exec();
      return recipes || null;
    } catch (error) {
      // Handle any potential errors (e.g., database connection issues, etc.)
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  }

  async getFilteredRecipes({ text, category, limit = 30 }: filterRecipeDto) {
    const categoryList = category?.split(',');
    // console.log(category)
    const findProp: any = text
      ? {
          $and: [
            categoryList?.length > 0
              ? {
                  RecipeCategory: { $in: categoryList },
                }
              : {},
            {
              $text: { $search: text },
            },
          ],
        }
      : {
          $and: [
            categoryList?.length > 0
              ? {
                  RecipeCategory: { $in: categoryList },
                }
              : {},
          ],
        };

    const recipes = await this.recipemodel.find(findProp).limit(limit);
    return recipes;
  }
}
