import {
    AddressType,
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { PairEventTopics } from './pair.event.topics';
import { SwapEventType } from './pair.types';

export class SwapEvent extends GenericEvent {
    private decodedTopics: PairEventTopics;

    private tokenIn: GenericToken | undefined;
    private tokenOut: GenericToken | undefined;
    feeAmount: BigNumber | undefined;
    tokenInReserves: BigNumber | undefined;
    tokenOutReserves: BigNumber | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new PairEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();

        Object.assign(this, decodedEvent);
        this.tokenIn = new GenericToken({
            tokenID: decodedEvent.tokenInID.toString(),
            amount: decodedEvent.tokenInAmount,
        });
        this.tokenOut = new GenericToken({
            tokenID: decodedEvent.tokenOutID.toString(),
            amount: decodedEvent.tokenOutAmount,
        });
    }

    getTokenIn(): GenericToken | undefined {
        return this.tokenIn;
    }

    getTokenOut(): GenericToken | undefined {
        return this.tokenOut;
    }

    getTokenInReserves(): BigNumber | undefined {
        return this.tokenInReserves;
    }

    getTokenOutReserves(): BigNumber | undefined {
        return this.tokenOutReserves;
    }

    toJSON(): SwapEventType {
        return {
            ...super.toJSON(),
            tokenIn: this.tokenIn?.toJSON(),
            tokenOut: this.tokenOut?.toJSON(),
            feeAmount: this.feeAmount?.toFixed(),
            tokenInReserves: this.tokenInReserves?.toFixed(),
            tokenOutReserves: this.tokenOutReserves?.toFixed(),
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(SwapEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const swapEventStructure = this.getStructure();

        const [decoded] = codec.decodeNested(data, swapEventStructure);

        return decoded.valueOf();
    }

    private getStructure(): StructType {
        return new StructType('SwapEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('tokenInID', '', new TokenIdentifierType()),
            new FieldDefinition('tokenInAmount', '', new BigUIntType()),
            new FieldDefinition('tokenOutID', '', new TokenIdentifierType()),
            new FieldDefinition('tokenOutAmount', '', new BigUIntType()),
            new FieldDefinition('feeAmount', '', new BigUIntType()),
            new FieldDefinition('tokenInReserves', '', new BigUIntType()),
            new FieldDefinition('tokenOutReserves', '', new BigUIntType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
