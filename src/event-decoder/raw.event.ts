import { ESDT_EVENTS, RawEventType } from './generic.types';

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
        if (
            this.identifier !== ESDT_EVENTS.ESDT_LOCAL_BURN &&
            this.identifier !== ESDT_EVENTS.ESDT_LOCAL_MINT
        ) {
            this.name = Buffer.from(this.topics[0], 'base64').toString();
        }
    }
}
