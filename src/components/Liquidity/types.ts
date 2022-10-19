import { BigNumber } from 'bignumber.js';

export interface IBalanceResponse {
  success: boolean;
  balance: BigNumber;
  identifier: string;
  error?: any;
}

export interface ISwapData {
  tokenInSupply: BigNumber;
  tokenOutSupply: BigNumber;
  lpToken: string | undefined;
  lpTokenSupply: BigNumber;
  isloading?: boolean;
}
export interface tokenParameterLiquidity {
  name: string;
  image: any;
  symbol: string;
}
