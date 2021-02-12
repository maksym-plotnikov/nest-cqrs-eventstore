import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: 'ping' })
    ping(req: any) {
        console.info(req);
        return this.appService.respond();
    }
}
