import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { FarmTokenAttributesType } from './farm.token.types';

export class FarmTokenAttributes {
    readonly rewardPerShare: string;
    readonly enteringEpoch: number;
    readonly compoundedReward: string;
    readonly currentFarmAmount: string;
    readonly identifier?: string;
    readonly attributes?: string;

    constructor(init: FarmTokenAttributesType) {
        this.rewardPerShare = init.rewardPerShare;
        this.enteringEpoch = init.enteringEpoch;
        this.compoundedReward = init.compoundedReward;
        this.currentFarmAmount = init.currentFarmAmount;
        this.attributes = init.attributes;
        this.identifier = init.identifier;
    }

    toJSON(): FarmTokenAttributesType {
        return {
            rewardPerShare: this.rewardPerShare,
            enteringEpoch: this.enteringEpoch,
            compoundedReward: this.compoundedReward,
            currentFarmAmount: this.currentFarmAmount,
        };
    }

    static fromDecodedAttributes(decodedAttributes: any): FarmTokenAttributes {
        return new FarmTokenAttributes({
            rewardPerShare: decodedAttributes.rewardPerShare.toString(),
            enteringEpoch: decodedAttributes.enteringEpoch.toNumber(),
            compoundedReward: decodedAttributes.compoundedReward.toFixed(),
            currentFarmAmount: decodedAttributes.currentFarmAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): FarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('FarmTokenAttributes', [
            new FieldDefinition('rewardPerShare', '', new BigUIntType()),
            new FieldDefinition('enteringEpoch', '', new U64Type()),
            new FieldDefinition('compoundedReward', '', new BigUIntType()),
            new FieldDefinition('currentFarmAmount', '', new BigUIntType()),
        ]);
    }
}
