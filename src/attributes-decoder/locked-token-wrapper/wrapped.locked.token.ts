import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedLockedTokenType } from './wrapped.lock.token.types';

export class WrappedLockedTokenAttributes {
    lockedTokenNonce: number;

    constructor(init: { lockedTokenNonce: number }) {
        this.lockedTokenNonce = init.lockedTokenNonce;
    }

    toJSON(): WrappedLockedTokenType {
        return {
            lockedTokenNonce: this.lockedTokenNonce,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedLockedTokenAttributes {
        return new WrappedLockedTokenAttributes({
            lockedTokenNonce: decodedAttributes.lockedTokenNonce.toNumber(),
        });
    }

    static fromAttributes(attributes: string): WrappedLockedTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = WrappedLockedTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return WrappedLockedTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure(): StructType {
        return new StructType('LockedTokenAttributes', [
            new FieldDefinition('lockedTokenNonce', '', new U64Type()),
        ]);
    }
}
