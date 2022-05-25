export type UnlockMilestoneType = {
    epoch: number | undefined;
    percent: number | undefined;
};

export type LockedAssetAttributesType = {
    unlockSchedule: UnlockMilestoneType[] | undefined;
    isMerged: boolean | undefined;
};
