import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { WelcomeUserCommand } from '../impl/welcome-user.command';
import { UserRepository } from '../../repository/user.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(WelcomeUserCommand)
export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: WelcomeUserCommand) {
        Logger.log('Async WelcomeUserHandler...', 'WelcomeUserCommand');
        const { id } = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.welcomeUser({ id }),
        );
        user.commit();
    }
}
