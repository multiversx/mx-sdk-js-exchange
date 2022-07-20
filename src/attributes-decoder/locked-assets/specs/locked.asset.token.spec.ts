import BigNumber from 'bignumber.js';
import { LockedAssetAttributes, UnlockMilestone } from '../locked.asset.token';
import {
    LockedAssetsAttributesMock,
    OldLockedAssetsAttributesMock,
} from '../mocks/locked.asset.mock';

describe('test locked asset attributes decoder', () => {
    it('should decode new locked assets attributes', () => {
        const decodedAttributes = LockedAssetAttributes.fromAttributes(
            true,
            LockedAssetsAttributesMock,
        );

        const unlockSchedule = [];
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(872), new BigNumber(17000)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(902), new BigNumber(17000)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(932), new BigNumber(17000)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(962), new BigNumber(17000)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(992), new BigNumber(16000)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(1022), new BigNumber(16000)),
        );
        expect(decodedAttributes).toEqual(
            new LockedAssetAttributes(unlockSchedule, true),
        );
    });

    it('should decode old locked assets attributes', () => {
        const decodedAttributes = LockedAssetAttributes.fromAttributes(
            false,
            OldLockedAssetsAttributesMock,
        );

        const unlockSchedule = [];
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(872), new BigNumber(17)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(902), new BigNumber(17)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(932), new BigNumber(17)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(962), new BigNumber(17)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(992), new BigNumber(16)),
        );
        unlockSchedule.push(
            new UnlockMilestone(new BigNumber(1022), new BigNumber(16)),
        );
        expect(decodedAttributes).toEqual(
            new LockedAssetAttributes(unlockSchedule, true),
        );
    });
});
