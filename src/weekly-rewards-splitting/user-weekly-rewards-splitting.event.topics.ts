import { Address, BinaryCodec } from '@elrondnetwork/erdjs/out';
import { Energy, EnergyType } from "../attributes-decoder";
import { ErrInvalidDataField } from "../errors";

export class UserWeeklyRewardsSplittingEventTopics {
    private readonly eventName: string;
    private readonly caller: Address;
    readonly currentWeek: number;
    readonly energy: EnergyType;

    constructor(rawTopics: string[]) {
        this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
        this.caller = new Address(Buffer.from(rawTopics[1], 'base64'));
        this.currentWeek = parseInt(
            Buffer.from(rawTopics[2], 'base64').toString('hex'),
            16,
        );
        this.energy = this.decodeEnergy(rawTopics[3]);
    }

    toJSON() {
        return {
            eventName: this.eventName,
            caller: this.caller.toJSON(),
            energy: this.energy,
            currentWeek: this.currentWeek
        };
    }

    getCaller(): Address {
        return this.caller;
    }

    getEventName(): string {
        return this.eventName;
    }

    private decodeEnergy(rawTopic: string): EnergyType {
        if (rawTopic == undefined) {
            throw new ErrInvalidDataField(UserWeeklyRewardsSplittingEventTopics.name);
        }

        const data = Buffer.from(rawTopic, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = Energy.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);
        const energy = decoded.valueOf()
        return {
            amount: energy.amount.toFixed(),
            lastUpdateEpoch: energy.last_update_epoch.toNumber(),
            totalLockedTokens: energy.total_locked_tokens.toFixed(),
        };
    }
}
