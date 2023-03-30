import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {AdminService} from "./admin.service";
import {AdminController} from "./admin.controller";

@Module({
    imports: [HttpModule],
    providers: [AdminService],
    exports: [AdminService],
    controllers: [AdminController],
})

export class AdminModule {}