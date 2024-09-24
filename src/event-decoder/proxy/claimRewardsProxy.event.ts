import {
    AddressType,
    BigUIntType,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedFarmTokenAttributes } from '../../attributes-decoder/proxy/wrappedFarm.token';
import { GenericToken } from '../../generic.token';
import { RewardsProxyEvent } from './rewardsProxy.event';
import { ClaimRewardsProxyEventType } from './farm.proxy.types';
import { RawEventType } from '../generic.types';

export class ClaimRewardsProxyEvent extends RewardsProxyEvent {
    private rewardToken: GenericToken | undefined;

    constructor(init: RawEventType) {
        super(init);
        const decodedEvent = this.decodeEvent();
        this.rewardToken = new GenericToken({
            tokenID: decodedEvent.rewardTokenID.toString(),
            nonce: decodedEvent.rewardTokenNonce,
            amount: decodedEvent.rewardTokenAmount,
        });
    }

    toJSON(): ClaimRewardsProxyEventType {
        return {
            ...super.toJSON(),
            rewardToken: this.rewardToken?.toJSON(),
        };
    }

    getStructure(): StructType {
        return new StructType('ClaimRewardsProxyEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('farmAddress', '', new AddressType()),
            new FieldDefinition(
                'oldWrappedFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('oldWrappedFarmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'oldWrappedFarmTokenAmount',
                '',
                new BigUIntType(),
            ),
            new FieldDefinition(
                'newWrappedFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('newWrappedFarmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'newWrappedFarmTokenAmount',
                '',
                new BigUIntType(),
            ),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenNonce', '', new U64Type()),
            new FieldDefinition('rewardTokenAmount', '', new BigUIntType()),
            new FieldDefinition(
                'oldWrappedFarmAttributes',
                '',
                WrappedFarmTokenAttributes.getStructure(),
            ),
            new FieldDefinition(
                'newWrappedFarmAttributes',
                '',
                WrappedFarmTokenAttributes.getStructure(),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
