import { RawEvent } from '../raw.event';
import { EsdtTokenTopics } from './esdtToken.topics';

export class EsdtLocalBurnEvent extends RawEvent {
    private decodedTopics: EsdtTokenTopics;

    constructor(init?: Partial<RawEvent>) {
        super(init);
        this.decodedTopics = new EsdtTokenTopics(this.topics);
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }
}
