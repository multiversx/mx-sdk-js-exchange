import {
    Address,
    AddressType,
    BinaryCodec,
    FieldDefinition,
    ListType,
    StructType,
    U64Type,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { EsdtTokenPayment } from '../../attributes-decoder';
import { EscrowBaseEventType, LockedFundsType } from './escrow.types';
import { EscrowEventTopics } from './escrow.event.topics';

class LockedFunds {
    funds: EsdtTokenPayment[];
    lockedEpoch: number;

    constructor(init: LockedFundsType) {
        this.funds = init.funds.map((token) => new EsdtTokenPayment(token));
        this.lockedEpoch = init.lockedEpoch;
    }

    toJSON(): LockedFundsType {
        return {
            funds: this.funds.map((token) => token.toJSON()),
            lockedEpoch: this.lockedEpoch,
        };
    }

    static fromDecodedAttributes(decodedAttributes: any): LockedFunds {
        return new LockedFunds({
            funds: decodedAttributes.funds.map((token: any) =>
                EsdtTokenPayment.fromDecodedAttributes(token),
            ),
            lockedEpoch: decodedAttributes.locked_epoch.toNumber(),
        });
    }
}

class EscrowBaseEvent extends RawEvent {
    readonly decodedTopics: EscrowEventTopics;

    readonly sender: Address;
    readonly receiver: Address;
    readonly lockedFunds: LockedFunds;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new EscrowEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        this.sender = decodedEvent.sender;
        this.receiver = decodedEvent.receiver;
        this.lockedFunds = LockedFunds.fromDecodedAttributes(
            decodedEvent.locked_funds,
        );
    }

    toJSON(): EscrowBaseEventType {
        return {
            sender: this.sender.bech32(),
            receiver: this.receiver.bech32(),
            lockedFunds: this.lockedFunds.toJSON(),
        };
    }

    protected decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(EscrowBaseEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);

        return decoded.valueOf();
    }

    protected getStructure(): StructType {
        return new StructType('XMEXTransferEvent', [
            new FieldDefinition('sender', '', new AddressType()),
            new FieldDefinition('receiver', '', new AddressType()),
            new FieldDefinition(
                'locked_funds',
                '',
                new StructType('LockedFunds', [
                    new FieldDefinition(
                        'funds',
                        '',
                        new ListType(EsdtTokenPayment.getStructure()),
                    ),
                    new FieldDefinition('locked_epoch', '', new U64Type()),
                ]),
            ),
        ]);
    }
}

export class EscrowLockFundsEvent extends EscrowBaseEvent {
    constructor(init: RawEventType) {
        super(init);
    }
}

export class EscrowWithdrawEvent extends EscrowBaseEvent {
    constructor(init: RawEventType) {
        super(init);
    }
}

export class EscrowCancelTransferEvent extends EscrowBaseEvent {
    constructor(init: RawEventType) {
        super(init);
    }
}
