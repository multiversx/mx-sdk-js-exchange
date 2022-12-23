import {
    FarmTokenAttributesTypeV1_3,
    FarmTokenAttributesTypeV1_2,
} from '../../attributes-decoder/farm/farm.token.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type BaseRewardsEventType = GenericEventType & {
    oldFarmToken: GenericTokenType;
    newFarmToken: GenericTokenType;
    farmSupply: string;
    rewardToken: GenericTokenType;
    rewardTokenReserves: string;
    createdWithMerge: boolean;
};

export type RewardsEventTypeV1_3 = BaseRewardsEventType & {
    oldFarmAttributes: FarmTokenAttributesTypeV1_3;
    newFarmAttributes: FarmTokenAttributesTypeV1_3;
};

export type RewardsEventTypeV1_2 = BaseRewardsEventType & {
    oldFarmAttributes: FarmTokenAttributesTypeV1_2;
    newFarmAttributes: FarmTokenAttributesTypeV1_2;
};
