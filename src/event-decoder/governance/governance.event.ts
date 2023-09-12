import { GovernanceEventTopics } from './governance.event.topics';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';

export class VoteEvent extends GenericEvent {
    private decodedTopics: GovernanceEventTopics;
    protected decodedEvent: any;

    constructor(init: RawEventType) {
        super(init);

        this.decodedTopics = new GovernanceEventTopics(this.topics);
    }

    getTopics() {
        return this.decodedTopics.toJSON();
    }
}
