import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { LockedTokenType } from './simple.lock.token.types';

export class LockedTokenAttributes {
    originalTokenID: string | undefined;
    originalTokenNonce: number | undefined;
    unlockEpoch: number | undefined;

    constructor(init?: Partial<LockedTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): LockedTokenType {
        return {
            originalTokenID: this.originalTokenID,
            originalTokenNonce: this.originalTokenNonce,
            unlockEpoch: this.unlockEpoch,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): LockedTokenAttributes {
        return new LockedTokenAttributes({
            originalTokenID: decodedAttributes.originalTokenID.toString(),
            originalTokenNonce: decodedAttributes.originalTokenNonce.toNumber(),
            unlockEpoch: decodedAttributes.unlockEpoch.toNumber(),
        });
    }

    static fromAttributes(attributes: string): LockedTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = LockedTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return LockedTokenAttributes.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('LockedTokenAttributes', [
            new FieldDefinition(
                'originalTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('originalTokenNonce', '', new U64Type()),
            new FieldDefinition('unlockEpoch', '', new U64Type()),
        ]);
    }
}
