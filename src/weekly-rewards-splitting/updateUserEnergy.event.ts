import { Address } from '@elrondnetwork/erdjs/out';
import { UserWeeklyRewardsSplittingEventTopics } from "./user-weekly-rewards-splitting.event.topics";
import { RawEvent, RawEventType } from "../event-decoder";
import { EnergyType } from "../attributes-decoder";
import { UpdateUserEnergyEventType } from "./weekly-rewards-splitting.types";

export class UpdateUserEnergyEvent extends RawEvent {
    private decodedTopics: UserWeeklyRewardsSplittingEventTopics;

    protected caller: Address | undefined;
    private readonly currentWeek: number;
    private readonly energy: EnergyType;


    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new UserWeeklyRewardsSplittingEventTopics(this.topics);

        this.caller = this.decodedTopics.getCaller();
        this.currentWeek = this.decodedTopics.currentWeek;
        this.energy = this.decodedTopics.energy;
    }

    getTopics(): UserWeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }


    toJSON(): UpdateUserEnergyEventType {
        return {
            currentWeek: this.currentWeek,
            energy: this.energy
        };
    }
}
