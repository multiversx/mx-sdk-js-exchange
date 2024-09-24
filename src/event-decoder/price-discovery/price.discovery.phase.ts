import {
    EnumType,
    EnumVariantDefinition,
    FieldDefinition,
    BigUIntType,
} from '@multiversx/sdk-core';
import { PhaseType } from './price.discovery.types';

export class PriceDiscoveryPhase {
    name: string | undefined;
    penaltyPercent: number | undefined;

    constructor(init?: Partial<PriceDiscoveryPhase>) {
        Object.assign(this, init);
    }

    toJSON(): PhaseType {
        return {
            name: this.name,
            penaltyPercent: this.penaltyPercent,
        };
    }

    static getEnum(): EnumType {
        return new EnumType('Phase', [
            new EnumVariantDefinition('Idle', 0),
            new EnumVariantDefinition('NoPenalty', 1),
            new EnumVariantDefinition('LinearIncreasingPenalty', 2, [
                new FieldDefinition('penaltyPercentage', '', new BigUIntType()),
            ]),
            new EnumVariantDefinition('OnlyWithdrawFixedPenalty', 3, [
                new FieldDefinition('penaltyPercentage', '', new BigUIntType()),
            ]),
            new EnumVariantDefinition('Unbond', 4),
            new EnumVariantDefinition('Redeem', 5),
        ]);
    }
}
