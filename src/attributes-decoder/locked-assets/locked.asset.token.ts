import {
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    ListType,
    StructType,
    U64Type,
    U8Type,
} from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import {
    LockedAssetAttributesType,
    UnlockMilestoneType,
} from './locked.asset.token.types';

export class UnlockMilestone {
    private epoch: BigNumber | undefined;
    private percent: BigNumber | undefined;

    constructor(init?: Partial<UnlockMilestone>) {
        Object.assign(this, init);
    }

    toJSON(): UnlockMilestoneType {
        return {
            epoch: this.epoch?.toNumber(),
            percent: this.percent?.toNumber(),
        };
    }
}

export class LockedAssetAttributes {
    unlockSchedule: UnlockMilestone[] | undefined;
    isMerged: boolean | undefined;

    constructor(init?: Partial<LockedAssetAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): LockedAssetAttributesType {
        const unlockScheduleType: UnlockMilestoneType[] | undefined =
            this.unlockSchedule?.map((unlockMilestone) =>
                unlockMilestone.toJSON(),
            );

        return {
            unlockSchedule: unlockScheduleType,
            isMerged: this.isMerged,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): LockedAssetAttributes {
        return new LockedAssetAttributes({
            unlockSchedule: decodedAttributes.unlockSchedule.valueOf(),
            isMerged: decodedAttributes.isMerged,
        });
    }

    static fromAttributes(
        withActivationNonce: boolean,
        attributes: string,
    ): LockedAssetAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType =
            LockedAssetAttributes.getStructure(withActivationNonce);
        const [decoded] = codec.decodeNested(attributesBuffer, structType);

        return LockedAssetAttributes.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(withActivationNonce: boolean): StructType {
        return new StructType('LockedAssetAttributes', [
            new FieldDefinition(
                'unlockSchedule',
                '',
                new ListType(
                    new StructType('UnlockMilestone', [
                        new FieldDefinition('epoch', '', new U64Type()),
                        new FieldDefinition(
                            'percent',
                            '',
                            withActivationNonce ? new U64Type() : new U8Type(),
                        ),
                    ]),
                ),
            ),
            new FieldDefinition('isMerged', '', new BooleanType()),
        ]);
    }
}
