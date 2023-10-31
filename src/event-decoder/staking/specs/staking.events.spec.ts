import { StakeClaimRewardsEvent } from '../claim.rewards.event';
import {
    rawStakeClaimRewardsEvent,
    rawStakeEvent,
    rawUnstakeEvent,
} from '../mocks/mocked.raw.events';
import { StakeEvent } from '../stake.event';
import { UnstakeEvent } from '../unstake.event';

describe('test staking event decoders', () => {
    it('should decode stake event', () => {
        const decodedEvent = new StakeEvent(rawStakeEvent);
        expect(decodedEvent.toJSON()).toEqual({
            farmingToken: {
                tokenIdentifier: 'UTK-b97480',
                tokenNonce: 0,
                amount: '1000000000000000000',
            },
            rewardTokenReserves: '0',
            farmToken: {
                tokenIdentifier: 'SUTK-15988a',
                tokenNonce: 1,
                amount: '1000000000000000000',
            },
            farmSupply: '1000000000000000000',
            rewardTokenID: 'UTK-b97480',
            createdWithMerge: false,
            farmAttributes: {
                type: 'stakingFarmToken',
                rewardPerShare: '0',
                compoundedReward: '0',
                currentFarmAmount: '1000000000000000000',
            },
        });
    });

    it('should decode unstake event', () => {
        const decodedEvent = new UnstakeEvent(rawUnstakeEvent);
        expect(decodedEvent.toJSON()).toEqual({
            farmingToken: {
                tokenIdentifier: 'SUTK-15988a',
                tokenNonce: 0,
                amount: '1000000000000000000',
            },
            farmToken: {
                tokenIdentifier: 'SUTK-15988a',
                tokenNonce: 4,
                amount: '1000000000000000000',
            },
            farmSupply: '0',
            rewardTokens: {
                tokenIdentifier: 'UTK-b97480',
                tokenNonce: 0,
                amount: '29965753000000',
            },
            rewardTokenReserves: '2004900',
            farmAttributes: {
                type: 'stakingFarmToken',
                rewardPerShare: '1848078385',
                compoundedReward: '0',
                currentFarmAmount: '1000000000000000000',
            },
        });
    });

    it('should decode stake claim rewards event', () => {
        const decodedEvent = new StakeClaimRewardsEvent(
            rawStakeClaimRewardsEvent,
        );
        expect(decodedEvent.toJSON()).toEqual({
            oldFarmToken: {
                tokenIdentifier: 'SUTK-15988a',
                tokenNonce: 3,
                amount: '1000000000000000000',
            },
            newFarmToken: {
                tokenIdentifier: 'SUTK-15988a',
                tokenNonce: 4,
                amount: '1000000000000000000',
            },
            farmSupply: '1000000000000000000',
            rewardTokens: {
                tokenIdentifier: 'UTK-b97480',
                tokenNonce: 0,
                amount: '592132800000000',
            },
            rewardTokenReserves: '1580650',
            oldFarmAttributes: {
                type: 'stakingFarmToken',
                rewardPerShare: '1255945585',
                compoundedReward: '0',
                currentFarmAmount: '1000000000000000000',
            },
            newFarmAttributes: {
                type: 'stakingFarmToken',
                rewardPerShare: '1848078385',
                compoundedReward: '0',
                currentFarmAmount: '1000000000000000000',
            },
            createdWithMerge: false,
        });
    });
});
