import {IsInt, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CatererRequestDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ required: true, example: 'samdave@example.com', description: 'Employee ID' })
    employee_id: number;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: 'QCVLIMB', description: 'Employee generated code' })
    code: string;
}