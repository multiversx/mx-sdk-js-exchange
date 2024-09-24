import {
    BigUIntType,
    BinaryCodec,
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
import { UnstakeEventType } from './staking.types';

export class UnstakeEvent extends RawEvent {
    readonly decodedTopics: StakingEventsTopics;

    readonly farmingToken: EsdtTokenPayment;
    readonly farmToken: EsdtTokenPayment;
    readonly farmSupply: BigNumber;
    readonly rewardTokens: EsdtTokenPayment;
    readonly rewardTokenReserves: BigNumber;
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
        this.rewardTokens = EsdtTokenPayment.fromDecodedAttributes(
            decodedEvent.reward_tokens,
        );
        this.rewardTokenReserves = decodedEvent.reward_reserve;
        this.farmAttributes = StakingFarmTokenAttributes.fromAttributes(
            Buffer.from(decodedEvent.farm_attributes).toString('base64'),
        );
    }

    toJSON(): UnstakeEventType {
        return {
            farmingToken: this.farmingToken.toJSON(),
            farmToken: this.farmToken.toJSON(),
            farmSupply: this.farmSupply.toFixed(),
            rewardTokens: this.rewardTokens.toJSON(),
            rewardTokenReserves: this.rewardTokenReserves.toFixed(),
            farmAttributes: this.farmAttributes.toJSON(),
        };
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(UnstakeEvent.name);
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
                'reward_tokens',
                '',
                EsdtTokenPayment.getStructure(),
            ),
            new FieldDefinition('reward_reserve', '', new BigUIntType()),
            new FieldDefinition('farm_attributes', '', new BytesType()),
        ]);
    }
}
