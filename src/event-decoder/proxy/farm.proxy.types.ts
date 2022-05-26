import { WrappedFarmAttributesType } from '../../attributes-decoder/proxy/proxy.token.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type FarmProxyEventType = GenericEventType & {
    farmAddress: string | undefined;
    farmingToken: GenericTokenType | undefined;
    wrappedFarmToken: GenericTokenType | undefined;
    wrappedFarmAttributes: WrappedFarmAttributesType | undefined;
};

export type EnterFarmProxyEventType = FarmProxyEventType & {
    createdWithMerge: boolean | undefined;
};

export type ExitFarmProxyEventType = FarmProxyEventType & {
    rewardToken: GenericTokenType | undefined;
};

export type RewardsProxyEventType = GenericEventType & {
    farmAddress: string | undefined;
    oldWrappedFarmToken: GenericTokenType | undefined;
    newWrappedFarmToken: GenericTokenType | undefined;
    oldWrappedFarmAttributes: WrappedFarmAttributesType | undefined;
    newWrappedFarmAttributes: WrappedFarmAttributesType | undefined;
    createdWithMerge: boolean | undefined;
};

export type ClaimRewardsProxyEventType = RewardsProxyEventType & {
    rewardToken: GenericTokenType | undefined;
};
