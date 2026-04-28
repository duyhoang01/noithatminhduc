import { Type } from 'class-transformer';
import { IsInt, IsNumberString, Min, ValidateNested } from 'class-validator';

export class LineItemDto {
  @IsNumberString()
  product_id!: string;

  @IsNumberString()
  variant_id!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsInt()
  @Min(0)
  unit_price!: number;
}

export class UpdateLinesDto {
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lines!: LineItemDto[];
}
