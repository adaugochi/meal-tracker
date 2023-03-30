import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users/user.entity";
import {UserTypeEntity} from "./users/user-type.entity";
import {AdminEntity} from "./admin/admin.entity";
import {EmployeeEntity} from "./employee/employee.entity";
import {CatererEntity} from "./caterer/caterer.entity";
import {EmployeeMealEntity} from "./employee/employee-meal.entity";
import {databaseConfig} from "./config";
import {EmployeeModule} from "./employee/employee.module";
import {AdminModule} from "./admin/admin.module";
import {CatererModule} from "./caterer/caterer.module";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: databaseConfig.host,
            port: 3306,
            username: databaseConfig.username,
            password: databaseConfig.password,
            database: databaseConfig.database,
            entities: [
                UserEntity,
                UserTypeEntity,
                AdminEntity,
                EmployeeEntity,
                CatererEntity,
                EmployeeMealEntity
            ],
            synchronize: false,
            autoLoadEntities: true,
        }),
        AuthModule,
        UsersModule,
        EmployeeModule,
        AdminModule,
        CatererModule
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {}
