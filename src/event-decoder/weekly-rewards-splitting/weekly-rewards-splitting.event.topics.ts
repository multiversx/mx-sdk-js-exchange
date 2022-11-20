import BigNumber from "bignumber.js";

export class WeeklyRewardsSplittingEventTopics {
    readonly eventName: string;
    readonly currentWeek: number;
    readonly totalLockedTokens: string;
    readonly totalEnergy: string;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.currentWeek = parseInt(
            Buffer.from(rawTopics[1], 'base64').toString('hex'),
            16,
        );
        this.totalLockedTokens = new BigNumber(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        ).toFixed();
        this.totalEnergy = new BigNumber(
            Buffer.from(rawTopics[3], 'base64').toString('hex'),
            16,
        ).toFixed();
    }

    toJSON() {
        return {
            eventName: this.eventName,
            currentWeek: this.currentWeek,
            totalLockedTokens: this.totalLockedTokens,
            totalEnergy: this.totalEnergy,
        };
    }
}
