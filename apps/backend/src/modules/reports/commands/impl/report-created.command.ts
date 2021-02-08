export class ReportCreatedCommand {
    constructor(public readonly reportId: string, public readonly itemId: string) {}
}
