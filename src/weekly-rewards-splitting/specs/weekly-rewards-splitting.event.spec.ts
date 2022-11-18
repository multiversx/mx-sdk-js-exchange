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
            currentWeek: 169,
            paymentToken: 'RIDE-6e4c49',
            paymentAmount: '25000000000000000',
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
            currentWeek: 169,
            energy: {
                amount: "80911134245707400000000000000",
                lastUpdateEpoch: 2767,
                totalLockedTokens: "56462759417800000000000000"
            },
            allPayments: [],
        });
    });
});
