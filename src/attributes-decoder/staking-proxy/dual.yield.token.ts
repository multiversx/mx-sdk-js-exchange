import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { DualYieldTokenType } from './dual.yield.token.types';

export class DualYieldTokenAttributes {
    lpFarmTokenNonce: number | undefined;
    lpFarmTokenAmount: string | undefined;
    stakingFarmTokenNonce: number | undefined;
    stakingFarmTokenAmount: string | undefined;

    constructor(init?: Partial<DualYieldTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): DualYieldTokenType {
        return {
            lpFarmTokenNonce: this.lpFarmTokenNonce,
            lpFarmTokenAmount: this.lpFarmTokenAmount,
            stakingFarmTokenNonce: this.stakingFarmTokenNonce,
            stakingFarmTokenAmount: this.stakingFarmTokenAmount,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): DualYieldTokenAttributes {
        return new DualYieldTokenAttributes({
            lpFarmTokenNonce: decodedAttributes.lpFarmTokenNonce.toNumber(),
            lpFarmTokenAmount: decodedAttributes.lpFarmTokenAmount.toFixed(),
            stakingFarmTokenNonce:
                decodedAttributes.stakingFarmTokenNonce.toNumber(),
            stakingFarmTokenAmount:
                decodedAttributes.stakingFarmTokenAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): DualYieldTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = DualYieldTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return DualYieldTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure(): StructType {
        return new StructType('DualYieldTokenAttributes', [
            new FieldDefinition('lpFarmTokenNonce', '', new U64Type()),
            new FieldDefinition('lpFarmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('stakingFarmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'stakingFarmTokenAmount',
                '',
                new BigUIntType(),
            ),
        ]);
    }
}
