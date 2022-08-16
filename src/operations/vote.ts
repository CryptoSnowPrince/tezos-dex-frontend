import { dappClient, voterAddress } from '../common/walletconnect';
import { IOperationsResponse, TResetAllValues, TTransactionSubmitModal ,TSetShowConfirmTransaction, IVotes } from './types';



export const vote = async (
    id : number,
    votes : IVotes[],
    transactionSubmitModal: TTransactionSubmitModal,
    resetAllValues: TResetAllValues,
    setShowConfirmTransaction: TSetShowConfirmTransaction
  ): Promise<IOperationsResponse> => {
    try {
      const {CheckIfWalletConnected}=dappClient()
      const WALLET_RESP = await CheckIfWalletConnected();
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
  
      const Tezos = await dappClient().tezos();
      const voterInstance: any = await Tezos.contract.at(voterAddress);

      let batch = null;

    //  TODO :  Confirm how to send votes
    
    // TODO : Check Calling 

      batch = Tezos.wallet
        .batch()
        .withContractCall(
          voterInstance.methods.vote(
            id,
            votes
          )
        );

        const batchOp = await batch.send();
        setShowConfirmTransaction(false);
        resetAllValues();
  
        transactionSubmitModal(batchOp.opHash);
  
        await batchOp.confirmation();
        return {
          success: true,
          operationId: batchOp.opHash,
        };
      
    } catch (error : any) {
      console.error(error);
      return {
        success: false,
        operationId: undefined,
        error : error.message,
      };
    }
  };

  export const claimBribe = async (
    tokenId : number,
    epoch : number,
    bribeId : number,
    amm : string,
    transactionSubmitModal: TTransactionSubmitModal,
    resetAllValues: TResetAllValues,
    setShowConfirmTransaction: TSetShowConfirmTransaction
  ): Promise<IOperationsResponse> => {
    try {
      const {CheckIfWalletConnected}=dappClient()
      const WALLET_RESP = await CheckIfWalletConnected();
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
  
      const Tezos = await dappClient().tezos();
      const voterInstance: any = await Tezos.contract.at(voterAddress);

      let batch = null;
    
    // TODO : Confirm the order of sending params

      batch = Tezos.wallet
        .batch()
        .withContractCall(
          voterInstance.methods.claim_bribe(
            tokenId,
            amm,
            epoch,
            bribeId
          )
        );

        const batchOp = await batch.send();
        setShowConfirmTransaction(false);
        resetAllValues();
  
        transactionSubmitModal(batchOp.opHash);
  
        await batchOp.confirmation();
        return {
          success: true,
          operationId: batchOp.opHash,
        };
      
    } catch (error : any) {
      console.error(error);
      return {
        success: false,
        operationId: undefined,
        error : error.message,
      };
    }
  };

  export const claimFee = async (
    epochs : number[] , 
    id : number,
    amm : string,
    transactionSubmitModal: TTransactionSubmitModal,
    resetAllValues: TResetAllValues,
    setShowConfirmTransaction: TSetShowConfirmTransaction
  ): Promise<IOperationsResponse> => {
    try {
      const {CheckIfWalletConnected}=dappClient()
      const WALLET_RESP = await CheckIfWalletConnected();
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
  
      const Tezos = await dappClient().tezos();
      const voterInstance: any = await Tezos.contract.at(voterAddress);

      let batch = null;

      batch = Tezos.wallet
        .batch()
        .withContractCall(
          voterInstance.methods.claim_fee(
            id,
            amm,
            epochs,
          )
        );

        const batchOp = await batch.send();
        setShowConfirmTransaction(false);
        resetAllValues();
  
        transactionSubmitModal(batchOp.opHash);
  
        await batchOp.confirmation();
        return {
          success: true,
          operationId: batchOp.opHash,
        };
      
    } catch (error : any) {
      console.error(error);
      return {
        success: false,
        operationId: undefined,
        error : error.message,
      };
    }
  };
