import {
    Address,
    AddressType,
    BigUIntType,
    BinaryCodec,
    BooleanType,
    FieldDefinition,
    StructType,
    TokenIdentifierType,
    U64Type,
} from '@multiversx/sdk-core';
import { WrappedFarmTokenAttributes } from '../../attributes-decoder/proxy/wrappedFarm.token';
import { ErrInvalidDataField } from '../../errors';
import { GenericToken } from '../../generic.token';
import { GenericEvent } from '../generic.event';
import { RawEventType } from '../generic.types';
import { RewardsProxyEventType } from './farm.proxy.types';
import { FarmProxyTopics } from './proxy.event.topics';

export class RewardsProxyEvent extends GenericEvent {
    private decodedTopics: FarmProxyTopics;

    private farmAddress: Address | undefined;
    private oldWrappedFarmToken: GenericToken | undefined;
    private newWrappedFarmToken: GenericToken | undefined;
    private oldWrappedFarmAttributes: WrappedFarmTokenAttributes | undefined;
    private newWrappedFarmAttributes: WrappedFarmTokenAttributes | undefined;
    private createdWithMerge: boolean | undefined;

    constructor(init: RawEventType) {
        super(init);
        this.decodedTopics = new FarmProxyTopics(this.topics);
        const decodedEvent = this.decodeEvent();
        Object.assign(this, decodedEvent);
        this.oldWrappedFarmToken = new GenericToken({
            tokenID: decodedEvent.oldWrappedFarmTokenID.toString(),
            nonce: decodedEvent.oldWrappedFarmTokenNonce,
            amount: decodedEvent.oldWrappedFarmTokenAmount,
        });
        this.newWrappedFarmToken = new GenericToken({
            tokenID: decodedEvent.newWrappedFarmTokenID.toString(),
            nonce: decodedEvent.newWrappedFarmTokenNonce,
            amount: decodedEvent.newWrappedFarmTokenAmount,
        });
        this.oldWrappedFarmAttributes =
            WrappedFarmTokenAttributes.fromDecodedAttributes(
                decodedEvent.oldWrappedFarmAttributes,
            );
        this.newWrappedFarmAttributes =
            WrappedFarmTokenAttributes.fromDecodedAttributes(
                decodedEvent.newWrappedFarmAttributes,
            );
    }

    toJSON(): RewardsProxyEventType {
        return {
            ...super.toJSON(),
            farmAddress: this.farmAddress?.toString(),
            oldWrappedFarmToken: this.oldWrappedFarmToken?.toJSON(),
            newWrappedFarmToken: this.newWrappedFarmToken?.toJSON(),
            oldWrappedFarmAttributes: this.oldWrappedFarmAttributes?.toJSON(),
            newWrappedFarmAttributes: this.newWrappedFarmAttributes?.toJSON(),
            createdWithMerge: this.createdWithMerge,
        };
    }

    getTopics() {
        return this.decodedTopics.toPlainObject();
    }

    decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(RewardsProxyEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const eventStructure = this.getStructure();

        const [decoded] = codec.decodeNested(data, eventStructure);
        return decoded.valueOf();
    }

    getStructure(): StructType {
        return new StructType('ClaimRewardsProxyEvent', [
            new FieldDefinition('caller', '', new AddressType()),
            new FieldDefinition('farmAddress', '', new AddressType()),
            new FieldDefinition(
                'oldWrappedFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('oldWrappedFarmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'oldWrappedFarmTokenAmount',
                '',
                new BigUIntType(),
            ),
            new FieldDefinition(
                'newWrappedFarmTokenID',
                '',
                new TokenIdentifierType(),
            ),
            new FieldDefinition('newWrappedFarmTokenNonce', '', new U64Type()),
            new FieldDefinition(
                'newWrappedFarmTokenAmount',
                '',
                new BigUIntType(),
            ),
            new FieldDefinition(
                'oldWrappedFarmAttributes',
                '',
                WrappedFarmTokenAttributes.getStructure(),
            ),
            new FieldDefinition(
                'newWrappedFarmAttributes',
                '',
                WrappedFarmTokenAttributes.getStructure(),
            ),
            new FieldDefinition('createdWithMerge', '', new BooleanType()),
            new FieldDefinition('block', '', new U64Type()),
            new FieldDefinition('epoch', '', new U64Type()),
            new FieldDefinition('timestamp', '', new U64Type()),
        ]);
    }
}
