import { RawEventType, TRANSACTION_EVENTS } from './generic.types';

export class RawEvent {
    address: string | undefined;
    identifier: string | undefined;
    name: string | undefined;
    topics: string[] = [];
    data: string | undefined;

    constructor(init: RawEventType) {
        if (init) {
            Object.assign(this, init);
        }
        if (this.identifier !== undefined && !this.isTransactionEvent(this.identifier)) {
            this.name = Buffer.from(this.topics[0], 'base64').toString();
        }
    }

    private isTransactionEvent(identifier: string): boolean {
        return (<any>Object).values(TRANSACTION_EVENTS).includes(identifier);
    }
}
