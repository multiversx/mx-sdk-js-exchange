import { Address } from '@elrondnetwork/erdjs/out';
import { RawEvent } from '../raw.event';
import { FeesCollectorEventTopics } from "./fees-collector.event.topics";
import { DepositSwapFeesEventType } from "./fees-collector.types";
import BigNumber from "bignumber.js";
import { RawEventType } from "../generic.types";

export class DepositSwapFeesEvent extends RawEvent {
    private decodedTopics: FeesCollectorEventTopics;

    protected caller: Address | undefined;
    private readonly paymentToken: string;
    private readonly paymentAmount: string;
    private readonly currentWeek: number;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new FeesCollectorEventTopics(this.topics);

        this.currentWeek = this.decodedTopics.currentWeek;
        this.paymentToken = this.decodedTopics.paymentToken;
        if (this.data !== undefined) {
            this.paymentAmount = new BigNumber(this.data, 16).toFixed();
        } else {
            this.paymentAmount = '';
        }
    }

    getTopics(): FeesCollectorEventTopics {
        return this.decodedTopics;
    }


    toJSON(): DepositSwapFeesEventType {
        return {
            currentWeek: this.currentWeek,
            paymentToken: this.paymentToken,
            paymentAmount: this.paymentAmount,
        };
    }
}
