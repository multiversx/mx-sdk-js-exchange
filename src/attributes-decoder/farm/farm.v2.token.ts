import {
    AddressType,
    BinaryCodec,
    FieldDefinition,
    StructType,
} from '@multiversx/sdk-core';
import { FarmTokenAttributes } from './farm.token';
import { FarmTokenAttributesTypeV2 } from './farm.token.types';

export class FarmTokenAttributesV2 extends FarmTokenAttributes {
    readonly originalOwner: string;

    constructor(init: FarmTokenAttributesTypeV2) {
        super(init);
        this.originalOwner = init.originalOwner;
    }

    toJSON(): FarmTokenAttributesTypeV2 {
        return { ...super.toJSON(), originalOwner: this.originalOwner };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): FarmTokenAttributesV2 {
        return new FarmTokenAttributesV2({
            ...super.fromDecodedAttributes(decodedAttributes).toJSON(),
            originalOwner: decodedAttributes.originalOwner.bech32(),
        });
    }

    static fromAttributes(attributes: string): FarmTokenAttributesV2 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('FarmTokenAttributes', [
            ...super.getStructure().getFieldsDefinitions(),
            new FieldDefinition('originalOwner', '', new AddressType()),
        ]);
    }
}
