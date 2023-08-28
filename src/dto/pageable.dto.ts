import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class Pageable {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size?: number = 10;
}
