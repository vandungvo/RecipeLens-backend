import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ required: false })
  favorite?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
