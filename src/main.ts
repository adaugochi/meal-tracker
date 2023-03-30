import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {useContainer} from "class-validator";
import {ValidationPipe} from "@nestjs/common";
import {EmployeeModule} from "./employee/employee.module";
import {AdminModule} from "./admin/admin.module";
import {CatererModule} from "./caterer/caterer.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        forbidUnknownValues: false,
        validationError: {
            target: false,
            value: false,
        },
        transform: false
    }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors();

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('MSS APIs')
        .setDescription('MSS API')
        .setVersion('1.0')
        .addTag('mss')
        .build();
    const document = SwaggerModule.createDocument(
        app,
        config,
        {
            include: [
                AuthModule,
                UsersModule,
                EmployeeModule,
                AdminModule,
                CatererModule
            ]
        });
    SwaggerModule.setup('api-mss', app, document);
    await app.listen(5000);
}
bootstrap();
