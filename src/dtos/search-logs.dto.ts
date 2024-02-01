import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchLogsDto {
  @ApiPropertyOptional({ default: 'ERROR' })
  @IsString()
  //@IsOptional()
  searchKeyword?: string;

  @ApiPropertyOptional({ default: '2023-11-22 14:55:45' })
  @IsString()
  //@IsOptional()
  from?: string;

  @ApiPropertyOptional({ default: '2024-02-02 14:55:45' })
  @IsString()
  //@IsOptional()
  to?: string;
}
