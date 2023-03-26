import { BigNumber } from "bignumber.js";
import { VolumeV1Data, VolumeVeData } from "../api/pools/types";
import { connectedNetwork } from "../common/walletconnect";
import invariant from "tiny-invariant";
import JSBI from "jsbi";
import { IConfigToken, TokenStandard } from "../config/types";
import { SqrtPriceMath } from "@uniswap/v3-sdk";

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
export const type2MapIds = [3943, 162769];

/**
 * balance for these type3MapIds will be present in `response.data.args[0].int`
 */
export const type3MapIds = [199, 36, 6901, 44140, 176599];

/**
 * balance for these type4MapIds will be present in `response.data.int`
 */
export const type4MapIds = [
  1777, 1772, 515, 4178, 18153, 10978, 7706, 7715, 7654, 20920, 2809, 7250, 13802, 4666, 21182,
  134335, 175082, 89954, 90227, 195389,
];

/**
 * balance for these type5MapIds will be present in `response.data.args[0][0].args[1].int`
 */
export const type5MapIds = [12043];

export const EPOCH_DURATION_TESTNET: number = 604800000; // milliseconds
export const EPOCH_DURATION_MAINNET: number = 604800000; // milliseconds
export const VOTES_CHART_LIMIT: number = 9;
export const PLY_DECIMAL_MULTIPLIER: BigNumber = new BigNumber(10).pow(18); // 10 ** 18

const DAY_TESTNET = 86400;
const DAY_MAINNET = 86400;
export const DAY = connectedNetwork === "testnet" ? DAY_TESTNET : DAY_MAINNET;
export const WEEK = 7 * DAY;
export const YEAR = 52 * WEEK;
export const MAX_TIME = 4 * YEAR;

export const EMPTY_POOLS_OBJECT: VolumeVeData = {
  pool: "",
  volume24H: { value: "0", token1: "0", token2: "0" },
  volume7D: { value: "0", token1: "0", token2: "0" },
  fees24H: { value: "0", token1: "0", token2: "0" },
  fees7D: { value: "0", token1: "0", token2: "0" },
  feesEpoch: { value: "0", token1: "0", token2: "0" },
  tvl: { value: "0", token1: "0", token2: "0" },
};

export const EMPTY_VE_INDEXER_POOLS_OBJECT: VolumeV1Data = {
  pool: "",
  bribes: [],
  apr: "0",
  futureApr: "0",
};

export const API_RE_ATTEMPTS: number = 3;
export const API_RE_ATTAMPT_DELAY: number = 5000;
export const POOLS_PAGE_LIMIT: number = 10;
export const TWEET_CHARACTER_LIMIT: number = 280;
export const GAS_LIMIT_EXCESS: BigNumber = new BigNumber(30).dividedBy(100);
export const STORAGE_LIMIT_EXCESS: BigNumber = new BigNumber(50).dividedBy(100);
export const PROMISE_ALL_CONCURRENCY_LIMIT: number = 8;

export enum FEE_TIER {
  NONE = 0,
  TIER1 = 500,
  TIER2 = 3000,
  TIER3 = 10000,
}

export const MIN_TICK: number = -887272;
export const MAX_TICK: number = -MIN_TICK;
export const MAX_SAFE_INTEGER = JSBI.BigInt(Number.MAX_SAFE_INTEGER);
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);

// exports for external consumption
export type BigintIsh = JSBI | string | number;

export const Q32 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(32));
// used in liquidity amount math
export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2));
export const MaxUint256 = JSBI.BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);
/**
 * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
 */
export const MIN_SQRT_RATIO: JSBI = JSBI.BigInt("4295128739");
/**
 * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
 */
export const MAX_SQRT_RATIO: JSBI = JSBI.BigInt(
  "1461446703485210103287273052203988822378723970342"
);

export function mulShift (val: JSBI, mulBy: string): JSBI {
  return JSBI.signedRightShift(JSBI.multiply(val, JSBI.BigInt(mulBy)), JSBI.BigInt(128));
}

/**
 * Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
 * @param tick the tick for which to compute the sqrt ratio
 */
export function getSqrtRatioAtTick (tick: number): JSBI {
  invariant(tick >= MIN_TICK && tick <= MAX_TICK && Number.isInteger(tick), "TICK");
  const absTick: number = tick < 0 ? tick * -1 : tick;

  let ratio: JSBI =
    (absTick & 0x1) != 0
      ? JSBI.BigInt("0xfffcb933bd6fad37aa2d162d1a594001")
      : JSBI.BigInt("0x100000000000000000000000000000000");
  if ((absTick & 0x2) != 0) ratio = mulShift(ratio, "0xfff97272373d413259a46990580e213a");
  if ((absTick & 0x4) != 0) ratio = mulShift(ratio, "0xfff2e50f5f656932ef12357cf3c7fdcc");
  if ((absTick & 0x8) != 0) ratio = mulShift(ratio, "0xffe5caca7e10e4e61c3624eaa0941cd0");
  if ((absTick & 0x10) != 0) ratio = mulShift(ratio, "0xffcb9843d60f6159c9db58835c926644");
  if ((absTick & 0x20) != 0) ratio = mulShift(ratio, "0xff973b41fa98c081472e6896dfb254c0");
  if ((absTick & 0x40) != 0) ratio = mulShift(ratio, "0xff2ea16466c96a3843ec78b326b52861");
  if ((absTick & 0x80) != 0) ratio = mulShift(ratio, "0xfe5dee046a99a2a811c461f1969c3053");
  if ((absTick & 0x100) != 0) ratio = mulShift(ratio, "0xfcbe86c7900a88aedcffc83b479aa3a4");
  if ((absTick & 0x200) != 0) ratio = mulShift(ratio, "0xf987a7253ac413176f2b074cf7815e54");
  if ((absTick & 0x400) != 0) ratio = mulShift(ratio, "0xf3392b0822b70005940c7a398e4b70f3");
  if ((absTick & 0x800) != 0) ratio = mulShift(ratio, "0xe7159475a2c29b7443b29c7fa6e889d9");
  if ((absTick & 0x1000) != 0) ratio = mulShift(ratio, "0xd097f3bdfd2022b8845ad8f792aa5825");
  if ((absTick & 0x2000) != 0) ratio = mulShift(ratio, "0xa9f746462d870fdf8a65dc1f90e061e5");
  if ((absTick & 0x4000) != 0) ratio = mulShift(ratio, "0x70d869a156d2a1b890bb3df62baf32f7");
  if ((absTick & 0x8000) != 0) ratio = mulShift(ratio, "0x31be135f97d08fd981231505542fcfa6");
  if ((absTick & 0x10000) != 0) ratio = mulShift(ratio, "0x9aa508b5b7a84e1c677de54f3e99bc9");
  if ((absTick & 0x20000) != 0) ratio = mulShift(ratio, "0x5d6af8dedb81196699c329225ee604");
  if ((absTick & 0x40000) != 0) ratio = mulShift(ratio, "0x2216e584f5fa1ea926041bedfe98");
  if ((absTick & 0x80000) != 0) ratio = mulShift(ratio, "0x48a170391f7dc42444e8fa2");

  if (tick > 0) ratio = JSBI.divide(MaxUint256, ratio);

  // back to Q96
  return JSBI.greaterThan(JSBI.remainder(ratio, Q32), ZERO)
    ? JSBI.add(JSBI.divide(ratio, Q32), ONE)
    : JSBI.divide(ratio, Q32);
}

export const POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map((pow: number): [number, JSBI] => [
  pow,
  JSBI.exponentiate(TWO, JSBI.BigInt(pow)),
]);

export function mostSignificantBit (x: JSBI): number {
  invariant(JSBI.greaterThan(x, ZERO), "ZERO");
  invariant(JSBI.lessThanOrEqual(x, MaxUint256), "MAX");

  let msb: number = 0;
  for (const [power, min] of POWERS_OF_2) {
    if (JSBI.greaterThanOrEqual(x, min)) {
      x = JSBI.signedRightShift(x, JSBI.BigInt(power));
      msb += power;
    }
  }
  return msb;
}

/**
 * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX96
 * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96
 * @param sqrtRatioX96 the sqrt ratio as a Q64.96 for which to compute the tick
 */
export function getTickAtSqrtRatio (sqrtRatioX96: JSBI): number {
  invariant(
    JSBI.greaterThanOrEqual(sqrtRatioX96, MIN_SQRT_RATIO) &&
      JSBI.lessThan(sqrtRatioX96, MAX_SQRT_RATIO),
    "SQRT_RATIO"
  );

  const sqrtRatioX128 = JSBI.leftShift(sqrtRatioX96, JSBI.BigInt(32));

  const msb = mostSignificantBit(sqrtRatioX128);

  let r: JSBI;
  if (JSBI.greaterThanOrEqual(JSBI.BigInt(msb), JSBI.BigInt(128))) {
    r = JSBI.signedRightShift(sqrtRatioX128, JSBI.BigInt(msb - 127));
  } else {
    r = JSBI.leftShift(sqrtRatioX128, JSBI.BigInt(127 - msb));
  }

  let log_2: JSBI = JSBI.leftShift(
    JSBI.subtract(JSBI.BigInt(msb), JSBI.BigInt(128)),
    JSBI.BigInt(64)
  );

  for (let i = 0; i < 14; i++) {
    r = JSBI.signedRightShift(JSBI.multiply(r, r), JSBI.BigInt(127));
    const f = JSBI.signedRightShift(r, JSBI.BigInt(128));
    log_2 = JSBI.bitwiseOr(log_2, JSBI.leftShift(f, JSBI.BigInt(63 - i)));
    r = JSBI.signedRightShift(r, f);
  }

  const log_sqrt10001 = JSBI.multiply(log_2, JSBI.BigInt("255738958999603826347141"));

  const tickLow = JSBI.toNumber(
    JSBI.signedRightShift(
      JSBI.subtract(log_sqrt10001, JSBI.BigInt("3402992956809132418596140100660247210")),
      JSBI.BigInt(128)
    )
  );
  const tickHigh = JSBI.toNumber(
    JSBI.signedRightShift(
      JSBI.add(log_sqrt10001, JSBI.BigInt("291339464771989622907027621153398088495")),
      JSBI.BigInt(128)
    )
  );

  return tickLow === tickHigh
    ? tickLow
    : JSBI.lessThanOrEqual(getSqrtRatioAtTick(tickHigh), sqrtRatioX96)
    ? tickHigh
    : tickLow;
}

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param tick the tick for which to return the price
 */
export const tickToPrice = (tick: number) => {
  const sqrtRatioX96 = getSqrtRatioAtTick(tick);

  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);

  return { ratioX192, Q192 };
};

/**
 ** Valid compare cases:
 **     tez <=> fa12
 **     tez <=> fa20
 **     fa12 <=> fa12
 **     fa12 <=> fa20
 **     fa20 <=> fa20
 **
 ** Invalid compare cases:
 **     tez <=> tez
 **
 ** Results of compare:
 **        A : B
 **      tez : tez  => 2
 **      tez : fa12 => 1
 **      tez : fa20 => 1
 **
 **     fa12 : tez  => -1
 **     fa12 : fa12 => -1, 0, 1
 **     fa12 : fa20 => 1
 **
 **     fa20 : tez  => -1
 **     fa20 : fa12 => -1
 **     fa20 : fa20 => -1, 0, 1
 **
 ** Rule for FA20:
 **     token_address < token_address => -1
 **     token_address = token_address =>
 **          token_id < token_id => -1
 **          token_id = token_id =>  0
 **          token_id > token_id =>  1
 **     token_address > token_address =>  1
 **
 ** Rule:
 **     -1 when tokenA < tokenB
 **      0 when tokenA = tokenB
 **      1 when tokenA > tokenB
 **      2 when Invalid Compare
 **/
export function tokenCompare (tokenA: IConfigToken, tokenB: IConfigToken): number {
  switch (tokenA.standard) {
    case TokenStandard.TEZ:
      switch (tokenB.standard) {
        case TokenStandard.TEZ:
          return 2;
        case TokenStandard.FA12:
        case TokenStandard.FA2:
          return 1;
        default:
          return 2;
      }
    case TokenStandard.FA12:
      switch (tokenB.standard) {
        case TokenStandard.TEZ:
          return -1;
        case TokenStandard.FA12:
          if (tokenA.address === tokenB.address) return 0;
          if ((tokenA.address as String) > (tokenB.address as String)) return 1;
          if ((tokenA.address as String) < (tokenB.address as String)) return -1;
        case TokenStandard.FA2:
          return 1;
        default:
          return 2;
      }
    case TokenStandard.FA2:
      switch (tokenB.standard) {
        case TokenStandard.TEZ:
        case TokenStandard.FA12:
          return -1;
        case TokenStandard.FA2:
          if ((tokenA.address as String) > (tokenB.address as String)) return 1;
          if ((tokenA.address as String) < (tokenB.address as String)) return -1;
          if (tokenA.address === tokenB.address) {
            if (tokenA.tokenId === tokenB.tokenId) return 0;
            if ((tokenA.tokenId as number) > (tokenB.tokenId as number)) return 1;
            if ((tokenA.tokenId as number) < (tokenB.tokenId as number)) return -1;
          }
        default:
          return 2;
      }
    default:
      return 2;
  }
}

/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */
export function sqrt (value: JSBI): JSBI {
  invariant(JSBI.greaterThanOrEqual(value, ZERO), "NEGATIVE");

  // rely on built in sqrt if possible
  if (JSBI.lessThan(value, MAX_SAFE_INTEGER)) {
    return JSBI.BigInt(Math.floor(Math.sqrt(JSBI.toNumber(value))));
  }

  let z: JSBI;
  let x: JSBI;
  z = value;
  x = JSBI.add(JSBI.divide(value, TWO), ONE);
  while (JSBI.lessThan(x, z)) {
    z = x;
    x = JSBI.divide(JSBI.add(JSBI.divide(value, x), x), TWO);
  }
  return z;
}

/**
 * Returns the sqrt ratio as a Q64.96 corresponding to a given ratio of amount1 and amount0
 * @param amount1 The numerator amount i.e., the amount of token1
 * @param amount0 The denominator amount i.e., the amount of token0
 * @returns The sqrt ratio
 */

export function encodeSqrtRatioX96 (amount1: BigintIsh, amount0: BigintIsh): JSBI {
  const numerator = JSBI.leftShift(JSBI.BigInt(amount1), JSBI.BigInt(192));
  const denominator = JSBI.BigInt(amount0);
  const ratioX192 = JSBI.divide(numerator, denominator);
  return sqrt(ratioX192);
}

/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
export function priceToClosestTick (
  price: number,
  tokenIn: IConfigToken,
  tokenOut: IConfigToken
): number | null {
  const sorted = tokenCompare(tokenIn, tokenOut);
  if (sorted === 0 || sorted === 2 || price <= 0) return null;

  let priceX192: JSBI;
  if (sorted === -1) {
    priceX192 = JSBI.divide(
      JSBI.multiply(JSBI.BigInt(Math.floor(price * 10 ** tokenOut.decimals)), Q192),
      JSBI.BigInt(10 ** tokenIn.decimals)
    );
  } else {
    priceX192 = JSBI.divide(
      JSBI.multiply(Q192, JSBI.BigInt(10 ** tokenIn.decimals)),
      JSBI.BigInt(Math.floor(price * 10 ** tokenOut.decimals))
    );
  }

  const sqrtRatioX96 = sqrt(priceX192);
  console.log("[prince] priceToClosestTick: sqrtRatioX96", sqrtRatioX96);

  let tick = getTickAtSqrtRatio(sqrtRatioX96);
  console.log("[prince] priceToClosestTick: tick", tick);
  const nextTickPrice = tickToPrice(tick + 1);
  if (sorted === -1) {
    const nextTickPriceBN = new BigNumber(nextTickPrice.ratioX192.toString())
      .div(new BigNumber(Q192.toString()))
      .multipliedBy(10 ** (tokenIn.decimals - tokenOut.decimals));
    if (!(price < parseFloat(nextTickPriceBN.toString()))) {
      tick++;
    }
  } else {
    const nextTickPriceBN = new BigNumber(Q192.toString())
      .div(nextTickPrice.ratioX192.toString())
      .multipliedBy(10 ** (tokenIn.decimals - tokenOut.decimals));
    if (!(price > parseFloat(nextTickPriceBN.toString()))) {
      tick++;
    }
  }
  return tick;
}

/**
 * Returns an imprecise maximum amount of liquidity received for a given amount of token 0.
 * This function is available to accommodate LiquidityAmounts#getLiquidityForAmount0 in the v3 periphery,
 * which could be more precise by at least 32 bits by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits. This imprecise calculation will likely be replaced in a future
 * v3 router contract.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, imprecise
 */
function maxLiquidityForAmount0Imprecise (
  sqrtRatioAX96: JSBI,
  sqrtRatioBX96: JSBI,
  amount0: BigintIsh
): JSBI {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }
  const intermediate = JSBI.divide(JSBI.multiply(sqrtRatioAX96, sqrtRatioBX96), Q96);
  return JSBI.divide(
    JSBI.multiply(JSBI.BigInt(amount0), intermediate),
    JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96)
  );
}

/**
 * Returns a precise maximum amount of liquidity received for a given amount of token 0 by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, precise
 */
function maxLiquidityForAmount0Precise (
  sqrtRatioAX96: JSBI,
  sqrtRatioBX96: JSBI,
  amount0: BigintIsh
): JSBI {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }

  const numerator = JSBI.multiply(
    JSBI.multiply(JSBI.BigInt(amount0), sqrtRatioAX96),
    sqrtRatioBX96
  );
  const denominator = JSBI.multiply(Q96, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));

  return JSBI.divide(numerator, denominator);
}

/**
 * Computes the maximum amount of liquidity received for a given amount of token1
 * @param sqrtRatioAX96 The price at the lower tick boundary
 * @param sqrtRatioBX96 The price at the upper tick boundary
 * @param amount1 The token1 amount
 * @returns liquidity for amount1
 */
function maxLiquidityForAmount1 (
  sqrtRatioAX96: JSBI,
  sqrtRatioBX96: JSBI,
  amount1: BigintIsh
): JSBI {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }
  return JSBI.divide(
    JSBI.multiply(JSBI.BigInt(amount1), Q96),
    JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96)
  );
}

/**
 * Computes the maximum amount of liquidity received for a given amount of token0, token1,
 * and the prices at the tick boundaries.
 * @param sqrtRatioCurrentX96 the current price
 * @param sqrtRatioAX96 price at lower boundary
 * @param sqrtRatioBX96 price at upper boundary
 * @param amount0 token0 amount
 * @param amount1 token1 amount
 * @param useFullPrecision if false, liquidity will be maximized according to what the router can calculate,
 * not what core can theoretically support
 */
export function maxLiquidityForAmounts (
  sqrtRatioCurrentX96: JSBI,
  sqrtRatioAX96: JSBI,
  sqrtRatioBX96: JSBI,
  amount0: BigintIsh,
  amount1: BigintIsh,
  useFullPrecision: boolean
): JSBI {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96];
  }

  const maxLiquidityForAmount0 = useFullPrecision
    ? maxLiquidityForAmount0Precise
    : maxLiquidityForAmount0Imprecise;

  if (JSBI.lessThanOrEqual(sqrtRatioCurrentX96, sqrtRatioAX96)) {
    return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0);
  } else if (JSBI.lessThan(sqrtRatioCurrentX96, sqrtRatioBX96)) {
    const liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0);
    const liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1);
    return JSBI.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1;
  } else {
    return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1);
  }
}

/**
 * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
 */
export function amount0 (
  tickCurrent: number,
  tickLower: number,
  tickUpper: number,
  sqrtRatioX96: JSBI,
  liquidity: JSBI
): JSBI {
  let _token0Amount;
  if (tickCurrent < tickLower) {
    _token0Amount = SqrtPriceMath.getAmount0Delta(
      getSqrtRatioAtTick(tickLower),
      getSqrtRatioAtTick(tickUpper),
      liquidity,
      false
    );
    console.log("[prince] amount0 0", _token0Amount);
  } else if (tickCurrent < tickUpper) {
    _token0Amount = SqrtPriceMath.getAmount0Delta(
      sqrtRatioX96,
      getSqrtRatioAtTick(tickUpper),
      liquidity,
      false
    );
    console.log("[prince] amount0 1", _token0Amount);
  } else {
    _token0Amount = ZERO;
    console.log("[prince] amount0 2", _token0Amount);
  }
  return _token0Amount;
}

/**
 * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
 */
export function amount1 (
  tickCurrent: number,
  tickLower: number,
  tickUpper: number,
  sqrtRatioX96: JSBI,
  liquidity: JSBI
): JSBI {
  let _token1Amount;
  if (tickCurrent < tickLower) {
    _token1Amount = ZERO;
    console.log("[prince] amount1 0", _token1Amount);
  } else if (tickCurrent < tickUpper) {
    _token1Amount = SqrtPriceMath.getAmount1Delta(
      getSqrtRatioAtTick(tickLower),
      sqrtRatioX96,
      liquidity,
      false
    );
    console.log("[prince] amount1 1", _token1Amount);
  } else {
    _token1Amount = SqrtPriceMath.getAmount1Delta(
      getSqrtRatioAtTick(tickLower),
      getSqrtRatioAtTick(tickUpper),
      liquidity,
      false
    );
    console.log("[prince] amount1 2", _token1Amount);
  }
  return _token1Amount;
}

export const getOtherTokenAmount = (
  tokenA: IConfigToken,
  tokenB: IConfigToken,
  tokenAmount: string | number,
  isTokenA: boolean,
  userMinPrice: number,
  userMaxPrice: number,
  curPrice: number,
  userCurPrice: number
): {
  output: string | number | null;
  tickLower: number | null;
  tickUpper: number | null;
  currentSqrt: JSBI | null;
} => {
  const cond = tokenCompare(tokenA, tokenB);
  const _curPrice = curPrice && curPrice > 0 ? curPrice : userCurPrice;

  if (cond === 0 || cond === 2)
    return {
      output: null,
      tickLower: null,
      tickUpper: null,
      currentSqrt: null,
    };

  const tickLower = priceToClosestTick(userMinPrice, tokenA, tokenB);
  console.log("[prince] getOtherTokenAmount: tickLower", tickLower);
  const tickUpper = priceToClosestTick(userMaxPrice, tokenA, tokenB);
  console.log("[prince] getOtherTokenAmount: tickUpper", tickUpper);
  const tickCurrent = priceToClosestTick(_curPrice, tokenA, tokenB);
  console.log("[prince] getOtherTokenAmount: tickCurrent", tickCurrent);
  const currentSqrt = getSqrtRatioAtTick(tickCurrent as number);
  const sqrtRatioAX96 = getSqrtRatioAtTick(tickLower as number);
  const sqrtRatioBX96 = getSqrtRatioAtTick(tickUpper as number);

  console.log(
    "[prince] getOtherTokenAmount: tickLower, tickUpper, tickCurrent, currentSqrt, sqrtRatioAX96, sqrtRatioBX96, cond",
    tickLower,
    tickUpper,
    tickCurrent,
    currentSqrt,
    sqrtRatioAX96,
    sqrtRatioBX96,
    cond,
    tokenA,
    tokenB
  );

  let amount0Param = MaxUint256;
  let amount1Param = MaxUint256;
  let getTokenAmount = amount0;
  if (cond === -1) {
    if (isTokenA) {
      amount0Param = JSBI.BigInt(Math.floor(Number(tokenAmount) * 10 ** tokenA.decimals));
      amount1Param = MaxUint256;
      getTokenAmount = amount1;
    } else {
      amount0Param = MaxUint256;
      amount1Param = JSBI.BigInt(Math.floor(Number(tokenAmount) * 10 ** tokenB.decimals));
    }
  } else {
    if (isTokenA) {
      amount0Param = MaxUint256;
      amount1Param = JSBI.BigInt(Math.floor(Number(tokenAmount) * 10 ** tokenA.decimals));
    } else {
      amount0Param = JSBI.BigInt(Math.floor(Number(tokenAmount) * 10 ** tokenB.decimals));
      amount1Param = MaxUint256;
      getTokenAmount = amount1;
    }
  }
  console.log("[prince] getOtherTokenAmount: amount0Param", amount0Param);
  console.log("[prince] getOtherTokenAmount: amount1Param", amount1Param);
  const liquidity = maxLiquidityForAmounts(
    currentSqrt,
    sqrtRatioAX96,
    sqrtRatioBX96,
    amount0Param,
    amount1Param,
    true
  );
  console.log("[prince] getOtherTokenAmount: liquidity", liquidity);
  console.log("[prince] getOtherTokenAmount: getTokenAmount", getTokenAmount);
  const otherTokenAmount = getTokenAmount(
    tickCurrent as number,
    tickLower as number,
    tickUpper as number,
    currentSqrt,
    liquidity
  );
  console.log("[prince] getOtherTokenAmount: otherTokenAmount", otherTokenAmount);
  // fix as temp to skip
  if (isTokenA) {
    return {
      output:
        JSBI.toNumber(otherTokenAmount) / 10 ** (isTokenA ? tokenB.decimals : tokenA.decimals),
      // (JSBI.toNumber(otherTokenAmount) *
      //   _curPrice ** 2 *
      //   100 ** (tokenB.decimals - tokenA.decimals)) /
      // 10 ** (isTokenA ? tokenB.decimals : tokenA.decimals),
      tickLower: tickLower,
      tickUpper: tickUpper,
      currentSqrt: currentSqrt,
    };
  } else {
    return {
      output:
        JSBI.toNumber(otherTokenAmount) / 10 ** (isTokenA ? tokenB.decimals : tokenA.decimals),
      tickLower: tickLower,
      tickUpper: tickUpper,
      currentSqrt: currentSqrt,
    };
  }
};
