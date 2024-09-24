import {
    BigUIntType,
    BinaryCodec,
    BooleanType,
    BytesType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
} from '@multiversx/sdk-core';
import { ErrInvalidDataField } from '../../errors';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import {
    EsdtTokenPayment,
    StakingFarmTokenAttributes,
} from '../../attributes-decoder';
import BigNumber from 'bignumber.js';
import { StakingEventsTopics } from './staking.event.topics';
import { StakeEventType } from './staking.types';

export class StakeEvent extends RawEvent {
    readonly decodedTopics: StakingEventsTopics;

    readonly farmingToken: EsdtTokenPayment;
    readonly farmToken: EsdtTokenPayment;
    readonly farmSupply: BigNumber;
    readonly rewardTokenID: string;
    readonly rewardTokenReserves: BigNumber;
    readonly createdWithMerge: boolean;
    readonly farmAttributes: StakingFarmTokenAttributes;

    constructor(init: RawEventType) {
        super(init);

        this.decodedTopics = new StakingEventsTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        this.farmingToken = new EsdtTokenPayment({
            tokenIdentifier: decodedEvent.farming_token_id,
            tokenNonce: 0,
            amount: decodedEvent.farming_token_amount.toFixed(),
        });
        this.farmToken = EsdtTokenPayment.fromDecodedAttributes(
            decodedEvent.farm_token,
        );
        this.farmSupply = decodedEvent.farm_supply;
        this.rewardTokenID = decodedEvent.reward_token_id;
        this.rewardTokenReserves = decodedEvent.reward_token_reserves;
        this.createdWithMerge = decodedEvent.created_with_merge;
        this.farmAttributes = StakingFarmTokenAttributes.fromAttributes(
            Buffer.from(decodedEvent.farm_attributes).toString('base64'),
        );
    }

    toJSON(): StakeEventType {
        return {
            farmingToken: this.farmingToken.toJSON(),
            rewardTokenReserves: this.rewardTokenReserves.toFixed(),
            farmToken: this.farmToken.toJSON(),
            farmSupply: this.farmSupply.toFixed(),
            rewardTokenID: this.rewardTokenID,
            createdWithMerge: this.createdWithMerge,
            farmAttributes: this.farmAttributes.toJSON(),
        };
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(StakeEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStruct = this.getStructure();
        const [decoded] = codec.decodeNested(data, eventStruct);
        return decoded.valueOf();
    }

    getStructure(): StructType {
        return new StructType('EnterFarmEvent', [
            new FieldDefinition(
                'farming_token_id',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('farming_token_amount', '', new BigUIntType()),
            new FieldDefinition(
                'farm_token',
                '',
                EsdtTokenPayment.getStructure(),
            ),
            new FieldDefinition('farm_supply', '', new BigUIntType()),
            new FieldDefinition(
                'reward_token_id',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('reward_token_reserves', '', new BigUIntType()),
            new FieldDefinition('farm_attributes', '', new BytesType()),
            new FieldDefinition('created_with_merge', '', new BooleanType()),
        ]);
    }
}
