import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [EmployeeService],
    exports: [EmployeeService],
    controllers: [EmployeeController],
})
export class EmployeeModule {}
