import { Address } from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { GenericEventType, RawEventType } from './generic.types';
import { RawEvent } from './raw.event';

export class GenericEvent extends RawEvent {
    protected caller: Address | undefined;
    protected block: BigNumber | undefined;
    protected epoch: BigNumber | undefined;
    protected timestamp: BigNumber | undefined;

    constructor(init: RawEventType) {
        super(init);
    }

    getAddress(): string | undefined {
        return this.address;
    }

    getIdentifier(): string | undefined {
        return this.identifier;
    }

    getTimestamp(): BigNumber | undefined {
        return this.timestamp;
    }

    toJSON(): GenericEventType {
        return {
            address: this.address,
            identifier: this.identifier,
            caller: this.caller?.toString(),
            block: this.block?.toNumber(),
            epoch: this.epoch?.toNumber(),
            timestamp: this.timestamp?.toNumber(),
        };
    }
}
