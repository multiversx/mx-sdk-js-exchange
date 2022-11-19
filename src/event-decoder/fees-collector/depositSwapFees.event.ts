import { Address } from '@elrondnetwork/erdjs/out';
import { RawEvent } from '../raw.event';
import { FeesCollectorEventTopics } from "./fees-collector.event.topics";
import { DepositSwapFeesEventType } from "./fees-collector.types";
import BigNumber from "bignumber.js";
import { RawEventType } from "../generic.types";

export class DepositSwapFeesEvent extends RawEvent {
    private decodedTopics: FeesCollectorEventTopics;

    protected caller: Address | undefined;
    private readonly paymentAmount: string;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new FeesCollectorEventTopics(this.topics);

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
            currentWeek: this.decodedTopics.currentWeek,
            paymentToken: this.decodedTopics.paymentToken,
            paymentAmount: this.paymentAmount,
        };
    }
}
