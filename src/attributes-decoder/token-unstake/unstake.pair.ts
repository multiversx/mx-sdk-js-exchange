import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { EsdtTokenPayment } from '../esdt-token-payment';
import { UnstakePairType } from './unstake.pair.type';

export class UnstakePair {
    readonly unlockEpoch: number;
    readonly lockedTokens: EsdtTokenPayment;
    readonly unlockedTokens: EsdtTokenPayment;

    constructor(init: UnstakePairType) {
        this.unlockEpoch = init.unlockEpoch;
        this.lockedTokens = new EsdtTokenPayment(init.lockedTokens);
        this.unlockedTokens = new EsdtTokenPayment(init.unlockedTokens);
    }

    toJSON(): UnstakePairType {
        return {
            unlockEpoch: this.unlockEpoch,
            lockedTokens: this.lockedTokens.toJSON(),
            unlockedTokens: this.unlockedTokens.toJSON(),
        };
    }

    static fromDecodedAttributes(decodedAttributes: any): UnstakePair {
        return new UnstakePair({
            unlockEpoch: decodedAttributes.unlock_epoch.toNumber(),
            lockedTokens: EsdtTokenPayment.fromDecodedAttributes(
                decodedAttributes.locked_tokens,
            ),
            unlockedTokens: EsdtTokenPayment.fromDecodedAttributes(
                decodedAttributes.unlocked_tokens,
            ),
        });
    }

    static fromAttributes(attributes: string): UnstakePair {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = this.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return this.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('UnstakePair', [
            new FieldDefinition('unlock_epoch', '', new U64Type()),
            new FieldDefinition(
                'locked_tokens',
                '',
                EsdtTokenPayment.getStructure(),
            ),
            new FieldDefinition(
                'unlocked_tokens',
                '',
                EsdtTokenPayment.getStructure(),
            ),
        ]);
    }
}
