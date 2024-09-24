import {
    AddressType,
    BigUIntType,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributesV1_2 } from '../../../attributes-decoder/farm/farm.v1.2.token';
import { RawEventType } from '../../generic.types';
import { BaseRewardsEvent } from '../rewards.base.event';
import { RewardsEventTypeV1_2 } from '../rewards.types';

export class RewardsEventV1_2 extends BaseRewardsEvent {
    readonly oldFarmAttributes: FarmTokenAttributesV1_2;
    readonly newFarmAttributes: FarmTokenAttributesV1_2;

    constructor(init: RawEventType) {
        super(init);

        this.oldFarmAttributes = FarmTokenAttributesV1_2.fromDecodedAttributes(
            this.decodedEvent.oldFarmAttributes,
        );
        this.newFarmAttributes = FarmTokenAttributesV1_2.fromDecodedAttributes(
            this.decodedEvent.newFarmAttributes,
        );
    }

    toJSON(): RewardsEventTypeV1_2 {
        return {
            ...super.toJSON(),
            oldFarmAttributes: this.oldFarmAttributes.toJSON(),
            newFarmAttributes: this.newFarmAttributes.toJSON(),
        };
    }

    getStructure(): StructType {
        return new StructType('ClaimRewardsEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition(
                'oldFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('oldFarmTokenNonce', '', new U64Type()),
            new FieldDefinition('oldFarmTokenAmount', '', new BigUIntType()),
            new FieldDefinition(
                'newFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('newFarmTokenNonce', '', new U64Type()),
            new FieldDefinition('newFarmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmSupply', '', new BigUIntType()),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenNonce', '', new U64Type()),
            new FieldDefinition('rewardTokenAmount', '', new BigUIntType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'oldFarmAttributes',
                '',
                FarmTokenAttributesV1_2.getStructure(),
            ),
            new FieldDefinition(
                'newFarmAttributes',
                '',
                FarmTokenAttributesV1_2.getStructure(),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
