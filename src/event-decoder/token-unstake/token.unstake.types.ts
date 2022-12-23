import { UnstakePairType } from '../../attributes-decoder/token-unstake/unstake.pair.type';
import { RawEventType } from '../generic.types';

export type UnlockedTokensTopicsType = {
    eventName: string;
    caller: string;
    block: number;
    epoch: number;
    timestamp: number;
};

export type UserUnlockedTokensType = RawEventType & {
    unstakeTokens: UnstakePairType[];
};
