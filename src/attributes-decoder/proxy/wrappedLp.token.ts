import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedLpAttributesType } from './proxy.token.types';

export class WrappedLpTokenAttributes {
    identifier: string | undefined;
    attributes: string | undefined;
    lpTokenID: string | undefined;
    lpTokenTotalAmount: string | undefined;
    lockedAssetsInvested: string | undefined;
    lockedAssetsNonce: number | undefined;

    constructor(init?: Partial<WrappedLpTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): WrappedLpAttributesType {
        return {
            lpTokenID: this.lpTokenID,
            lpTokenTotalAmount: this.lpTokenTotalAmount,
            lockedAssetsInvested: this.lockedAssetsInvested,
            lockedAssetsNonce: this.lockedAssetsNonce,
        };
    }

    static fromAttributes(attributes: string): WrappedLpTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = WrappedLpTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return WrappedLpTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedLpTokenAttributes {
        return new WrappedLpTokenAttributes({
            lpTokenID: decodedAttributes.lpTokenID.toString(),
            lpTokenTotalAmount: decodedAttributes.lpTokenTotalAmount.toFixed(),
            lockedAssetsInvested:
                decodedAttributes.lockedAssetsInvested.toFixed(),
            lockedAssetsNonce: decodedAttributes.lockedAssetsNonce.toNumber(),
        });
    }

    static getStructure(): StructType {
        return new StructType('WrappedLpTokenAttributes', [
            new FieldDefinition('lpTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('lpTokenTotalAmount', '', new BigUIntType()),
            new FieldDefinition('lockedAssetsInvested', '', new BigUIntType()),
            new FieldDefinition('lockedAssetsNonce', '', new U64Type()),
        ]);
    }
}
