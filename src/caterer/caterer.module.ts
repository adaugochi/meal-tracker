import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {CatererController} from "./caterer.controller";
import {CatererService} from "./caterer.service";

@Module({
    imports: [HttpModule],
    providers: [CatererService],
    exports: [CatererService],
    controllers: [CatererController],
})

export class CatererModule {}