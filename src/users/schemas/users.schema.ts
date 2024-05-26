import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: false })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ required: false })
  favorite?: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
