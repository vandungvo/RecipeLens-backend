import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { logger } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { Recipesv1Module } from './recipes/recipesv1.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://recipeData:simplepassword123@cluster0.bzz80tz.mongodb.net/RecipeLensDB', 
      {connectionName: 'RecipeLensDB'}
    ),
    MongooseModule.forRoot(
      'mongodb+srv://recipeData:simplepassword123@cluster0.bzz80tz.mongodb.net/RecipeLens', 
      {connectionName: 'RecipeLens'}
    ),
    RecipesModule,
    Recipesv1Module,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UsersController);
  }
}
