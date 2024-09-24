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
import { AddLiquidityEventType } from './pair.types';

export class AddLiquidityEvent extends GenericEvent {
    private decodedTopics: PairEventTopics;

    private firstToken: GenericToken | undefined;
    private secondToken: GenericToken | undefined;
    private liquidityPoolToken: GenericToken | undefined;
    private liquidityPoolSupply: BigNumber | undefined;
    private firstTokenReserves: BigNumber | undefined;
    private secondTokenReserves: BigNumber | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new PairEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);
        this.firstToken = new GenericToken({
            tokenID: decodedEvent.firstTokenID.toString(),
            amount: decodedEvent.firstTokenAmount,
        });
        this.secondToken = new GenericToken({
            tokenID: decodedEvent.secondTokenID.toString(),
            amount: decodedEvent.secondTokenAmount,
        });
        this.liquidityPoolToken = new GenericToken({
            tokenID: decodedEvent.lpTokenID.toString(),
            amount: decodedEvent.lpTokenAmount,
        });
    }

    getFirstToken(): GenericToken | undefined {
        return this.firstToken;
    }

    getSecondToken(): GenericToken | undefined {
        return this.secondToken;
    }

    getLiquidityPoolToken(): GenericToken | undefined {
        return this.liquidityPoolToken;
    }

    getLiquidityPoolSupply(): BigNumber | undefined {
        return this.liquidityPoolSupply;
    }

    getFirstTokenReserves(): BigNumber | undefined {
        return this.firstTokenReserves;
    }

    getSecondTokenReserves(): BigNumber | undefined {
        return this.secondTokenReserves;
    }

    toJSON(): AddLiquidityEventType {
        return {
            ...super.toJSON(),
            firstToken: this.firstToken?.toJSON(),
            secondToken: this.secondToken?.toJSON(),
            liquidityPoolToken: this.liquidityPoolToken?.toJSON(),
            liquidityPoolSupply: this.liquidityPoolSupply?.toFixed(),
            firstTokenReserves: this.firstTokenReserves?.toFixed(),
            secondTokenReserves: this.secondTokenReserves?.toFixed(),
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(AddLiquidityEvent.name);
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
            new FieldDefinition('firstTokenAmount', '', new BigUIntType()),
            new FieldDefinition('secondTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('secondTokenAmount', '', new BigUIntType()),
            new FieldDefinition('lpTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('lpTokenAmount', '', new BigUIntType()),
            new FieldDefinition('liquidityPoolSupply', '', new BigUIntType()),
            new FieldDefinition('firstTokenReserves', '', new BigUIntType()),
            new FieldDefinition('secondTokenReserves', '', new BigUIntType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
