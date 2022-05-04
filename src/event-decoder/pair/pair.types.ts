import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type SwapEventType = GenericEventType & {
    tokenIn: GenericTokenType | undefined;
    tokenOut: GenericTokenType | undefined;
    feeAmount: string | undefined;
    tokenInReserves: string | undefined;
    tokenOutReserves: string | undefined;
};

export type AddLiquidityEventType = GenericEventType & {
    firstToken: GenericTokenType | undefined;
    secondToken: GenericTokenType | undefined;
    liquidityPoolToken: GenericTokenType | undefined;
    liquidityPoolSupply: string | undefined;
    firstTokenReserves: string | undefined;
    secondTokenReserves: string | undefined;
};

export type SwapNoFeeEventType = GenericEventType & {
    tokenIn: GenericTokenType | undefined;
    tokenOut: GenericTokenType | undefined;
    destination: string | undefined;
};
