import { OnModuleInit, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { UsersSagas } from './sagas/users.sagas';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repository/user.repository';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ConfigService, EventStoreService } from '@smplct-view/shared/services';
import { getEnvPath } from '@smplct-view/shared/utils';
import { TypeOrmModule } from '@nestjs/typeorm';

const config = new ConfigService(getEnvPath('partners-service', process.env.NODE_ENV));

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: getEnvPath('users-service', process.env.NODE_ENV),
            isGlobal: true,
        }),
        CqrsModule,
        WinstonModule.forRoot(config.logConfig),
        TypeOrmModule.forFeature([]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        UserRepository,
        ConfigService,
        EventStoreService,
    ],
})
export class PartnersModule implements OnModuleInit {
    // constructor() {
    // private readonly eventStore: EventStore,
    // private readonly usersSagas: UsersSagas,
    // private readonly event$: EventBus,
    // private readonly command$: CommandBus,
    // private readonly moduleRef: ModuleRef,
    // }

    onModuleInit() {
        // this.command$.setModuleRef(this.moduleRef);
        // this.event$.setModuleRef(this.moduleRef);
        // /** ------------ */
        // this.eventStore.setEventHandlers(this.eventHandlers);
        // this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        // this.event$.publisher = this.eventStore;
        // /** ------------ */
        // this.event$.register(EventHandlers);
        // this.command$.register(CommandHandlers);
        // this.event$.combineSagas([this.usersSagas.userCreated]);
    }

    //
    // eventHandlers = {
    //     UserCreatedEvent: data => new UserCreatedEvent(data),
    //     UserDeletedEvent: data => new UserDeletedEvent(data),
    //     UserUpdatedEvent: data => new UserUpdatedEvent(data),
    //     UserWelcomedEvent: data => new UserWelcomedEvent(data),
    // };
}
