import { FarmTokenAttributesType } from '../../attributes-decoder/farm/farm.token.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type RewardsEventType = GenericEventType & {
    oldFarmToken: GenericTokenType | undefined;
    newFarmToken: GenericTokenType | undefined;
    farmSupply: string | undefined;
    rewardToken: GenericTokenType | undefined;
    rewardTokenReserves: string | undefined;
    oldFarmAttributes: FarmTokenAttributesType | undefined;
    newFarmAttributes: FarmTokenAttributesType | undefined;
    createdWithMerge: boolean | undefined;
};
