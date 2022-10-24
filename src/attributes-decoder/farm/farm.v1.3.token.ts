import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@elrondnetwork/erdjs';
import { FarmTokenAttributesTypeV1_3 } from './farm.token.types';

export class FarmTokenAttributesV1_3 {
    readonly rewardPerShare: string;
    readonly originalEnteringEpoch: number;
    readonly enteringEpoch: number;
    readonly initialFarmingAmount: string;
    readonly compoundedReward: string;
    readonly currentFarmAmount: string;
    readonly identifier?: string;
    readonly attributes?: string;

    constructor(init: FarmTokenAttributesTypeV1_3) {
        this.rewardPerShare = init.rewardPerShare;
        this.originalEnteringEpoch = init.originalEnteringEpoch;
        this.enteringEpoch = init.enteringEpoch;
        this.initialFarmingAmount = init.initialFarmingAmount;
        this.compoundedReward = init.compoundedReward;
        this.currentFarmAmount = init.currentFarmAmount;
        this.identifier = init.identifier;
        this.attributes = init.attributes;
    }

    toJSON(): FarmTokenAttributesTypeV1_3 {
        return {
            rewardPerShare: this.rewardPerShare,
            originalEnteringEpoch: this.originalEnteringEpoch,
            enteringEpoch: this.enteringEpoch,
            initialFarmingAmount: this.initialFarmingAmount,
            compoundedReward: this.compoundedReward,
            currentFarmAmount: this.currentFarmAmount,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): FarmTokenAttributesV1_3 {
        return new FarmTokenAttributesV1_3({
            rewardPerShare: decodedAttributes.rewardPerShare.toString(),
            originalEnteringEpoch:
                decodedAttributes.originalEnteringEpoch.toNumber(),
            enteringEpoch: decodedAttributes.enteringEpoch.toNumber(),
            initialFarmingAmount:
                decodedAttributes.initialFarmingAmount.toFixed(),
            compoundedReward: decodedAttributes.compoundedReward.toFixed(),
            currentFarmAmount: decodedAttributes.currentFarmAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): FarmTokenAttributesV1_3 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return FarmTokenAttributesV1_3.fromDecodedAttributes(decoded.valueOf());
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
