import {IsInt, IsNotEmpty, IsString} from "class-validator";
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

export class GenerateCodeRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, example: 'J078OKG9V', description: 'Employee Identity Code' })
    employee_identity: string;
}