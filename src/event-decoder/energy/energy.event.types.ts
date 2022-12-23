import { EnergyType } from '../../attributes-decoder/energy/energy.type';

export type EnergyEventTopicsType = {
    eventName: string;
    caller: string;
    block: number;
    epoch: number;
    timestamp: number;
};

export type EnergyEventType = {
    oldEnergyEntry: EnergyType;
    newEnergyEntry: EnergyType;
};
