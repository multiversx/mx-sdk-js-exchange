export enum PAIR_EVENTS {
    SWAP = 'swap',
    ADD_LIQUIDITY = 'add_liquidity',
    REMOVE_LIQUIDITY = 'remove_liquidity',
    SWAP_NO_FEE = 'swap_no_fee_and_forward',
}

export enum FARM_EVENTS {
    ENTER_FARM = 'enter_farm',
    EXIT_FARM = 'exit_farm',
    CLAIM_REWARDS = 'claim_rewards',
    COMPOUND_REWARDS = 'compound_rewards',
}

export enum FEES_COLLECTOR_EVENTS {
    DEPOSIT_SWAP_FEES = 'deposit_swap_fees_event',
}

export enum WEEKLY_REWARDS_SPLITTING_EVENTS {
    UPDATE_GLOBAL_AMOUNTS = 'update_global_amounts_event',
    UPDATE_USER_ENERGY = 'update_user_energy_event',
    CLAIM_MULTI = 'claim_multi_event',
}

export enum PROXY_EVENTS {
    ADD_LIQUIDITY_PROXY = 'add_liquidity_proxy',
    REMOVE_LIQUIDITY_PROXY = 'remove_liquidity_proxy',
    ENTER_FARM_PROXY = 'enter_farm_proxy',
    EXIT_FARM_PROXY = 'exit_farm_proxy',
    CLAIM_REWARDS_PROXY = 'claim_rewards_farm_froxy',
    COMPOUND_REWARDS_PROXY = 'compound_rewards_farm_proxy',
}

export enum METABONDING_EVENTS {
    STAKE_LOCKED_ASSET = 'stakeEvent',
    UNSTAKE = 'unstakeEvent',
    UNBOND = 'unbondEvent',
}

export enum ROUTER_EVENTS {
    CREATE_PAIR = 'create_pair',
    PAIR_SWAP_ENABLED = 'pairSwapEnabled',
    MULTI_PAIR_SWAP = 'multiPairSwap'
}

export enum TRANSACTION_EVENTS {
    ESDT_NFT_Transfer = 'ESDTNFTTransfer',
    ESDT_NFT_Burn = 'ESDTNFTBurn',
    ESDT_NFT_ADD_QUANTITY = 'ESDTNFTAddQuantity',
    ESDT_NFT_CREATE = 'ESDTNFTCreate',
    MULTI_ESDT_NFT_TRANSFER = 'MultiESDTNFTTransfer',
    ESDT_TRANSFER = 'ESDTTransfer',
    ESDT_BURN = 'ESDTBurn',
    ESDT_LOCAL_MINT = 'ESDTLocalMint',
    ESDT_LOCAL_BURN = 'ESDTLocalBurn',
    ESDT_WIPE = 'ESDTWipe',
    ESDT_FREEZE = 'ESDTFreeze',
    TRANSFER_VALUE_ONLY = 'transferValueOnly',
    WRITE_LOG = 'writeLog',
    SIGNAL_ERROR = 'signalError',
    COMPLETE_TX = 'completedTxEvent',
}

export enum PRICE_DISCOVERY_EVENTS {
    DEPOSIT = 'depositEvent',
    WITHDARW = 'withdrawEvent',
    REDEEM = 'redeemEvent',
}

export enum SIMPLE_LOCK_ENERGY_EVENTS {
    ENERGY_UPDATED = 'energyUpdated',
}

export enum TOKEN_UNSTAKE_EVENTS {
    USER_UNLOCKED_TOKENS = 'userUnlockedTokens',
}

export enum ESCROW_EVENTS {
    LOCK_FUNDS = 'lock_funds_event',
    WITHDRAW = 'withdraw_event',
    CANCEL_TRANSFER = 'cancel_transfer_event',
}

export enum GOVERNANCE_EVENTS {
    UP = "upVoteCast",
    DOWN = "downVoteCast",
    DOWN_VETO = "downVetoVoteCast",
    ABSTAIN = "abstainVoteCast",
}

export type RawEventType = {
    address: string | undefined;
    identifier: string | undefined;
    name?: string | undefined;
    topics?: string[];
    data?: string | undefined;
};

export type GenericEventType = {
    address: string | undefined;
    identifier: string | undefined;
    caller: string | undefined;
    block: number | undefined;
    epoch: number | undefined;
    timestamp: number | undefined;
};
