export type FarmTokenAttributesType = {
    rewardPerShare: string | undefined;
    originalEnteringEpoch: number | undefined;
    enteringEpoch: number | undefined;
    aprMultiplier: number | undefined;
    lockedRewards: boolean | undefined;
    initialFarmingAmount: string | undefined;
    compoundedReward: string | undefined;
    currentFarmAmount: string | undefined;
};

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
