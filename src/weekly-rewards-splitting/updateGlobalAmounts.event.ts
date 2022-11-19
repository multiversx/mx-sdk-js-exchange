import { RawEvent, RawEventType } from "../event-decoder";
import {
    UpdateGlobalAmountsEventType,
} from "./weekly-rewards-splitting.types";
import {
    WeeklyRewardsSplittingEventTopics
} from "./weekly-rewards-splitting.event.topics";

export class UpdateGlobalAmountsEvent extends RawEvent {
    private decodedTopics: WeeklyRewardsSplittingEventTopics;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new WeeklyRewardsSplittingEventTopics(this.topics);
    }

    getTopics(): WeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }


    toJSON(): UpdateGlobalAmountsEventType {
        return {
            currentWeek: this.decodedTopics.currentWeek,
            totalLockedTokens: this.decodedTopics.totalLockedTokens,
            totalEnergy: this.decodedTopics.totalEnergy
        };
    }
}
