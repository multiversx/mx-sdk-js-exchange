import { UserWeeklyRewardsSplittingEventTopics } from "./user-weekly-rewards-splitting.event.topics";
import { UpdateUserEnergyEventType } from "./weekly-rewards-splitting.types";
import { RawEvent } from '../raw.event';
import { RawEventType } from '../generic.types';

export class UpdateUserEnergyEvent extends RawEvent {
    private decodedTopics: UserWeeklyRewardsSplittingEventTopics;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new UserWeeklyRewardsSplittingEventTopics(this.topics);
    }

    getTopics(): UserWeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }


    toJSON(): UpdateUserEnergyEventType {
        return {
            caller: this.decodedTopics.caller.bech32(),
            currentWeek: this.decodedTopics.currentWeek,
            energy: this.decodedTopics.energy
        };
    }
}
