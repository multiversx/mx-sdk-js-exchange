import {
    AddressType,
    BigUIntType,
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { FarmTokenAttributes } from '../../attributes-decoder/farm.token';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { FarmVersion } from '../generic.types';
import { FarmEventsTopics } from './farm.event.topics';
import { RewardsEventType } from './rewards.types';

export class RewardsEvent extends GenericEvent {
    private decodedTopics: FarmEventsTopics;

    private oldFarmToken: GenericToken | undefined;
    private newFarmToken: GenericToken | undefined;
    private farmSupply: BigNumber | undefined;
    private rewardToken: GenericToken | undefined;
    private rewardTokenReserves: BigNumber | undefined;
    private oldFarmAttributes: FarmTokenAttributes | undefined;
    private newFarmAttributes: FarmTokenAttributes | undefined;
    private createdWithMerge: boolean | undefined;

    constructor(version: FarmVersion, init?: Partial<GenericEvent>) {
        super(init);
        this.decodedTopics = new FarmEventsTopics(this.topics);
        const decodedEvent = this.decodeEvent(version);
        Object.assign(this, decodedEvent);
        this.oldFarmToken = new GenericToken({
            tokenID: decodedEvent.oldFarmTokenID.toString(),
            nonce: decodedEvent.oldFarmTokenNonce,
            amount: decodedEvent.oldFarmTokenAmount,
        });
        this.newFarmToken = new GenericToken({
            tokenID: decodedEvent.newFarmTokenID.toString(),
            nonce: decodedEvent.newFarmTokenNonce,
            amount: decodedEvent.newFarmTokenAmount,
        });
        this.rewardToken = new GenericToken({
            tokenID: decodedEvent.rewardTokenID.toString(),
            nonce: decodedEvent.rewardTokenNonce,
            amount: decodedEvent.rewardTokenAmount,
        });
        this.oldFarmAttributes = FarmTokenAttributes.fromDecodedAttributes(
            version,
            decodedEvent.oldFarmAttributes,
        );
        this.newFarmAttributes = FarmTokenAttributes.fromDecodedAttributes(
            version,
            decodedEvent.newFarmAttributes,
        );
    }

    getOldFarmToken(): GenericToken | undefined {
        return this.oldFarmToken;
    }

    getNewFarmToken(): GenericToken | undefined {
        return this.newFarmToken;
    }

    getFarmSupply(): BigNumber | undefined {
        return this.farmSupply;
    }

    getRewardToken(): GenericToken | undefined {
        return this.rewardToken;
    }

    getRewardTokenReserve(): BigNumber | undefined {
        return this.rewardTokenReserves;
    }

    toJSON(): RewardsEventType {
        return {
            ...super.toJSON(),
            oldFarmToken: this.oldFarmToken?.toJSON(),
            newFarmToken: this.newFarmToken?.toJSON(),
            farmSupply: this.farmSupply?.toFixed(),
            rewardToken: this.rewardToken?.toJSON(),
            rewardTokenReserves: this.rewardTokenReserves?.toFixed(),
            oldFarmAttributes: this.oldFarmAttributes?.toJSON(),
            newFarmAttributes: this.newFarmAttributes?.toJSON(),
            createdWithMerge: this.createdWithMerge,
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent(version: FarmVersion) {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(RewardsEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure(version);

        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    getStructure(version: FarmVersion): StructType {
        return new StructType('ClaimRewardsEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition(
                'oldFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('oldFarmTokenNonce', '', new U64Type()),
            new FieldDefinition('oldFarmTokenAmount', '', new BigUIntType()),
            new FieldDefinition(
                'newFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('newFarmTokenNonce', '', new U64Type()),
            new FieldDefinition('newFarmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmSupply', '', new BigUIntType()),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenNonce', '', new U64Type()),
            new FieldDefinition('rewardTokenAmount', '', new BigUIntType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'oldFarmAttributes',
                '',
                FarmTokenAttributes.getStructure(version),
            ),
            new FieldDefinition(
                'newFarmAttributes',
                '',
                FarmTokenAttributes.getStructure(version),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
