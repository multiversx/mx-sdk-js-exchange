import {
    AddressType,
    BigUIntType,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { FarmTokenAttributesV1_2 } from '../../../attributes-decoder/farm/farm.v1.2.token';
import { RawEventType } from '../../generic.types';
import { BaseFarmEvent } from '../enter.farm.base.event';
import { EnterFarmEventTypeV1_2 } from '../farm.types';

export class EnterFarmEventV1_2 extends BaseFarmEvent {
    readonly farmingReserve: BigNumber;
    readonly farmAttributes: FarmTokenAttributesV1_2;

    constructor(init: RawEventType) {
        super(init);
        this.farmingReserve = this.decodedEvent.farmingReserve;
        this.farmAttributes = FarmTokenAttributesV1_2.fromDecodedAttributes(
            this.decodedEvent.farmAttributes,
        );
    }

    toJSON(): EnterFarmEventTypeV1_2 {
        return {
            ...super.toJSON(),
            farmingReserve: this.farmingReserve.toFixed(),
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
            new FieldDefinition('farmingReserve', '', new BigUIntType()),
            new FieldDefinition('farmTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('farmTokenNonce', '', new U64Type()),
            new FieldDefinition('farmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmSupply', '', new BigUIntType()),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'farmAttributes',
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
