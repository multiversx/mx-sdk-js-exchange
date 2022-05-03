import { GenericTokenType } from '../../generic.token';

export type PriceDiscoveryTopicsType = {
    eventName: string | undefined;
    caller: string | undefined;
    block: number | undefined;
    epoch: number | undefined;
    timestamp: number | undefined;
};

export type PhaseType = {
    name: string | undefined;
    penaltyPercent: number | undefined;
};

export type PriceDiscoveryEventType = {
    address: string | undefined;
    identifier: string | undefined;
    decodedTopics: PriceDiscoveryTopicsType | undefined;
};

export type ExtraRewardsEventType = PriceDiscoveryEventType & {
    rewardsToken: GenericTokenType | undefined;
};

export type DepositEventType = PriceDiscoveryEventType & {
    tokenIn: GenericTokenType | undefined;
    redeemToken: GenericTokenType | undefined;
    launchedTokenAmount: string | undefined;
    acceptedTokenAmount: string | undefined;
    launchedTokenPrice: string | undefined;
    currentPhase: PhaseType | undefined;
};

export type RedeemEventType = PriceDiscoveryEventType & {
    redeemToken: GenericTokenType | undefined;
    lpToken: GenericTokenType | undefined;
    remainingLpTokens: string | undefined;
    totalLpTokensReceived: string | undefined;
    rewardsToken: GenericTokenType | undefined;
};

export type InitialLiquidityEventType = PriceDiscoveryEventType & {
    lpToken: GenericTokenType | undefined;
};
