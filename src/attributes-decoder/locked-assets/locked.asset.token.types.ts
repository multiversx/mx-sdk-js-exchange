export type UnlockMilestoneType = {
    epoch: number;
    percent: number;
};

export type LockedAssetAttributesType = {
    unlockSchedule: UnlockMilestoneType[];
    isMerged: boolean;
};
