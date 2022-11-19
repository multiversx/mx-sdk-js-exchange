import {
    Address,
    BinaryCodec,
    ListType,
} from '@elrondnetwork/erdjs/out';
import { UserWeeklyRewardsSplittingEventTopics } from "./user-weekly-rewards-splitting.event.topics";
import { RawEvent, RawEventType } from "../event-decoder";
import { EnergyType, EsdtTokenPayment } from "../attributes-decoder";
import { ClaimMultiEventType } from "./weekly-rewards-splitting.types";
import { ErrInvalidDataField } from "../errors";

export class ClaimMultiEvent extends RawEvent {
    private decodedTopics: UserWeeklyRewardsSplittingEventTopics;
    protected decodedEvent: any;

    protected caller: Address | undefined;
    private readonly currentWeek: number;
    private readonly energy: EnergyType;
    private readonly allPayments: EsdtTokenPayment[];


    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new UserWeeklyRewardsSplittingEventTopics(this.topics);

        this.caller = this.decodedTopics.getCaller();
        this.currentWeek = this.decodedTopics.currentWeek;
        this.energy = this.decodedTopics.energy;
        this.allPayments = []
        if (this.data !== undefined && this.data !== "") {
            const allPayments = this.decodeEvent();
            for (const payment of allPayments) {
                this.allPayments.push(new EsdtTokenPayment({
                    tokenIdentifier: payment.token_identifier,
                    tokenNonce: payment.token_nonce.toNumber(),
                    amount: payment.amount.toFixed(),
                }))
            }
        }
    }

    getTopics(): UserWeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }


    toJSON(): ClaimMultiEventType {
        return {
            currentWeek: this.currentWeek,
            energy: this.energy,
            allPayments: this.allPayments,
        };
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(ClaimMultiEvent.name);
        }

        const data = Buffer.from(this.data, 'hex');
        const codec = new BinaryCodec();

        const esdtStructure = EsdtTokenPayment.getStructure();

        let decoded = codec.decodeTopLevel(data, new ListType(esdtStructure));

        return decoded.valueOf();
    }
}
