import { CreatePairEvent } from '../createPair.event';
import {
    rawCreatePairEvent,
    rawMultiPairSwapEvent,
} from '../mocks/mocked.raw.event';
import { MultiPairSwapEvent } from '../multiPairSwap.event';

describe('test router events decoder', () => {
    it('should decode multi pair swap event', () => {
        const multiPairSwapEvent = new MultiPairSwapEvent(
            rawMultiPairSwapEvent,
        );
        expect(multiPairSwapEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqq66xk9gfr4esuhem3jru86wg5hvp33a62jps2fy57p',
            identifier: 'multiPairSwap',
            caller: 'erd1qqqqqqqqqqqqqpgqsytkvnexypp7argk02l0rasnj57sxa542jpshkl7df',
            block: 25574671,
            epoch: 1777,
            timestamp: 1749709740,
            tokenInID: 'WEGLD-bd4d79',
            amountIn: '700000000000000000',
            tokenOutID: 'USDC-c76f1f',
            amountOut: '10567308',
            paymentsOut: [
                {
                    tokenIdentifier: 'USDC-c76f1f',
                    tokenNonce: 0,
                    amount: '10567308',
                },
            ],
        });
    });

    it('should decode create pair event', () => {
        const createPairEvent = new CreatePairEvent(rawCreatePairEvent);
        expect(createPairEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgqa7hv0nahgsl8tz0psat46x0tchm0wuyc0n4s6q28ad',
            block: 11208882,
            caller: 'erd1ezcwhwhl4m8jljwgmrw2ephmgkzq3k8f3wwd36hf28alpdc5uuzqunxua2',
            epoch: 4673,
            firstTokenID: 'NINJAGO-ac7d66',
            identifier: 'createPair',
            pairAddress:
                'erd1qqqqqqqqqqqqqpgqk6tyq3rn5latl6j95eg2f4e5hgs42r7w0n4stt7kpw',
            secondTokenID: 'WEGLD-a28c59',
            specialFeePercent: 50,
            timestamp: 1761686564,
            totalFeePercent: 300,
        });
    });
});
