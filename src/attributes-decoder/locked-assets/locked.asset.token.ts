import {
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    ListType,
    StructType,
    U64Type,
    U8Type,
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import {
    LockedAssetAttributesType,
    UnlockMilestoneType,
} from './locked.asset.token.types';

export class UnlockMilestone {
    epoch: BigNumber;
    percent: BigNumber;

    constructor(epoch: BigNumber, percent: BigNumber) {
        this.epoch = epoch;
        this.percent = percent;
    }

    toJSON(): UnlockMilestoneType {
        return {
            epoch: this.epoch.toNumber(),
            percent: this.percent.toNumber(),
        };
    }
}

export class LockedAssetAttributes {
    unlockSchedule: UnlockMilestone[];
    isMerged: boolean;

    constructor(unlockSchedule: UnlockMilestone[], isMerged: boolean) {
        this.unlockSchedule = unlockSchedule;
        this.isMerged = isMerged;
    }

    toJSON(): LockedAssetAttributesType {
        const unlockScheduleType: UnlockMilestoneType[] =
            this.unlockSchedule.map((unlockMilestone) =>
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
        const unlockSchedule: UnlockMilestone[] =
            decodedAttributes.unlockSchedule
                .valueOf()
                .map(
                    (rawUnlockMilestone: {
                        epoch: BigNumber;
                        percent: BigNumber;
                    }) =>
                        new UnlockMilestone(
                            rawUnlockMilestone.epoch,
                            rawUnlockMilestone.percent,
                        ),
                );
        return new LockedAssetAttributes(
            unlockSchedule,
            decodedAttributes.isMerged,
        );
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
