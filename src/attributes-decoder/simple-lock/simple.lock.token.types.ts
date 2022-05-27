export type LockedTokenType = {
    originalTokenID: string | undefined;
    originalTokenNonce: number | undefined;
    unlockEpoch: number | undefined;
};

export type LockedLpTokenType = {
    lpTokenID: string | undefined;
    firstTokenID: string | undefined;
    firstTokenLockedNonce: number | undefined;
    secondTokenID: string | undefined;
    secondTokenLockedNonce: number | undefined;
};

export type LockedFarmTokenType = {
    farmType: string | undefined;
    farmTokenID: string | undefined;
    farmTokenNonce: number | undefined;
    farmingTokenID: string | undefined;
    farmingTokenLockedNonce: number | undefined;
};
