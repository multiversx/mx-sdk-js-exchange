import { Address } from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';

export class MultiPairSwapEventTopics {
    private readonly eventName: string;
    private caller: Address;
    private readonly tokenInID: string;
    private readonly amountIn: string;
    private readonly tokenOutID: string;
    private readonly amountOut: string;
    private readonly epoch: number;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.tokenInID = Buffer.from(rawTopics[2], 'base64').toString();
        this.amountIn = new BigNumber(
            Buffer.from(rawTopics[3], 'base64').toString('hex'),
            16,
        ).toFixed();
        this.tokenOutID = Buffer.from(rawTopics[4], 'base64').toString();
        this.amountOut = new BigNumber(
            Buffer.from(rawTopics[5], 'base64').toString('hex'),
            16,
        ).toFixed();
        this.epoch = parseInt(
            Buffer.from(rawTopics[6], 'base64').toString('hex'),
            16,
        );
    }

    toJSON() {
        return {
            eventName: this.eventName,
            tokenInID: this.tokenInID,
            amountIn: this.amountIn,
            tokenOutID: this.tokenOutID,
            amountOut: this.amountOut,
            caller: this.caller.bech32(),
            epoch: this.epoch,
        };
    }
}
