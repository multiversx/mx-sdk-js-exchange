import { EnterFarmEventV1_2 } from '../v1.2/enter.farm.event';
import { EnterFarmEventV1_3 } from '../v1.3/enterFarm.event';
import { ExitFarmEventV1_2 } from '../v1.2/exit.farm.event';
import { ExitFarmEventV1_3 } from '../v1.3/exitFarm.event';
import {
    rawClaimRewardsEventV1_2,
    rawClaimRewardsEventV1_3,
    rawEnterFarmEventV1_2,
    rawEnterFarmEventV1_3,
    rawExitFarmEventV1_2,
    rawExitFarmEventV1_3,
} from '../mocks/mocked.raw.event';
import { RewardsEventV1_3 } from '../v1.3/rewards.event';
import { RewardsEventV1_2 } from '../v1.2/rewards.event';

describe('test farm v1.2 event decoders', () => {
    it('should decode enter farm event v1.2 farm', () => {
        const enterFarmEvent = new EnterFarmEventV1_2(rawEnterFarmEventV1_2);
        expect(enterFarmEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqye633y7k0zd7nedfnp3m48h24qygm5jl2jpslxallh',
            identifier: 'enterFarm',
            caller: 'erd1dgc8uvk35ahjnpgkvelm9zqwsgrl8f5ykcdjmrht8ljz0g20qzsqj8nenx',
            block: 7085901,
            epoch: 492,
            timestamp: 1638644490,
            farmingToken: {
                tokenID: 'EGLDMEX-0be9e5',
                nonce: 0,
                amount: '147695685924706452',
            },
            farmingReserve: '679057965261374012518156',
            farmToken: {
                tokenID: 'EGLDMEXF-5bcc57',
                nonce: 2053209,
                amount: '193249221516474215',
            },
            farmSupply: '8467967289016125754758999',
            rewardToken: { tokenID: 'MEX-455c57', nonce: 0, amount: '0' },
            rewardTokenReserves: '23451509368793106366958485439',
            farmAttributes: {
                rewardPerShare: '606951290387033071',
                originalEnteringEpoch: 492,
                enteringEpoch: 492,
                aprMultiplier: 1,
                lockedRewards: false,
                initialFarmingAmount: '193249221516474215',
                compoundedReward: '0',
                currentFarmAmount: '193249221516474215',
            },
            createdWithMerge: true,
        });
    });

    it('should decode exit farm event v1.2 farm', () => {
        const exitFarmEvent = new ExitFarmEventV1_2(rawExitFarmEventV1_2);
        expect(exitFarmEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqye633y7k0zd7nedfnp3m48h24qygm5jl2jpslxallh',
            identifier: 'exitFarm',
            caller: 'erd17n50m95a7leuarz7yj2tz3djukeyq07jrvfze3wunelghsnwm5hs5vpt82',
            block: 7085903,
            epoch: 492,
            timestamp: 1638644502,
            farmingToken: {
                tokenID: 'EGLDMEX-0be9e5',
                nonce: 0,
                amount: '816736715136681017',
            },
            farmingReserve: '679085320819541276442112',
            farmToken: {
                tokenID: 'EGLDMEXF-5bcc57',
                nonce: 1936027,
                amount: '816736715136681017',
            },
            farmSupply: '8468319518823837766962784',
            rewardToken: {
                tokenID: 'MEX-455c57',
                nonce: 0,
                amount: '5378183706902722140830',
            },
            rewardTokenReserves: '23450906455114689962381329837',
            farmAttributes: {
                rewardPerShare: '600378182744037590',
                originalEnteringEpoch: 484,
                enteringEpoch: 485,
                aprMultiplier: 1,
                lockedRewards: false,
                initialFarmingAmount: '816736715136681017',
                compoundedReward: '0',
                currentFarmAmount: '816736715136681017',
            },
        });
    });

    it('should decode claim rewards on farm event v1.2 farm', () => {
        const claimRewardsEvent = new RewardsEventV1_2(
            rawClaimRewardsEventV1_2,
        );
        expect(claimRewardsEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqye633y7k0zd7nedfnp3m48h24qygm5jl2jpslxallh',
            identifier: 'claimRewards',
            caller: 'erd1zz8trvmnq7pjv7u60zg05u8rn34s9f27339dhz36vqdwr8v025hss32v32',
            block: 7085904,
            epoch: 492,
            timestamp: 1638644508,
            oldFarmToken: {
                tokenID: 'EGLDMEXF-5bcc57',
                nonce: 1458167,
                amount: '512401193570208088',
            },
            newFarmToken: {
                tokenID: 'EGLDMEXF-5bcc57',
                nonce: 2053251,
                amount: '512401193570208088',
            },
            farmSupply: '8468321581517939214102758',
            rewardToken: {
                tokenID: 'MEX-455c57',
                nonce: 0,
                amount: '59720559426792440059407',
            },
            rewardTokenReserves: '23452583592543498138836437377',
            oldFarmAttributes: {
                rewardPerShare: '490413017852710212',
                originalEnteringEpoch: 482,
                enteringEpoch: 482,
                aprMultiplier: 1,
                lockedRewards: false,
                initialFarmingAmount: '512401193570208088',
                compoundedReward: '0',
                currentFarmAmount: '512401193570208088',
            },
            newFarmAttributes: {
                rewardPerShare: '606963408788928162',
                originalEnteringEpoch: 482,
                enteringEpoch: 482,
                aprMultiplier: 1,
                lockedRewards: false,
                initialFarmingAmount: '512401193570208088',
                compoundedReward: '0',
                currentFarmAmount: '512401193570208088',
            },
            createdWithMerge: false,
        });
    });
});

describe('test farm v1.3 event decoders', () => {
    it('should decode enter farm event v1.3 farm', () => {
        const enterFarmEvent = new EnterFarmEventV1_3(rawEnterFarmEventV1_3);
        expect(enterFarmEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqnqvjnn4haygsw2hls2k9zjjadnjf9w7g2jpsmc60a4',
            identifier: 'enterFarm',
            caller: 'erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl',
            block: 9254224,
            epoch: 643,
            timestamp: 1651682406,
            farmingToken: {
                tokenID: 'EGLDMEX-0be9e5',
                nonce: 0,
                amount: '6997239644024897115',
            },
            farmToken: {
                tokenID: 'EGLDMEXF-a4d81e',
                nonce: 17521,
                amount: '6997239644024897115',
            },
            farmSupply: '25650761197447740209630',
            rewardToken: { tokenID: 'MEX-455c57', nonce: 0, amount: '0' },
            rewardTokenReserves: '992045896910721146475812255',
            farmAttributes: {
                rewardPerShare: '802647299772169070',
                originalEnteringEpoch: 643,
                enteringEpoch: 643,
                initialFarmingAmount: '6997239644024897115',
                compoundedReward: '0',
                currentFarmAmount: '6997239644024897115',
            },
            createdWithMerge: false,
        });
    });

    it('should decode exit farm event v1.3 farm', () => {
        const exitFarmEvent = new ExitFarmEventV1_3(rawExitFarmEventV1_3);
        expect(exitFarmEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqnqvjnn4haygsw2hls2k9zjjadnjf9w7g2jpsmc60a4',
            identifier: 'exitFarm',
            caller: 'erd1t9ascd7zgaearpujuhpp73vnyx87vdmcg5vjczrqdkge7ze3wnwqh4kkw0',
            block: 9253685,
            epoch: 643,
            timestamp: 1651679166,
            farmingToken: {
                tokenID: 'EGLDMEX-0be9e5',
                nonce: 0,
                amount: '16314837633503193469',
            },
            farmToken: {
                tokenID: 'EGLDMEXF-a4d81e',
                nonce: 17488,
                amount: '16479633973235548958',
            },
            farmSupply: '25664079324098322136115',
            rewardToken: {
                tokenID: 'MEX-455c57',
                nonce: 0,
                amount: '3922657560666522558092',
            },
            rewardTokenReserves: '993057684509791839540902844',
            farmAttributes: {
                rewardPerShare: '802348741792404883',
                originalEnteringEpoch: 642,
                enteringEpoch: 642,
                initialFarmingAmount: '16479633973235548958',
                compoundedReward: '0',
                currentFarmAmount: '16479633973235548958',
            },
        });
    });

    it('should decode claim rewards on farm event v1.3 farm', () => {
        const claimRewardsEvent = new RewardsEventV1_3(
            rawClaimRewardsEventV1_3,
        );
        expect(claimRewardsEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqnqvjnn4haygsw2hls2k9zjjadnjf9w7g2jpsmc60a4',
            identifier: 'claimRewards',
            caller: 'erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl',
            block: 9254384,
            epoch: 643,
            timestamp: 1651683366,
            oldFarmToken: {
                tokenID: 'EGLDMEXF-a4d81e',
                nonce: 17357,
                amount: '61445435106290949742',
            },
            newFarmToken: {
                tokenID: 'EGLDMEXF-a4d81e',
                nonce: 17527,
                amount: '61445435106290949742',
            },
            farmSupply: '25657956919787862461833',
            rewardToken: {
                tokenID: 'MEX-455c57',
                nonce: 0,
                amount: '126812696373476790740760',
            },
            rewardTokenReserves: '991922357148830756429206303',
            oldFarmAttributes: {
                rewardPerShare: '800602181327386173',
                originalEnteringEpoch: 618,
                enteringEpoch: 618,
                initialFarmingAmount: '61445435106290949742',
                compoundedReward: '0',
                currentFarmAmount: '61445435106290949742',
            },
            newFarmAttributes: {
                rewardPerShare: '802666007487199522',
                originalEnteringEpoch: 618,
                enteringEpoch: 618,
                initialFarmingAmount: '61445435106290949742',
                compoundedReward: '0',
                currentFarmAmount: '61445435106290949742',
            },
            createdWithMerge: false,
        });
    });
});
