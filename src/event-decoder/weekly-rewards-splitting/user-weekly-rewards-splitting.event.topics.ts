import { Address } from '@multiversx/sdk-core';
import { Energy, EnergyType } from '../../attributes-decoder';

export class UserWeeklyRewardsSplittingEventTopics {
    readonly eventName: string;
    readonly caller: Address;
    readonly currentWeek: number;
    readonly energy: EnergyType;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.currentWeek = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.energy = Energy.fromAttributes(rawTopics[3]).toJSON();
    }

    toJSON() {
        return {
            eventName: this.eventName,
            caller: this.caller,
            energy: this.energy,
            currentWeek: this.currentWeek,
        };
    }
}
