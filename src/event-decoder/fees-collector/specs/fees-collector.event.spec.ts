import { rawDepositSwapFees } from '../mocks/mocked.raw.event';
import { DepositSwapFeesEvent } from "../depositSwapFees.event";

describe('test depositSwapsFees event decoder', () => {
    it('should decode', () => {
        const depositSwapFeesEvent = new DepositSwapFeesEvent(
            rawDepositSwapFees,
        );
        expect(depositSwapFeesEvent.getTopics().toJSON()).toEqual(
            {
                eventName: "deposit_swap_fees_event",
                caller: "erd1vg0ndmmk6ps96sx9wj5llgc8sg4fnujuc0aks8kh8wzd7kzgmdtsq2dyu5",
                payment: {
                    amount: "1000000000000000000000",
                    tokenIdentifier: "ZPAY-eb1ced",
                    tokenNonce: 0
                },
                currentWeek: 1,
            });
    });
});
