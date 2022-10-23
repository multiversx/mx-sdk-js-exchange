import { RawEventType } from './generic.types';

export class RawEvent {
    address: string | undefined;
    identifier: string | undefined;
    topics: string[] = [];
    data: string | undefined;

    constructor(init: RawEventType) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
