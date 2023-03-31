import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
    @ApiProperty({ example: 400 })
    code: number;

    @ApiProperty({ example: false})
    success: boolean;

    @ApiProperty({ example: "******"})
    message: string;
}