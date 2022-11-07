import { EsdtTokenPayment } from '../esdt.token.payment';
import {
    EsdtTokenPaymentAttributesNew,
    EsdtTokenPaymentAttributesOld,
} from '../mocks/esdt.token.payment.mock';

describe('test esdt token payment attributes decoder', () => {
    it('should decode old esdt token payment', () => {
        const esdtTokenPayment = EsdtTokenPayment.fromAttributes(
            EsdtTokenPaymentAttributesOld,
        );

        expect(esdtTokenPayment).toEqual(
            new EsdtTokenPayment({
                tokenIdentifier: 'MEX-dc289c',
                tokenNonce: 0,
                amount: '365359339001228979577216',
            }),
        );
    });

    it('should decode esdt token payment', () => {
        const esdtTokenPayment = EsdtTokenPayment.fromAttributes(
            EsdtTokenPaymentAttributesNew,
        );

        expect(esdtTokenPayment).toEqual(
            new EsdtTokenPayment({
                tokenIdentifier: 'MEX-dc289c',
                tokenNonce: 0,
                amount: '365359339001228979577216',
            }),
        );
    });
});
