import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedFarmAttributesType } from './proxy.token.types';

export class WrappedFarmTokenAttributes {
    identifier: string | undefined;
    attributes: string | undefined;
    farmTokenID: string | undefined;
    farmTokenNonce: number | undefined;
    farmTokenAmount: string | undefined;
    farmTokenIdentifier: string | undefined;
    farmingTokenID: string | undefined;
    farmingTokenNonce: number | undefined;
    farmingTokenAmount: string | undefined;

    constructor(init?: Partial<WrappedFarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): WrappedFarmAttributesType {
        return {
            farmTokenID: this.farmTokenID,
            farmTokenNonce: this.farmTokenNonce,
            farmTokenAmount: this.farmTokenAmount,
            farmingTokenID: this.farmingTokenID,
            farmingTokenNonce: this.farmingTokenNonce,
            farmingTokenAmount: this.farmingTokenAmount,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedFarmTokenAttributes {
        return new WrappedFarmTokenAttributes({
            farmTokenID: decodedAttributes.farmTokenID.toString(),
            farmTokenNonce: decodedAttributes.farmTokenNonce.toNumber(),
            farmTokenAmount: decodedAttributes.farmTokenAmount.toFixed(),
            farmingTokenID: decodedAttributes.farmingTokenID.toString(),
            farmingTokenNonce: decodedAttributes.farmingTokenNonce.toNumber(),
            farmingTokenAmount: decodedAttributes.farmingTokenAmount.toFixed(),
        });
    }

    static fromAttributes(attributes: string): WrappedFarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = WrappedFarmTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return WrappedFarmTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure() {
        return new StructType('WrappedFarmTokenAttributes', [
            new FieldDefinition('farmTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('farmTokenNonce', '', new U64Type()),
            new FieldDefinition('farmTokenAmount', '', new BigUIntType()),
            new FieldDefinition(
                'farmingTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('farmingTokenNonce', '', new U64Type()),
            new FieldDefinition('farmingTokenAmount', '', new BigUIntType()),
        ]);
    }
}
