import {
    rawClaimMultiEventNoRewards, rawClaimMultiEventWithRewards,
    rawUpdateGlobalAmountsEvent,
    rawUpdateUserEnergyEvent
} from '../mocks/mocked.raw.event';
import { UpdateUserEnergyEvent } from "../updateUserEnergy.event";
import { UpdateGlobalAmountsEvent } from "../updateGlobalAmounts.event";
import { ClaimMultiEvent } from "../claimMulti.event";

describe('test claimRewards event decoder', () => {
    it('UpdateUserEnergyEvent should decode', () => {
        const updateUserEnergyEvent = new UpdateUserEnergyEvent(
            rawUpdateUserEnergyEvent,
        );
        expect(updateUserEnergyEvent.toJSON()).toEqual({
            caller: "erd1p5grtfn078v5djndv73g69wcxkul3aljcdkcjw0eg7gshat9qsjsjek3f5",
            currentWeek: 169,
            energy: {
                "amount": "80911134245707400000000000000",
                "lastUpdateEpoch": 2767,
                "totalLockedTokens": "56462759417800000000000000",
            }
        });
    });
    it('UpdateGlobalAmountsEvent should decode', () => {
        const updateGlobalAmountsEvent = new UpdateGlobalAmountsEvent(
            rawUpdateGlobalAmountsEvent,
        );
        expect(updateGlobalAmountsEvent.toJSON()).toEqual({
            currentWeek: 169,
            totalEnergy: '18905302810694234619713495067210',
            totalLockedTokens: '22551595851383500000000000000',
        });
    });
    it('ClaimMultiEvent should decode with no rewards', () => {
        const claimMultiEvent = new ClaimMultiEvent(
            rawClaimMultiEventNoRewards,
        );
        expect(claimMultiEvent.toJSON()).toEqual({
            caller: "erd1p5grtfn078v5djndv73g69wcxkul3aljcdkcjw0eg7gshat9qsjsjek3f5",
            currentWeek: 169,
            energy: {
                amount: "80911134245707400000000000000",
                lastUpdateEpoch: 2767,
                totalLockedTokens: "56462759417800000000000000"
            },
            allPayments: [],
        });
    });
    it('ClaimMultiEvent should decode with some rewards', () => {
        const claimMultiEvent = new ClaimMultiEvent(
            rawClaimMultiEventWithRewards,
        );
        expect(claimMultiEvent.toJSON()).toEqual({
            caller: "erd1p5grtfn078v5djndv73g69wcxkul3aljcdkcjw0eg7gshat9qsjsjek3f5",
            currentWeek: 204,
            energy: {
                amount: "48074812998532800000000000000",
                lastUpdateEpoch: 2802,
                totalLockedTokens: "34388278253600000000000000"
            },
            allPayments: [
                {
                    "amount": "831689996798491",
                    "tokenIdentifier": "WEGLD-d7c6bb",
                    "tokenNonce": 0,
                },
                {
                    "amount": "146285048606447",
                    "tokenIdentifier": "PROTEO-d1ef39",
                    "tokenNonce": 0,
                },
                {
                    "amount": "140598923696766467",
                    "tokenIdentifier": "DSUPER-9af8df",
                    "tokenNonce": 0,
                },
            ],
        });
    });
    // TODO: ADD one test for claim_multi_event when there are also metaEsdts as
    // payments
});
