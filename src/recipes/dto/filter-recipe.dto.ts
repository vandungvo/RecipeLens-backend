import { ApiProperty } from '@nestjs/swagger';
export class filterRecipeDto {
  @ApiProperty({ required: false })
  text?: string;
  @ApiProperty({ required: false })
  category?: string;
  @ApiProperty({ required: false })
  limit?: number;
}
