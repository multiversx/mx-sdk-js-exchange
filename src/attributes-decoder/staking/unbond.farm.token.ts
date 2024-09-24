import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import {
    StakingFarmTokenType,
    UnbondFarmTokenAttributesType,
} from './staking.farm.token.types';

export class UnbondFarmTokenAttributes {
    type = StakingFarmTokenType.UNBOND_FARM_TOKEN;
    unlockEpoch: number | undefined;

    constructor(init?: Partial<UnbondFarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): UnbondFarmTokenAttributesType {
        return {
            type: this.type,
            unlockEpoch: this.unlockEpoch,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): UnbondFarmTokenAttributes {
        return new UnbondFarmTokenAttributes({
            unlockEpoch: decodedAttributes.unlockEpoch.toNumber(),
        });
    }

    static fromAttributes(attributes: string): UnbondFarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = UnbondFarmTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return UnbondFarmTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure(): StructType {
        return new StructType('UnboundFarmTokenAttributes', [
            new FieldDefinition('unlockEpoch', '', new U64Type()),
        ]);
    }
}
