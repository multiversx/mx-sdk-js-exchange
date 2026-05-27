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
import { GenericEvent } from '../generic.event';
import { SmartSwapEventTopics } from './smartSwap.topics';
import BigNumber from 'bignumber.js';
import { RawEventType } from '../generic.types';
import { ErrInvalidDataField } from '../../errors';
import { SmartSwapEventType } from './composable.tasks.types';

export class SmartSwapEvent extends GenericEvent {
    private decodedTopics: SmartSwapEventTopics;

    protected readonly declare caller: Address;
    private readonly tokenInID: string;
    private readonly amountIn: BigNumber;
    private readonly tokenOutID: string;
    private readonly amountOut: BigNumber;
    private readonly feeAmount: BigNumber;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new SmartSwapEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);

        this.caller = new Address(decodedEvent.caller);
        this.tokenInID = decodedEvent.tokenInID;
        this.amountIn = decodedEvent.amountIn;
        this.tokenOutID = decodedEvent.tokenOutID;
        this.amountOut = decodedEvent.amountOut;
        this.feeAmount = decodedEvent.feeAmount;
    }

    toJSON(): SmartSwapEventType {
        return {
            ...super.toJSON(),
            caller: this.caller.toBech32(),
            tokenInID: this.tokenInID,
            amountIn: this.amountIn.toFixed(),
            tokenOutID: this.tokenOutID,
            amountOut: this.amountOut.toFixed(),
            feeAmount: this.feeAmount.toFixed(),
        };
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(SmartSwapEvent.name);
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
            new FieldDefinition('feeAmount', '', new BigUIntType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
