import styles from '../../styles/pages/liquidity.module.scss'
import Navbar from "../../components/navbar";
import Pinkbtn from "../../components/buttons/pinkbtn";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import CryptoSlider from "../../components/cryptoSlider";
import Footer from "../../components/footer";
import SelectToken from "../../components/selectToken";
import { useRouter } from "next/router";

import clsx from "clsx";
import { tokensList } from "../../src/constants/tokensList";
import { useLocationStateInSwap } from "../../src/hooks/useLocationStateInSwap";
import SwapModal from "../../src/components/SwapModal/SwapModal";
import SwapTab from "../../src/components/Swap/SwapTab";
import { getAllTokensBalanceFromTzkt } from "../../src/api/util/balance";
import { ERRORMESSAGES, tokenParameter, tokensModal, tokenType } from "../../src/constants/swap";
import { useAppSelector } from "../../src/redux";
import { BigNumber } from "bignumber.js";
import { allPaths } from "../../src/api/swap/router";
import { computeAllPathsWrapper, computeReverseCalculationWrapper } from "../../src/api/swap/wrappers";
import {
    IAllBalanceResponse,
    IAllTokensBalance,
    IAllTokensBalanceResponse,
} from "../../src/api/util/types";
import { Chain, MigrateToken } from "../../src/config/types";
import { tEZorCTEZtoUppercase } from "../../src/api/util/helpers";

interface ILiquidityProps {
    className?: string;
    otherProps: {
        connectWallet: () => void;
        disconnectWallet: () => void;
        walletAddress: string;
    };
}

export default function Liquidity(props: ILiquidityProps) {

    let [step1, setStep1] = useState(true);
    let [step2, setStep2] = useState(false);
    let [step3, setStep3] = useState(false);

    let [token1, setToken1] = useState('');
    let [token2, setToken2] = useState('');

    let [isPairsClicked, setIsPairsClicked] = useState([
        {
            "activated": false
        },
        {
            "activated": false
        },
        {
            "activated": false
        }
    ])

    const router = useRouter();

    // const TOKEN = useAppSelector((state) => state.config.tokens);
    // const tokenPrice = useAppSelector((state) => state.tokenPrice.tokenPrice);
    // const userSettings = useAppSelector((state) =>
    //     state.userSettings.settings[
    //         props.otherProps.walletAddress ? props.otherProps.walletAddress : ""
    //     ]
    //         ? state.userSettings.settings[
    //         props.otherProps.walletAddress ? props.otherProps.walletAddress : ""
    //         ]
    //         : state.userSettings.settings[""]
    // );

    // const tokens = useAppSelector((state) => state.config.tokens);
    // const walletAddress = useAppSelector((state) => state.wallet.address);
    // const tokensArray = Object.entries(tokens);
    // const { tokenIn, setTokenIn, tokenOut, setTokenOut } = useLocationStateInSwap();

    // const [firstTokenAmount, setFirstTokenAmount] = useState<string | number>("");
    // const [secondTokenAmount, setSecondTokenAmount] = useState<number | string>("");
    // const [showConfirmTransaction, setShowConfirmTransaction] = useState(false);
    // const [showConfirmSwap, setShowConfirmSwap] = useState(false);
    // const [recepient, setRecepient] = useState("");

    // const [showTransactionSubmitModal, setShowTransactionSubmitModal] = useState(false);
    // const [tokenType, setTokenType] = useState<tokenType>("tokenIn");
    // const [searchQuery, setSearchQuery] = useState("");
    // const [swapModalShow, setSwapModalShow] = useState(false);
    // const [slippage, setSlippage] = useState(Number(userSettings.slippage));

    // const [balanceUpdate, setBalanceUpdate] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [enableMultiHop, setEnableMultiHop] = useState(userSettings.multiHop);
    // const loading = React.useRef<{
    //     isLoadingfirst?: boolean;
    //     isLoadingSecond?: boolean;
    // }>({
    //     isLoadingfirst: false,
    //     isLoadingSecond: false,
    // });

    // const routeDetails = React.useRef<{
    //     path: string[];
    //     minimumOut: BigNumber;
    //     minimumTokenOut: BigNumber[];
    //     priceImpact: BigNumber;
    //     finalFeePerc: BigNumber;
    //     feePerc: BigNumber[];
    //     isStable: boolean[];
    //     exchangeRate: BigNumber;
    //     success: boolean;
    // }>({
    //     minimumOut: new BigNumber(0),
    //     minimumTokenOut: [],
    //     feePerc: [],
    //     isStable: [],
    //     path: [],
    //     finalFeePerc: new BigNumber(0),
    //     priceImpact: new BigNumber(0),
    //     success: false,
    //     exchangeRate: new BigNumber(0),
    // });

    // const allPath = React.useRef<string[]>([]);
    // const allPath1 = React.useRef<string[]>([]);
    // const [allPathState, setAllPathState] = useState<string[]>([]);
    // const allPathSwapData = React.useRef<any[][]>([]);
    // const allPathSwapData1 = React.useRef<any[][]>([]);
    // const isSwitchClicked = React.useRef<boolean>(false);

    // const [allBalance, setAllBalance] = useState<IAllTokensBalanceResponse>({
    //     success: false,
    //     allTokensBalances: {} as IAllTokensBalance,
    // });

    // useEffect(() => {
    //     setAllBalance({
    //         success: false,
    //         allTokensBalances: {} as IAllTokensBalance,
    //     });

    //     if (walletAddress) {
    //         getAllTokensBalanceFromTzkt(Object.values(tokens), walletAddress).then(
    //             (response: IAllTokensBalanceResponse) => {
    //                 setAllBalance(response);
    //             }
    //         );
    //     } else {
    //         setAllBalance({
    //             success: false,
    //             allTokensBalances: {} as IAllTokensBalance,
    //         });
    //     }
    // }, [walletAddress, tokens, balanceUpdate]);

    // useEffect(() => {
    //     setSlippage(userSettings.slippage);
    //     setEnableMultiHop(userSettings.multiHop);
    // }, [props.otherProps.walletAddress, userSettings]);
    // useEffect(() => {
    //     if (
    //         Object.keys(tokenOut).length !== 0 &&
    //         tokenOut.name !== "" &&
    //         Object.keys(tokenIn).length !== 0 &&
    //         tokenIn.name !== ""
    //     ) {
    //         tokenPrice[tokenIn.name] || tokenPrice[tokenOut.name]
    //             ? (loading.current = {
    //                 isLoadingfirst: true,
    //                 isLoadingSecond: true,
    //             })
    //             : (loading.current = {
    //                 isLoadingfirst: false,
    //                 isLoadingSecond: false,
    //             });
    //     }
    // }, [tokenPrice]);

    // useEffect(() => {
    //     if (
    //         Object.prototype.hasOwnProperty.call(tokenIn, "name") &&
    //         Object.prototype.hasOwnProperty.call(tokenOut, "name") &&
    //         tokenIn.name !== "" &&
    //         tokenOut.name !== ""
    //     ) {
    //         !isSwitchClicked.current && firstTokenAmount === ""
    //             ? (loading.current = {
    //                 isLoadingfirst: true,
    //                 isLoadingSecond: true,
    //             })
    //             : Number(firstTokenAmount) !== 0 &&
    //             (routeDetails.current = {
    //                 minimumOut: new BigNumber(0),
    //                 minimumTokenOut: [],
    //                 feePerc: [],
    //                 isStable: [],
    //                 path: [],
    //                 finalFeePerc: new BigNumber(0),
    //                 priceImpact: new BigNumber(0),
    //                 success: true,
    //                 exchangeRate: new BigNumber(0),
    //             });
    //         allPaths(tokenIn.name, tokenOut.name, enableMultiHop).then((res) => {
    //             if (res) {
    //                 loading.current = {
    //                     isLoadingfirst: false,
    //                     isLoadingSecond: false,
    //                 };
    //                 allPath.current = res.paths;
    //                 if (allPath.current.length !== 0) {
    //                     setAllPathState(res.paths);
    //                     allPathSwapData.current = res.swapData;
    //                     setErrorMessage("");
    //                 } else {
    //                     setErrorMessage(enableMultiHop ? ERRORMESSAGES.SWAPROUTER : ERRORMESSAGES.SWAPMULTIHOP);

    //                     setAllPathState([]);
    //                     allPathSwapData.current = [];
    //                     routeDetails.current = {
    //                         minimumOut: new BigNumber(0),
    //                         minimumTokenOut: [],
    //                         feePerc: [],
    //                         isStable: [],
    //                         path: [],
    //                         finalFeePerc: new BigNumber(0),
    //                         priceImpact: new BigNumber(0),
    //                         success: false,
    //                         exchangeRate: new BigNumber(0),
    //                     };

    //                     loading.current = {
    //                         isLoadingfirst: false,
    //                         isLoadingSecond: false,
    //                     };
    //                 }
    //                 if (firstTokenAmount !== "" || secondTokenAmount !== "") {
    //                     loading.current = {
    //                         isLoadingfirst: false,
    //                         isLoadingSecond: false,
    //                     };
    //                     !isSwitchClicked.current && setSecondTokenAmount("");
    //                     !isSwitchClicked.current && handleSwapTokenInput(firstTokenAmount, "tokenIn");
    //                 }
    //                 allPaths(tokenOut.name, tokenIn.name, enableMultiHop).then((res) => {
    //                     allPath1.current = res.paths;
    //                     if (allPath1.current.length !== 0) {
    //                         setAllPathState(res.paths);
    //                         allPathSwapData1.current = res.swapData;
    //                         setErrorMessage("");
    //                     } else {
    //                         setAllPathState([]);
    //                         allPathSwapData1.current = [];
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }, [
    //     tokenIn,
    //     tokenOut,
    //     tokenType,
    //     enableMultiHop,
    //     tokenPrice,
    //     isSwitchClicked.current,
    //     balanceUpdate,
    // ]);

    // const handleSwapTokenInput = (input: string | number, tokenType: "tokenIn" | "tokenOut") => {
    //     isSwitchClicked.current = false;
    //     var flag = 1;
    //     if (input == ".") {
    //         if (tokenType === "tokenIn") {
    //             setFirstTokenAmount("0.");
    //         } else {
    //             setSecondTokenAmount("0.");
    //         }
    //         return;
    //     }
    //     if (Object.keys(tokenOut).length !== 0) {
    //         loading.current = {
    //             isLoadingSecond: true,
    //             isLoadingfirst: false,
    //         };
    //     } else {
    //         routeDetails.current = {
    //             minimumOut: new BigNumber(0),
    //             minimumTokenOut: [],
    //             feePerc: [],
    //             isStable: [],
    //             path: [],
    //             finalFeePerc: new BigNumber(0),
    //             priceImpact: new BigNumber(0),
    //             success: false,
    //             exchangeRate: new BigNumber(0),
    //         };
    //     }

    //     if (
    //         input === "" ||
    //         isNaN(Number(input)) ||
    //         (Object.keys(tokenOut).length !== 0 && allPath.current.length === 0)
    //     ) {
    //         setFirstTokenAmount("");
    //         setSecondTokenAmount("");
    //         routeDetails.current = {
    //             minimumOut: new BigNumber(0),
    //             minimumTokenOut: [],
    //             feePerc: [],
    //             isStable: [],
    //             path: [],
    //             finalFeePerc: new BigNumber(0),
    //             priceImpact: new BigNumber(0),
    //             success: false,
    //             exchangeRate: new BigNumber(0),
    //         };
    //         loading.current = {
    //             isLoadingSecond: false,
    //             isLoadingfirst: false,
    //         };
    //     } else if (Number(input) === 0) {
    //         setFirstTokenAmount(input.toString().trim());

    //         routeDetails.current = {
    //             minimumOut: new BigNumber(0),
    //             minimumTokenOut: [],
    //             feePerc: [],
    //             isStable: [],
    //             path: [],
    //             finalFeePerc: new BigNumber(0),
    //             priceImpact: new BigNumber(0),
    //             success: false,
    //             exchangeRate: new BigNumber(0),
    //         };
    //         loading.current = {
    //             isLoadingSecond: false,
    //             isLoadingfirst: false,
    //         };
    //         setSecondTokenAmount(input.toString().trim());
    //     } else {
    //         if (tokenType === "tokenIn") {
    //             setFirstTokenAmount(input.toString().trim());
    //             const decimal = new BigNumber(input).decimalPlaces();

    //             if (
    //                 input !== null &&
    //                 decimal !== null &&
    //                 new BigNumber(decimal).isGreaterThan(tokens[tokenIn.name]?.decimals)
    //             ) {
    //                 flag = 0;
    //                 setErrorMessage(
    //                     `The Precision of ${tEZorCTEZtoUppercase(tokenIn.name)} token cant be greater than ${tokens[tokenIn.name].decimals
    //                     } decimals`
    //                 );
    //             }
    //             // if (flag === 1) {
    //             //   setErrorMessage("");
    //             // }

    //             if (Object.keys(tokenOut).length !== 0) {
    //                 loading.current = {
    //                     isLoadingSecond: true,
    //                     isLoadingfirst: false,
    //                 };
    //                 const res = computeAllPathsWrapper(
    //                     allPath.current,
    //                     new BigNumber(input),
    //                     new BigNumber(slippage),
    //                     allPathSwapData.current,
    //                     tokenPrice
    //                 );
    //                 loading.current = {
    //                     isLoadingSecond: false,
    //                     isLoadingfirst: false,
    //                 };
    //                 routeDetails.current = {
    //                     minimumOut: res.finalMinimumTokenOut,
    //                     minimumTokenOut: res.minimumTokenOut,
    //                     feePerc: res.feePerc,
    //                     isStable: res.isStable,
    //                     path: res.path,
    //                     finalFeePerc: res.finalFeePerc,
    //                     priceImpact: res.finalPriceImpact,
    //                     success: true,
    //                     exchangeRate: res.exchangeRate,
    //                 };
    //                 if (res.tokenOutAmount.isLessThan(0)) {
    //                     flag = 0;
    //                     setErrorMessage(ERRORMESSAGES.INSUFFICIENT_LIQUIDITY);
    //                 }

    //                 setSecondTokenAmount(
    //                     res.tokenOutAmount.isLessThan(0) ? 0 : res.tokenOutAmount.toString().trim()
    //                 );
    //             }
    //         } else if (tokenType === "tokenOut") {
    //             setSecondTokenAmount(input.toString().trim());
    //             const decimal = new BigNumber(input).decimalPlaces();

    //             if (
    //                 input !== null &&
    //                 decimal !== null &&
    //                 new BigNumber(decimal).isGreaterThan(tokens[tokenOut.name].decimals)
    //             ) {
    //                 flag = 0;
    //                 setErrorMessage(
    //                     `The Precision of ${tEZorCTEZtoUppercase(tokenOut.name)} token cant be greater than ${tokens[tokenOut.name].decimals
    //                     } decimals`
    //                 );
    //             }

    //             if (Object.keys(tokenIn).length !== 0) {
    //                 loading.current = {
    //                     isLoadingfirst: true,
    //                     isLoadingSecond: false,
    //                 };
    //                 const res = computeReverseCalculationWrapper(
    //                     allPath1.current,
    //                     new BigNumber(input),
    //                     new BigNumber(slippage),
    //                     allPathSwapData1.current,
    //                     tokenPrice,
    //                     allPath.current,
    //                     allPathSwapData.current
    //                 );
    //                 loading.current = {
    //                     isLoadingSecond: false,
    //                     isLoadingfirst: false,
    //                 };
    //                 routeDetails.current = {
    //                     minimumOut: res.finalMinimumTokenOut,
    //                     minimumTokenOut: res.minimumTokenOut,
    //                     feePerc: res.feePerc,
    //                     isStable: res.isStable,
    //                     path: res.path,
    //                     finalFeePerc: res.finalFeePerc,
    //                     priceImpact: res.finalPriceImpact,
    //                     success: true,
    //                     exchangeRate: res.exchangeRate,
    //                 };
    //                 if (res.tokenOutAmount.isLessThan(0)) {
    //                     flag = 0;
    //                     setErrorMessage(ERRORMESSAGES.INSUFFICIENT_LIQUIDITY);
    //                 }
    //                 setFirstTokenAmount(
    //                     res.tokenOutAmount.isLessThan(0) ? 0 : res.tokenOutAmount.toString().trim()
    //                 );
    //             }
    //         }
    //     }

    //     if (flag === 1) {
    //         setErrorMessage("");
    //     }
    // };

    // const handleTokenType = (type: tokenType) => {
    //     setBalanceUpdate(false);
    //     setSwapModalShow(true);
    //     setTokenType(type);
    // };

    // const handleClose = () => {
    //     setSwapModalShow(false);
    //     setSearchQuery("");
    // };

    // const resetAllValues = () => {
    //     setFirstTokenAmount("");
    //     setSecondTokenAmount("");
    //     handleSwapTokenInput("", "tokenIn");
    //     routeDetails.current = {
    //         minimumOut: new BigNumber(0),
    //         minimumTokenOut: [],
    //         feePerc: [],
    //         isStable: [],
    //         path: [],
    //         finalFeePerc: new BigNumber(0),
    //         priceImpact: new BigNumber(0),
    //         success: false,
    //         exchangeRate: new BigNumber(0),
    //     };
    // };

    // const selectToken = (token: tokensModal) => {
    //     isSwitchClicked.current = false;
    //     if ((tokenType === "tokenOut" || tokenType === "tokenIn") && firstTokenAmount !== "") {
    //         setSecondTokenAmount("");

    //         loading.current = {
    //             isLoadingfirst: false,
    //             isLoadingSecond: true,
    //         };
    //     }
    //     if (tokenType === "tokenIn") {
    //         setTokenIn({
    //             name: token.name,
    //             image: token.image,
    //         });
    //     } else {
    //         setTokenOut({
    //             name: token.name,
    //             image: token.image,
    //         });
    //     }
    //     handleClose();
    // };
    // const changeTokenLocation = () => {
    //     const inputValue = secondTokenAmount;
    //     setFirstTokenAmount(inputValue.toString());

    //     isSwitchClicked.current = true;
    //     //setSecondTokenAmount(firstTokenAmount);
    //     setSecondTokenAmount("");
    //     if (
    //         Object.prototype.hasOwnProperty.call(tokenIn, "name") &&
    //         Object.prototype.hasOwnProperty.call(tokenOut, "name") &&
    //         tokenIn.name !== "" &&
    //         tokenOut.name !== ""
    //     ) {
    //         loading.current = {
    //             isLoadingfirst: false,
    //             isLoadingSecond: true,
    //         };
    //     }

    //     if (tokenOut.name && tokenIn.name) {
    //         setTokenIn({
    //             name: tokenOut.name,
    //             image: tokenOut.image,
    //         });

    //         setTokenOut({
    //             name: tokenIn.name,
    //             image: tokenIn.image,
    //         });
    //         if (inputValue > 0) {
    //             setTimeout(() => {
    //                 routeDetails.current = {
    //                     minimumOut: new BigNumber(0),
    //                     minimumTokenOut: [],
    //                     feePerc: [],
    //                     isStable: [],
    //                     path: [],
    //                     finalFeePerc: new BigNumber(0),
    //                     priceImpact: new BigNumber(0),
    //                     success: true,
    //                     exchangeRate: new BigNumber(0),
    //                 };
    //                 setAllPathState([]);

    //                 const res = computeAllPathsWrapper(
    //                     allPath.current,
    //                     new BigNumber(inputValue),
    //                     new BigNumber(slippage),
    //                     allPathSwapData.current,
    //                     tokenPrice
    //                 );

    //                 routeDetails.current = {
    //                     minimumOut: res.finalMinimumTokenOut,
    //                     minimumTokenOut: res.minimumTokenOut,
    //                     feePerc: res.feePerc,
    //                     isStable: res.isStable,
    //                     path: res.path,
    //                     finalFeePerc: res.finalFeePerc,
    //                     priceImpact: res.finalPriceImpact,
    //                     success: true,
    //                     exchangeRate: res.exchangeRate,
    //                 };
    //                 res.tokenOutAmount.isLessThan(0)
    //                     ? setErrorMessage(ERRORMESSAGES.INSUFFICIENT_LIQUIDITY)
    //                     : setErrorMessage("");
    //                 setSecondTokenAmount(
    //                     res.tokenOutAmount.isLessThan(0) ? 0 : res.tokenOutAmount.toString()
    //                 );
    //                 loading.current = {
    //                     isLoadingSecond: false,
    //                     isLoadingfirst: false,
    //                 };
    //                 setSecondTokenAmount(
    //                     res.tokenOutAmount.isLessThan(0) ? 0 : res.tokenOutAmount.toString()
    //                 );
    //             }, 2000);
    //         } else {
    //             setSecondTokenAmount(0);
    //             loading.current = {
    //                 isLoadingSecond: false,
    //                 isLoadingfirst: false,
    //             };
    //         }
    //     } else if (Object.keys(tokenOut).length === 0) {
    //         loading.current = {
    //             isLoadingfirst: false,
    //             isLoadingSecond: false,
    //         };
    //         setTokenOut({
    //             name: tokenIn.name,
    //             image: tokenIn.image,
    //         });
    //         setTokenIn({} as tokenParameter);
    //     } else if (Object.keys(tokenIn).length === 0) {
    //         loading.current = {
    //             isLoadingfirst: false,
    //             isLoadingSecond: false,
    //         };
    //         setTokenIn({
    //             name: tokenOut.name,
    //             image: tokenOut.image,
    //         });
    //         setTokenOut({} as tokenParameter);
    //     }
    // };

    // const tokensListConfig = useMemo(() => {
    //     return tokensArray.map((token) => ({
    //         name: token[0],
    //         image: `/assets/Tokens/${token[1]?.symbol}.png`,
    //         chainType: token[1]?.originChain as Chain,
    //         address: token[1].address,
    //     }));
    // }, [tokens]);
    // useEffect(() => {
    //     if (allBalance.success && Object.keys(allBalance.allTokensBalances).length !== 0) {
    //         tokensListConfig.sort(
    //             (a, b) =>
    //                 Number(
    //                     allBalance.allTokensBalances[b.name]?.balance
    //                         ? allBalance.allTokensBalances[b.name]?.balance
    //                         : 0
    //                 ) -
    //                 Number(
    //                     allBalance.allTokensBalances[a.name]?.balance
    //                         ? allBalance.allTokensBalances[a.name]?.balance
    //                         : 0
    //                 )
    //         );
    //     }
    // }, [tokensListConfig, allBalance.allTokensBalances]);

    return (
        <>
            <div className={styles.liquidity}>

                <Navbar />
                <section className="section sec1 liquidity liquidity1 liquidity1-sec1">
                    <div className="sec-wrapper">
                        <div className="titles">
                            <div className="title-wrapper">
                                <img className="pointer" src="/images/left_arrow.png" onClick={() => { router.back() }} />
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
                                <div className="content-part content-part1">
                                    <h2 className="title">Select Pair</h2>
                                    <SelectToken />
                                    <SelectToken />
                                </div>
                                <div className={step1 ? "content-part content-part2" : "content-part content-part2 greyText"}>
                                    <h2 className="title">Select Fee Tier</h2>
                                    <p className="desc">The % you will earn in fee’s</p>
                                    <div className="pairs-wrapper">
                                        <div className={isPairsClicked[0].activated ? "pairs pairs-activated" : "pairs"} onClick={() => {
                                            let temp = [...isPairsClicked];
                                            temp[0].activated = !temp[0].activated;
                                            setIsPairsClicked([...temp]);
                                            setStep2(!step2);
                                            for (let i = 0; i < temp.length; i++) {
                                                if (temp[i].activated) {
                                                    alert("no");
                                                }
                                            }
                                        }}>
                                            <div className="number">0.05%</div>
                                            <div className="text">Best for stable pairs</div>
                                        </div>
                                        <div className={isPairsClicked[1].activated ? "pairs pairs-activated" : "pairs"} onClick={() => {
                                            let temp = [...isPairsClicked];
                                            temp[1].activated = !temp[1].activated;
                                            setIsPairsClicked([...temp]);
                                            setStep2(!step2);
                                        }}>
                                            <div className="number">0.3%</div>
                                            <div className="text">Best for most pairs</div>
                                        </div>
                                        <div className={isPairsClicked[2].activated ? "pairs pairs-activated" : "pairs"} onClick={() => {
                                            let temp = [...isPairsClicked];
                                            temp[2].activated = !temp[2].activated;
                                            setIsPairsClicked([...temp]);
                                            setStep2(!step2);
                                        }}>
                                            <div className="number">1%</div>
                                            <div className="text">Best for exotic pairs</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={step2 ? "content-part content-part3" : "content-part content-part3 greyText"}>
                                    <h2 className="title">Deposit amount</h2>
                                    <div className="deposit-wrapper">
                                        <div className="deposit">
                                            <img src="/images/cryptoLogo/ada.png" className="deposit-crypto-img" />
                                            <div className="top">
                                                <div className="deposit-top-balance">0</div>
                                                <p className="deposit-crypto">ETH</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="deposit-bottom-balance">
                                                    Balance: 0
                                                </div>
                                            </div>
                                        </div>
                                        <div className="deposit">
                                            <img src="/images/cryptoLogo/bao.png" className="deposit-crypto-img" />
                                            <div className="top">
                                                <div className="deposit-top-balance">0</div>
                                                <p className="deposit-crypto">ETH</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="deposit-bottom-balance">
                                                    Balance: 0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={step3 ? "content-part-wrapper right" : "content-part-wrapper right greyText"}>
                                <h2 className="title">Set Price Range</h2>
                                <div className="select">
                                    <div className="select-token">

                                    </div>
                                    <div className="select-token">

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                <Footer />
                {/* <SwapModal
                    tokens={tokensListConfig.filter((e: any) => {
                        return (
                            e.name.toLowerCase() !== MigrateToken.KODEX.toLowerCase() &&
                            e.name.toLowerCase() !== MigrateToken.WRAP.toLowerCase()
                        );
                    })}
                    show={swapModalShow}
                    isSuccess={allBalance.success}
                    isLoading={allBalance.success}
                    allBalance={allBalance.allTokensBalances}
                    selectToken={selectToken}
                    onhide={handleClose}
                    tokenIn={tokenIn}
                    tokenOut={tokenOut}
                    tokenType={tokenType}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                /> */}
            </div>
        </>
    )
}
