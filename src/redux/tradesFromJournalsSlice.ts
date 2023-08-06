import { createSlice } from "@reduxjs/toolkit";

export interface ITradeJournal {
  journalId: string;
  tradeId: string;
  asset: string;
  assetName?: string;
  positionSize: number;
  isLong: boolean;
  entryValue: number;
  exitValue: number;
  takeProfit: number;
  timeframe: string;
  stopLoss: number;
  entryDate: string;
  entryTime: string;
  isClosed: boolean;
  exitDate: string;
  exitTime: string;
  notes: string;
  result: number;
  points: number;
}

const tradesFromJournalsSlice = createSlice({
  name: "tradesFromJournal",
  initialState: Array<ITradeJournal>,
  reducers: {
    addTradeToJournal: (state, action) => {
      //
      const { isLong, entryValue, exitValue, positionSize, asset } = action.payload;

      let result = 0;

      // calcula o resultado de acordo com o tipo de ativo
      if (exitValue !== "") {
        if (asset === "acao") {
          result = isLong ? exitValue - entryValue : entryValue - exitValue;
        } else if (asset === "cripto") {
          result = isLong ? exitValue - entryValue : entryValue - exitValue;
        } else if (asset === "win") {
          result = isLong ? (exitValue - entryValue) * 0.2 : (entryValue - exitValue) * 0.2;
        } else if (asset === "wdo") {
          result = isLong ? (exitValue - entryValue) * 10 : (entryValue - exitValue) * 10;
        }
      } else {
        result = 0;
      }

      const objectToAdd = { result: result * positionSize };

      state.push({ ...action.payload, ...objectToAdd });
    },
    deleteSingleTradeFromJournal: (state, action) => {
      //
      const index = state.findIndex((item) => item.tradeId === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    deleteAllTradesFromJournal: (state, action) => {
      // retorna um array removendo todos os trades que contém aquele journalId
      const journalID = action.payload;
      const novoArray = state.filter((item) => item.journalId !== journalID);
      return novoArray;
    },
    updateTradeOnJournal: (state, action) => {
      //
      const { tradeId, isLong, entryValue, exitValue, positionSize, asset } = action.payload;

      return state.map((item) => {
        if (item.tradeId === tradeId) {
          let result = 0;

          // calcula o resultado de acordo com o tipo de ativo
          if (exitValue !== "") {
            if (asset === "acao") {
              result = isLong ? exitValue - entryValue : entryValue - exitValue;
            } else if (asset === "cripto") {
              result = isLong ? exitValue - entryValue : entryValue - exitValue;
            } else if (asset === "win") {
              result = isLong ? (exitValue - entryValue) * 0.2 : (entryValue - exitValue) * 0.2;
            } else if (asset === "wdo") {
              result = isLong ? (exitValue - entryValue) * 10 : (entryValue - exitValue) * 10;
            }
          } else {
            result = 0;
          }

          const objectToAdd = { result: result * positionSize };

          return {
            ...action.payload,
            ...objectToAdd,
          };
        }
        return item;
      });
    },
  },
});

export const {
  addTradeToJournal,
  deleteSingleTradeFromJournal,
  deleteAllTradesFromJournal,
  updateTradeOnJournal,
} = tradesFromJournalsSlice.actions;
export default tradesFromJournalsSlice.reducer;
