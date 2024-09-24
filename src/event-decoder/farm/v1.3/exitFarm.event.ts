import {
    AddressType,
    BigUIntType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributesV1_3 } from '../../../attributes-decoder/farm/farm.v1.3.token';
import { RawEventType } from '../../generic.types';
import { EnterFarmEventV1_3 } from './enterFarm.event';

export class ExitFarmEventV1_3 extends EnterFarmEventV1_3 {
    constructor(init: RawEventType) {
        super(init);
        this.rewardToken.nonce = this.decodedEvent.rewardTokenNonce;
        this.rewardToken.amount = this.decodedEvent.rewardTokenAmount;
    }

    getStructure(): StructType {
        return new StructType('ExitFarmEvent', [
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
            new FieldDefinition('rewardTokenNonce', '', new U64Type()),
            new FieldDefinition('rewardTokenAmount', '', new BigUIntType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'farmAttributes',
                '',
                FarmTokenAttributesV1_3.getStructure(),
            ),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
