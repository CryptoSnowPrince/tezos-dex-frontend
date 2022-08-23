import { BigNumber } from 'bignumber.js'

export const RPC_NODE = "rpcNode";
export const TOKEN_CONFIG = "tokenConfig";
export const AMM_CONFIG = "ammConfig";

/**
 * balance for these type1MapIds will be present in `response.data.args[0].args[1].int`
 */
export const type1MapIds = [3956, 4353];

 /**
  * balance for these type2MapIds will be present in `response.data.args[1].int`
  */
 export const type2MapIds = [3943];
 
 /**
  * balance for these type3MapIds will be present in `response.data.args[0].int`
  */
 export const type3MapIds = [199, 36, 6901, 44140];
 
 /**
  * balance for these type4MapIds will be present in `response.data.int`
  */
 export const type4MapIds = [
   1777, 1772, 515, 4178, 18153, 10978, 7706, 7715, 7654, 20920, 2809, 7250, 13802, 4666, 21182,
   134335, 175082, 89954 , 90227 , 162769
 ];
 
 /**
  * balance for these type5MapIds will be present in `response.data.args[0][0].args[1].int`
  */
 export const type5MapIds = [12043];

export const EPOCH_DURATION_TESTNET: number = 3360000; // milliseconds
export const EPOCH_DURATION_MAINNET: number = 604800000; // milliseconds
export const VOTES_CHART_LIMIT: number = 9;
export const PLY_DECIMAL_MULTIPLIER : BigNumber = new BigNumber(10).pow(18);   // 10 ** 18

export const DAY = EPOCH_DURATION_TESTNET/1000;
export const WEEK = 7 * DAY;
export const YEAR = 52 * WEEK;
export const MAX_TIME = 4 * YEAR;
