import { RawEventType } from './generic.types';

export class RawEvent {
    protected address: string | undefined;
    protected identifier: string | undefined;
    protected topics: string[] = [];
    protected data: string | undefined;

    constructor(init: RawEventType) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
