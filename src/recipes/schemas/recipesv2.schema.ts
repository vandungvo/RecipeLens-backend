import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, collection: 'recipes_v1.2' })
export class Recipesv2 {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  image_url: string;

  @Prop()
  cook_times: string;

  @Prop()
  ingredient: string;

  @Prop()
  instruction: string;

  @Prop()
  yield: string;

  @Prop()
  serving_size: string;

  @Prop()
  recipe_key: string;

  @Prop()
  categories: string;

  @Prop({ type: Object })
  nutrition: string;
}

export const Recipev2Schema = SchemaFactory.createForClass(Recipesv2);