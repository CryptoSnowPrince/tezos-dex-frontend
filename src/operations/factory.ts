import { OpKind, StorageConsumingOperation, WalletParamsWithKind } from "@taquito/taquito";
import {
  dappClient,
  factoryAddress,
  positionManagerAddress,
  routerAddress,
  tezDeployerAddress,
} from "../common/walletconnect";
import { IConfigToken, TokenStandard } from "../config/types";
import { store } from "../redux";
import { setFlashMessage } from "../redux/flashMessage";
import { IFlashMessageProps } from "../redux/flashMessage/type";
import {
  IOperationsResponse,
  TResetAllValues,
  TSetShowConfirmTransaction,
  TTransactionSubmitModal,
} from "./types";
import { char2Bytes } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import { getBatchOperationsWithLimits } from "../api/util/operations";
import { FEE_TIER } from "../constants/global";

export const deployV3Pool = async (
  token1: IConfigToken,
  token2: IConfigToken,
  feeTier: FEE_TIER,
  isExist: boolean,
  tickLower: number,
  tickUpper: number,
  caller: string,
  token1Amount: string,
  token2Amount: string,
  token1MinAmount: string,
  token2MinAmount: string,
  currentSqrt: BigNumber,
  transactionSubmitModal: TTransactionSubmitModal | undefined,
  resetAllValues: TResetAllValues | undefined,
  setShowConfirmTransaction: TSetShowConfirmTransaction | undefined,
  flashMessageContent?: IFlashMessageProps
): Promise<IOperationsResponse> => {
  try {
    const { CheckIfWalletConnected } = dappClient();
    const WALLET_RESP = await CheckIfWalletConnected();
    if (!WALLET_RESP.success) {
      throw new Error("Wallet connection failed");
    }

    const Tezos = await dappClient().tezos();
    const positionManagerInstance = await Tezos.wallet.at(positionManagerAddress);
    const token1Instance = await Tezos.wallet.at(token1.address as string);
    const token2Instance = await Tezos.wallet.at(token2.address as string);

    const allBatch: WalletParamsWithKind[] = [];

    if (!isExist) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...positionManagerInstance.methods
          .createPoolIfNecessary("fa12", token1.address, "fa12", token2.address, feeTier)
          .toTransferParams(),
      });
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...positionManagerInstance.methods
          .initializePoolIfNecessary(
            "fa12",
            token1.address,
            "fa12",
            token2.address,
            feeTier,
            currentSqrt
          )
          .toTransferParams(),
      });
    }

    console.log("[prince] deployV3Pool: token1Amount", token1Amount);
    // console.log('[prince] deployV3Pool: token1Amount .integerValue()',(new BigNumber(token1Amount).multipliedBy(new BigNumber(10).pow(token1.decimals))).integerValue(BigNumber.ROUND_CEIL).toString())
    console.log("[prince] deployV3Pool: token2Amount", token2Amount);
    // console.log('[prince] deployV3Pool: token2Amount .integerValue()', (new BigNumber(token2Amount).multipliedBy(new BigNumber(10).pow(token2.decimals))).integerValue(BigNumber.ROUND_CEIL).toString())

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...token1Instance.methods
        .approve(
          positionManagerAddress,
          new BigNumber(token1Amount).multipliedBy(new BigNumber(10).pow(token1.decimals))
        )
        .toTransferParams(),
    });

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...token2Instance.methods
        .approve(
          positionManagerAddress,
          new BigNumber(token2Amount).multipliedBy(new BigNumber(10).pow(token2.decimals))
        )
        .toTransferParams(),
    });

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...positionManagerInstance.methods
        .mint(
          "fa12",
          token1.address,
          "fa12",
          token2.address,
          feeTier,
          tickLower,
          tickUpper,
          new BigNumber(token1Amount).multipliedBy(new BigNumber(10).pow(token1.decimals)),
          new BigNumber(token2Amount).multipliedBy(new BigNumber(10).pow(token2.decimals)),
          new BigNumber(token1MinAmount).multipliedBy(new BigNumber(10).pow(token1.decimals)),
          new BigNumber(token2MinAmount).multipliedBy(new BigNumber(10).pow(token2.decimals)),
          caller,
          new Date(Date.now() + 1000000).toISOString()
        )
        .toTransferParams(),
    });

    // ============

    const updatedBatchOperations = await getBatchOperationsWithLimits(allBatch);
    const batch = Tezos.wallet.batch(updatedBatchOperations);
    const batchOp = await batch.send();

    setShowConfirmTransaction && setShowConfirmTransaction(false);
    resetAllValues && resetAllValues();

    transactionSubmitModal && transactionSubmitModal(batchOp.opHash);
    if (flashMessageContent) {
      store.dispatch(setFlashMessage(flashMessageContent));
    }

    await batchOp.confirmation(1);

    const status = await batchOp.status();
    if (status === "applied") {
      return {
        success: true,
        operationId: batchOp.opHash,
      };
    } else {
      throw new Error(status);
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      operationId: undefined,
      error: error.message,
    };
  }
};

export const deployVolatile = async (
  token1: IConfigToken,
  token2: IConfigToken,
  caller: string,
  token1Amount: BigNumber,
  token2Amount: BigNumber,
  transactionSubmitModal: TTransactionSubmitModal | undefined,
  resetAllValues: TResetAllValues | undefined,
  setShowConfirmTransaction: TSetShowConfirmTransaction | undefined,
  flashMessageContent?: IFlashMessageProps
): Promise<IOperationsResponse> => {
  try {
    const { CheckIfWalletConnected } = dappClient();
    const WALLET_RESP = await CheckIfWalletConnected();
    if (!WALLET_RESP.success) {
      throw new Error("Wallet connection failed");
    }

    const Tezos = await dappClient().tezos();
    const factoryInstance = await Tezos.wallet.at(factoryAddress);
    const token1Instance = await Tezos.wallet.at(token1.address as string);
    const token2Instance = await Tezos.wallet.at(token2.address as string);

    const allBatch: WalletParamsWithKind[] = [];

    if (token1.standard === TokenStandard.FA12) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token1Instance.methods
          .transfer(
            caller,
            routerAddress,
            token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals))
          )
          .toTransferParams(),
      });
    } else if (token1.standard === TokenStandard.FA2) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token1Instance.methods
          .transfer([
            {
              from_: caller,
              txs: [
                {
                  to_: routerAddress,
                  token_id: token1.tokenId ?? 0,
                  amount: token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals)),
                },
              ],
            },
          ])
          .toTransferParams(),
      });
    }
    if (token2.standard === TokenStandard.FA12) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token2Instance.methods
          .transfer(
            caller,
            routerAddress,
            token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals))
          )
          .toTransferParams(),
      });
    } else if (token2.standard === TokenStandard.FA2) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token2Instance.methods
          .transfer([
            {
              from_: caller,
              txs: [
                {
                  to_: routerAddress,
                  token_id: token2.tokenId ?? 0,
                  amount: token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals)),
                },
              ],
            },
          ])
          .toTransferParams(),
      });
    }

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...factoryInstance.methods
        .deployVolatilePair(
          token1.address as string,
          token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals)),
          token1.tokenId ?? 0,
          token1.standard === TokenStandard.FA2,
          token2.address as string,
          token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals)),
          token2.tokenId ?? 0,
          token2.standard === TokenStandard.FA2,
          char2Bytes(`${token1.symbol}-${token2.symbol} PNLP`),
          caller
        )
        .toTransferParams(),
    });

    const updatedBatchOperations = await getBatchOperationsWithLimits(allBatch);
    const batch = Tezos.wallet.batch(updatedBatchOperations);
    const batchOp = await batch.send();

    setShowConfirmTransaction && setShowConfirmTransaction(false);
    resetAllValues && resetAllValues();

    transactionSubmitModal && transactionSubmitModal(batchOp.opHash);
    if (flashMessageContent) {
      store.dispatch(setFlashMessage(flashMessageContent));
    }

    await batchOp.confirmation(1);

    const status = await batchOp.status();
    if (status === "applied") {
      return {
        success: true,
        operationId: batchOp.opHash,
      };
    } else {
      throw new Error(status);
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      operationId: undefined,
      error: error.message,
    };
  }
};

// TODO : Add amounts

export const deployStable = async (
  token1: IConfigToken,
  token2: IConfigToken,
  caller: string,
  token1Amount: BigNumber,
  token2Amount: BigNumber,
  transactionSubmitModal: TTransactionSubmitModal | undefined,
  resetAllValues: TResetAllValues | undefined,
  setShowConfirmTransaction: TSetShowConfirmTransaction | undefined,
  flashMessageContent?: IFlashMessageProps
): Promise<IOperationsResponse> => {
  try {
    const { CheckIfWalletConnected } = dappClient();
    const WALLET_RESP = await CheckIfWalletConnected();
    if (!WALLET_RESP.success) {
      throw new Error("Wallet connection failed");
    }

    const Tezos = await dappClient().tezos();
    const factoryInstance = await Tezos.wallet.at(factoryAddress);
    const token1Instance = await Tezos.wallet.at(token1.address as string);
    const token2Instance = await Tezos.wallet.at(token2.address as string);

    const allBatch: WalletParamsWithKind[] = [];

    if (token1.standard === TokenStandard.FA12) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token1Instance.methods
          .transfer(
            caller,
            routerAddress,
            token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals))
          )
          .toTransferParams(),
      });
    } else if (token1.standard === TokenStandard.FA2) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token1Instance.methods
          .transfer([
            {
              from_: caller,
              txs: [
                {
                  to_: routerAddress,
                  token_id: token1.tokenId ?? 0,
                  amount: token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals)),
                },
              ],
            },
          ])
          .toTransferParams(),
      });
    }
    if (token2.standard === TokenStandard.FA12) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token2Instance.methods
          .transfer(
            caller,
            routerAddress,
            token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals))
          )
          .toTransferParams(),
      });
    } else if (token2.standard === TokenStandard.FA2) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...token2Instance.methods
          .transfer([
            {
              from_: caller,
              txs: [
                {
                  to_: routerAddress,
                  token_id: token2.tokenId ?? 0,
                  amount: token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals)),
                },
              ],
            },
          ])
          .toTransferParams(),
      });
    }

    let token1Precision;
    let token2Precision;

    if (token1.decimals <= token2.decimals) {
      token2Precision = 1;
      token1Precision = Math.pow(10, token2.decimals - token1.decimals);
    } else {
      token1Precision = 1;
      token2Precision = Math.pow(10, token1.decimals - token2.decimals);
    }

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...factoryInstance.methods
        .deployStablePair(
          token1.address,
          token1Amount.multipliedBy(new BigNumber(10).pow(token1.decimals)),
          token1.tokenId ?? 0,
          token1Precision,
          token1.standard === TokenStandard.FA2 ? true : false,
          token2.address,
          token2Amount.multipliedBy(new BigNumber(10).pow(token2.decimals)),
          token2.tokenId ?? 0,
          token2Precision,
          token2.standard === TokenStandard.FA2 ? true : false,
          char2Bytes(`${token1.symbol}-${token2.symbol} PNLP`),
          caller
        )
        .toTransferParams(),
    });

    const updatedBatchOperations = await getBatchOperationsWithLimits(allBatch);
    const batch = Tezos.wallet.batch(updatedBatchOperations);
    const batchOp = await batch.send();

    setShowConfirmTransaction && setShowConfirmTransaction(false);
    resetAllValues && resetAllValues();

    transactionSubmitModal && transactionSubmitModal(batchOp.opHash);
    if (flashMessageContent) {
      store.dispatch(setFlashMessage(flashMessageContent));
    }

    await batchOp.confirmation(1);

    const status = await batchOp.status();
    if (status === "applied") {
      return {
        success: true,
        operationId: batchOp.opHash,
      };
    } else {
      throw new Error(status);
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      operationId: undefined,
      error: error.message,
    };
  }
};

export const deployTezPair = async (
  tokenOne: IConfigToken,
  tokenTwo: IConfigToken,
  caller: string,
  tokenOneAmount: BigNumber,
  tokenTwoAmount: BigNumber,
  transactionSubmitModal: TTransactionSubmitModal | undefined,
  resetAllValues: TResetAllValues | undefined,
  setShowConfirmTransaction: TSetShowConfirmTransaction | undefined,
  flashMessageContent?: IFlashMessageProps
): Promise<IOperationsResponse> => {
  try {
    let tezToken: IConfigToken | undefined,
      tezAmount: BigNumber = new BigNumber(0),
      secondToken: IConfigToken | undefined,
      secondTokenAmount: BigNumber = new BigNumber(0);
    const { CheckIfWalletConnected } = dappClient();
    const WALLET_RESP = await CheckIfWalletConnected();
    if (!WALLET_RESP.success) {
      throw new Error("Wallet connection failed");
    }
    const Tezos = await dappClient().tezos();

    if (tokenOne.symbol === "XTZ") {
      tezToken = tokenOne;
      tezAmount = tokenOneAmount;
      secondToken = tokenTwo;
      secondTokenAmount = tokenTwoAmount;
    } else if (tokenTwo.symbol === "XTZ") {
      tezToken = tokenTwo;
      tezAmount = tokenTwoAmount;
      secondToken = tokenOne;
      secondTokenAmount = tokenOneAmount;
    } else {
      throw new Error("Tez pair expected, but found none");
    }
    tezAmount = tezAmount
      .multipliedBy(new BigNumber(10).pow(tezToken.decimals))
      .decimalPlaces(0, 1);
    secondTokenAmount = secondTokenAmount
      .multipliedBy(new BigNumber(10).pow(secondToken.decimals))
      .decimalPlaces(0, 1);

    const tezDeployerInstance = await Tezos.wallet.at(tezDeployerAddress);
    const secondTokenInstane = await Tezos.wallet.at(secondToken.address as string);

    const allBatch: WalletParamsWithKind[] = [];

    if (secondToken.standard === TokenStandard.FA12) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...secondTokenInstane.methods
          .transfer(caller, routerAddress, secondTokenAmount)
          .toTransferParams(),
      });
    } else if (secondToken.standard === TokenStandard.FA2) {
      allBatch.push({
        kind: OpKind.TRANSACTION,
        ...secondTokenInstane.methods
          .transfer([
            {
              from_: caller,
              txs: [
                {
                  to_: routerAddress,
                  token_id: secondToken.tokenId || 0,
                  amount: secondTokenAmount,
                },
              ],
            },
          ])
          .toTransferParams(),
      });
    } else {
      throw new Error("Invalid token standard");
    }

    allBatch.push({
      kind: OpKind.TRANSACTION,
      ...tezDeployerInstance.methods
        .deployTezPair(
          tezAmount,
          secondToken.address as string,
          secondTokenAmount,
          secondToken.tokenId || 0,
          char2Bytes(`${secondToken.symbol}-${tezToken.symbol} PNLP`),
          secondToken.standard === TokenStandard.FA2 ? true : false,
          caller
        )
        .toTransferParams({
          mutez: true,
          amount: tezAmount.toNumber(),
        }),
    });

    const updatedBatchOperations = await getBatchOperationsWithLimits(allBatch);
    const batch = Tezos.wallet.batch(updatedBatchOperations);
    // const batch = Tezos.wallet.batch(allBatch);
    const batchOp = await batch.send();

    setShowConfirmTransaction && setShowConfirmTransaction(false);
    resetAllValues && resetAllValues();

    transactionSubmitModal && transactionSubmitModal(batchOp.opHash);
    if (flashMessageContent) {
      store.dispatch(setFlashMessage(flashMessageContent));
    }

    await batchOp.confirmation(1);

    const status = await batchOp.status();
    if (status === "applied") {
      return {
        success: true,
        operationId: batchOp.opHash,
      };
    } else {
      throw new Error(status);
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      operationId: undefined,
      error: error.message,
    };
  }
};
