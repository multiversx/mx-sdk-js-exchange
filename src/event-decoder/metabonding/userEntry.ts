import {
    StructType,
    FieldDefinition,
    U64Type,
    BigUIntType,
} from '@multiversx/sdk-core';
import { UserEntryType } from './metabonding.types';

export class UserEntry {
    tokenNonce: number | undefined;
    stakedAmount: string | undefined;
    unstakedAmount: string | undefined;
    unbondEpoch: number | undefined;

    constructor(init?: Partial<UserEntry>) {
        Object.assign(this, init);
    }

    toJSON(): UserEntryType {
        return {
            tokenNonce: this.tokenNonce,
            stakedAmount: this.stakedAmount,
            unstakedAmount: this.unstakedAmount,
            unbondEpoch: this.unbondEpoch,
        };
    }

    static getStructure(): StructType {
        return new StructType('UserEntry', [
            new FieldDefinition('tokenNonce', '', new U64Type()),
            new FieldDefinition('stakeAmount', '', new BigUIntType()),
            new FieldDefinition('unstakeAmount', '', new BigUIntType()),
            new FieldDefinition('unbondEpoch', '', new U64Type()),
        ]);
    }
}
