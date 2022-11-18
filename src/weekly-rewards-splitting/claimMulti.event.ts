import {
    Address,
    ArrayVecType,
    BinaryCodec,
    FieldDefinition,
    StructType,
    TokenIdentifierType
} from '@elrondnetwork/erdjs/out';
import BigNumber from "bignumber.js";
import { UserWeeklyRewardsSplittingEventTopics } from "./user-weekly-rewards-splitting.event.topics";
import { RawEvent, RawEventType } from "../event-decoder";
import { EnergyType, EsdtTokenPayment } from "../attributes-decoder";
import { ClaimMultiEventType, UpdateUserEnergyEventType } from "./weekly-rewards-splitting.types";
import { ErrInvalidDataField } from "../errors";
import { ArrayVecBinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec/arrayVec";
import { ListBinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec/list";

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
        if (this.data !== undefined && this.data !== "") {
            this.decodedEvent = this.decodeEvent();
            this.allPayments = this.decodedEvent.all_payments;
        } else {
            this.allPayments = []
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

        const data = Buffer.from(this.data, 'base64');
        const codec = new ListBinaryCodec(new BinaryCodec());

        const [decoded, _] = codec.decodeNested(data, EsdtTokenPayment.getStructure());
        return decoded.valueOf();
    }
}
