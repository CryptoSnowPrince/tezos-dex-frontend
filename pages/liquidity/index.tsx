import styles from "../../styles/pages/liquidity.module.scss";
import Navbar from "../../components/navbar";
import Link from "next/link";
import Footer from "../../components/footer";
import SelectToken from "../../components/selectToken";
import { useRouter } from "next/router";
import { BigNumber } from "bignumber.js";
import Image from "next/image";

import React, { useEffect, useState, useMemo } from "react";
import { getAllTokensBalanceFromTzkt, getPnlpBalance } from "../../src/api/util/balance";
import { tEZorCTEZtoUppercase } from "../../src/api/util/helpers";
import { getTokenDataFromTzkt } from "../../src/api/util/tokens";
import { IAllTokensBalance, IAllTokensBalanceResponse } from "../../src/api/util/types";
import { Chain, IConfigToken, MigrateToken, TokenStandard } from "../../src/config/types";
import { FIRST_TOKEN_AMOUNT, TOKEN_A, TOKEN_B } from "../../src/constants/localStorage";
import { tokensModalNewPool, tokenType } from "../../src/constants/swap";
import {
  deployStable,
  deployTezPair,
  deployV3Pool,
  deployVolatile,
} from "../../src/operations/factory";
import { useAppDispatch, useAppSelector } from "../../src/redux";
import { getConfig } from "../../src/redux/config/config";
import { setFlashMessage } from "../../src/redux/flashMessage";
import { setIsLoadingWallet } from "../../src/redux/walletLoading";
import ConfirmTransaction from "../../src/components/ConfirmTransaction";
import { Flashtype } from "../../src/components/FlashScreen";
import { ISwapData, tokenParameterLiquidity } from "../../src/components/Liquidity/types";
import { PopUpModal } from "../../src/components/Modal/popupModal";
import { Position, ToolTip } from "../../src/components/Tooltip/TooltipAdvanced";
import TransactionSubmitted from "../../src/components/TransactionSubmitted";
import ConfirmAddPool from "../../src/components/Pools/ConfirmAddPool";
import NewPoolMain, { Pair } from "../../src/components/Pools/NewPoolMain";
import TokenModalPool from "../../src/components/Pools/tokenModalPool";
import { tzktExplorer } from "../../src/common/walletconnect";
import { FEE_TIER } from "../../src/constants/global";

export default function Liquidity() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [isExist, setIsExist] = useState(false);

  const [feeTier, setFeeTier] = useState(FEE_TIER.NONE);

  const [userCurPrice, setUserCurPrice] = useState(0)
  const [tickUpper, setTickUpper] = useState(0)
  const [tickLower, setTickLower] = useState(0)
  const [curSqrt, setCurSqrt] = useState<BigNumber>(new BigNumber(0))
  const [userMinPrice, setUserMinPrice] = useState(0)
  const [userMaxPrice, setUserMaxPrice] = useState(0)

  const [curPrice, setCurPrice] = useState(0)

  const router = useRouter();

  const handleReturn = () => {
    router.back();
    closeModal();
  };

  const [showLiquidityModalPopup, setShowLiquidityModalPopup] = React.useState(false);
  const handelshowLiquidityModal = (val: boolean) => {
    setShowLiquidityModalPopup(val);
  };
  const [reFetchPool, setReFetchPool] = React.useState(false);

  //
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [slippage, setSlippage] = useState<string>("0.5");
  const TOKEN = useAppSelector((state) => state.config.tokens);
  const tokenPrice = useAppSelector((state) => state.tokenPrice.tokenPrice);
  const walletAddress = useAppSelector((state) => state.wallet.address);
  const [pair, setPair] = useState("");
  const [firstTokenAmountLiq, setFirstTokenAmountLiq] = React.useState<string | number>("");
  const [secondTokenAmountLiq, setSecondTokenAmountLiq] = React.useState<number | string>("");

  const [isAddLiquidity, setIsAddLiquidity] = useState(true);
  const [showConfirmTransaction, setShowConfirmTransaction] = useState(false);
  const [burnAmount, setBurnAmount] = React.useState<string | number>("");
  const [transactionId, setTransactionId] = useState("");

  const [removeTokenAmount, setRemoveTokenAmount] = useState({
    tokenOneAmount: "",
    tokenTwoAmount: "",
  });
  const tokens = useAppSelector((state) => state.config.tokens);
  const userAddress = useAppSelector((state) => state.wallet.address);
  const tokensArray = Object.entries(tokens);
  const dispatch = useAppDispatch();
  const transactionSubmitModal = (id: string) => {
    setTransactionId(id);
    setShowTransactionSubmitModal(true);
  };
  const [showTransactionSubmitModal, setShowTransactionSubmitModal] = useState(false);
  const [balanceUpdate, setBalanceUpdate] = useState(false);
  const [pnlpBalance, setPnlpBalance] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmPool, setShowConfirmPool] = useState(false);

  const [contentTransaction, setContentTransaction] = useState("");

  const [tokenIn, setTokenIn] = React.useState<tokenParameterLiquidity>(
    {} as tokenParameterLiquidity
  );
  const [tokenOut, setTokenOut] = React.useState<tokenParameterLiquidity>(
    {} as tokenParameterLiquidity
  );
  const [tokenInOp, setTokenInOp] = React.useState<IConfigToken>({} as IConfigToken);
  const [tokenOutOp, setTokenOutOp] = React.useState<IConfigToken>({} as IConfigToken);

  const [swapModalShow, setSwapModalShow] = useState(false);

  const [tokenType, setTokenType] = useState<tokenType>("tokenIn");
  const selectToken = (token: tokensModalNewPool) => {
    if (token.interface.standard !== TokenStandard.FA12) {
      window.alert("now support FA1.2")
      return;
    }
    if ((tokenType === "tokenOut" || tokenType === "tokenIn") && firstTokenAmountLiq !== "") {
      setSecondTokenAmountLiq("");
    }
    if (tokenType === "tokenIn") {
      setTokenInOp(token.interface);
      setTokenIn({
        name: token.name,
        symbol: token.name,
        image: token.image,
      });
    } else {
      setTokenOutOp(token.interface);
      setTokenOut({
        name: token.name,
        symbol: token.name,
        image: token.image,
      });
    }
    handleClose();
  };
  const handleClose = () => {
    setSwapModalShow(false);
    setSearchQuery("");
  };
  const closeModal = () => {
    setTokenIn({} as tokenParameterLiquidity);
    setTokenOut({} as tokenParameterLiquidity);
    setFirstTokenAmountLiq("");
    setSecondTokenAmountLiq("");
    setPair("");
  };
  const resetAllValues = () => {
    closeModal();
    setPair("");
    setFirstTokenAmountLiq("");
    setSecondTokenAmountLiq("");

    setBalanceUpdate(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [allBalance, setAllBalance] = useState<IAllTokensBalanceResponse>({
    success: false,
    allTokensBalances: {} as IAllTokensBalance,
  });
  useEffect(() => {
    if (userAddress) {
      getAllTokensBalanceFromTzkt(Object.values(tokens), userAddress).then(
        (response: IAllTokensBalanceResponse) => {
          console.log("newpool", response);
          setAllBalance(response);
        }
      );
    } else {
      setAllBalance({
        success: false,
        allTokensBalances: {} as IAllTokensBalance,
      });
    }
  }, [userAddress, TOKEN, balanceUpdate, tokenIn.name, tokenOut.name]);
  const [contractTokenBalance, setContractTokenBalance] = useState<IAllTokensBalance>(
    {} as IAllTokensBalance
  );

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 8) {
      getTokenDataFromTzkt(searchQuery.trim()).then((res) => {
        if (res.allTokensList.length !== 0) {
          getAllTokensBalanceFromTzkt(res.allTokensList, userAddress).then((res) => {
            // contractTokenBalance.push(res.allTokensBalances);
            setContractTokenBalance({ ...contractTokenBalance, ...res.allTokensBalances });
          });
        }
      });
    }
  }, [searchQuery]);
  const tokensListConfig = useMemo(() => {
    return tokensArray.map((token) => ({
      name: token[0],
      image: `/assets/Tokens/${token[1].symbol}.png`,

      chainType: token[1].originChain as Chain,
      address: token[1].address,
      interface: token[1],
    }));
  }, [tokens]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    if (refetch) {
      dispatch(getConfig());
    }
  }, [refetch]);
  useEffect(() => {
    if (
      (Object.keys(allBalance),
        length !== 0 && allBalance.success && Object.keys(allBalance.allTokensBalances).length !== 0)
    ) {
      tokensListConfig.sort(
        (a, b) =>
          Number(
            allBalance.allTokensBalances[b.name]?.balance
              ? allBalance.allTokensBalances[b.name]?.balance
              : 0
          ) -
          Number(
            allBalance.allTokensBalances[a.name]?.balance
              ? allBalance.allTokensBalances[a.name]?.balance
              : 0
          )
      );
    }
  }, [tokensListConfig, allBalance.allTokensBalances]);
  useEffect(() => {
    setPair("");
    if (
      (tokenIn.name === "XTZ" && tokenOut.name !== "CTez") ||
      (tokenOut.name === "XTZ" && tokenIn.name !== "CTez")
    ) {
      setPair(Pair.VOLATILE);
    } else if (
      (tokenIn.name === "XTZ" && tokenOut.name === "CTez") ||
      (tokenOut.name === "XTZ" && tokenIn.name === "CTez")
    ) {
      setPair(Pair.STABLE);
    } else {
      setPair(Pair.GENERAL);
    }
  }, [tokenIn.name, tokenOut.name]);

  const handleTokenType = (type: tokenType) => {
    setBalanceUpdate(false);
    setSwapModalShow(true);
    setTokenType(type);
  };

  const handleAddNewPoolOperation = () => {
    setShowConfirmPool(false);
    localStorage.setItem(TOKEN_A, tEZorCTEZtoUppercase(tokenIn.name));
    localStorage.setItem(TOKEN_B, tEZorCTEZtoUppercase(tokenOut.name));
    // localStorage.setItem(FIRST_TOKEN_AMOUNT, pair === Pair.VOLATILE ? "volatile" : "stable");
    localStorage.setItem(FIRST_TOKEN_AMOUNT, pair.replace("pair", ""));

    setContentTransaction(`new pool`);
    dispatch(setIsLoadingWallet({ isLoading: true, operationSuccesful: false }));
    setReFetchPool(false);
    setRefetch(false);
    setShowConfirmTransaction(true);
    console.log('[prince]: hey wake up')
    deployV3Pool(
      tokenInOp,
      tokenOutOp,
      feeTier,
      isExist,
      tickLower,
      tickUpper,
      userAddress,
      Number(firstTokenAmountLiq).toString(),
      Number(secondTokenAmountLiq).toString(),
      (Number(firstTokenAmountLiq) * 0.95).toString(),
      (Number(secondTokenAmountLiq) * 0.95).toString(),
      curSqrt,
      transactionSubmitModal,
      resetAllValues,
      setShowConfirmTransaction,
      {
        flashType: Flashtype.Info,
        headerText: "Transaction submitted",
        trailingText: `Addition of new ${localStorage.getItem(TOKEN_A)}/${localStorage.getItem(
          TOKEN_B
        )} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
        linkText: "View in Explorer",
        isLoading: true,
        transactionId: "",
      }
    ).then((response) => {
      if (response.success) {
        closeModal();
        setBalanceUpdate(true);
        resetAllValues();
        setTimeout(() => {
          setShowTransactionSubmitModal(false);
          dispatch(
            setFlashMessage({
              flashType: Flashtype.Success,
              headerText: "Success",
              trailingText: `Addition of new ${localStorage.getItem(
                TOKEN_A
              )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
              linkText: "View in Explorer",
              isLoading: true,
              onClick: () => {
                window.open(
                  `${tzktExplorer}${response.operationId ? response.operationId : ""}`,
                  "_blank"
                );
              },
              transactionId: response.operationId ? response.operationId : "",
            })
          );
          setRefetch(true);
        }, 6000);

        setTimeout(() => {
          setReFetchPool(true);
        }, 7000);
        dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
        setContentTransaction("");
      } else {
        setBalanceUpdate(true);
        closeModal();
        //resetAllValues();
        setShowConfirmTransaction(false);
        setTimeout(() => {
          setShowTransactionSubmitModal(false);
          dispatch(
            setFlashMessage({
              flashType: Flashtype.Rejected,
              transactionId: "",
              headerText: "Rejected",
              trailingText: `Addition of new ${localStorage.getItem(
                TOKEN_A
              )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
              linkText: "",
              isLoading: true,
            })
          );
        }, 2000);

        dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
        setContentTransaction("");
      }
    });
    // if (pair === Pair.VOLATILE && tokenIn.name !== "XTZ" && tokenOut.name !== "XTZ") {
    //     deployVolatile(
    //         tokenInOp,
    //         tokenOutOp,
    //         userAddress,
    //         new BigNumber(firstTokenAmountLiq),
    //         new BigNumber(secondTokenAmountLiq),
    //         transactionSubmitModal,
    //         resetAllValues,
    //         setShowConfirmTransaction,
    //         {
    //             flashType: Flashtype.Info,
    //             headerText: "Transaction submitted",
    //             trailingText: `Addition of new ${localStorage.getItem(TOKEN_A)}/${localStorage.getItem(
    //                 TOKEN_B
    //             )} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
    //             linkText: "View in Explorer",
    //             isLoading: true,
    //             transactionId: "",
    //         }
    //     ).then((response) => {
    //         if (response.success) {
    //             closeModal();
    //             setBalanceUpdate(true);
    //             resetAllValues();
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Success,
    //                         headerText: "Success",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "View in Explorer",
    //                         isLoading: true,
    //                         onClick: () => {
    //                             window.open(
    //                                 `${tzktExplorer}${response.operationId ? response.operationId : ""}`,
    //                                 "_blank"
    //                             );
    //                         },
    //                         transactionId: response.operationId ? response.operationId : "",
    //                     })
    //                 );
    //                 setRefetch(true);
    //             }, 6000);

    //             setTimeout(() => {
    //                 setReFetchPool(true);
    //             }, 7000);
    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         } else {
    //             setBalanceUpdate(true);
    //             closeModal();
    //             //resetAllValues();
    //             setShowConfirmTransaction(false);
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Rejected,
    //                         transactionId: "",
    //                         headerText: "Rejected",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "",
    //                         isLoading: true,
    //                     })
    //                 );
    //             }, 2000);

    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         }
    //     });
    // } else if (pair === Pair.VOLATILE && (tokenIn.name === "XTZ" || tokenOut.name === "XTZ")) {
    //     deployTezPair(
    //         tokenInOp,
    //         tokenOutOp,
    //         userAddress,
    //         new BigNumber(firstTokenAmountLiq),
    //         new BigNumber(secondTokenAmountLiq),
    //         transactionSubmitModal,
    //         resetAllValues,
    //         setShowConfirmTransaction,
    //         {
    //             flashType: Flashtype.Info,
    //             headerText: "Transaction submitted",
    //             trailingText: `Addition of new ${localStorage.getItem(TOKEN_A)}/${localStorage.getItem(
    //                 TOKEN_B
    //             )} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
    //             linkText: "View in Explorer",
    //             isLoading: true,
    //             transactionId: "",
    //         }
    //     ).then((response) => {
    //         if (response.success) {
    //             closeModal();
    //             setBalanceUpdate(true);
    //             resetAllValues();
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Success,
    //                         headerText: "Success",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "View in Explorer",
    //                         isLoading: true,
    //                         onClick: () => {
    //                             window.open(
    //                                 `${tzktExplorer}${response.operationId ? response.operationId : ""}`,
    //                                 "_blank"
    //                             );
    //                         },
    //                         transactionId: response.operationId ? response.operationId : "",
    //                     })
    //                 );
    //                 setRefetch(true);
    //             }, 6000);

    //             setTimeout(() => {
    //                 setReFetchPool(true);
    //             }, 7000);
    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         } else {
    //             setBalanceUpdate(true);
    //             closeModal();
    //             //resetAllValues();
    //             setShowConfirmTransaction(false);
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Rejected,
    //                         transactionId: "",
    //                         headerText: "Rejected",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "",
    //                         isLoading: true,
    //                     })
    //                 );
    //             }, 2000);

    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         }
    //     });
    // } else if (pair === Pair.STABLE) {
    //     deployStable(
    //         tokenInOp,
    //         tokenOutOp,
    //         userAddress,
    //         new BigNumber(firstTokenAmountLiq),
    //         new BigNumber(secondTokenAmountLiq),
    //         transactionSubmitModal,
    //         resetAllValues,
    //         setShowConfirmTransaction,
    //         {
    //             flashType: Flashtype.Info,
    //             headerText: "Transaction submitted",
    //             trailingText: `Addition of new ${localStorage.getItem(TOKEN_A)}/${localStorage.getItem(
    //                 TOKEN_B
    //             )} ${localStorage.getItem(FIRST_TOKEN_AMOUNT)} pool`,
    //             linkText: "View in Explorer",
    //             isLoading: true,
    //             transactionId: "",
    //         }
    //     ).then((response) => {
    //         if (response.success) {
    //             closeModal();
    //             setBalanceUpdate(true);
    //             resetAllValues();
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Success,
    //                         headerText: "Success",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "View in Explorer",
    //                         isLoading: true,
    //                         onClick: () => {
    //                             window.open(
    //                                 `${tzktExplorer}${response.operationId ? response.operationId : ""}`,
    //                                 "_blank"
    //                             );
    //                         },
    //                         transactionId: response.operationId ? response.operationId : "",
    //                     })
    //                 );
    //             }, 6000);
    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         } else {
    //             closeModal();
    //             setBalanceUpdate(true);
    //             resetAllValues();
    //             setShowConfirmTransaction(false);
    //             setTimeout(() => {
    //                 setShowTransactionSubmitModal(false);
    //                 dispatch(
    //                     setFlashMessage({
    //                         flashType: Flashtype.Rejected,
    //                         transactionId: "",
    //                         headerText: "Rejected",
    //                         trailingText: `Addition of new ${localStorage.getItem(
    //                             TOKEN_A
    //                         )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
    //                             FIRST_TOKEN_AMOUNT
    //                         )} pool`,
    //                         linkText: "",
    //                         isLoading: true,
    //                     })
    //                 );
    //             }, 2000);

    //             dispatch(setIsLoadingWallet({ isLoading: false, operationSuccesful: true }));
    //             setContentTransaction("");
    //         }
    //     });
    // }
  };

  return (
    <>
      <div className={styles.liquidity}>
        <Navbar />
        <section className="section sec1 liquidity liquidity1 liquidity1-sec1">
          <div className="sec-wrapper">
            <div className="titles">
              <div className="title-wrapper">
                <img className="pointer" src="/images/left_arrow.png" onClick={handleReturn} />
                <h1 className="title">Add Liquidity</h1>
              </div>
              <div className="extras">
                <div className="more">
                  <p>Clear All</p>
                </div>
                <Link href="/liquidity" className="img-setting">
                  <img src="/images/settings.png" />
                </Link>
              </div>
            </div>
            <div className="content-box">
              <div className="content-part-wrapper left">
                {/* <div className="flex ">
                  <div className="mx-2 text-white font-title3">Add new pool</div>
                  <div className="relative top-[2px]">
                    <ToolTip
                      id="tooltip2"
                      position={Position.top}
                      toolTipChild={
                        <div className="w-[100px] md:w-[250px]">
                          Create a new liquidity pool for a token pair.
                        </div>
                      }
                    >
                      <Image alt={"alt"} src={info} className="cursor-pointer" />
                    </ToolTip>
                  </div>
                </div> */}
                <div
                  className={
                    step1 ? "content-part content-part2" : "content-part content-part2 greyText"
                  }
                >
                  <h2 className="title">Select Fee Tier</h2>
                  <p className="desc">The % you will earn in fee’s</p>
                  <div className="pairs-wrapper">
                    <div
                      className={feeTier === FEE_TIER.TIER1 ? "pairs pairs-activated" : "pairs"}
                      onClick={() => {
                        if (feeTier === FEE_TIER.TIER1) {
                          setFeeTier(FEE_TIER.NONE);
                        } else {
                          setFeeTier(FEE_TIER.TIER1);
                        }
                        setStep2(!step2);
                      }}
                    >
                      <div className="number">0.05%</div>
                      <div className="text">Best for stable pairs</div>
                    </div>
                    <div
                      className={feeTier === FEE_TIER.TIER2 ? "pairs pairs-activated" : "pairs"}
                      onClick={() => {
                        if (feeTier === FEE_TIER.TIER2) {
                          setFeeTier(FEE_TIER.NONE);
                        } else {
                          setFeeTier(FEE_TIER.TIER2);
                        }
                        setStep2(!step2);
                      }}
                    >
                      <div className="number">0.3%</div>
                      <div className="text">Best for most pairs</div>
                    </div>
                    <div
                      className={feeTier === FEE_TIER.TIER3 ? "pairs pairs-activated" : "pairs"}
                      onClick={() => {
                        if (feeTier === FEE_TIER.TIER3) {
                          setFeeTier(FEE_TIER.NONE);
                        } else {
                          setFeeTier(FEE_TIER.TIER3);
                        }
                        setStep2(!step2);
                      }}
                    >
                      <div className="number">1%</div>
                      <div className="text">Best for exotic pairs</div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%]">
                  <NewPoolMain
                    setShowConfirmPool={setShowConfirmPool}
                    firstTokenAmount={firstTokenAmountLiq}
                    secondTokenAmount={secondTokenAmountLiq}
                    userBalances={allBalance.allTokensBalances}
                    setShowLiquidityModalPopup={setShowLiquidityModalPopup}
                    setSecondTokenAmount={setSecondTokenAmountLiq}
                    setFirstTokenAmount={setFirstTokenAmountLiq}
                    tokenIn={tokenIn}
                    tokenOut={tokenOut}
                    tokenInOp={tokenInOp}
                    tokenOutOp={tokenOutOp}
                    feeTier={feeTier}
                    curPrice={curPrice}
                    userMinPrice={userMinPrice}
                    userMaxPrice={userMaxPrice}
                    userCurPrice={userCurPrice}
                    setUserMinPrice={setUserMinPrice}
                    setUserMaxPrice={setUserMaxPrice}
                    tickUpper={tickUpper}
                    tickLower={tickLower}
                    setTickUpper={setTickUpper}
                    setTickLower={setTickLower}
                    setCurSqrt={setCurSqrt}
                    setCurPrice={setCurPrice}
                    setIsAddLiquidity={setIsAddLiquidity}
                    isAddLiquidity={isAddLiquidity}
                    pnlpBalance={pnlpBalance}
                    setBurnAmount={setBurnAmount}
                    burnAmount={burnAmount}
                    setRemoveTokenAmount={setRemoveTokenAmount}
                    removeTokenAmount={removeTokenAmount}
                    setSlippage={setSlippage}
                    slippage={slippage}
                    isLoading={isLoading}
                    handleTokenType={handleTokenType}
                    setPair={setPair}
                    pair={pair}
                    setShowLiquidityModal={handelshowLiquidityModal}
                    showLiquidityModal={showLiquidityModalPopup}
                    contractTokenBalance={contractTokenBalance}
                    isExist={isExist}
                    setIsExist={setIsExist}
                  />
                </div>
                {showConfirmPool && (
                  <ConfirmAddPool
                    show={showConfirmPool}
                    pair={pair}
                    setShow={setShowConfirmPool}
                    tokenIn={tokenIn}
                    tokenOut={tokenOut}
                    firstTokenAmount={firstTokenAmountLiq}
                    secondTokenAmount={secondTokenAmountLiq}
                    onClick={handleAddNewPoolOperation}
                    routeDetails={
                      {} as {
                        path: string[];
                        minimumOut: BigNumber;
                        minimumTokenOut: BigNumber[];
                        priceImpact: BigNumber;
                        finalFeePerc: BigNumber;
                        feePerc: BigNumber[];
                        isStable: boolean[];
                        exchangeRate: BigNumber;
                        success: boolean;
                      }
                    }
                  />
                )}
                <TokenModalPool
                  tokens={tokensListConfig.filter((e: any) => {
                    return (
                      e.name.toLowerCase() !== MigrateToken.KODEX.toLowerCase() &&
                      // e.name.toLowerCase() !== "XTZ".toLowerCase() &&
                      e.name.toLowerCase() !== MigrateToken.WRAP.toLowerCase()
                    );
                  })}
                  show={swapModalShow}
                  isLoading={allBalance.success}
                  allBalance={allBalance.allTokensBalances}
                  selectToken={selectToken}
                  onhide={handleClose}
                  tokenIn={tokenIn}
                  tokenOut={tokenOut}
                  tokenType={tokenType}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                {showConfirmTransaction && (
                  <ConfirmTransaction
                    show={showConfirmTransaction}
                    setShow={setShowConfirmTransaction}
                    content={`Addition of new ${localStorage.getItem(
                      TOKEN_A
                    )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
                      FIRST_TOKEN_AMOUNT
                    )} pool`}
                  />
                )}
                {showTransactionSubmitModal && (
                  <TransactionSubmitted
                    show={showTransactionSubmitModal}
                    setShow={setShowTransactionSubmitModal}
                    onBtnClick={
                      transactionId
                        ? () => window.open(`${tzktExplorer}${transactionId}`, "_blank")
                        : null
                    }
                    content={`Addition of new ${localStorage.getItem(
                      TOKEN_A
                    )}/${localStorage.getItem(TOKEN_B)} ${localStorage.getItem(
                      FIRST_TOKEN_AMOUNT
                    )} pool`}
                  />
                )}
              </div>

              <div
                className={
                  step3 ? "content-part-wrapper right" : "content-part-wrapper right greyText"
                }
              >
                {
                  !isExist || !curPrice ? (<>
                    <div className="header">
                      <h2 className="title">Set Starting Price</h2>
                    </div>
                    <div className="warning-message-new-pool">
                      This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.
                    </div>
                    <input
                      className="input-start-price"
                      type="number"
                      min="0"
                      value={userCurPrice}
                      onChange={(e) => setUserCurPrice(parseFloat(e.target.value))}
                    />
                    <br></br>
                    {tokenIn.symbol && tokenOut.symbol && <div className="current-start-price">
                      <div>{`Current ${tokenIn.symbol} Price:`}</div>
                      <div>{`${userCurPrice} ${tokenOut.symbol}`}</div>
                    </div>}
                    <div className="header">
                      <h2 className="title">Set Price Range</h2>
                    </div>
                  </>
                  ) : (<>
                    <div className="header">
                      <h2 className="title">Set Price Range</h2>
                      <div className="buttons">
                        <button className="button">-</button>
                        <button className="button">+</button>
                      </div>
                    </div>
                    <h2 className="current-price">
                      {`Current Price: ${curPrice}`}
                    </h2>
                    <div className="range-selector-graphic"></div>
                  </>
                  )
                }

                <div className="range-selector-box-pair">
                  <div className="price-box min-price">
                    <div className="title">Min Price</div>
                    <div className="body">
                      <button className="button">-</button>
                      <input className="price" type='number' value={userMinPrice} onChange={(e) => setUserMinPrice(parseFloat(e.target.value))} />
                      <button className="button">+</button>
                    </div>
                    <div className="price-unit">X per Y</div>
                  </div>
                  <div className="price-box max-price">
                    <div className="title">Max Price</div>
                    <div className="body">
                      <button className="button">-</button>
                      <input className="price" type='number' value={userMaxPrice} onChange={(e) => setUserMaxPrice(parseFloat(e.target.value))} />
                      <button className="button">+</button>
                    </div>
                    <div className="price-unit">X per Y</div>
                  </div>
                </div>
                <div className="warning-message" style={{ display: false ? "block" : "none" }}>
                  err message
                </div>
                <button className="full-range">Full Range</button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
