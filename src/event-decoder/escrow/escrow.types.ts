import { EsdtTokenPaymentType } from '../../attributes-decoder';

export type LockedFundsType = {
    funds: EsdtTokenPaymentType[];
    lockedEpoch: number;
};

export type EscrowBaseEventType = {
    sender: string;
    receiver: string;
    lockedFunds: LockedFundsType;
};
