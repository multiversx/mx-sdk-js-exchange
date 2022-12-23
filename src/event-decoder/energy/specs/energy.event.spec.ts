import { EnergyEvent } from '../energy.event';
import { rawEnergyEvent } from '../mocks/raw.event.mock';

describe('test energy event decoders', () => {
    it('should decode energy event', () => {
        const updateEnergyEvent = new EnergyEvent(rawEnergyEvent);
        expect(updateEnergyEvent.toJSON()).toEqual({
            oldEnergyEntry: {
                amount: '1000000000000000000',
                lastUpdateEpoch: 1,
                totalLockedTokens: '1000000000000000000',
            },
            newEnergyEntry: {
                amount: '2000000000000000000',
                lastUpdateEpoch: 2,
                totalLockedTokens: '2000000000000000000',
            },
        });
    });

    it('should decode energy event topics', () => {
        const energyEvent = new EnergyEvent(rawEnergyEvent);
        const decodedTopics = energyEvent.decodedTopics;
        expect(decodedTopics.toJSON()).toEqual({
            eventName: 'energyUpdated',
            caller: 'erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu',
            block: 1,
            epoch: 1,
            timestamp: 1663778190,
        });
    });
});
