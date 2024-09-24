import { Address } from '@multiversx/sdk-core';
import { StakingEventsTopicsType } from './staking.types';

export class StakingEventsTopics {
    readonly eventName: string;
    readonly caller: Address;
    readonly epoch: number;
    readonly block: number;
    readonly timestamp: number;
    readonly farmingTokenID: string;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.epoch = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.block = parseInt(
            Buffer.from(rawTopics[3], 'base64').toString('hex'),
            16,
        );
        this.timestamp = parseInt(
            Buffer.from(rawTopics[4], 'base64').toString('hex'),
            16,
        );
        this.farmingTokenID = Buffer.from(rawTopics[5], 'base64').toString();
    }

    toJSON(): StakingEventsTopicsType {
        return {
            eventName: this.eventName,
            caller: this.caller.bech32(),
            epoch: this.epoch,
            block: this.block,
            timestamp: this.timestamp,
            farmingTokenID: this.farmingTokenID,
        };
    }
}
