import { OnModuleInit, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { SubscriptionEventService } from './services/subscription-event.service';
import { UserRepository } from './repository/user.repository';
import { ConfigService, EventStoreService } from '@smplct-view/shared/services';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { UsersSagas } from './sagas/users.sagas';
import { getEnvPath } from '@smplct-view/shared/utils';

const config = new ConfigService(getEnvPath('users-service', process.env.NODE_ENV));

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
        ConfigService,
        EventStoreService,
        UserRepository,
        UsersService,
        SubscriptionEventService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        UsersSagas,
    ],
})
export class UsersModule implements OnModuleInit {
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
