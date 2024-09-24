import { BinaryCodec, ListType } from '@multiversx/sdk-core';
import { UserWeeklyRewardsSplittingEventTopics } from './user-weekly-rewards-splitting.event.topics';
import { EsdtTokenPayment } from '../../attributes-decoder';
import { ClaimMultiEventType } from './weekly-rewards-splitting.types';
import { ErrInvalidDataField } from '../../errors';
import { RawEvent } from '../raw.event';
import { RawEventType } from '../generic.types';

export class ClaimMultiEvent extends RawEvent {
    private decodedTopics: UserWeeklyRewardsSplittingEventTopics;
    readonly allPayments: EsdtTokenPayment[];

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new UserWeeklyRewardsSplittingEventTopics(
            this.topics,
        );
        this.allPayments = [];
        if (this.data !== undefined && this.data !== '') {
            const allPayments = this.decodeEvent();
            for (const payment of allPayments) {
                this.allPayments.push(
                    new EsdtTokenPayment({
                        tokenIdentifier: payment.token_identifier,
                        tokenNonce: payment.token_nonce.toNumber(),
                        amount: payment.amount.toFixed(),
                    }),
                );
            }
        }
    }

    getTopics(): UserWeeklyRewardsSplittingEventTopics {
        return this.decodedTopics;
    }

    toJSON(): ClaimMultiEventType {
        return {
            caller: this.decodedTopics.caller.bech32(),
            currentWeek: this.decodedTopics.currentWeek,
            energy: this.decodedTopics.energy,
            allPayments: this.allPayments,
        };
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(ClaimMultiEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        let decoded = codec.decodeTopLevel(
            data,
            new ListType(EsdtTokenPayment.getStructure()),
        );
        return decoded.valueOf();
    }
}
