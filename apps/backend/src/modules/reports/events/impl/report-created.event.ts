export class ReportCreatedEvent {
    constructor(public readonly heroId: string, public readonly itemId: string) {}
}
