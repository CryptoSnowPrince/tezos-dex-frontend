import { BigNumber } from "bignumber.js";
import { IAllBribesOperationData, IAllClaimableFeesData } from "../../api/portfolio/types";
import { IVeNFTData } from "../../api/votes/types";
export interface IStatsProps {}
export interface IStatsCardProps {
  setClaimValueDollar: React.Dispatch<React.SetStateAction<BigNumber>>;
  setShowCreateLockModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  value: string;
  subValue?: string;
  isLast?: boolean;
  disable: boolean;
  isDollar?: boolean;
  setShowClaimAllPly: React.Dispatch<React.SetStateAction<boolean>>;
  setClaimState: React.Dispatch<React.SetStateAction<EClaimAllState>>;
  state: EClaimAllState;
}
export interface IStatsRewardsProps {
  bribesClaimData: IAllBribesOperationData[];
  feeClaimData: IAllClaimableFeesData[];
  setClaimState: React.Dispatch<React.SetStateAction<EClaimAllState>>;
  setShowClaimPly: React.Dispatch<React.SetStateAction<boolean>>;
  setClaimValueDollar: React.Dispatch<React.SetStateAction<BigNumber>>;
  tradingfeeStats: BigNumber;
  bribesStats: BigNumber;

  setShowClaimAllPly: React.Dispatch<React.SetStateAction<boolean>>;
  plyEmission: BigNumber;
}
export interface ISelectNFT {
  veNFTlist: IVeNFTData[];
  selectedText: {
    votingPower: string;
    tokenId: string;
  };
  setSelectedDropDown: React.Dispatch<
    React.SetStateAction<{
      votingPower: string;
      tokenId: string;
    }>
  >;
}
export enum EClaimAllState {
  BRIBES,
  TRADINGFEE,
  PLYEMISSION,
  LOCKS,
  REWARDS,
  EPOCH,
  UNCLAIMED,
}
