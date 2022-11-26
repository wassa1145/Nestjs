import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString({ message: 'Поле description должно быть строкой' })
  description: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  countView?: number;

  @ApiProperty()
  @IsString()
  cover?: string;
}
