export type FarmTokenAttributesType = {
    rewardPerShare: string;
    enteringEpoch: number;
    compoundedReward: string;
    currentFarmAmount: string;
    identifier?: string;
    attributes?: string;
};

export type FarmTokenAttributesTypeV1_3 = FarmTokenAttributesType & {
    originalEnteringEpoch: number;
    initialFarmingAmount: string;
};

export type FarmTokenAttributesTypeV1_2 = FarmTokenAttributesTypeV1_3 & {
    aprMultiplier: number;
    lockedRewards: boolean;
};

export type FarmTokenAttributesTypeV2 = FarmTokenAttributesType & {
    originalOwner: string;
};
