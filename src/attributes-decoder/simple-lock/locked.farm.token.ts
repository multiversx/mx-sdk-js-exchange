import {
    BinaryCodec,
    EnumType,
    EnumVariantDefinition,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { LockedFarmTokenType } from './simple.lock.token.types';

export class LockedFarmTokenAttributes {
    farmType: string | undefined;
    farmTokenID: string | undefined;
    farmTokenNonce: number | undefined;
    farmingTokenID: string | undefined;
    farmingTokenLockedNonce: number | undefined;

    constructor(init?: Partial<LockedFarmTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): LockedFarmTokenType {
        return {
            farmType: this.farmType,
            farmTokenID: this.farmTokenID,
            farmTokenNonce: this.farmTokenNonce,
            farmingTokenID: this.farmingTokenID,
            farmingTokenLockedNonce: this.farmingTokenLockedNonce,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): LockedFarmTokenAttributes {
        return new LockedFarmTokenAttributes({
            farmType: decodedAttributes.farmType.name,
            farmTokenID: decodedAttributes.farmTokenID.toString(),
            farmTokenNonce: decodedAttributes.farmTokenNonce.toNumber(),
            farmingTokenID: decodedAttributes.farmingTokenID.toString(),
            farmingTokenLockedNonce:
                decodedAttributes.farmingTokenLockedNonce.toNumber(),
        });
    }

    static fromAttributes(attributes: string): LockedFarmTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = LockedFarmTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return LockedFarmTokenAttributes.fromDecodedAttributes(
            decoded.valueOf(),
        );
    }

    static getStructure(): StructType {
        return new StructType('FarmProxyTokenAttributes', [
            new FieldDefinition(
                'farmType',
                '',
                new EnumType('FarmType', [
                    new EnumVariantDefinition('SimpleFarm', 0),
                    new EnumVariantDefinition('FarmWithLockedRewards', 1),
                    new EnumVariantDefinition('FarmWithBoostedRewards', 2),
                ]),
            ),
            new FieldDefinition('farmTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('farmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'farmingTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('farmingTokenLockedNonce', '', new U64Type()),
        ]);
    }
}
