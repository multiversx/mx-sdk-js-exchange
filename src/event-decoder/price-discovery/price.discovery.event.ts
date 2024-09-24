import { BinaryCodec, StructType } from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { PriceDiscoveryEventTopics } from './price.discovery.event.topics';
import { PriceDiscoveryEventType } from './price.discovery.types';

export class PriceDiscoveryEvent extends RawEvent {
    private decodedTopics: PriceDiscoveryEventTopics;

    constructor(init: RawEventType) {
        super(init);
        Object.assign(this, init);
        this.decodedTopics = new PriceDiscoveryEventTopics(this.topics);
    }

    getAddress(): string | undefined {
        return this.address;
    }

    getIdentifier(): string | undefined {
        return this.identifier;
    }

    getTopics(): PriceDiscoveryEventTopics {
        return this.decodedTopics;
    }

    toJSON(): PriceDiscoveryEventType {
        return {
            address: this.address,
            identifier: this.identifier,
            decodedTopics: this.decodedTopics.toJSON(),
        };
    }

    protected decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(PriceDiscoveryEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);

        return decoded.valueOf();
    }

    protected getStructure(): StructType {
        return new StructType('', []);
    }
}
