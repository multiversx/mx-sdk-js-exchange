import { GenericEventType } from '../generic.types';

export type SmartSwapEventType = GenericEventType & {
    tokenInID: string;
    amountIn: string;
    tokenOutID: string;
    amountOut: string;
    feeAmount: string;
};
