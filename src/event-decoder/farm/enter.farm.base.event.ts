import { BinaryCodec, StructType } from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { FarmEventsTopics } from './farm.event.topics';
import { BaseFarmEventType } from './farm.types';

export class BaseFarmEvent extends GenericEvent {
    private decodedTopics: FarmEventsTopics;
    protected decodedEvent: any;

    readonly farmingToken: GenericToken;
    readonly farmToken: GenericToken;
    readonly farmSupply: BigNumber;
    readonly rewardToken: GenericToken;
    readonly rewardTokenReserves: BigNumber;
    readonly createdWithMerge: boolean;

    constructor(init: RawEventType) {
        super(init);

        this.decodedTopics = new FarmEventsTopics(this.topics);
        this.decodedEvent = this.decodeEvent();

        this.block = this.decodedEvent.block;
        this.caller = this.decodedEvent.caller;
        this.epoch = this.decodedEvent.epoch;
        this.timestamp = this.decodedEvent.timestamp;

        this.farmingToken = new GenericToken({
            tokenID: this.decodedEvent.farmingTokenID.toString(),
            amount: this.decodedEvent.farmingTokenAmount,
        });
        this.farmToken = new GenericToken({
            tokenID: this.decodedEvent.farmTokenID.toString(),
            nonce: this.decodedEvent.farmTokenNonce,
            amount: this.decodedEvent.farmTokenAmount,
        });
        this.rewardToken = new GenericToken({
            tokenID: this.decodedEvent.rewardTokenID.toString(),
            amount: new BigNumber(0),
        });
        this.farmSupply = this.decodedEvent.farmSupply;
        this.rewardTokenReserves = this.decodedEvent.rewardTokenReserves;
        this.createdWithMerge = this.decodedEvent.createdWithMerge;
    }

    toJSON(): BaseFarmEventType {
        return {
            ...super.toJSON(),
            farmingToken: this.farmingToken?.toJSON(),
            rewardTokenReserves: this.rewardTokenReserves.toFixed(),
            farmToken: this.farmToken?.toJSON(),
            farmSupply: this.farmSupply?.toFixed(),
            rewardToken: this.rewardToken?.toJSON(),
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(BaseFarmEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();
        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    getStructure(): StructType {
        throw new Error('Method not implemented');
    }
}
