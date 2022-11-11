import { FarmTokenAttributes } from './farm.token';
import { FarmTokenAttributesTypeV2 } from './farm.token.types';

export class FarmTokenAttributesV2 extends FarmTokenAttributes {
    constructor(init: FarmTokenAttributesTypeV2) {
        super(init);
    }

    toJSON(): FarmTokenAttributesTypeV2 {
        return super.toJSON();
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): FarmTokenAttributesV2 {
        return super.fromDecodedAttributes(decodedAttributes);
    }

    static fromAttributes(attributes: string): FarmTokenAttributesV2 {
        return super.fromAttributes(attributes);
    }
}
