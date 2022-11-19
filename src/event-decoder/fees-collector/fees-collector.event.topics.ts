import { Address } from '@elrondnetwork/erdjs/out';

export class FeesCollectorEventTopics {
    readonly eventName: string;
    readonly caller: Address;
    readonly paymentToken: string;
    readonly paymentNonce: number;
    readonly currentWeek: number;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.currentWeek = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.paymentToken = Buffer.from(rawTopics[3], 'base64').toString();
        this.paymentNonce = parseInt(
            Buffer.from(rawTopics[4], 'base64').toString('hex'),
            16,
        );
    }

    toJSON() {
        return {
            eventName: this.eventName,
            caller: this.caller,
            paymentToken: this.paymentToken,
            paymentNonce: this.paymentNonce,
            currentWeek: this.currentWeek
        };
    }
}
