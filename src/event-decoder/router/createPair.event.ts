import {
    Address,
    AddressType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { RouterEventTopics } from './createPair.topics';
import { CreatePairEventType } from './router.types';
import BigNumber from 'bignumber.js';

export class CreatePairEvent extends GenericEvent {
    private decodedTopics: RouterEventTopics;

    private firstTokenID: string | undefined;
    private secondTokenID: string | undefined;
    private totalFeePercent: BigNumber | undefined;
    private specialFeePercent: BigNumber | undefined;
    private pairAddress: Address | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new RouterEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }

    toJSON(): CreatePairEventType {
        return {
            ...super.toJSON(),
            firstTokenID: this.firstTokenID,
            secondTokenID: this.secondTokenID,
            totalFeePercent: this.totalFeePercent?.toNumber(),
            specialFeePercent: this.specialFeePercent?.toNumber(),
            pairAddress: this.pairAddress?.toBech32(),
        };
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(CreatePairEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    private getStructure(): StructType {
        return new StructType('LiquidityEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('firstTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('secondTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('totalFeePercent', '', new U64Type()),
            new FieldDefinition('specialFeePercent', '', new U64Type()),
            new FieldDefinition('pairAddress', '', new AddressType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
