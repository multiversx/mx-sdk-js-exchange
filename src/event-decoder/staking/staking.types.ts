import { EsdtTokenPaymentType } from '../../attributes-decoder';
import { StakingFarmTokenAttributesType } from '../../attributes-decoder/staking/staking.farm.token.types';

export type StakingEventsTopicsType = {
    eventName: string;
    caller: string;
    epoch: number;
    block: number;
    timestamp: number;
    farmingTokenID: string;
};

export type StakeEventType = {
    farmingToken: EsdtTokenPaymentType;
    farmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokenID: string;
    rewardTokenReserves: string;
    createdWithMerge: boolean;
    farmAttributes: StakingFarmTokenAttributesType;
};

export type UnstakeEventType = {
    farmingToken: EsdtTokenPaymentType;
    farmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokens: EsdtTokenPaymentType;
    rewardTokenReserves: string;
    farmAttributes: StakingFarmTokenAttributesType;
};

export type StakeClaimRewardsEventType = {
    oldFarmToken: EsdtTokenPaymentType;
    newFarmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokens: EsdtTokenPaymentType;
    rewardTokenReserves: string;
    oldFarmAttributes: StakingFarmTokenAttributesType;
    newFarmAttributes: StakingFarmTokenAttributesType;
    createdWithMerge: boolean;
};
