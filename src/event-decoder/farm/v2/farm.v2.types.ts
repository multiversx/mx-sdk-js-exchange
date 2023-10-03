import { EsdtTokenPaymentType } from '../../../attributes-decoder';
import { FarmTokenAttributesTypeV2 } from '../../../attributes-decoder/farm/farm.token.types';

export type FarmEventsTopicsTypeV2 = {
    eventName: string;
    caller: string;
    epoch: number;
    block: number;
    timestamp: number;
    farmingTokenID: string;
};

export type EnterFarmEventTypeV2 = {
    farmingToken: EsdtTokenPaymentType;
    farmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokenID: string;
    rewardTokenReserves: string;
    createdWithMerge: boolean;
    farmAttributes: FarmTokenAttributesTypeV2;
};

export type ExitFarmEventTypeV2 = {
    farmingToken: EsdtTokenPaymentType;
    farmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokens: EsdtTokenPaymentType;
    rewardTokenReserves: string;
    farmAttributes: FarmTokenAttributesTypeV2;
};

export type ClaimRewardsEventTypeV2 = {
    oldFarmToken: EsdtTokenPaymentType;
    newFarmToken: EsdtTokenPaymentType;
    farmSupply: string;
    rewardTokens: EsdtTokenPaymentType;
    rewardTokenReserves: string;
    oldFarmAttributes: FarmTokenAttributesTypeV2;
    newFarmAttributes: FarmTokenAttributesTypeV2;
    createdWithMerge: boolean;
};
