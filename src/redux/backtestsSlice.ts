import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBacktestStrategy {
  strategyName: string;
  asset: string;
  assetName?: string;
  positionSize: number;
  timeframe: string;
  initialBalance: number;
  otherInfo?: string;
  backtestId: any;
}

const backtestsSlice = createSlice({
  name: "backtest",
  initialState: Array<IBacktestStrategy>,
  reducers: {
    // cria e salva um novo backtest
    saveBacktest: (state, action: PayloadAction<IBacktestStrategy>) => {
      state.push({ ...action.payload });
    },

    // atualiza o backtest selecionado
    updateBacktest: (state, action) => {
      const { backtestId } = action.payload;

      return state.map((item) => {
        if (item.backtestId === backtestId) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
    },

    // deleta o backtest selecionado
    deleteBacktest: (state, action) => {
      const index = state.findIndex((item) => item.backtestId === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { saveBacktest, updateBacktest, deleteBacktest } = backtestsSlice.actions;
export default backtestsSlice.reducer;
