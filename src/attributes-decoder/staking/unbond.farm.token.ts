import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@elrondnetwork/erdjs/out';
import {
    StakingFarmTokenType,
    UnbondFarmTokenAttributesType,
} from './staking.farm.token.types';

export class UnbondFarmTokenAttributes {
    type = StakingFarmTokenType.UNBOND_FARM_TOKEN;
    remainingEpochs: number | undefined;

    constructor(init?: Partial<UnbondFarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): UnbondFarmTokenAttributesType {
        return {
            type: this.type,
            remainingEpochs: this.remainingEpochs,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): UnbondFarmTokenAttributes {
        return new UnbondFarmTokenAttributes({
            remainingEpochs: decodedAttributes.remainingEpochs.toNumber(),
        });
    }

    static fromAttributes(attributes: string): UnbondFarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = UnbondFarmTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return UnbondFarmTokenAttributes.fromDecodedAttributes(decoded);
    }

    static getStructure(): StructType {
        return new StructType('UnboundFarmTokenAttributes', [
            new FieldDefinition('unlockEpoch', '', new U64Type()),
        ]);
    }
}
