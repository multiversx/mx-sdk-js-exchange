import {
    AddressType,
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedLpTokenAttributes } from '../../attributes-decoder/proxy/wrappedLp.token';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { PairProxyEventType } from './pair.proxy.types';
import { PairProxyTopics } from './proxy.event.topics';

export class PairProxyEvent extends GenericEvent {
    protected decodedTopics: PairProxyTopics;

    protected firstToken: GenericToken | undefined;
    protected secondToken: GenericToken | undefined;
    protected wrappedLpToken: GenericToken | undefined;
    protected wrappedLpAttributes: WrappedLpTokenAttributes | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new PairProxyTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);
        this.firstToken = new GenericToken({
            tokenID: decodedEvent.firstTokenID.toString(),
            nonce: decodedEvent.firstTokenNonce,
            amount: decodedEvent.firstTokenAmount,
        });
        this.secondToken = new GenericToken({
            tokenID: decodedEvent.secondTokenID.toString(),
            nonce: decodedEvent.secondTokenNonce,
            amount: decodedEvent.secondTokenAmount,
        });
        this.wrappedLpToken = new GenericToken({
            tokenID: decodedEvent.wrappedLpTokenID.toString(),
            nonce: decodedEvent.wrappedLpTokenNonce,
            amount: decodedEvent.wrappedLpTokenAmount,
        });
        this.wrappedLpAttributes =
            WrappedLpTokenAttributes.fromDecodedAttributes(
                decodedEvent.wrappedLpAttributes,
            );
    }

    toJSON(): PairProxyEventType {
        return {
            ...super.toJSON(),
            firstToken: this.firstToken?.toJSON(),
            secondToken: this.firstToken?.toJSON(),
            wrappedLpToken: this.wrappedLpToken?.toJSON(),
            wrappedLpAttributes: this.wrappedLpAttributes?.toJSON(),
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(PairProxyEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStructure = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStructure);

        return decoded.valueOf();
    }

    getStructure(): StructType {
        return new StructType('RemoveLiquidityProxyEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('pairAddress', '', new AddressType()),
            new FieldDefinition(
                'wrappedLpTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('wrappedLpTokenNonce', '', new U64Type()),
            new FieldDefinition('wrappedLpTokenAmount', '', new BigUIntType()),
            new FieldDefinition(
                'wrappedLpAttributes',
                '',
                WrappedLpTokenAttributes.getStructure(),
            ),
            new FieldDefinition('firstTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('firstTokenNonce', '', new U64Type()),
            new FieldDefinition('firstTokenAmount', '', new BigUIntType()),
            new FieldDefinition('secondTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('secondTokenNonce', '', new U64Type()),
            new FieldDefinition('secondTokenAmount', '', new BigUIntType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
