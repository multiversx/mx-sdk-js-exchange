import { EnergyType, EsdtTokenPayment } from "../attributes-decoder";

export type UpdateUserEnergyEventType = {
    currentWeek: number;
    energy: EnergyType;
};
export type UpdateGlobalAmountsEventType = {
    currentWeek: number,
    totalLockedTokens: string,
    totalEnergy: string
}
export type ClaimMultiEventType = UpdateUserEnergyEventType & {
    allPayments: EsdtTokenPayment[]
}