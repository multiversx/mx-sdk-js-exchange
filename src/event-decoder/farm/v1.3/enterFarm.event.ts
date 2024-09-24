import {
    AddressType,
    BigUIntType,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributesV1_3 } from '../../../attributes-decoder';
import { RawEventType } from '../../generic.types';
import { BaseFarmEvent } from '../enter.farm.base.event';
import { EnterFarmEventTypeV1_3 } from '../farm.types';

export class EnterFarmEventV1_3 extends BaseFarmEvent {
    readonly farmAttributes: FarmTokenAttributesV1_3;

    constructor(init: RawEventType) {
        super(init);
        this.farmAttributes = FarmTokenAttributesV1_3.fromDecodedAttributes(
            this.decodedEvent.farmAttributes,
        );
    }

    toJSON(): EnterFarmEventTypeV1_3 {
        return {
            ...super.toJSON(),
            farmAttributes: this.farmAttributes.toJSON(),
            createdWithMerge: this.createdWithMerge,
        };
    }

    getStructure(): StructType {
        return new StructType('EnterFarmEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition(
                'farmingTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('farmingTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('farmTokenNonce', '', new U64Type()),
            new FieldDefinition('farmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmSupply', '', new BigUIntType()),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'farmAttributes',
                '',
                FarmTokenAttributesV1_3.getStructure(),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
