import { Address } from '@elrondnetwork/erdjs/out';
import { RawEvent, RawEventType } from "../event-decoder";
import {
    UpdateGlobalAmountsEventType,
} from "./weekly-rewards-splitting.types";
import {
    WeeklyRewardsSplittingEventTopics
} from "./weekly-rewards-splitting.event.topics";

export class UpdateGlobalAmountsEvent extends RawEvent {
    private decodedTopics: WeeklyRewardsSplittingEventTopics;

    protected caller: Address | undefined;
    readonly currentWeek: number;
    readonly totalLockedTokens: string;
    readonly totalEnergy: string;


    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new WeeklyRewardsSplittingEventTopics(this.topics);

        this.currentWeek = this.decodedTopics.currentWeek;
        this.totalLockedTokens = this.decodedTopics.totalLockedTokens;
        this.totalEnergy = this.decodedTopics.totalEnergy;
    }

    getTopics(): WeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }


    toJSON(): UpdateGlobalAmountsEventType {
        return {
            currentWeek: this.currentWeek,
            totalLockedTokens: this.totalLockedTokens,
            totalEnergy: this.totalEnergy
        };
    }
}
