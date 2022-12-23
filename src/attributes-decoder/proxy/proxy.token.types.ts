import { EsdtTokenPaymentType } from '../esdt-token-payment/esdt.token.payment.type';

export type WrappedLpAttributesType = {
    lpTokenID: string | undefined;
    lpTokenTotalAmount: string | undefined;
    lockedAssetsInvested: string | undefined;
    lockedAssetsNonce: number | undefined;
};

export type WrappedFarmAttributesType = {
    farmTokenID: string | undefined;
    farmTokenNonce: number | undefined;
    farmTokenAmount: string | undefined;
    farmingTokenID: string | undefined;
    farmingTokenNonce: number | undefined;
    farmingTokenAmount: string | undefined;
};

export type WrappedLpTokenAttributesTypeV2 = {
    lpTokenID: string;
    lpTokenAmount: string;
    lockedTokens: EsdtTokenPaymentType;
};

export type WrappedFarmTokenAttributesTypeV2 = {
    farmToken: EsdtTokenPaymentType;
    proxyFarmingToken: EsdtTokenPaymentType;
};
