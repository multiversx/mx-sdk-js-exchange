import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
} from '@multiversx/sdk-core';
import {
    StakingFarmTokenAttributesType,
    StakingFarmTokenType,
} from './staking.farm.token.types';

export class StakingFarmTokenAttributes {
    type = StakingFarmTokenType.STAKING_FARM_TOKEN;
    rewardPerShare: string | undefined;
    compoundedReward: string | undefined;
    currentFarmAmount: string | undefined;

    constructor(init?: Partial<StakingFarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): StakingFarmTokenAttributesType {
        return {
            type: this.type,
            rewardPerShare: this.rewardPerShare,
            compoundedReward: this.compoundedReward,
            currentFarmAmount: this.currentFarmAmount,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): StakingFarmTokenAttributes {
        return new StakingFarmTokenAttributes({
            rewardPerShare: decodedAttributes.rewardPerShare.toFixed(),
            compoundedReward: decodedAttributes.compoundedReward.toFixed(),
            currentFarmAmount: decodedAttributes.currentFarmAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): StakingFarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = StakingFarmTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return StakingFarmTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure(): StructType {
        return new StructType('StakingFarmTokenAttributes', [
            new FieldDefinition('rewardPerShare', '', new BigUIntType()),
            new FieldDefinition('compoundedReward', '', new BigUIntType()),
            new FieldDefinition('currentFarmAmount', '', new BigUIntType()),
        ]);
    }
}
