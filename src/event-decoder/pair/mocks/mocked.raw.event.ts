import { RawEventType } from '../../generic.types';

export const rawAddLiquidityEvent: RawEventType = {
    address: 'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
    identifier: 'addLiquidity',
    topics: [
        'YWRkX2xpcXVpZGl0eQ==',
        'V0VHTEQtZDdjNmJi',
        'TUVYLWRjMjg5Yw==',
        'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOs=',
        'AaY=',
    ],
    data: 'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOsAAAAMV0VHTEQtZDdjNmJiAAAACA3gtrOnZAAAAAAACk1FWC1kYzI4OWMAAAALAd2dBVqPm1WQus0AAAAORUdMRE1FWC1jMjliMGUAAAAIGVJP+UphDWMAAAAJVliatA0RsWe1AAAACS9StZK8KUai8wAAAAwGXKfVif5m3k+kyuMAAAAAAAe2mQAAAAAAAAGmAAAAAGJxVOY=',
};

export const rawRemoveLiquidityEvent: RawEventType = {
    address: 'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
    identifier: 'removeLiquidity',
    topics: [
        'cmVtb3ZlX2xpcXVpZGl0eQ==',
        'V0VHTEQtZDdjNmJi',
        'TUVYLWRjMjg5Yw==',
        'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOs=',
        'AbA=',
    ],
    data: 'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOsAAAAMV0VHTEQtZDdjNmJiAAAACA53PRJHvS1gAAAACk1FWC1kYzI4OWMAAAALAiagMnZ07SEyyK0AAAAORUdMRE1FWC1jMjliMGUAAAAIG8FtZ07IAAAAAAAJVjzZRqXC6We1AAAACSzyHHmht78awwAAAAwGrtEBQrHe0Ec3BkEAAAAAAAfnLwAAAAAAAAGwAAAAAGJyeX4=',
};

export const rawSwapFixedInputEvent: RawEventType = {
    address: 'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
    identifier: 'swapTokensFixedInput',
    topics: [
        'c3dhcA==',
        'V0VHTEQtZDdjNmJi',
        'TUVYLWRjMjg5Yw==',
        'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOs=',
        'AbA=',
    ],
    data: 'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOsAAAAMV0VHTEQtZDdjNmJiAAAACA3gtrOnZAAAAAAACk1FWC1kYzI4OWMAAAALAg4G/P0nHBAQb8AAAAAHAca/UmNAAAAAAAks//0wVV8jGsMAAAAMBqzCttHN8WBD5crgAAAAAAAH5zwAAAAAAAABsAAAAABicnnM',
};

export const rawSwapFixedOutputEvent: RawEventType = {
    address: 'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
    identifier: 'swapTokensFixedOutput',
    topics: [
        'c3dhcA==',
        'V0VHTEQtZDdjNmJi',
        'TUVYLWRjMjg5Yw==',
        'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOs=',
        'AbA=',
    ],
    data: 'NEq8RBGc/KziU94F4zwBeWwS+W87zFK1BLm8K5aSfOsAAAAMV0VHTEQtZDdjNmJiAAAACA3gtrOl8NT2AAAACk1FWC1kYzI4OWMAAAALAgzDVWkctbXugAAAAAAHAca/UmMQfQAAAAktDd3nCQUT77kAAAAMBqq1sDH4RJFY9piUAAAAAAAH50wAAAAAAAABsAAAAABicnoy',
};

export const rawSwapNoFeeEvent: RawEventType = {
    address: 'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
    identifier: 'swapNoFeeAndForward',
    topics: [
        'c3dhcF9ub19mZWVfYW5kX2ZvcndhcmQ=',
        'TUVYLWRjMjg5Yw==',
        'AAAAAAAAAAAFAAa9xh677HGbB7Sn6/0fshXAcG48fOs=',
        'AbA=',
    ],
    data: 'AAAAAAAAAAAFAAa9xh677HGbB7Sn6/0fshXAcG48fOsAAAAMV0VHTEQtZDdjNmJiAAAAB5pZwTC9lHIAAAAKTUVYLWRjMjg5YwAAAAoW1rGIh5yGJp+9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfnWgAAAAAAAAGwAAAAAGJyeoY=',
};
