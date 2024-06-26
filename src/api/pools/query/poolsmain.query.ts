import { useQuery } from "react-query";
import { getAllPoolsData, getMyPoolsData, poolsDataWrapper } from "..";
import { store } from "../../../redux";
import { getTokenPrices } from "../../util/price";
import { ITokenPriceList } from "../../util/types";
import { IAllPoolsData, IMyPoolsData, IPoolsDataWrapperResponse } from "../types";

export const usePoolsMain = () =>
  useQuery<IPoolsDataWrapperResponse[], Error>(
    "pools-mains",
    async () => {
      const tokenprice = store.getState().tokenPrice.tokenPrice;
      // const tokenprice= await (await getTokenPrices()).tokenPrice
      const walletAddress = store.getState().wallet.address;
      const data1 = (await poolsDataWrapper(walletAddress ? walletAddress : undefined, tokenprice))
        .allData;
      const data: IPoolsDataWrapperResponse[] = Object.values(data1);
      return data;
    },
    { refetchInterval: 60000, cacheTime: 1000 * 30 }
  );

// export const useGetValue=()=>{
//   const tokenprice = useAppSelector((state) => state.tokenPrice).tokenPrice;
//   let data:IPoolsDataWrapperResponse[]=[]
//   if(Object.keys(tokenprice).length>0){
//     const { data , isFetched } = usePoolsMain(tokenprice);
//     return { data , isFetched }
//   }
//   return  { data:data , isFetched:false }
// }

export const useAllPoolsData = (tokenPrice: ITokenPriceList, page: number = 0) =>
  useQuery<IAllPoolsData[], Error>(
    ["all-pools", page],
    async () => {
      const allPoolsResponse = await getAllPoolsData(tokenPrice, page);
      const allPoolsData = allPoolsResponse.allData;
      return allPoolsData;
    },
    { refetchInterval: 30000, cacheTime: 1000 * 30, keepPreviousData: true }
  );

export const useMyPoolsData = (
  userTezosAddress: string,
  tokenPrice: ITokenPriceList,
  page: number = 0
) =>
  useQuery<IMyPoolsData[], Error>(
    ["my-pools", page],
    async () => {
      const myPoolsResponse = await getMyPoolsData(userTezosAddress, tokenPrice, page);
      const myPoolsData = myPoolsResponse.allData;
      return myPoolsData;
    },
    { refetchInterval: 30000, cacheTime: 1000 * 30, keepPreviousData: true }
  );
