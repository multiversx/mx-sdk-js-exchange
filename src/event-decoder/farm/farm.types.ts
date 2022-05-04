import { FarmTokenAttributesType } from '../../attributes-decoder/attributes.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type FarmEventType = GenericEventType & {
    farmingToken: GenericTokenType | undefined;
    farmingReserve: string | undefined;
    farmToken: GenericTokenType | undefined;
    farmSupply: string | undefined;
    rewardToken: GenericTokenType | undefined;
    rewardTokenReserves: string | undefined;
    farmAttributes: FarmTokenAttributesType | undefined;
};

export type EnterFarmEventType = FarmEventType & {
    createdWithMerge: boolean | undefined;
};
