import { RawEvent } from '../raw.event';
import { FeesCollectorEventTopics } from "./fees-collector.event.topics";
import { RawEventType } from "../generic.types";

export class DepositSwapFeesEvent extends RawEvent {
    private decodedTopics: FeesCollectorEventTopics;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new FeesCollectorEventTopics(this.topics);
    }

    getTopics(): FeesCollectorEventTopics {
        return this.decodedTopics;
    }
}
