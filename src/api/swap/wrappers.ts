import { AMM_TYPE } from '../../config/types';
import { getDexType } from '../util/fetchConfig';
import {
  calculateTokensOutGeneralStable,
  calculateTokensOutTezCtez,
  loadSwapDataGeneralStable,
  loadSwapDataTezCtez,
} from './stableswap';
import { calculateTokenOutputVolatile, loadSwapDataVolatile } from './volatile';
import { BigNumber } from 'bignumber.js';
import { ISwapDataResponse , ICalculateTokenResponse, IRouterResponse } from './types'
import { computeAllPaths } from './router'

export const loadSwapDataWrapper = async (
  tokenIn: string,
  tokenOut: string
): Promise<ISwapDataResponse> => {
  try {
    const type = getDexType(tokenIn, tokenOut);
    let swapData: ISwapDataResponse;

    if (type === AMM_TYPE.VOLATILE) {
      swapData = await loadSwapDataVolatile(tokenIn, tokenOut);
    } else {
      if (
        (tokenIn === 'tez' && tokenOut === 'ctez') ||
        (tokenIn === 'ctez' && tokenOut === 'tez')
      ) {
        swapData = await loadSwapDataTezCtez(tokenIn, tokenOut);
      } else {
        swapData = await loadSwapDataGeneralStable(tokenIn, tokenOut);
      }
    }
    return swapData;
  } catch (error) {
    console.log({ message: 'swap data error', error });
    return {
      success: false,
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      exchangeFee: new BigNumber(0),
      lpTokenSupply: new BigNumber(0),
      lpToken: undefined,
    }
  }
};

export const calculateTokensOutWrapper = (
  tokenIn_amount: BigNumber,
  Exchangefee: BigNumber,
  slippage: BigNumber,
  tokenIn: string,
  tokenOut: string,
  tokenIn_supply?: BigNumber,
  tokenOut_supply?: BigNumber,
  tokenIn_precision?: BigNumber,
  tokenOut_precision?: BigNumber,
  tezSupply?: BigNumber,
  ctezSupply?: BigNumber,
  target?: BigNumber
) : ICalculateTokenResponse => {
  try {
    const type = getDexType(tokenIn, tokenOut);
    let outputData: ICalculateTokenResponse;

    if (type === AMM_TYPE.VOLATILE && tokenIn_supply && tokenOut_supply) {
      outputData = calculateTokenOutputVolatile(
        tokenIn_amount,
        tokenIn_supply,
        tokenOut_supply,
        Exchangefee,
        slippage,
        tokenOut
      );
    } else{
      if (
        ((tokenIn === 'tez' && tokenOut === 'ctez') ||
          (tokenIn === 'ctez' && tokenOut === 'tez')) &&
        tezSupply &&
        ctezSupply &&
        target
      ) {
        outputData = calculateTokensOutTezCtez(
          tezSupply,
          ctezSupply,
          tokenIn_amount,
          Exchangefee,
          slippage,
          target,
          tokenIn
        );
      } else if (
        tokenIn_supply &&
        tokenOut_supply &&
        tokenIn_precision &&
        tokenOut_precision
      ) {
        outputData = calculateTokensOutGeneralStable(
          tokenIn_supply,
          tokenOut_supply,
          tokenIn_amount,
          Exchangefee,
          slippage,
          tokenIn,
          tokenOut,
          tokenIn_precision,
          tokenOut_precision
        );
      }
      // TODO: Ask Kiran once regarding this final else
      else{
        outputData = {
          tokenOut_amount: new BigNumber(0),
          fees: new BigNumber(0),
          feePerc : new BigNumber(0),
          minimum_Out: new BigNumber(0),
          exchangeRate: new BigNumber(0),
          priceImpact: new BigNumber(0),
        };
      }
    }

    return outputData;
  } catch (error) {
    console.log({ message: 'swap data error', error });
    return {
      tokenOut_amount: new BigNumber(0),
      fees: new BigNumber(0),
      feePerc : new BigNumber(0),
      minimum_Out: new BigNumber(0),
      exchangeRate: new BigNumber(0),
      priceImpact: new BigNumber(0),
      error
    };
  }
};

export const computeAllPathsWrapper = (
  paths: string[],
  tokenIn_amount: BigNumber,
  slippage: BigNumber,
  swapData: any[][],
): IRouterResponse => {
  try {
      const bestPath = computeAllPaths(paths, tokenIn_amount, slippage, swapData);

      const isStable: boolean[] = [];
      let finalPriceImpact = new BigNumber(0);
      let finalFeePerc = new BigNumber(0);

      for (var x of bestPath.priceImpact) {
          finalPriceImpact = finalPriceImpact.plus(x);
      }

      for (var x of bestPath.feePerc) {
          finalFeePerc = finalFeePerc.plus(x);
          if (x.isEqualTo(new BigNumber(0.1))) isStable.push(true);
          else isStable.push(false);
      }

      const exchangeRateCalculation = computeAllPaths(
          [bestPath.path.join(' ')],
          new BigNumber(1),
          new BigNumber(0),
          swapData
      );

      return {
          path: bestPath.path,
          tokenOut_amount: bestPath.tokenOut_amount,
          finalMinimumTokenOut:
              bestPath.minimumTokenOut[bestPath.minimumTokenOut.length - 1],
          minimumTokenOut: bestPath.minimumTokenOut,
          finalPriceImpact: finalPriceImpact,
          finalFeePerc: finalFeePerc,
          feePerc: bestPath.feePerc,
          isStable: isStable,
          exchangeRate: exchangeRateCalculation.tokenOut_amount,
      };
  } catch (error) {
      console.log(error);
      return {
          path: [],
          tokenOut_amount: new BigNumber(0),
          finalMinimumTokenOut: new BigNumber(0),
          minimumTokenOut: [],
          finalPriceImpact: new BigNumber(0),
          finalFeePerc: new BigNumber(0),
          feePerc: [],
          isStable: [],
          exchangeRate: new BigNumber(0),
      };
  }
};