import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { tokens } from '../../src/constants/Tokens';
import { useLocationStateInSwap } from '../../src/hooks/useLocationStateInSwap';
import SwapModal from '../../src/components/SwapModal/SwapModal';
import SwapTab from '../../src/components/Swap/SwapTab';
import { getUserBalanceByRpc } from '../../src/api/util/balance';
import { getTokenPrices } from '../../src/api/util/price';
import { tokensModal, tokenType } from '../../src/constants/swap';

import { useAppSelector } from '../../src/redux';
import { AMM_TYPE } from '../../src/config/types';
import { calculateTokensOutGeneralStable } from '../../src/api/swap/stableswap';
import { BigNumber } from 'bignumber.js';
import {
  calculateTokensOutWrapper,
  loadSwapDataWrapper,
} from '../../src/api/swap/wrappers';

import axios from 'axios';
import { loadSwapDataVolatile } from '../../src/api/swap/volatile';
import { getDexType } from '../../src/api/util/fetchConfig';

interface ISwapProps {
  className?: string;
  otherProps: {
    connectWallet: () => void;
    disconnectWallet: () => void;
    walletAddress: string;
  };
}

function Swap(props: ISwapProps) {
  const TOKEN = useAppSelector((state) => state.config.tokens);

  const { tokenIn, setTokenIn, tokenOut, setTokenOut } =
    useLocationStateInSwap();

  const [firstTokenAmount, setFirstTokenAmount] = useState<string | number>('');
  const [secondTokenAmount, setSecondTokenAmount] = useState<number | string>(
    ''
  );

  const [recepient, setRecepient] = useState('');
  const [userBalances, setUserBalances] = useState<{ [key: string]: string }>(
    {}
  );

  const [tokenType, setTokenType] = useState<tokenType>('tokenIn');
  const [searchQuery, setSearchQuery] = useState('');
  const [swapModalShow, setSwapModalShow] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [routeData, setRouteData] = useState({
    success: false,
    isloading: false,
  });
  const [swapData, setSwapData] = useState<{
    tokenIn_amount: BigNumber;
    exchangeFee: BigNumber;
    slippage: BigNumber;
    tokenIn?: string;
    tokenOut?: string;
    tokenIn_supply: BigNumber;
    tokenOut_supply: BigNumber;
    tokenIn_precision?: BigNumber;
    tokenOut_precision?: BigNumber;
    tezSupply?: BigNumber;
    ctezSupply?: BigNumber;
    target?: BigNumber;
  }>({
    tokenIn_amount: new BigNumber(0),
    tokenIn_supply: new BigNumber(0),
    tokenOut_supply: new BigNumber(0),
    exchangeFee: new BigNumber(0),
    slippage: new BigNumber(slippage),
  });
  const [swapDetails, setSwapDetails] = useState<{
    exchangeRate: BigNumber;
    fees: BigNumber;
    minimum_Out: BigNumber;
    priceImpact: BigNumber;
    tokenOut_amount: BigNumber;
    isLoading: boolean;
    success: boolean;
  }>({
    exchangeRate: new BigNumber(0),
    fees: new BigNumber(0),
    minimum_Out: new BigNumber(0),
    priceImpact: new BigNumber(0),
    tokenOut_amount: new BigNumber(0),
    isLoading: false,
    success: false,
  });
  // const [tokenPrice, setTokenPrice] = useState({});
  const [tokenPrice, setTokenPrice] = useState<{
    [id: string]: number;
  }>({});
  getTokenPrices().then((response) => {
    setTokenPrice(response.tokenPrice);
  });
  // useEffect(() => {
  //   getTokenPrices().then((response) => {
  //     setTokenPrice(response.tokenPrice);
  //   });
  // }, []);
  useEffect(() => {
    loadSwapDataWrapper(tokenIn.name, tokenOut.name).then((res) => {
      setSwapData(res);
    });
    // const res = loadSwapDataWrapper('USDC.e', 'uUSD');

    // loadSwapDataVolatile('USDC.e', 'uUSD');
  }, [tokenIn, tokenOut]);
  // getLoad();
  // calculateTokensOutGeneralStable(
  //   new BigNumber('30654476830663416'),
  //   new BigNumber(79811356526),
  //   new BigNumber(1),
  //   new BigNumber(1000),
  //   new BigNumber(5),
  //   'USDC.e',
  //   'uUSD',
  //   new BigNumber(1),
  //   new BigNumber(1000000),
  // );
  //routedata true once we have both the tokens
  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(tokenIn, 'name') &&
      Object.prototype.hasOwnProperty.call(tokenOut, 'name')
    ) {
      loadSwapDataWrapper(tokenIn.name, tokenOut.name).then((res) => {
        console.log(res);
      });
    }
  }, [tokenIn, tokenOut]);

  const handleSwapTokenInput = async (
    input: string | number,
    tokenType: 'tokenIn' | 'tokenOut'
  ) => {
    setRouteData({ success: false, isloading: true });
    setSwapDetails({
      exchangeRate: new BigNumber(0),
      fees: new BigNumber(0),
      minimum_Out: new BigNumber(0),
      priceImpact: new BigNumber(0),
      tokenOut_amount: new BigNumber(0),
      isLoading: true,
      success: true,
    });
    if (input === '') {
      setFirstTokenAmount('');
      setSecondTokenAmount('');
      setSwapDetails({
        exchangeRate: new BigNumber(0),
        fees: new BigNumber(0),
        minimum_Out: new BigNumber(0),
        priceImpact: new BigNumber(0),
        tokenOut_amount: new BigNumber(0),
        isLoading: true,
        success: false,
      });
      setRouteData({ success: true, isloading: false });
    } else {
      if (tokenType === 'tokenIn') {
        setFirstTokenAmount(input);
        if (Object.keys(tokenOut).length !== 0) {
          const type = getDexType(tokenIn.name, tokenOut.name);

          if (type === AMM_TYPE.VOLATILE) {
            const res = await calculateTokensOutWrapper(
              new BigNumber(input),
              swapData.exchangeFee,
              new BigNumber(slippage),
              tokenIn.name,
              tokenOut.name,
              swapData.tokenIn_supply,
              swapData.tokenOut_supply
            );

            setSecondTokenAmount(res.tokenOut_amount);
            setSwapDetails({
              exchangeRate: res.exchangeRate,
              fees: res.fees,
              minimum_Out: res.minimum_Out,
              priceImpact: res.priceImpact,
              tokenOut_amount: res.tokenOut_amount,
              isLoading: false,
              success: true,
            });
          }
          // setTimeout(() => {
          //   setSecondTokenAmount('55');
          //   setRouteData({ success: true, isloading: false });
          // }, 1000);
        }
      } else if (tokenType === 'tokenOut') {
        setSecondTokenAmount(input);

        setTimeout(() => {
          setFirstTokenAmount('12');
          setRouteData({ success: true, isloading: false });
        }, 1000);
      }
    }
  };

  const handleTokenType = (type: tokenType) => {
    setSwapModalShow(true);
    setTokenType(type);
  };

  const handleClose = () => {
    setSwapModalShow(false);
  };

  const selectToken = (token: tokensModal) => {
    if (tokenType === 'tokenIn') {
      setTokenIn({
        name: token.name,
        image: token.image,
      });
    } else {
      setTokenOut({
        name: token.name,
        image: token.image,
      });
    }
    handleClose();
  };
  const changeTokenLocation = () => {
    setSecondTokenAmount(firstTokenAmount);

    setFirstTokenAmount('');
    setRouteData({ success: false, isloading: true });
    if (tokenOut.name) {
      setTokenIn({
        name: tokenOut.name,
        image: tokenOut.image,
      });

      setTokenOut({
        name: tokenIn.name,
        image: tokenIn.image,
      });

      handleSwapTokenInput(firstTokenAmount, 'tokenOut');
    }
  };
  useEffect(() => {
    if (props.otherProps.walletAddress) {
      const updateBalance = async () => {
        const balancePromises = [];

        Object.keys(tokenIn).length !== 0 &&
          balancePromises.push(
            getUserBalanceByRpc(
              tokenIn.name,
              props.otherProps.walletAddress,
              TOKEN
            )
          );
        Object.keys(tokenOut).length !== 0 &&
          balancePromises.push(
            getUserBalanceByRpc(
              tokenOut.name,
              props.otherProps.walletAddress,
              TOKEN
            )
          );

        const balanceResponse = await Promise.all(balancePromises);

        setUserBalances((prev) => ({
          ...prev,
          ...balanceResponse.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.identifier]: cur.balance.toNumber(),
            }),
            {}
          ),
        }));
      };
      updateBalance();
    }
  }, [tokenIn, tokenOut, props, TOKEN]);

  return (
    <>
      <div
        className={clsx(
          'bg-card-500 md:border border-y border-text-800 mt-[70px] lg:mt-[75px] md:rounded-3xl  text-white lg:w-640 py-5 mx-auto fade-in'
        )}
      >
        <SwapTab
          walletAddress={props.otherProps.walletAddress}
          firstTokenAmount={firstTokenAmount}
          secondTokenAmount={secondTokenAmount}
          connectWallet={props.otherProps.connectWallet}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          tokens={tokens}
          handleTokenType={handleTokenType}
          userBalances={userBalances}
          setSlippage={setSlippage}
          slippage={slippage}
          handleClose={handleClose}
          changeTokenLocation={changeTokenLocation}
          setSecondTokenAmount={setSecondTokenAmount}
          setFirstTokenAmount={setFirstTokenAmount}
          handleSwapTokenInput={handleSwapTokenInput}
          setTokenIn={setTokenIn}
          setTokenOut={setTokenOut}
          setTokenType={setTokenType}
          tokenPrice={tokenPrice}
          recepient={recepient}
          setRecepient={setRecepient}
          routeData={routeData}
          setRouteData={setRouteData}
          swapDetails={swapDetails}
          setSwapDetails={setSwapDetails}
        />
      </div>
      <SwapModal
        tokens={tokens}
        show={swapModalShow}
        selectToken={selectToken}
        onhide={handleClose}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        tokenType={tokenType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default Swap;
