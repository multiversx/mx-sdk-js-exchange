import { AddLiquidityEvent } from '../addLiquidity.event';
import {
    rawAddLiquidityEvent,
    rawRemoveLiquidityEvent,
    rawSwapFixedInputEvent,
    rawSwapFixedOutputEvent,
    rawSwapNoFeeEvent,
} from '../mocks/mocked.raw.event';
import { RemoveLiquidityEvent } from '../removeLiquidity.event';
import { SwapEvent } from '../swap.event';
import { SwapNoFeeEvent } from '../swapNoFee.event';

describe('test pair event decoders', () => {
    it('should decode add liquidity event', () => {
        const addLiquidityEvent = new AddLiquidityEvent(rawAddLiquidityEvent);
        expect(addLiquidityEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
            identifier: 'addLiquidity',
            caller: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
            block: 505497,
            epoch: 422,
            timestamp: 1651594470,
            firstToken: {
                tokenID: 'WEGLD-d7c6bb',
                nonce: 0,
                amount: '1000000000000000000',
            },
            secondToken: {
                tokenID: 'MEX-dc289c',
                nonce: 0,
                amount: '2255465336927008578386637',
            },
            liquidityPoolToken: {
                tokenID: 'EGLDMEX-c29b0e',
                nonce: 0,
                amount: '1824608731151797603',
            },
            liquidityPoolSupply: '1592804603728996951989',
            firstTokenReserves: '872956802483087647475',
            secondTokenReserves: '1968923808635241359592442595',
        });
    });

    it('should decode remove liquidity event', () => {
        const removeLiquidityEvent = new RemoveLiquidityEvent(
            rawRemoveLiquidityEvent,
        );
        expect(removeLiquidityEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
            identifier: 'removeLiquidity',
            caller: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
            block: 517935,
            epoch: 432,
            timestamp: 1651669374,
            firstToken: {
                tokenID: 'WEGLD-d7c6bb',
                nonce: 0,
                amount: '1042368987481845088',
            },
            secondToken: {
                tokenID: 'MEX-dc289c',
                nonce: 0,
                amount: '2600256680852409357093037',
            },
            liquidityPoolToken: {
                tokenID: 'EGLDMEX-c29b0e',
                nonce: 0,
                amount: '2000000000000000000',
            },
            liquidityPoolSupply: '1590804603728996951989',
            firstTokenReserves: '829102692035226180291',
            secondTokenReserves: '2068250149388546981817157185',
        });
    });

    it('should decode swap fixed input event', () => {
        const swapFixedInputEvent = new SwapEvent(
            rawSwapFixedInputEvent,
        );
        expect(swapFixedInputEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
            identifier: 'swapTokensFixedInput',
            caller: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
            block: 517948,
            epoch: 432,
            timestamp: 1651669452,
            tokenIn: {
                tokenID: 'WEGLD-d7c6bb',
                nonce: 0,
                amount: '1000000000000000000',
            },
            tokenOut: {
                tokenID: 'MEX-dc289c',
                nonce: 0,
                amount: '2484093680223743787429824',
            },
            feeAmount: '500000000000000',
            tokenInReserves: '830102692035226180291',
            tokenOutReserves: '2065764811424889676618910432',
        });
    });

    it('should decode swap fixed output event', () => {
        const swapFixedOutputEvent = new SwapEvent(
            rawSwapFixedOutputEvent,
        );
        expect(swapFixedOutputEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
            identifier: 'swapTokensFixedOutput',
            caller: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
            block: 517964,
            epoch: 432,
            timestamp: 1651669554,
            tokenIn: {
                tokenID: 'WEGLD-d7c6bb',
                nonce: 0,
                amount: '999999999975675126',
            },
            tokenOut: {
                tokenID: 'MEX-dc289c',
                nonce: 0,
                amount: '2478123306600000000000000',
            },
            feeAmount: '499999999987837',
            tokenInReserves: '831102692035201855417',
            tokenOutReserves: '2063285446823617043849713812',
        });
    });

    it('should decode swap no fee event', () => {
        const swapNoFeeEvent = new SwapNoFeeEvent(rawSwapNoFeeEvent);
        expect(swapNoFeeEvent.toJSON()).toEqual({
            address:
                'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
            identifier: 'swapNoFeeAndForward',
            caller: 'erd1qqqqqqqqqqqqqpgqq67uv84ma3cekpa55l4l68ajzhq8qm3u0n4s20ecvx',
            block: 517978,
            epoch: 432,
            timestamp: 1651669638,
            tokenIn: {
                tokenID: 'WEGLD-d7c6bb',
                nonce: 0,
                amount: '43445832694731890',
            },
            tokenOut: {
                tokenID: 'MEX-dc289c',
                nonce: 0,
                amount: '107852458478753919967165',
            },
            destination:
                'erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu',
        });
    });
});
