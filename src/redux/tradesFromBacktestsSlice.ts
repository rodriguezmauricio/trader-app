import { createSlice } from "@reduxjs/toolkit";

export interface ITradeBacktest {
  backtestId: string;
  tradeId: string;
  entry: number;
  exit: number;
  isLong: true;
  positionSize: number;
  result: number;
  points: number;
}

const tradesFromBacktestsSlice = createSlice({
  name: "tradesFromBacktests",
  initialState: Array<ITradeBacktest>,
  reducers: {
    placeTrade: (state, action) => {
      const { isLong, entry, exit, positionSize, asset } = action.payload;

      let result = 0;

      // calcula o resultado de acordo com o tipo de ativo
      if (asset === "acao") {
        result = isLong ? exit - entry : entry - exit;
      } else if (asset === "cripto") {
        result = isLong ? exit - entry : entry - exit;
      } else if (asset === "win") {
        result = isLong ? (exit - entry) * 0.2 : (entry - exit) * 0.2;
      } else if (asset === "wdo") {
        result = isLong ? (exit - entry) * 10 : (entry - exit) * 10;
      }

      // calcula os pontos do trade de acordo com a direção, long ou short
      const points = isLong ? exit - entry : entry - exit;

      // resultado do trade, já multiplicado pelo tamanho da posição
      const roundedResult = Number(result.toFixed(2)) * Number(positionSize);

      // total de pontos do trade
      const roundedPoints = Number(points.toFixed(2));

      // adiciona o trade no array e adiciona o resultado financeiro e em pontos
      state.push({ ...action.payload, result: roundedResult, points: roundedPoints });
    },
    updateIsLong: (state, action) => {
      const { tradeId, isLong } = action.payload;

      return state.map((trade) => {
        // se o id do trade for igual o id recebido inverte o valor
        if (trade.tradeId === tradeId) {
          const newResult = trade.result * -1;
          const newPoints = trade.points * -1;

          // Atualiza apenas o trade desejado
          return {
            ...trade,
            isLong,
            result: Number(newResult),
            points: Number(newPoints),
          };
        }
        return trade;
      });
    },
    updateTrade: (state, action) => {
      const { tradeId, entry, exit, isLong, positionSize, asset } = action.payload;

      return state.map((trade) => {
        // se o id do trade for igual ao trade recebido, recalcula tudo
        if (trade.tradeId === tradeId) {
          let result = 0;
          let points = 0;
          let roundedResult = 0;

          // recalcula de acordo com o ativo
          if (asset === "acao") {
            points = isLong ? exit - entry : entry - exit;
            result = isLong ? exit - entry : entry - exit;
            roundedResult = Number(result.toFixed(2)) * Number(positionSize);
          } else if (asset === "cripto") {
            points = isLong ? exit - entry : entry - exit;
            result = isLong ? exit - entry : entry - exit;
            roundedResult = Number(result.toFixed(2)) * Number(positionSize);
          } else if (asset === "win") {
            points = isLong ? exit - entry : entry - exit;
            result = isLong ? (exit - entry) * 0.2 : (entry - exit) * 0.2;
            roundedResult = Number(result) * Number(positionSize);
          } else if (asset === "wdo") {
            points = isLong ? exit - entry : entry - exit;
            result = isLong ? (exit - entry) * 10 : (entry - exit) * 10;
            roundedResult = Number(result.toFixed(2)) * Number(positionSize);
          }

          // Atualiza apenas o trade desejado
          return {
            ...trade,
            positionSize,
            isLong,
            entry,
            exit,
            result: roundedResult,
            points: points,
          };
        }
        return trade;
      });
    },
    removeTrade: (state, action) => {
      // encontra o índice do trade desejado e remove do array
      const index = state.findIndex((item) => item.tradeId === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    removeTradesFromBacktest: (state, action) => {
      // retorn um array removendo todos os trades que contém aquele backtestId
      const novoArray = state.filter((item) => item.backtestId !== action.payload);
      return novoArray;
    },
    updateTradesPositionSize: (state, action) => {
      const { asset, positionSize, backtestId } = action.payload;
      state.forEach((trade) => {
        const { isLong, exit, entry } = trade;

        let result = 0;

        // calcula o resultado de acordo com o tipo de ativo
        if (asset === "acao") {
          result = isLong ? exit - entry : entry - exit;
        } else if (asset === "cripto") {
          result = isLong ? exit - entry : entry - exit;
        } else if (asset === "win") {
          result = isLong ? (exit - entry) * 0.2 : (entry - exit) * 0.2;
        } else if (asset === "wdo") {
          result = isLong ? (exit - entry) * 10 : (entry - exit) * 10;
        }

        // calcula o resultado de acorcom o novo position size
        const newResult = Number(result.toFixed(2)) * Number(positionSize);

        // se o backtestId do trade for igual ao do trade selecionado, recalcula e substitui o resultado
        if (trade.backtestId === backtestId) {
          return (trade.result = newResult);
        }

        return;
      });
    },
  },
});

export const {
  placeTrade,
  updateIsLong,
  updateTrade,
  removeTrade,
  removeTradesFromBacktest,
  updateTradesPositionSize,
} = tradesFromBacktestsSlice.actions;
export default tradesFromBacktestsSlice.reducer;
