import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributes } from './farm.token';
import { FarmTokenAttributesTypeV1_3 } from './farm.token.types';

export class FarmTokenAttributesV1_3 extends FarmTokenAttributes {
    readonly originalEnteringEpoch: number;
    readonly initialFarmingAmount: string;

    constructor(init: FarmTokenAttributesTypeV1_3) {
        super(init);
        this.originalEnteringEpoch = init.originalEnteringEpoch;
        this.initialFarmingAmount = init.initialFarmingAmount;
    }

    toJSON(): FarmTokenAttributesTypeV1_3 {
        return {
            ...super.toJSON(),
            originalEnteringEpoch: this.originalEnteringEpoch,
            initialFarmingAmount: this.initialFarmingAmount,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): FarmTokenAttributesV1_3 {
        return new FarmTokenAttributesV1_3({
            ...super.fromDecodedAttributes(decodedAttributes).toJSON(),
            originalEnteringEpoch:
                decodedAttributes.originalEnteringEpoch.toNumber(),
            initialFarmingAmount:
                decodedAttributes.initialFarmingAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): FarmTokenAttributesV1_3 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('FarmTokenAttributes', [
            new FieldDefinition('rewardPerShare', '', new BigUIntType()),
            new FieldDefinition('originalEnteringEpoch', '', new U64Type()),
            new FieldDefinition('enteringEpoch', '', new U64Type()),
            new FieldDefinition('initialFarmingAmount', '', new BigUIntType()),
            new FieldDefinition('compoundedReward', '', new BigUIntType()),
            new FieldDefinition('currentFarmAmount', '', new BigUIntType()),
        ]);
    }
}
