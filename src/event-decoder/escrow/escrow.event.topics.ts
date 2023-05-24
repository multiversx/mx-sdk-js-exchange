export class EscrowEventTopics {
    eventName: string;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
    }

    toJSON() {
        return {
            eventName: this.eventName,
        };
    }
}
