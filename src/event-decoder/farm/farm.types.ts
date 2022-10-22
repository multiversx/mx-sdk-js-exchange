import {
    FarmTokenAttributesTypeV1_3,
    FarmTokenAttributesTypeV1_2,
} from '../../attributes-decoder/farm/farm.token.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type BaseFarmEventType = GenericEventType & {
    farmingToken: GenericTokenType;
    farmToken: GenericTokenType;
    farmSupply: string;
    rewardToken: GenericTokenType;
    rewardTokenReserves: string;
};

export type FarmEventTypeV1_3 = BaseFarmEventType & {
    farmAttributes: FarmTokenAttributesTypeV1_3;
};

export type FarmEventTypeV1_2 = BaseFarmEventType & {
    farmingReserve: string;
    farmAttributes: FarmTokenAttributesTypeV1_2;
};

export type EnterFarmEventTypeV1_3 = FarmEventTypeV1_3 & {
    createdWithMerge: boolean;
};

export type EnterFarmEventTypeV1_2 = FarmEventTypeV1_2 & {
    createdWithMerge: boolean;
};
