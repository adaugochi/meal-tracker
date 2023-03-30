import { ApiProperty } from '@nestjs/swagger';

export class ValidationError {
    @ApiProperty({ example: 400 })
    statusCode: string;
    @ApiProperty()
    message: string[];
    @ApiProperty({ example: "Bad Request" })
    error: string;
}
