import { BinaryCodec, FieldDefinition, StructType } from '@multiversx/sdk-core';
import { Energy } from '../../attributes-decoder/energy/energy';
import { ErrInvalidDataField } from '../../errors';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { EnergyEventTopics } from './energy.event.topics';
import { EnergyEventType } from './energy.event.types';

export class EnergyEvent extends RawEvent {
    readonly decodedTopics: EnergyEventTopics;
    readonly oldEnergyEntry: Energy;
    readonly newEnergyEntry: Energy;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new EnergyEventTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        this.oldEnergyEntry = Energy.fromDecodedAttributes(
            decodedEvent.old_energy_entry,
        );
        this.newEnergyEntry = Energy.fromDecodedAttributes(
            decodedEvent.new_energy_entry,
        );
    }

    toJSON(): EnergyEventType {
        return {
            oldEnergyEntry: this.oldEnergyEntry.toJSON(),
            newEnergyEntry: this.newEnergyEntry.toJSON(),
        };
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(EnergyEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    private getStructure(): StructType {
        return new StructType('LiquidityEvent', [
            new FieldDefinition('old_energy_entry', '', Energy.getStructure()),
            new FieldDefinition('new_energy_entry', '', Energy.getStructure()),
        ]);
    }
}
