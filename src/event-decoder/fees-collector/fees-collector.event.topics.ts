import { Address } from '@elrondnetwork/erdjs/out';

export class FeesCollectorEventTopics {
    private readonly eventName: string;
    private readonly caller: Address;
    readonly paymentToken: string;
    readonly currentWeek: number;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.currentWeek = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.paymentToken = Buffer.from(rawTopics[3], 'base64').toString();
    }

    toJSON() {
        return {
            eventName: this.eventName,
            caller: this.caller,
            paymentToken: this.paymentToken,
            currentWeek: this.currentWeek
        };
    }

    getCaller(): Address {
        return this.caller;
    }

    getEventName(): string {
        return this.eventName;
    }
}
