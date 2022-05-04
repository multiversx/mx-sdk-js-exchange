import { WrappedLpAttributesType } from '../../attributes-decoder/attributes.types';
import { GenericTokenType } from '../../generic.token';
import { GenericEventType } from '../generic.types';

export type PairProxyEventType = GenericEventType & {
    firstToken: GenericTokenType | undefined;
    secondToken: GenericTokenType | undefined;
    wrappedLpToken: GenericTokenType | undefined;
    wrappedLpAttributes: WrappedLpAttributesType | undefined;
};

export type AddLiquidityProxyEventType = PairProxyEventType & {
    createdWithMerge: boolean | undefined;
};
