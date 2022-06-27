export enum StakingFarmTokenType {
    STAKING_FARM_TOKEN = 'stakingFarmToken',
    UNBOND_FARM_TOKEN = 'unboundFarmToken',
}

export type StakingFarmTokenAttributesType = {
    type: StakingFarmTokenType;
    rewardPerShare: string | undefined;
    compoundedReward: string | undefined;
    currentFarmAmount: string | undefined;
};

export type UnbondFarmTokenAttributesType = {
    type: StakingFarmTokenType;
    unlockEpoch: number | undefined;
};
