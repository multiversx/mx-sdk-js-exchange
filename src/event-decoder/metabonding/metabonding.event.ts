import { Address, BinaryCodec } from '@elrondnetwork/erdjs/out';
import { ErrInvalidDataField } from '../../errors';
import { GenericEvent } from '../generic.event';
import { RawEvent } from '../raw.event';
import { MetabondingEventTopics } from './metabonding.event.topics';
import { MetabondingEventType } from './metabonding.types';
import { UserEntry } from './userEntry';

export class MetabondingEvent extends RawEvent {
    private decodedTopics: MetabondingEventTopics;

    protected caller: Address | undefined;
    private userEntry: UserEntry | undefined;

    constructor(init?: Partial<RawEvent>) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new MetabondingEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        this.userEntry = new UserEntry({
            tokenNonce: decodedEvent.tokenNonce.toNumber(),
            stakedAmount: decodedEvent.stakeAmount.toFixed(),
            unstakedAmount: decodedEvent.unstakeAmount.toFixed(),
            unbondEpoch: decodedEvent.unbondEpoch.toNumber(),
        });
    }

    getTopics(): MetabondingEventTopics {
        return this.decodedTopics;
    }

    getUserEntry(): UserEntry | undefined {
        return this.userEntry;
    }

    toJSON(): MetabondingEventType {
        return {
            address: this.address,
            caller: this.caller?.bech32(),
            identifier: this.identifier,
            userEntry: this.userEntry?.toJSON(),
        };
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(MetabondingEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();
        const [decoded] = codec.decodeNested(data, UserEntry.getStructure());
        return decoded.valueOf();
    }
}
