import { createSlice } from "@reduxjs/toolkit";

import { ITradeJournal } from "../screens/NewTradeJournal/NewTradeJournalScreen";

interface IReport {
  journalId: string;
  initialBalance: number;
  finalBalance: number;
  balanceResult: number;
  percentWin: number;
  payoff: number;
  percentRent: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  avgWin: number;
  biggestWin: number;
  smallestWin: number;
  biggestLoss: number;
  smallestLoss: number;
  avgLoss: number;
  longTrades: number;
  shortTrades: number;
  percentLong: number;
}

export interface IJournalStrategy {
  strategyName: string;
  asset: string;
  assetName?: string;
  positionSize: number;
  timeframe: string;
  initialBalance: number;
  otherInfo?: string;
  journalId: any;
}

interface IState {
  [journalId: string]: IReport;
}

const journalResultsSlice = createSlice({
  name: "journalResults",
  initialState: {} as IState,
  reducers: {
    calcJournalResults(state, action) {
      const parsedData = JSON.parse(action.payload);

      const { journalId, initialBalance, finalBalance, balanceResult, trades } = parsedData;

      // recebe os valores que serão adicionados no estado
      const tradeResults = calcTradesResults(initialBalance, finalBalance, trades);

      // extrai os campos que retornam do trade results que vão ser normalizados e inseridos no backtest
      const {
        percentWin,
        winningTrades,
        losingTrades,
        avgWin,
        biggestWin,
        smallestWin,
        biggestLoss,
        smallestLoss,
        avgLoss,
        payoff,
        percentRent,
        totalTrades,
        longTrades,
        shortTrades,
        percentLong,
      } = tradeResults;

      // normaliza os resultados no formato correto e coloca tudo em um objeto que atualiza o estado
      // todos esses campos são adicionados ao estado e usado ná página de resultados
      const normalizedBT = {
        journalId: journalId,
        initialBalance: Number(initialBalance),
        finalBalance: Number(finalBalance),
        balanceResult: Number(balanceResult),
        pointsResult: Number(balanceResult),
        percentWin: Number(percentWin), // Convert to number here
        payoff: Number(payoff), // Convert to number here
        percentRent: Number(percentRent), // Convert to number here
        totalTrades: Number(totalTrades),
        winningTrades: Number(winningTrades),
        losingTrades: Number(losingTrades),
        avgWin: Number(avgWin),
        biggestWin: Number(biggestWin),
        smallestWin: Number(smallestWin),
        biggestLoss: Number(biggestLoss),
        smallestLoss: Number(smallestLoss),
        avgLoss: Number(avgLoss),
        longTrades: Number(longTrades),
        shortTrades: Number(shortTrades),
        percentLong: Number(percentLong),
      };

      // cria uma chave com o ID no estado principal e adiciona os campos normalizados em um objeto desse backtest
      state[journalId] = { ...state[journalId], ...normalizedBT };
    },
  },
});

const calcTradesResults = (initial: number, final: number, trades: Array<ITradeJournal>) => {
  // verifica se o array de trades contém algum trade.
  // se tiver retorna o valor desejado ou um valor padrão, caso não tenha.

  const totalTrades = trades.length;
  let winningTrades = 0;
  let losingTrades = 0;
  let totalProfit = 0;
  let totalLoss = 0;
  let biggestWin = 0;
  let smallestWin = 0;
  let biggestLoss = 0;
  let smallestLoss = 0;
  let longTrades = 0;
  let shortTrades = 0;

  const tradeProfits = [];
  const tradeLosses = [];

  trades.forEach((trade: ITradeJournal) => {
    // inicia o lucro como 0
    let profit = 0;
    const WIN_MULTIPLIER = 0.2;
    const WDO_MULTIPLIER = 10;

    // calcula o resultado do profit de acordo com posição long ou short e multiplica pelo tamanho da posição
    if (trade.asset === "acao") {
      profit = trade.isLong
        ? (trade.exitValue - trade.entryValue) * trade.positionSize
        : (trade.entryValue - trade.exitValue) * trade.positionSize;
    } else if (trade.asset === "cripto") {
      profit = trade.isLong
        ? (trade.exitValue - trade.entryValue) * trade.positionSize
        : (trade.entryValue - trade.exitValue) * trade.positionSize;
    } else if (trade.asset === "win") {
      profit = trade.isLong
        ? (trade.exitValue - trade.entryValue) * WIN_MULTIPLIER * trade.positionSize
        : (trade.entryValue - trade.exitValue) * WIN_MULTIPLIER * trade.positionSize;
    } else if (trade.asset === "wdo") {
      profit = trade.isLong
        ? (trade.exitValue - trade.entryValue) * WDO_MULTIPLIER * trade.positionSize
        : (trade.entryValue - trade.exitValue) * WDO_MULTIPLIER * trade.positionSize;
    }

    // se o resultado for positivo
    if (profit > 0) {
      tradeProfits.push(profit);
      winningTrades++; // adiciona 1 ao total de trades vencedores
      totalProfit += profit; // soma o resultado de cada trade ao resultado total
      biggestWin = Math.max(biggestWin, profit); // encontra o trade com maior resultado no lucro
      smallestWin = Math.min(...tradeProfits); // encontra o trade com menor resultado no lucro
    } else if (profit < 0) {
      tradeLosses.push(profit);
      losingTrades++; // adiciona 1 ao total de trades perdedores
      totalLoss += Math.abs(profit); // soma o prejuízo ao total de perda
      biggestLoss = Math.max(biggestLoss, Math.abs(profit)); // encontra o trade com maior resultado negativo
      smallestLoss = Math.max(...tradeLosses); // encontra o trade com menor resultado negativo
    }

    if (trade.isLong) {
      longTrades++; // se o trade é Long, adiciona 1 no total de trades na ponta compradora independente do resultado
    } else {
      shortTrades++; // se o trade é Short, adiciona 1 no total de trades na ponta vendedora independente do resultado
    }
  });

  // calcula o percentual de trades no lucro se existir trades, senão zero
  const percentWin = trades[0] ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;

  // calcula a rentabilidade em porcentagem
  const percentRent = Number(((final - initial) / initial) * 100).toFixed(2);

  //calcula a média de lucro se existirem trades no lucro, senão zero
  const avgWin = winningTrades !== 0 ? (totalProfit / winningTrades).toFixed(2) : 0;

  // calcula a média de perda, se existirem trades no prejuízo, senão zero
  const avgLoss = losingTrades !== 0 ? (totalLoss / losingTrades).toFixed(2) : 0;

  // calcula o payoff (média de lucro sobre média de perda) se existir média de perda, senão, zero
  const payoff = avgLoss !== 0 ? (Number(avgWin) / Number(avgLoss)).toFixed(2) : 0;

  // calcula a porcentagem de trades na ponta compradora, se existirem trades, senão, zero
  const percentLong = trades[0] ? ((longTrades / totalTrades) * 100).toFixed(2) : 0;

  return {
    percentWin,
    payoff,
    percentRent,
    totalTrades,
    winningTrades,
    losingTrades,
    avgWin,
    biggestWin,
    smallestWin,
    biggestLoss,
    smallestLoss,
    avgLoss,
    longTrades,
    shortTrades,
    percentLong,
  };
};

export const { calcJournalResults } = journalResultsSlice.actions;
export default journalResultsSlice.reducer;
