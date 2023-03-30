import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 1040})
    errorCode: number;

    @ApiProperty({ example: "******"})
    message: string;
}