export type FarmTokenAttributesTypeV1_3 = {
    rewardPerShare: string;
    originalEnteringEpoch: number;
    enteringEpoch: number;
    initialFarmingAmount: string;
    compoundedReward: string;
    currentFarmAmount: string;
    identifier?: string;
    attributes?: string;
};

export type FarmTokenAttributesTypeV1_2 = FarmTokenAttributesTypeV1_3 & {
    aprMultiplier: number;
    lockedRewards: boolean;
};

export type FarmTokenAttributesTypeV2 = FarmTokenAttributesTypeV1_3;
