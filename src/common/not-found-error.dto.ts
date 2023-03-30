import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError {
    @ApiProperty({ example: 404 })
    statusCode: number;

    @ApiProperty({ example: "Cannot ******"})
    message: string;

    @ApiProperty({ example: "Not Found"})
    error: string;
}