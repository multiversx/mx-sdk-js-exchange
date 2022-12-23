import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { EsdtTokenTopics } from './esdtToken.topics';

export class EsdtLocalMintEvent extends RawEvent {
    private decodedTopics: EsdtTokenTopics;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new EsdtTokenTopics(this.topics);
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }
}
