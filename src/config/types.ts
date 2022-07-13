export interface IConfig {
  TOKEN_CONFIG : string,
  AMM_CONFIG : string,
  NAME: string;
  API: IApi;
  RPC_NODES: INodes;
  TZKT_NODES: INodes;
  CTEZ: INodes;
  EXPLORER_LINKS: IExplorerLinks;

  TOKEN_CONTRACTS: {
    testnet: Record<string, ITokenContract>;
    mainnet: Record<string, ITokenContract>;
  };
  SERVERLESS_BASE_URL: INodes;
  SERVERLESS_REQUEST: {
    testnet: Record<string, string>;
    mainnet: Record<string, string>;
  };
  ROUTER: { mainnet: string; testnet: string };
  STABLESWAP: {
    testnet: Record<string, IStableAmmContract>;
    mainnet: Record<string, IStableAmmContract>;
  };
  AMM: {
    testnet: Record<string, IAmmContract1 | IAmmContract2>;
    mainnet: Record<string, IAmmContract1 | IAmmContract2>;
  };
  
  WRAPPED_ASSETS: {
    testnet: Record<string, IWrappedToken>;
    mainnet: Record<string, IWrappedToken>;
  };

  NETWORK: 'mainnet' | 'testnet';
  WALLET_NETWORK: string;
  ADMIN_ADDRESS: string;
  BURNER: string;
}

interface IApi {
  url: string;
  API_KEY: string;
  tezToolTokenPrice: string;
}

interface INodes {
  testnet: string;
  mainnet: string;
}

interface IExplorerLinks {
  ETHEREUM: string;
  TEZOS: string;
  RINKEBY: string;
}

export type TTokenType = 'FA2' | 'FA1.2' | 'XTZ';

export interface ITokenContract {
  address: string;
  mapId: number;
  decimal: number;
  type: TTokenType;
  tokenId: number;
}

export interface IFarm {
  LP_TOKEN: string;
  CONTRACT: string;
  DEX: string;
  TOKEN_ADDRESS: string;
  CARD_TYPE: string;
  TOKEN_DECIMAL: number;
  TYPE: TTokenType;
  TOKEN_ID?: number;
  LP_DECIMAL: number;
  TEMP_ADDRESS: string;
  DECIMAL: number;
  withdrawalFeeType: TWithdrawalType;
  liquidityLink?: string;
  isDualFarm: boolean;
  message?: string;
  bannerType?: string;
  farmType: string;
  dualInfo?: Record<'tokenFirst' | 'tokenSecond', IDualToken>;
}

interface IStableAmmContract {
  ICON: string;
  TOKEN_CONTRACT: string;
  mapId?: number;
  READ_TYPE: TTokenType;
  CALL_TYPE: TTokenType;
  TOKEN_ID: number;
  TOKEN_DECIMAL: number;
  DEX_PAIRS: Record<string, IAmmDexPair>;
}

interface IAmmContract1 {
  ICON: string;
  TOKEN_CONTRACT: string;
  mapId?: number;
  READ_TYPE: TTokenType;
  CALL_TYPE: TTokenType;
  TOKEN_ID: number;
  TOKEN_DECIMAL: number;
  DEX_PAIRS: Record<string, IAmmDexPair>;
}

interface IAmmContract2 {
  ICON: string;
  TOKEN_CONTRACT: string;
  READ_TYPE: string;
  TOKEN_ID: number;
  TOKEN_DECIMAL: number;
  CALL_TYPE: string;
}

interface IAmmDexPair {
  contract: string;
  property: string;
  liquidityToken: string;
  type: string;
}

interface IFarmContract {
  address: string;
  mapId: number;
  decimal: number;
  tokenDecimal: number;
  dualInfo?: Record<'tokenFirst' | 'tokenSecond', IDualToken>;
}

export type TWithdrawalType = 'type1' | 'type2' | 'type3' | 'type4' | 'type5';

interface IWithdrawalType {
  block: number;
  rate: number;
  duration: string;
}

export interface IXPlenty {
  testnet: IXPlentyNet;
  mainnet: IXPlentyNet;
}

export interface IXPlentyNet {
  plentyTokenContract: IPlentyTokenContract;
  xPlentyTokenContract: IPlentyTokenContract;
  rewardManager: IRewardManager;
  xPlentyCurve: IXPlentyCurve;
}

export interface IPlentyTokenContract {
  address: string;
  balancesMapId: number;
  decimal: number;
}

export interface IRewardManager {
  address: string;
}

export interface IXPlentyCurve {
  address: string;
  bigMapExpression: string;
}

export interface IGovernance {
  address: string;
  mapId: number;
}

export interface IDualToken {
  symbol: string;
  tokenContract: string;
  tokenDecimal: number;
  tokenType: TTokenType;
  tokenId: number;
  rewardContract: string;
  rewardMapId?: number;
}

interface IWrappedToken {
  ICON: string;
  TOKEN_CONTRACT: string;
  mapId?: number;
  TOKEN_ID: number;
  TOKEN_DECIMAL: number;
  REF_TOKEN: string;
  READ_TYPE: TTokenType;
}

export interface ITokenInterface {
  address?:  string;
  symbol:   string;
  type:     TTokenType;
  tokenId?:  number;
  decimals: number;
  mapId?:    number;
}

export interface IAMM {
  address: string;
  token1:  ITokenInterface;
  token2:  ITokenInterface;
  type:    AMM_TYPE;
  token1Precision?: number,
  token2Precision?: number,
  lpToken: ITokenInterface;
}

export enum AMM_TYPE {
NORMAL = 'NORMAL',
FLAT = 'FLAT'
}

export enum TokenType{
  FA12 = 'FA1.2',
  FA2 = 'FA2',
  XTZ = 'XTZ'
}
