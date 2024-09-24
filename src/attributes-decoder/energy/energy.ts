import {
    BigIntType,
    BigUIntType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { EnergyType } from './energy.type';

export class Energy {
    amount: BigNumber;
    lastUpdateEpoch: BigNumber;
    totalLockedTokens: BigNumber;

    constructor(init: {
        amount: BigNumber;
        lastUpdateEpoch: BigNumber;
        totalLockedTokens: BigNumber;
    }) {
        this.amount = init.amount;
        this.lastUpdateEpoch = init.lastUpdateEpoch;
        this.totalLockedTokens = init.totalLockedTokens;
    }

    toJSON(): EnergyType {
        return {
            amount: this.amount.toFixed(),
            lastUpdateEpoch: this.lastUpdateEpoch.toNumber(),
            totalLockedTokens: this.totalLockedTokens.toFixed(),
        };
    }

    static fromDecodedAttributes(decodedAttributes: any): Energy {
        return new Energy({
            amount: decodedAttributes.amount,
            lastUpdateEpoch: decodedAttributes.last_update_epoch,
            totalLockedTokens: decodedAttributes.total_locked_tokens,
        });
    }

    static fromAttributes(attributes: string): Energy {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = Energy.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return Energy.fromDecodedAttributes(decoded.valueOf());
    }
    static getStructure(): StructType {
        return new StructType('Energy', [
            new FieldDefinition('amount', '', new BigIntType()),
            new FieldDefinition('last_update_epoch', '', new U64Type()),
            new FieldDefinition('total_locked_tokens', '', new BigUIntType()),
        ]);
    }
}
