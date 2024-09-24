import {
    BigUIntType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { MAX_PERCENTAGE_PRICE_DISCOVERY } from '../../constants';
import { GenericToken } from '../../generic.token';
import { RawEventType } from '../generic.types';
import { PriceDiscoveryEvent } from './price.discovery.event';
import { PriceDiscoveryPhase } from './price.discovery.phase';
import { DepositEventType } from './price.discovery.types';

export class DepositEvent extends PriceDiscoveryEvent {
    token: GenericToken | undefined;
    redeemToken: GenericToken | undefined;
    launchedTokenAmount: BigNumber | undefined;
    acceptedTokenAmount: BigNumber | undefined;
    launchedTokenPrice: BigNumber | undefined;
    currentPhase: PriceDiscoveryPhase | undefined;

    constructor(init: RawEventType) {
        super(init);

        const decodedEvent = this.decodeEvent();

        Object.assign(this, decodedEvent);

        this.token = new GenericToken({
            tokenID: decodedEvent.tokenInID.toString(),
            amount: decodedEvent.tokenInAmount,
        });
        this.redeemToken = new GenericToken({
            tokenID: decodedEvent.redeemTokenID.toString(),
            nonce: decodedEvent.redeemTokenNonce,
            amount: decodedEvent.redeemTokenAmount,
        });

        const penalty =
            decodedEvent.currentPhase.fields?.penaltyPercentage?.toFixed();

        const penaltyPercent = penalty
            ? new BigNumber(penalty).dividedBy(MAX_PERCENTAGE_PRICE_DISCOVERY)
            : new BigNumber(0);
        this.currentPhase = new PriceDiscoveryPhase({
            name: decodedEvent.currentPhase.name,
            penaltyPercent: penaltyPercent.toNumber(),
        });
        this.launchedTokenPrice = decodedEvent.currentPrice;
    }

    toJSON(): DepositEventType {
        return {
            ...super.toJSON(),
            tokenIn: this.token?.toJSON(),
            redeemToken: this.redeemToken?.toJSON(),
            launchedTokenAmount: this.launchedTokenAmount?.toFixed(),
            acceptedTokenAmount: this.acceptedTokenAmount?.toFixed(),
            launchedTokenPrice: this.launchedTokenPrice?.toFixed(),
            currentPhase: this.currentPhase?.toJSON(),
        };
    }

    protected getStructure(): StructType {
        return new StructType('DepositEvent', [
            new FieldDefinition('tokenInID', '', new TokenIdentifierType()),
            new FieldDefinition('tokenInAmount', '', new BigUIntType()),
            new FieldDefinition('redeemTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('redeemTokenNonce', '', new U64Type()),
            new FieldDefinition('redeemTokenAmount', '', new BigUIntType()),
            new FieldDefinition('launchedTokenAmount', '', new BigUIntType()),
            new FieldDefinition('acceptedTokenAmount', '', new BigUIntType()),
            new FieldDefinition('currentPrice', '', new BigUIntType()),
            new FieldDefinition(
                'currentPhase',
                '',
                PriceDiscoveryPhase.getEnum(),
            ),
        ]);
    }
}
