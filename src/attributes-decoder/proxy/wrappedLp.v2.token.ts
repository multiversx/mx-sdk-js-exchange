import {
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
} from '@multiversx/sdk-core';
import { EsdtTokenPayment } from '../esdt-token-payment/esdt.token.payment';
import { WrappedLpTokenAttributesTypeV2 } from './proxy.token.types';

export class WrappedLpTokenAttributesV2 {
    lpTokenID: string;
    lpTokenAmount: string;
    lockedTokens: EsdtTokenPayment;

    constructor(init: WrappedLpTokenAttributesTypeV2) {
        this.lpTokenID = init.lpTokenID;
        this.lpTokenAmount = init.lpTokenAmount;
        this.lockedTokens = new EsdtTokenPayment(init.lockedTokens);
    }

    toJSON(): WrappedLpTokenAttributesTypeV2 {
        return {
            lpTokenID: this.lpTokenID,
            lpTokenAmount: this.lpTokenAmount,
            lockedTokens: this.lockedTokens.toJSON(),
        };
    }

    static fromAttributes(attributes: string): WrappedLpTokenAttributesV2 {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();
        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedLpTokenAttributesV2 {
        return new WrappedLpTokenAttributesV2({
            lpTokenID: decodedAttributes.lp_token_id.toString(),
            lpTokenAmount: decodedAttributes.lp_token_amount.toFixed(),
            lockedTokens: EsdtTokenPayment.fromDecodedAttributes(
                decodedAttributes.locked_tokens,
            ),
        });
    }

    static getStructure(): StructType {
        return new StructType('WrappedLpTokenAttributes', [
            new FieldDefinition('lp_token_id', '', new TokenIdentifierType()),
            new FieldDefinition('lp_token_amount', '', new BigUIntType()),
            new FieldDefinition(
                'locked_tokens',
                '',
                EsdtTokenPayment.getStructure(),
            ),
        ]);
    }
}
