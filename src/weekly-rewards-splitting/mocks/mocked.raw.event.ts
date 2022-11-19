import { RawEvent } from "../../event-decoder";


export const rawUpdateGlobalAmountsEvent = new RawEvent({
    address: 'erd1qqqqqqqqqqqqqpgqur83hqn9j4y6v93m09nn2q0yazuhk2rvpr9sarz5yj',
    identifier: 'claimRewards',
    topics: [
        'dXBkYXRlX2dsb2JhbF9hbW91bnRzX2V2ZW50=',
        'qQ==',
        'SN4+LMEWygMtqMAA',
        '7p5T9Z6M1HqZrYVqSg==',
    ],
    data: '',
});

export const rawUpdateUserEnergyEvent = new RawEvent({
    address: 'erd1qqqqqqqqqqqqqpgqur83hqn9j4y6v93m09nn2q0yazuhk2rvpr9sarz5yj',
    identifier: 'claimRewards',
    topics: [
        'dXBkYXRlX3VzZXJfZW5lcmd5X2V2ZW50',
        'DRA1pm/x2UbKbWeijRXYNbn49/LDbYk5+UeRC/VlBCU=',
        'qQ==',
        'AAAADQEFcB8gX4RUt3uQgAAAAAAAAAAKzwAAAAsutHRSPnCbMWSAAA==',
    ],
    data: '',
});

export const rawClaimMultiEventNoRewards = new RawEvent({
    address: 'erd1qqqqqqqqqqqqqpgqur83hqn9j4y6v93m09nn2q0yazuhk2rvpr9sarz5yj',
    identifier: 'claimRewards',
    topics: [
        'Y2xhaW1fbXVsdGlfZXZlbnQ=',
        'DRA1pm/x2UbKbWeijRXYNbn49/LDbYk5+UeRC/VlBCU=',
        'qQ==',
        'AAAADQEFcB8gX4RUt3uQgAAAAAAAAAAKzwAAAAsutHRSPnCbMWSAAA==',
    ],
    data: '',
});

export const rawClaimMultiEventWithRewards = new RawEvent({
    address: 'erd1qqqqqqqqqqqqqpgqur83hqn9j4y6v93m09nn2q0yazuhk2rvpr9sarz5yj',
    identifier: 'claimRewards',
    topics: [
        'Y2xhaW1fbXVsdGlfZXZlbnQ=',
        'DRA1pm/x2UbKbWeijRXYNbn49/LDbYk5+UeRC/VlBCU=',
        'zA==',
        'AAAADQCbVo2ivf+a362sAAAAAAAAAAAK8gAAAAsccgBMrfZnziIAAA==',
    ],
    data: '0000000c5745474c442d64376336626200000000000000000000000702f46aead28a1b0000000d50524f54454f2d643165663339000000000000000000000006850ba45baeef0000000d4453555045522d39616638646600000000000000000000000801f381f9e6bf7e03',
});
