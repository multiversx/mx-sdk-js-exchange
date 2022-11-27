import { EsdtTokenPaymentType } from '../esdt-token-payment';

export type UnstakePairType = {
    unlockEpoch: number;
    lockedTokens: EsdtTokenPaymentType;
    unlockedTokens: EsdtTokenPaymentType;
};
