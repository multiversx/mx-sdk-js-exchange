import { EsdtTokenPaymentType } from '../../attributes-decoder';
import { GenericEventType } from '../generic.types';

export type CreatePairEventType = GenericEventType & {
    firstTokenID: string | undefined;
    secondTokenID: string | undefined;
    totalFeePercent: number | undefined;
    specialFeePercent: number | undefined;
};

export type PairSwapEnableEventType = {
    caller: string;
    firstTokenID: string;
    secondTokenID: string;
    pairAddress: string;
};

export type MultiPairSwapEventType = GenericEventType & {
    tokenInID: string;
    amountIn: string;
    tokenOutID: string;
    amountOut: string;
    paymentsOut: EsdtTokenPaymentType[];
};
