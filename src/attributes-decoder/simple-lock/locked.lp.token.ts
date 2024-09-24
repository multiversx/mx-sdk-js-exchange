import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { LockedLpTokenType } from './simple.lock.token.types';

export class LockedLpTokenAttributes {
    lpTokenID: string | undefined;
    firstTokenID: string | undefined;
    firstTokenLockedNonce: number | undefined;
    secondTokenID: string | undefined;
    secondTokenLockedNonce: number | undefined;

    constructor(init?: Partial<LockedLpTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): LockedLpTokenType {
        return {
            lpTokenID: this.lpTokenID,
            firstTokenID: this.firstTokenID,
            firstTokenLockedNonce: this.firstTokenLockedNonce,
            secondTokenID: this.secondTokenID,
            secondTokenLockedNonce: this.secondTokenLockedNonce,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): LockedLpTokenAttributes {
        return new LockedLpTokenAttributes({
            lpTokenID: decodedAttributes.lpTokenID.toString(),
            firstTokenID: decodedAttributes.firstTokenID.toString(),
            firstTokenLockedNonce:
                decodedAttributes.firstTokenLockedNonce.toNumber(),
            secondTokenID: decodedAttributes.secondTokenID.toString(),
            secondTokenLockedNonce:
                decodedAttributes.secondTokenLockedNonce.toNumber(),
        });
    }

    static fromAttributes(attributes: string): LockedLpTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = LockedLpTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return LockedLpTokenAttributes.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('LpProxyTokenAttributes', [
            new FieldDefinition('lpTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('firstTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('firstTokenLockedNonce', '', new U64Type()),
            new FieldDefinition('secondTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('secondTokenLockedNonce', '', new U64Type()),
        ]);
    }
}
