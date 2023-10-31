import {
    rawClaimRewardsEventV2,
    rawEnterFarmEventV2,
    rawExitFarmEventV2,
} from '../mocks/mocked.raw.event.v2';
import { ClaimRewardsEventV2 } from '../v2/claim.rewards.event';
import { EnterFarmEventV2 } from '../v2/enter.farm.event';
import { ExitFarmEventV2 } from '../v2/exit.farm.event';

describe('test farm v2 event decoders', () => {
    it('should decode enter farm event v2', () => {
        const decodedEvent = new EnterFarmEventV2(rawEnterFarmEventV2);
        expect(decodedEvent.toJSON()).toEqual({
            farmingToken: {
                tokenIdentifier: 'EGLDMEX-0be9e5',
                tokenNonce: 0,
                amount: '7799008171247025659',
            },
            rewardTokenReserves: '178404389302049246029573056506',
            farmToken: {
                tokenIdentifier: 'EGLDMEXFL-c2521e',
                tokenNonce: 367987,
                amount: '10384405708276779102',
            },
            farmSupply: '604294281608022071770093',
            rewardTokenID: 'MEX-455c57',
            createdWithMerge: true,
            farmAttributes: {
                rewardPerShare: '716695002750628061',
                enteringEpoch: 1158,
                compoundedReward: '0',
                currentFarmAmount: '10384405708276779102',
                originalOwner:
                    'erd17y8mkjassels7j6zeefn93ruw50x3mrmcx2vz8ud0qachctw8vwsruqcdl',
            },
        });
    });

    it('shoud decode exit farm event v2', () => {
        const decodedEvent = new ExitFarmEventV2(rawExitFarmEventV2);
        expect(decodedEvent.toJSON()).toEqual({
            farmingToken: {
                tokenIdentifier: 'EGLDMEX-0be9e5',
                tokenNonce: 0,
                amount: '27118253941196305',
            },
            farmToken: {
                tokenIdentifier: 'EGLDMEXFL-c2521e',
                tokenNonce: 367969,
                amount: '27118253941196305',
            },
            farmSupply: '604286482599850824744434',
            rewardTokens: {
                tokenIdentifier: 'MEX-455c57',
                tokenNonce: 0,
                amount: '135706487898282236',
            },
            rewardTokenReserves: '178378421662339709860868173363',
            farmAttributes: {
                rewardPerShare: '716670808048306576',
                enteringEpoch: 874,
                compoundedReward: '0',
                currentFarmAmount: '27118253941196305',
                originalOwner:
                    'erd14zssfxluxdqf62rtl28fs046jrky8rzh78ywpavk3znky40fptdsjluy8r',
            },
        });
    });

    it('should decode claim rewards event v2', () => {
        const decodedEvent = new ClaimRewardsEventV2(rawClaimRewardsEventV2);
        expect(decodedEvent.toJSON()).toEqual({
            oldFarmToken: {
                tokenIdentifier: 'EGLDMEXFL-c2521e',
                tokenNonce: 355083,
                amount: '884549960938460528',
            },
            newFarmToken: {
                tokenIdentifier: 'EGLDMEXFL-c2521e',
                tokenNonce: 368031,
                amount: '884549960938460528',
            },
            farmSupply: '604308599373139170528579',
            rewardTokens: {
                tokenIdentifier: 'XMEX-fda355',
                tokenNonce: 55,
                amount: '137615009379486858215279',
            },
            rewardTokenReserves: '178546444370636719027305659076',
            oldFarmAttributes: {
                rewardPerShare: '681011982950214975',
                enteringEpoch: 866,
                compoundedReward: '0',
                currentFarmAmount: '884549960938460528',
                originalOwner:
                    'erd1x30muxqm232uwhswk52vl5a0lh958hy8hx66e6ehwfrpua8usdzqnu80n9',
            },
            newFarmAttributes: {
                rewardPerShare: '716810673355886049',
                enteringEpoch: 866,
                compoundedReward: '0',
                currentFarmAmount: '884549960938460528',
                originalOwner:
                    'erd1x30muxqm232uwhswk52vl5a0lh958hy8hx66e6ehwfrpua8usdzqnu80n9',
            },
            createdWithMerge: false,
        });
    });
});
