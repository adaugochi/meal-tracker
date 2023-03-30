import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponseDto {
    @ApiProperty({ example: 201 })
    statusCode: number;

    @ApiProperty({ example: "Message created successfully"})
    message: string;
}