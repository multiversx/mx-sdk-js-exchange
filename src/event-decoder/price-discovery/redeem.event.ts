import {
    BigUIntType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { GenericToken } from '../../generic.token';
import { RawEventType } from '../generic.types';
import { PriceDiscoveryEvent } from './price.discovery.event';
import { RedeemEventType } from './price.discovery.types';

export class RedeemEvent extends PriceDiscoveryEvent {
    redeemToken: GenericToken | undefined;
    lpToken: GenericToken | undefined;
    remainingLpTokens: BigNumber | undefined;
    totalLpTokensReceived: BigNumber | undefined;
    rewardsToken: GenericToken | undefined;

    constructor(init: RawEventType) {
        super(init);
        const decodedEvent = this.decodeEvent();

        Object.assign(this, decodedEvent);

        this.redeemToken = new GenericToken({
            tokenID: decodedEvent.redeemTokenID.toString(),
            nonce: decodedEvent.redeemTokenNonce.toNumber(),
            amount: decodedEvent.redeemTokenAmount,
        });

        this.lpToken = new GenericToken({
            tokenID: decodedEvent.lpTokenID.toString(),
            nonce: decodedEvent.lpTokenAmount,
        });

        this.rewardsToken = new GenericToken({
            tokenID: decodedEvent.rewardsTokenID.toString(),
            amount: decodedEvent.rewardsTokenAmount,
        });
    }

    toJSON(): RedeemEventType {
        return {
            ...super.toJSON(),
            redeemToken: this.redeemToken?.toJSON(),
            lpToken: this.lpToken?.toJSON(),
            remainingLpTokens: this.remainingLpTokens?.toFixed(),
            totalLpTokensReceived: this.totalLpTokensReceived?.toFixed(),
            rewardsToken: this.rewardsToken?.toJSON(),
        };
    }

    protected getStructure(): StructType {
        return new StructType('RedeemEvent', [
            new FieldDefinition('redeemTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('redeemTokenNonce', '', new U64Type()),
            new FieldDefinition('redeemTokenAmount', '', new BigUIntType()),
            new FieldDefinition('lpTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('lpTokenAmount', '', new BigUIntType()),
            new FieldDefinition('lpTokensRemaining', '', new BigUIntType()),
            new FieldDefinition('totalLpTokensReceived', '', new BigUIntType()),
            new FieldDefinition(
                'rewardsTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('rewardsTokenAmount', '', new BigUIntType()),
        ]);
    }
}
