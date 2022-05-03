import BigNumber from 'bignumber.js';

export type GenericTokenType = {
    tokenID: string | undefined;
    nonce: number;
    amount: string | undefined;
};

export class GenericToken {
    tokenID: string | undefined;
    nonce = new BigNumber(0);
    amount: BigNumber | undefined;

    constructor(init?: Partial<GenericToken>) {
        Object.assign(this, init);
    }

    toJSON() {
        return {
            tokenID: this.tokenID,
            nonce: this.nonce.toNumber(),
            amount: this.amount?.toFixed(),
        };
    }
}
