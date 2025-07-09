import { rawSmartSwapEvent } from '../mocks/mocked.raw.event';
import { SmartSwapEvent } from '../smartSwap.event';

describe('test composable tasks events decoder', () => {
    it('should decode smart swap event', () => {
        const smartSwapEvent = new SmartSwapEvent(rawSmartSwapEvent);

        expect(smartSwapEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgq6wg9syswgy09knrw2tg6q7qew2n8zjwx0n4s377sfe',
            identifier: 'composeTasks',
            caller: 'erd1rwsq0fxjrce9955hvvl3qrpl96xmuuxch9m6wlhxx6zs0n2v3hvqyu4lm5',
            block: 9605695,
            epoch: 4005,
            timestamp: 1752063122,
            tokenInID: 'USDC-350c4e',
            amountIn: '1500000000',
            tokenOutID: 'MEX-a659d0',
            amountOut: '81017298054646063096036867',
            feeAmount: '81098396451097160256293',
        });
    });
});
