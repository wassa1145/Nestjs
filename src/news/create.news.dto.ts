import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString({ message: 'Поле description должно быть строкой' })
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  countView?: number;

  @ApiProperty()
  cover?: string;

  @IsNotEmpty()
  userId: string;
}
