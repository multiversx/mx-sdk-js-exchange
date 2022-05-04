import { GenericEventType } from '../generic.types';

export type CreatePairEventType = GenericEventType & {
    firstTokenID: string | undefined;
    secondTokenID: string | undefined;
    totalFeePercent: number | undefined;
    specialFeePercent: number | undefined;
};
