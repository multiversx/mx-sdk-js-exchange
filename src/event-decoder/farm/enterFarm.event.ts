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
import { EnterFarmEventType } from './farm.types';

export class EnterFarmEvent extends GenericEvent {
    private decodedTopics: FarmEventsTopics;

    private farmingToken: GenericToken | undefined;
    private farmingReserve: BigNumber | undefined;
    private farmToken: GenericToken | undefined;
    private farmSupply: BigNumber | undefined;
    private rewardToken: GenericToken | undefined;
    private rewardTokenReserves: BigNumber | undefined;
    private farmAttributes: FarmTokenAttributes | undefined;
    private createdWithMerge: boolean | undefined;

    constructor(version: FarmVersion, init?: Partial<GenericEvent>) {
        super(init);
        this.decodedTopics = new FarmEventsTopics(this.topics);
        const decodedEvent = this.decodeEvent(version);
        Object.assign(this, decodedEvent);
        this.farmingToken = new GenericToken({
            tokenID: decodedEvent.farmingTokenID.toString(),
            amount: decodedEvent.farmingTokenAmount,
        });
        this.farmToken = new GenericToken({
            tokenID: decodedEvent.farmTokenID.toString(),
            nonce: decodedEvent.farmTokenNonce,
            amount: decodedEvent.farmTokenAmount,
        });
        this.rewardToken = new GenericToken({
            tokenID: decodedEvent.rewardTokenID.toString(),
            amount: new BigNumber(0),
        });
        this.farmAttributes = FarmTokenAttributes.fromDecodedAttributes(
            decodedEvent.farmAttributes,
            version,
        );
    }

    getFarmingToken(): GenericToken | undefined {
        return this.farmingToken;
    }

    getFarmingReserve(): BigNumber | undefined {
        return this.farmingReserve;
    }

    getFarmToken(): GenericToken | undefined {
        return this.farmToken;
    }

    getFarmSupply(): BigNumber | undefined {
        return this.farmSupply;
    }

    getRewardTokenReserve(): GenericToken | undefined {
        return this.rewardToken;
    }

    toJSON(): EnterFarmEventType {
        return {
            ...super.toJSON(),
            farmingToken: this.farmingToken?.toJSON(),
            farmingReserve: this.farmingReserve?.toFixed(),
            farmToken: this.farmToken?.toJSON(),
            farmSupply: this.farmSupply?.toFixed(),
            rewardToken: this.rewardToken?.toJSON(),
            rewardTokenReserves: this.rewardTokenReserves?.toFixed(),
            farmAttributes: this.farmAttributes?.toJSON(),
            createdWithMerge: this.createdWithMerge,
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent(version: FarmVersion) {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(EnterFarmEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure(version);
        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    getStructure(version: FarmVersion): StructType {
        const eventStructType = new StructType('EnterFarmEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition(
                'farmingTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('farmingTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('farmTokenNonce', '', new U64Type()),
            new FieldDefinition('farmTokenAmount', '', new BigUIntType()),
            new FieldDefinition('farmSupply', '', new BigUIntType()),
            new FieldDefinition('rewardTokenID', '', new TokenIdentifierType()),
            new FieldDefinition('rewardTokenReserves', '', new BigUIntType()),
            new FieldDefinition(
                'farmAttributes',
                '',
                FarmTokenAttributes.getStructure(version),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);

        const structFields = eventStructType.getFieldsDefinitions();
        if (version === FarmVersion.V1_2) {
            structFields.splice(
                3,
                0,
                new FieldDefinition('farmingReserve', '', new BigUIntType()),
            );
        }
        return new StructType('EnterFarmEvent', structFields);
    }
}
