import { UnlockedTokensRaw } from '../mocks/mocked.raw.event';
import { UserUnlockedTokensEvent } from '../unlocked.tokens';

describe('test token unstake event decoders', () => {
    it('should decode user unlock tokens event', () => {
        const unlockTokensEvent = new UserUnlockedTokensEvent(
            UnlockedTokensRaw,
        );
        expect(unlockTokensEvent.toJSON()).toEqual({
            identifier: 'depositUserTokens',
            address:
                'erd1qqqqqqqqqqqqqpgq4vukqq9sd040peulr2m0tlnyffgdee770n4se6gjv7',
            unstakeTokens: [
                {
                    lockedTokens: {
                        amount: '20000000000000000000',
                        tokenIdentifier: 'ELKMEX-7e6873',
                        tokenNonce: 16,
                    },
                    unlockEpoch: 2887,
                    unlockedTokens: {
                        amount: '4018000000000000000',
                        tokenIdentifier: 'MEX-dc289c',
                        tokenNonce: 0,
                    },
                },
                {
                    lockedTokens: {
                        amount: '50000000000000000000',
                        tokenIdentifier: 'ELKMEX-7e6873',
                        tokenNonce: 16,
                    },
                    unlockEpoch: 2887,
                    unlockedTokens: {
                        amount: '10045000000000000000',
                        tokenIdentifier: 'MEX-dc289c',
                        tokenNonce: 0,
                    },
                },
                {
                    lockedTokens: {
                        amount: '100000000000000000000',
                        tokenIdentifier: 'ELKMEX-7e6873',
                        tokenNonce: 16,
                    },
                    unlockEpoch: 2887,
                    unlockedTokens: {
                        amount: '20090000000000000000',
                        tokenIdentifier: 'MEX-dc289c',
                        tokenNonce: 0,
                    },
                },
            ],
        });
    });
});
