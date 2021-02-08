export class UserReportSubmitEvent {
    constructor(public readonly userId: string, public readonly clientId: string) {}
}
