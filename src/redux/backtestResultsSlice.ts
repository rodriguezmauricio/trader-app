import { createSlice } from "@reduxjs/toolkit";
import { ITradeBacktest } from "./tradesFromBacktestsSlice";

export interface IReport {
  backtestId: string;
  initialBalance: number;
  finalBalance: number;
  balanceResult: number;
  bnhInitial: number;
  bnhFinal: number;
  bnhResult: number;
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

interface IState {
  [backtestId: string]: IReport;
}

/* 
essa slice é responsável pelos resultados que aparecem na página de resultados.
ela recebe os parâmetros do backtest: asset e position size
recebe o array de trades e faz o cálculo para retornar um objeto com os valores
*/

const backtestResultsSlice = createSlice({
  name: "results",
  initialState: {} as IState,
  reducers: {
    // calcula o resultado a cada trade
    calcResults(state, action) {
      const parsedData = JSON.parse(action.payload);

      const { backtestId, initialBalance, finalBalance, balanceResult, trades, asset } = parsedData;

      // recebe os valores que serão adicionados no estado
      const tradeResults = calcTradesResults(asset, initialBalance, finalBalance, trades);

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
        bnhInitial,
        bnhFinal,
        bnhResult,
        longTrades,
        shortTrades,
        percentLong,
      } = tradeResults;

      // normaliza os resultados no formato correto e coloca tudo em um objeto que atualiza o estado
      // todos esses campos são adicionados ao estado e usado ná página de resultados
      const normalizedBT = {
        backtestId: backtestId,
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
        bnhInitial: Number(bnhInitial),
        bnhFinal: Number(bnhFinal),
        bnhResult: Number(bnhResult),
        longTrades: Number(longTrades),
        shortTrades: Number(shortTrades),
        percentLong: Number(percentLong),
      };

      // cria uma chave com o ID no estado principal e adiciona os campos normalizados em um objeto desse backtest
      state[backtestId] = { ...state[backtestId], ...normalizedBT };
    },

    // atualiza o tamanho da posição de acordo com o valor editado no backtest
    updateResultsPositionSize: (state, action) => {
      const { asset, positionSize, report } = action.payload;
      const parsedData = JSON.parse(report);

      const { backtestId, balanceResult, finalBalance, initialBalance, trades } = parsedData;

      // recebe o valaor atualizado dos cálculos para atualizar o backtest do estado principal
      const tradeResults = updateCalcTradesResults(
        asset,
        initialBalance,
        finalBalance,
        positionSize,
        trades
      );

      // extrai os valores dos resultados para normalizar abaixo
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
        bnhInitial,
        bnhFinal,
        bnhResult,
        longTrades,
        shortTrades,
        percentLong,
      } = tradeResults;

      // normaliza o estado com todos os dados no formato correto e adiciona os que faltam
      const normalizedBT = {
        backtestId: backtestId,
        initialBalance: Number(initialBalance), //calculado fora da função updateCalcTradesResult
        finalBalance: Number(finalBalance), //calculado fora da função updateCalcTradesResult
        balanceResult: Number(balanceResult), //calculado fora da função updateCalcTradesResult
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
        bnhInitial: Number(bnhInitial),
        bnhFinal: Number(bnhFinal),
        bnhResult: Number(bnhResult),
        longTrades: Number(longTrades),
        shortTrades: Number(shortTrades),
        percentLong: Number(percentLong),
      };

      // atualiza o estado do backtest selecionado com o novo que foi atualizado
      state[backtestId] = normalizedBT;
    },

    //deleta o backtest selecionado
    deleteResults: (state, action) => {
      // receber o id, selecionar e remover
      const backtestId = action.payload;
      delete state[backtestId];
    },
  },
});

const WIN_MULTIPLIER = 0.2;
const WDO_MULTIPLIER = 10;

// calcula o resultado dos trades e retorna um objeto com todos os valores que serão usados
const calcTradesResults = (
  asset: string,
  initial: number,
  final: number,
  trades: Array<ITradeBacktest>
) => {
  // verifica se o array de trades contém algum trade.
  // se tiver retorna o valor desejado ou um valor padrão, caso não tenha.
  const newPositionSize = trades[0] ? trades[0].positionSize : 1;
  const bnhInitial = trades[0] ? trades[0].entry : 0;
  const bnhFinal = trades[0] ? trades[trades.length - 1].exit : 0;

  let bnhResult = 0;

  //Se bnhFinal existir, calcula o resultado de acordo com o tipo de ativo
  if (asset === "acao") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        trades[trades.length - 1].positionSize
      : 0;
  } else if (asset === "cripto") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        trades[trades.length - 1].positionSize
      : 0;
  } else if (asset === "win") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        trades[trades.length - 1].positionSize *
        WIN_MULTIPLIER
      : 0;
  } else if (asset === "wdo") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        trades[trades.length - 1].positionSize *
        WDO_MULTIPLIER
      : 0;
  }

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

  trades.forEach((trade: ITradeBacktest) => {
    // inicia o lucro como 0
    let profit = 0;

    // calcula o resultado do profit de acordo com posição long ou short e multiplica pelo tamanho da posição
    if (asset === "acao") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * newPositionSize
        : (trade.entry - trade.exit) * newPositionSize;
    } else if (asset === "cripto") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * newPositionSize
        : (trade.entry - trade.exit) * newPositionSize;
    } else if (asset === "win") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * WIN_MULTIPLIER * newPositionSize
        : (trade.entry - trade.exit) * WIN_MULTIPLIER * newPositionSize;
    } else if (asset === "wdo") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * WDO_MULTIPLIER * newPositionSize
        : (trade.entry - trade.exit) * WDO_MULTIPLIER * newPositionSize;
    }

    // se o resultado for positivo
    if (profit > 0) {
      winningTrades++; // adiciona 1 ao total de trades vencedores
      totalProfit += profit; // soma o resultado de cada trade ao resultado total
      biggestWin = Math.max(biggestWin, profit); // encontra o trade com maior resultado no lucro
      smallestWin = Math.min(smallestWin, profit); // encontra o trade com menor resultado no lucro
    } else if (profit < 0) {
      losingTrades++; // adiciona 1 ao total de trades perdedores
      totalLoss += Math.abs(profit); // soma o prejuízo ao total de perda
      biggestLoss = Math.max(biggestLoss, Math.abs(profit)); // encontra o trade com maior resultado negativo
      smallestLoss = Math.min(smallestLoss, Math.abs(profit)); // encontra o trade com menor resultado negativo
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
    bnhInitial,
    bnhFinal,
    bnhResult,
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

const updateCalcTradesResults = (
  asset: string,
  initial: number,
  final: number,
  positionSize: number,
  trades: Array<ITradeBacktest>
) => {
  const initialBalance = initial;
  const finalBalance = final;
  const balanceResult = final - initial;

  // se existir trade, define a position size como o valor recebido, senão, 1
  const newPositionSize = trades[0] ? positionSize : 1;

  // usa o valor de entrada do primeiro trade, caso exista trade. senão, zero
  const bnhInitial = trades[0] ? Number(trades[0].entry) : 0;

  // usa o valor de saída do último trade case existam trades. senão, zero.
  const bnhFinal = trades[0] ? Number(trades[trades.length - 1].exit) : 0;

  let bnhResult = 0;

  // calcula o resultado do buy and hold (saída do último trade - entrada do primeiro de acordo com o ativo)
  if (asset === "acao") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) * newPositionSize
      : 0;
  } else if (asset === "cripto") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) * newPositionSize
      : 0;
  } else if (asset === "win") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        newPositionSize *
        WIN_MULTIPLIER // * 0.2
      : 0;
  } else if (asset === "wdo") {
    bnhResult = bnhFinal
      ? Number((Number(bnhFinal) - Number(bnhInitial)).toFixed(2)) *
        newPositionSize *
        WDO_MULTIPLIER // *10
      : 0;
  }

  // calcula o total de trades que existem no backtest
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

  trades.forEach((trade: ITradeBacktest) => {
    let profit = 0;

    // calcula o resultado financeiro definido por tipo de ativo
    if (asset === "acao") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * newPositionSize
        : (trade.entry - trade.exit) * newPositionSize;
    } else if (asset === "cripto") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * newPositionSize
        : (trade.entry - trade.exit) * newPositionSize;
    } else if (asset === "win") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * WIN_MULTIPLIER * newPositionSize
        : (trade.entry - trade.exit) * WIN_MULTIPLIER * newPositionSize;
    } else if (asset === "wdo") {
      profit = trade.isLong
        ? (trade.exit - trade.entry) * WDO_MULTIPLIER * newPositionSize
        : (trade.entry - trade.exit) * WDO_MULTIPLIER * newPositionSize;
    }

    if (profit > 0) {
      winningTrades++; // adiciona 1 ao total de trades vencedores
      totalProfit += profit; // soma o resultado de cada trade no total de lucros
      biggestWin = Math.max(biggestWin, profit); // encontra o maior lucro de todos os trades
      smallestWin = Math.min(smallestWin, profit); // encontra o menor lucro de todos os trades
    } else if (profit < 0) {
      losingTrades++; // adiciona 1 ao total de trades perdedores
      totalLoss += Math.abs(profit); // adiciona o resultado no total de perdas
      biggestLoss = Math.max(biggestLoss, Math.abs(profit)); // encontra a maior perda de todos os trades
      smallestLoss = Math.min(smallestLoss, Math.abs(profit)); // encontra a menor perda de todos os trades
    }

    if (trade.isLong) {
      longTrades++; // adiciona 1 ao total de trades compradores
    } else {
      shortTrades++; // adiciona 1 ao totalde trades vendedores
    }
  });

  // calcula o percentual de trades vencedores
  const percentWin = ((winningTrades / totalTrades) * 100).toFixed(2);

  // caclula o percentual de rentabilidade no capital total
  const percentRent = (((final - initial) / initial) * 100).toFixed(2);

  // calcula a média de lucro, se existirem trades no lucro
  const avgWin = winningTrades !== 0 ? (totalProfit / winningTrades).toFixed(2) : 0;

  // calcula a média de perda se existirem trades no prejuízo
  const avgLoss = losingTrades !== 0 ? (totalLoss / losingTrades).toFixed(2) : 0;

  // calcula o payoff(média de lucro / média de perda) se existir média de perda
  const payoff = avgLoss !== 0 ? (Number(avgWin) / Number(avgLoss)).toFixed(2) : 0;

  // calcula o percentual de trades na compra
  const percentLong = ((longTrades / totalTrades) * 100).toFixed(2);

  return {
    initialBalance,
    finalBalance,
    balanceResult,
    bnhInitial,
    bnhFinal,
    bnhResult,
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

//trades é um array que recebe o dados de cada trade individualmente

export const { calcResults, updateResultsPositionSize, deleteResults } =
  backtestResultsSlice.actions;
export default backtestResultsSlice.reducer;
