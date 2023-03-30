import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Validate} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class loginData {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'admin@example.com', description: 'User email' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '*******', description: 'User password' })
    password: string;
}

export class CreateEmployeeRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'samdave@example.com', description: 'Employee email' })
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty({ required: false, example: '+2349011111111', description: 'Employee phone number' })
    phone_number: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: 'Sam', description: 'Employee name' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: 'Customer Support', description: 'Employee job title' })
    job_title: string;
}

export class EditEmployeeRequestDto  {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'samdave@example.com', description: 'Employee email' })
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty({ required: false, example: '+2349011111111', description: 'Employee phone number' })
    phone_number: string;


    @IsOptional()
    @ApiProperty({ required: false, example: 'Sam', description: 'Employee name' })
    name: string;

    @IsOptional()
    @ApiProperty({ required: false, example: 'Customer Support', description: 'Employee job title' })
    job_title: string;
}

export class ChangePasswordRequestDto  {
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({ required: true, example: '+2349011111111', description: 'Updated Employee phone number' })
    phone: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '*******', description: 'Employee old password' })
    old_password: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '*******', description: 'Employee new password' })
    new_password: string;
}

export class SetNewPasswordRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'samdave@example.com', description: 'Employee email' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '*******', description: 'System auto generated password' })
    old_password: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '*******', description: 'Employee new password' })
    new_password: string;
}

export class DeleteEmployeeRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({required: true, example: 'samdave@example.com', description: 'Employee email'})
    email: string;
}