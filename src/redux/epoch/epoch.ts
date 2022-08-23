import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEpochDataResponse, IEpochListObject } from "../../api/votes/types";
import { getListOfEpochs } from "../../api/votes/votesKiran";

interface IEpochState {
  currentEpoch: IEpochListObject;
  selectedEpoch: IEpochListObject;
  epochData: IEpochListObject[];
  epochFetchError: boolean;
}

const initialState: IEpochState = {
  currentEpoch: {} as IEpochListObject,
  selectedEpoch: {} as IEpochListObject,
  epochData: [],
  epochFetchError: false,
};

export const getEpochData = createAsyncThunk("config/getEpochData", async (thunkAPI) => {
  const res = await getListOfEpochs();
  return res;
});

const EpochSlice = createSlice({
  name: "epoch",
  initialState,
  reducers: {
    setSelectedEpoch: (state, action: any) => {
      state.selectedEpoch = action.payload;
    },
  },
  extraReducers: {
    [getEpochData.fulfilled.toString()]: (state: any, action: any) => {
      state.currentEpoch = action.payload.epochData[0];
      state.epochFetchError = false;
      state.selectedEpoch = action.payload.epochData[0];
      state.epochData = action.payload.epochData;
    },
    [getEpochData.rejected.toString()]: (state: any, action: any) => {
      state.epochFetchError = true;
      console.log(`Error: ${action.error.message}`);
      console.log("Re-attempting to fetch epoch list.");
    },
  },
});
export const { setSelectedEpoch } = EpochSlice.actions;
export const epoch = EpochSlice.reducer;
