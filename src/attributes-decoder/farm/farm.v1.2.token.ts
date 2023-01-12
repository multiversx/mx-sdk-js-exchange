import {
    BigUIntType,
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    StructType,
    U64Type,
    U8Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributesV1_3 } from './farm.v1.3.token';
import { FarmTokenAttributesTypeV1_2 } from './farm.token.types';

export class FarmTokenAttributesV1_2 extends FarmTokenAttributesV1_3 {
    readonly aprMultiplier: number;
    readonly lockedRewards: boolean;

    constructor(init: FarmTokenAttributesTypeV1_2) {
        super(init);
        this.aprMultiplier = init.aprMultiplier;
        this.lockedRewards = init.lockedRewards;
    }

    toJSON(): FarmTokenAttributesTypeV1_2 {
        return {
            ...super.toJSON(),
            aprMultiplier: this.aprMultiplier,
            lockedRewards: this.lockedRewards,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): FarmTokenAttributesV1_2 {
        return new FarmTokenAttributesV1_2({
            ...super.fromDecodedAttributes(decodedAttributes).toJSON(),
            aprMultiplier: decodedAttributes.aprMultiplier.toNumber(),
            lockedRewards: decodedAttributes.withLockedRewards,
        });
    }

    static fromAttributes(attributes: string): FarmTokenAttributesV1_2 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return FarmTokenAttributesV1_2.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('FarmTokenAttributes', [
            new FieldDefinition('rewardPerShare', '', new BigUIntType()),
            new FieldDefinition('originalEnteringEpoch', '', new U64Type()),
            new FieldDefinition('enteringEpoch', '', new U64Type()),
            new FieldDefinition('aprMultiplier', '', new U8Type()),
            new FieldDefinition('withLockedRewards', '', new BooleanType()),
            new FieldDefinition('initialFarmingAmount', '', new BigUIntType()),
            new FieldDefinition('compoundedReward', '', new BigUIntType()),
            new FieldDefinition('currentFarmAmount', '', new BigUIntType()),
        ]);
    }
}
