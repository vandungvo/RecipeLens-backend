import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Recipe } from '../../recipes/schemas/recipes.schema';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: false })
  name?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] })
  favorite?: Recipe[];
}

export const UserSchema = SchemaFactory.createForClass(User);
