import { rawDepositSwapFees } from '../mocks/mocked.raw.event';
import { DepositSwapFeesEvent } from "../depositSwapFees.event";

describe('test depositSwapsFees event decoder', () => {
    it('should decode', () => {
        const depositSwapFeesEvent = new DepositSwapFeesEvent(
            rawDepositSwapFees,
        );
        expect(depositSwapFeesEvent.toJSON()).toEqual({
            currentWeek: 155,
            paymentToken: 'RIDE-6e4c49',
            paymentAmount: '25000000000000000',
        });
    });
});
