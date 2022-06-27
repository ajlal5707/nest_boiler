import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number;
}
