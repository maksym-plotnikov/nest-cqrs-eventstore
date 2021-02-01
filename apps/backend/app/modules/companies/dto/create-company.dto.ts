import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    @MaxLength(100)
    domain: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsOptional()
    @ApiPropertyOptional()
    users: number[];
}
