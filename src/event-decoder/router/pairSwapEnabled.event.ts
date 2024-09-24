import {
    Address,
    AddressType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { RouterEventTopics } from './createPair.topics';
import { PairSwapEnableEventType } from './router.types';

export class PairSwapEnabledEvent extends RawEvent {
    private decodedTopics: RouterEventTopics;

    private readonly caller: Address;
    private readonly firstTokenID: string;
    private readonly secondTokenID: string;
    private readonly pairAddress: Address;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new RouterEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();

        this.caller = new Address(decodedEvent.caller);
        this.firstTokenID = decodedEvent.firstTokenID;
        this.secondTokenID = decodedEvent.secondTokenID;
        this.pairAddress = new Address(decodedEvent.pairAddress);
    }

    toJSON(): PairSwapEnableEventType {
        return {
            caller: this.caller.bech32(),
            firstTokenID: this.firstTokenID,
            secondTokenID: this.secondTokenID,
            pairAddress: this.pairAddress.bech32(),
        };
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }

    getCaller(): Address {
        return this.caller;
    }

    getFirstTokenID(): string {
        return this.firstTokenID;
    }

    getSecondTokenID(): string {
        return this.secondTokenID;
    }

    getPairAddress(): Address {
        return this.pairAddress;
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(PairSwapEnabledEvent.name);
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
            new FieldDefinition('pairAddress', '', new AddressType()),
        ]);
    }
}
