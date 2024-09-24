import {
    Address,
    AddressType,
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { SwapNoFeeTopics } from './pair.event.topics';
import { SwapNoFeeEventType } from './pair.types';

export class SwapNoFeeEvent extends GenericEvent {
    private decodedTopics: SwapNoFeeTopics;

    private tokenIn: GenericToken | undefined;
    private tokenOut: GenericToken | undefined;
    private destination: Address | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new SwapNoFeeTopics(this.topics);
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

    getTokenAmountOut(): GenericToken | undefined {
        return this.tokenOut;
    }

    getDestination(): Address | undefined {
        return this.destination;
    }

    toJSON(): SwapNoFeeEventType {
        return {
            ...super.toJSON(),
            tokenIn: this.tokenIn?.toJSON(),
            tokenOut: this.tokenOut?.toJSON(),
            destination: this.destination?.toString(),
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(SwapNoFeeEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    getStructure(): StructType {
        return new StructType('SwapNoFeeAndForwardEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('tokenInID', '', new TokenIdentifierType()),
            new FieldDefinition('tokenInAmount', '', new BigUIntType()),
            new FieldDefinition('tokenOutID', '', new TokenIdentifierType()),
            new FieldDefinition('tokenOutAmount', '', new BigUIntType()),
            new FieldDefinition('destination', '', new AddressType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
