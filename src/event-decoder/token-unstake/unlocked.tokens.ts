import { BinaryCodec, ListType } from '@multiversx/sdk-core';
import { UnstakePair } from '../../attributes-decoder/token-unstake/unstake.pair';
import { UnstakePairType } from '../../attributes-decoder/token-unstake/unstake.pair.type';
import { ErrInvalidDataField, ErrInvalidTopicsField } from '../../errors';
import { RawEventType } from '../generic.types';
import { RawEvent } from '../raw.event';
import { UserUnlockedTokensType } from './token.unstake.types';
import { UserUnlockedTokensTopics } from './unlocked.tokens.topics';

export class UserUnlockedTokensEvent extends RawEvent {
    readonly decodedTopics: UserUnlockedTokensTopics;

    readonly unstakeTokens: UnstakePair[];

    constructor(init: RawEventType) {
        super(init);
        if (!init.topics) {
            throw new ErrInvalidTopicsField(UserUnlockedTokensEvent.name);
        }
        this.decodedTopics = new UserUnlockedTokensTopics(init.topics);
        const rawUnstakeTokens = this.decodeEvent();
        this.unstakeTokens = rawUnstakeTokens.map(
            (unstakePair: UnstakePairType) =>
                UnstakePair.fromDecodedAttributes(unstakePair),
        );
    }

    toJSON(): UserUnlockedTokensType {
        return {
            address: this.address,
            identifier: this.identifier,
            unstakeTokens: this.unstakeTokens.map((unstakeToken) =>
                unstakeToken.toJSON(),
            ),
        };
    }

    private decodeEvent() {
        if (this.data == undefined) {
            throw new ErrInvalidDataField(UserUnlockedTokensEvent.name);
        }

        const data = Buffer.from(this.data, 'base64');
        const codec = new BinaryCodec();

        const decoded = codec.decodeTopLevel(
            data,
            new ListType(UnstakePair.getStructure()),
        );
        return decoded.valueOf();
    }
}
