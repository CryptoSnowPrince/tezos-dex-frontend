import { tezos as Tezos } from '../../common/wallet';
import { getDexAddress } from '../util/fetchConfig';
import { BigNumber } from 'bignumber.js';
import { store } from '../../redux';

export const loadSwapDataVolatile = async (
  tokenIn: string,
  tokenOut: string
): Promise<{
  success: boolean;
  tokenIn: string;
  tokenIn_supply: BigNumber;
  tokenOut: string;
  tokenOut_supply: BigNumber;
  exchangeFee: BigNumber;
  lpTokenSupply: BigNumber;
  lpToken: any;
  dexContractInstance: any;
}> => {
  try {
    const state = store.getState();
    const TOKEN = state.config.standard;
    const AMM = state.config.AMMs;
    // const TOKEN = useAppSelector((state) => state.config.standard);
    // const AMM = useAppSelector((state) => state.config.AMMs);

    const dexContractAddress = getDexAddress(tokenIn, tokenOut);
    if (dexContractAddress === 'false') {
      throw 'No dex found';
    }

    const dexContractInstance = await Tezos.contract.at(dexContractAddress);
    const dexStorage: any = await dexContractInstance.storage();
    const lpFee = new BigNumber(await dexStorage.lpFee);

    const token1_pool = new BigNumber(await dexStorage.token1_pool);
    const token2_pool = new BigNumber(await dexStorage.token2_pool);
    let lpTokenSupply = new BigNumber(await dexStorage.totalSupply);
    const lpToken = AMM[dexContractAddress].lpToken;

    let tokenIn_supply = new BigNumber(0);
    let tokenOut_supply = new BigNumber(0);
    if (tokenOut === AMM[dexContractAddress].token2.symbol) {
      tokenOut_supply = token2_pool;
      tokenIn_supply = token1_pool;
    } else if (tokenOut === AMM[dexContractAddress].token1.symbol) {
      tokenOut_supply = token1_pool;
      tokenIn_supply = token2_pool;
    }

    const lpTokenDecimal = lpToken.decimals;
    const tokenIn_Decimal = TOKEN[tokenIn].decimals;
    const tokenOut_Decimal = TOKEN[tokenOut].decimals;

    tokenIn_supply = tokenIn_supply.dividedBy(Math.pow(10, tokenIn_Decimal));
    tokenOut_supply = tokenOut_supply.dividedBy(Math.pow(10, tokenOut_Decimal));
    lpTokenSupply = lpTokenSupply.dividedBy(Math.pow(10, lpTokenDecimal));
    const exchangeFee = new BigNumber(1).dividedBy(lpFee);
    return {
      success: true,
      tokenIn,
      tokenIn_supply,
      tokenOut,
      tokenOut_supply,
      exchangeFee,
      lpTokenSupply,
      lpToken,
      dexContractInstance,
    };
  } catch (error) {
    console.log({ message: 'Volatileswap data error', error });
    return {
      success: true,
      tokenIn,
      tokenIn_supply: new BigNumber(0),
      tokenOut,
      tokenOut_supply: new BigNumber(0),
      exchangeFee: new BigNumber(0),
      lpTokenSupply: new BigNumber(0),
      lpToken: null,
      dexContractInstance: null,
    };
  }
};

export const calculateTokenOutputVolatile = (
  tokenIn_amount: BigNumber,
  tokenIn_supply: BigNumber,
  tokenOut_supply: BigNumber,
  exchangeFee: BigNumber,
  slippage: BigNumber,
  tokenOut : string,
): {
  tokenOut_amount: BigNumber;
  fees: BigNumber;
  feePerc : BigNumber;
  minimum_Out: BigNumber;
  exchangeRate: BigNumber;
  priceImpact: BigNumber;
} => {
  try {

    const state = store.getState();
    const TOKEN = state.config.standard;

    const feePerc = new BigNumber(0.35);
    let tokenOut_amount = new BigNumber(0);
    tokenOut_amount = new BigNumber(1)
      .minus(exchangeFee)
      .multipliedBy(tokenOut_supply)
      .multipliedBy(tokenIn_amount);
    tokenOut_amount = tokenOut_amount.dividedBy(
      tokenIn_supply.plus(
        new BigNumber(1).minus(exchangeFee).multipliedBy(tokenIn_amount)
      )
    );

    tokenOut_amount = new BigNumber(tokenOut_amount.precision(TOKEN[tokenOut].decimals));

    const fees = tokenIn_amount.multipliedBy(exchangeFee);
    let minimum_Out = tokenOut_amount.minus(
      slippage.multipliedBy(tokenOut_amount).dividedBy(100)
    );

    minimum_Out = new BigNumber(minimum_Out.precision(TOKEN[tokenOut].decimals));

    const updated_TokenIn_Supply = tokenIn_supply.minus(tokenIn_amount);
    const updated_TokenOut_Supply = tokenOut_supply.minus(tokenOut_amount);
    let next_tokenOut_Amount = new BigNumber(1)
      .minus(exchangeFee)
      .multipliedBy(updated_TokenOut_Supply)
      .multipliedBy(tokenIn_amount);
    next_tokenOut_Amount = next_tokenOut_Amount.dividedBy(
      updated_TokenIn_Supply.plus(
        new BigNumber(1).minus(exchangeFee).multipliedBy(tokenIn_amount)
      )
    );
    let priceImpact = tokenOut_amount
      .minus(next_tokenOut_Amount)
      .dividedBy(tokenOut_amount);
    priceImpact = priceImpact.multipliedBy(100);
    priceImpact = new BigNumber(Math.abs(Number(priceImpact)));
    priceImpact = priceImpact.multipliedBy(100);
    const exchangeRate = tokenOut_amount.dividedBy(tokenIn_amount);
    console.log(tokenOut_amount, fees, minimum_Out, exchangeRate, priceImpact);
    return {
      tokenOut_amount,
      fees,
      feePerc,
      minimum_Out,
      exchangeRate,
      priceImpact,
    };
  } catch (error) {
    return {
      tokenOut_amount: new BigNumber(0),
      fees: new BigNumber(0),
      feePerc : new BigNumber(0),
      minimum_Out: new BigNumber(0),
      exchangeRate: new BigNumber(0),
      priceImpact: new BigNumber(0),
    };
  }
};
