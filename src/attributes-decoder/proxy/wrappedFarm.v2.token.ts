import { BinaryCodec, FieldDefinition, StructType } from '@multiversx/sdk-core';
import { EsdtTokenPayment } from '../esdt-token-payment/esdt.token.payment';
import { WrappedFarmTokenAttributesTypeV2 } from './proxy.token.types';

export class WrappedFarmTokenAttributesV2 {
    farmToken: EsdtTokenPayment;
    proxyFarmingToken: EsdtTokenPayment;

    constructor(init: WrappedFarmTokenAttributesTypeV2) {
        this.farmToken = new EsdtTokenPayment(init.farmToken);
        this.proxyFarmingToken = new EsdtTokenPayment(init.proxyFarmingToken);
    }

    toJSON(): WrappedFarmTokenAttributesTypeV2 {
        return {
            farmToken: this.farmToken.toJSON(),
            proxyFarmingToken: this.proxyFarmingToken.toJSON(),
        };
    }

    static fromAttributes(attributes: string): WrappedFarmTokenAttributesV2 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedFarmTokenAttributesV2 {
        return new WrappedFarmTokenAttributesV2({
            farmToken: EsdtTokenPayment.fromDecodedAttributes(
                decodedAttributes.farm_token,
            ),
            proxyFarmingToken: EsdtTokenPayment.fromDecodedAttributes(
                decodedAttributes.proxy_farming_token,
            ),
        });
    }

    static getStructure(): StructType {
        return new StructType('WrappedLpTokenAttributes', [
            new FieldDefinition(
                'farm_token',
                '',
                EsdtTokenPayment.getStructure(),
            ),
            new FieldDefinition(
                'proxy_farming_token',
                '',
                EsdtTokenPayment.getStructure(),
            ),
        ]);
    }
}
