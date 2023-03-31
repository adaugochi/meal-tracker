import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: "Success"})
    message: string;

    @ApiProperty()
    data: any
}