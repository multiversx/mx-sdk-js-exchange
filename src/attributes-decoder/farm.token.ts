import {
    BigUIntType,
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    StructType,
    U64Type,
    U8Type,
} from '@elrondnetwork/erdjs';
import { FarmVersion } from '../event-decoder/generic.types';
import { FarmTokenAttributesType } from './attributes.types';

export class FarmTokenAttributes {
    identifier: string | undefined;
    attributes: string | undefined;
    rewardPerShare: string | undefined;
    originalEnteringEpoch: number | undefined;
    enteringEpoch: number | undefined;
    aprMultiplier: number | undefined;
    lockedRewards: boolean | undefined;
    initialFarmingAmount: string | undefined;
    compoundedReward: string | undefined;
    currentFarmAmount: string | undefined;

    constructor(init?: Partial<FarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): FarmTokenAttributesType {
        return {
            rewardPerShare: this.rewardPerShare,
            originalEnteringEpoch: this.originalEnteringEpoch,
            enteringEpoch: this.enteringEpoch,
            aprMultiplier: this.aprMultiplier,
            lockedRewards: this.lockedRewards,
            initialFarmingAmount: this.initialFarmingAmount,
            compoundedReward: this.compoundedReward,
            currentFarmAmount: this.currentFarmAmount,
        };
    }

    static fromDecodedAttributes(
        version: FarmVersion,
        decodedAttributes: any,
    ): FarmTokenAttributes {
        return new FarmTokenAttributes({
            rewardPerShare: decodedAttributes.rewardPerShare.toString(),
            originalEnteringEpoch:
                decodedAttributes.originalEnteringEpoch.toNumber(),
            enteringEpoch: decodedAttributes.enteringEpoch.toNumber(),
            aprMultiplier:
                version === FarmVersion.V1_2
                    ? decodedAttributes.aprMultiplier.toNumber()
                    : null,
            lockedRewards:
                version === FarmVersion.V1_2
                    ? decodedAttributes.withLockedRewards
                    : null,
            initialFarmingAmount:
                decodedAttributes.initialFarmingAmount.toFixed(),
            compoundedReward: decodedAttributes.compoundedReward.toFixed(),
            currentFarmAmount: decodedAttributes.currentFarmAmount.toFixed(),
        });
    }

    static fromAttributes(
        version: FarmVersion,
        attributes: string,
    ): FarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = FarmTokenAttributes.getStructure(version);
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return FarmTokenAttributes.fromDecodedAttributes(
            version,
            decoded.valueOf(),
        );
    }

    static getStructure(version: FarmVersion): StructType {
        const structType = new StructType('FarmTokenAttributes', [
            new FieldDefinition('rewardPerShare', '', new BigUIntType()),
            new FieldDefinition('originalEnteringEpoch', '', new U64Type()),
            new FieldDefinition('enteringEpoch', '', new U64Type()),
            new FieldDefinition('initialFarmingAmount', '', new BigUIntType()),
            new FieldDefinition('compoundedReward', '', new BigUIntType()),
            new FieldDefinition('currentFarmAmount', '', new BigUIntType()),
        ]);
        const structFields = structType.getFieldsDefinitions();
        if (version === FarmVersion.V1_2) {
            structFields.splice(
                3,
                0,
                new FieldDefinition('aprMultiplier', '', new U8Type()),
            );
            structFields.splice(
                4,
                0,
                new FieldDefinition('withLockedRewards', '', new BooleanType()),
            );
        }

        return new StructType('FarmTokenAttributes', structFields);
    }
}
