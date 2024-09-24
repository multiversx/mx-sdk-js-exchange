import { Address } from '@multiversx/sdk-core';
import { UnlockedTokensTopicsType } from './token.unstake.types';

export class UserUnlockedTokensTopics {
    readonly eventName: string;
    readonly caller: Address;
    readonly block: number;
    readonly epoch: number;
    readonly timestamp: number;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.block = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.epoch = parseInt(
            Buffer.from(rawTopics[3], 'base64').toString('hex'),
            16,
        );
        this.timestamp = parseInt(
            Buffer.from(rawTopics[4], 'base64').toString('hex'),
            16,
        );
    }

    toJSON(): UnlockedTokensTopicsType {
        return {
            eventName: this.eventName,
            caller: this.caller.bech32(),
            block: this.block,
            epoch: this.epoch,
            timestamp: this.timestamp,
        };
    }
}
