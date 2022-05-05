export class RawEvent {
    address: string | undefined;
    identifier: string | undefined;
    topics: string[] = [];
    data: string | undefined;

    constructor(init?: Partial<RawEvent>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
