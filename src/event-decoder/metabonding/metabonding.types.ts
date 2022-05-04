export type MetabondingEventType = {
    address: string | undefined;
    identifier: string | undefined;
    caller: string | undefined;
    userEntry: UserEntryType | undefined;
};

export type UserEntryType = {
    tokenNonce: number | undefined;
    stakedAmount: string | undefined;
    unstakedAmount: string | undefined;
    unbondEpoch: number | undefined;
};
