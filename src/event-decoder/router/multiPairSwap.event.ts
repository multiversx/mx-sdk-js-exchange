import {
    Address,
    AddressType,
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    ListType,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { EsdtTokenPayment } from '../../attributes-decoder';
import { MultiPairSwapEventTopics } from './multiPairSwap.topics';
import { RawEvent } from '../raw.event';
import BigNumber from 'bignumber.js';
import { MultiPairSwapEventType } from './router.types';

export class MultiPairSwapEvent extends GenericEvent {
    private decodedTopics: MultiPairSwapEventTopics;

    protected readonly caller: Address;
    private readonly tokenInID: string;
    private readonly amountIn: BigNumber;
    private readonly tokenOutID: string;
    private readonly amountOut: BigNumber;
    private readonly paymentsOut: EsdtTokenPayment[];

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new MultiPairSwapEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);

        this.caller = new Address(decodedEvent.caller);
        this.tokenInID = decodedEvent.tokenInID;
        this.amountIn = decodedEvent.amountIn;
        this.tokenOutID = decodedEvent.tokenOutID;
        this.amountOut = decodedEvent.amountOut;
        this.paymentsOut = decodedEvent.paymentsOut.map((token: any) =>
            EsdtTokenPayment.fromDecodedAttributes(token),
        );
    }

    toJSON(): MultiPairSwapEventType {
        return {
            ...super.toJSON(),
            caller: this.caller.toBech32(),
            tokenInID: this.tokenInID,
            amountIn: this.amountIn.toFixed(),
            tokenOutID: this.tokenOutID,
            amountOut: this.amountOut.toFixed(),
            paymentsOut: this.paymentsOut.map((token) => token.toJSON()),
        };
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(MultiPairSwapEvent.name);
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
            new FieldDefinition('tokenInID', '', new TokenIdentifierType()),
            new FieldDefinition('amountIn', '', new BigUIntType()),
            new FieldDefinition('tokenOutID', '', new TokenIdentifierType()),
            new FieldDefinition('amountOut', '', new BigUIntType()),
            new FieldDefinition(
                'paymentsOut',
                '',
                new ListType(EsdtTokenPayment.getStructure()),
            ),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
