import { ITrade } from "../redux/tradesFromBacktestsSlice";

interface IReport {
  asset: string;
  initialBalance: number;
  finalBalance: number;
  balanceResult: number;
  pointsResult: number;
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
}

export class Report {
  asset: string;
  backtestId: string;
  initialBalance: number;
  finalBalance: number;
  balanceResult: number;
  pointsResult: number;
  trades: ITrade[];

  constructor(
    asset: string,
    backtestId: string,
    initialBalance: number,
    finalBalance: number,
    balanceResult: number,
    pointsResult: number,
    trades: ITrade[]
  ) {
    this.asset = asset;
    this.backtestId = backtestId;
    this.initialBalance = initialBalance;
    this.finalBalance = finalBalance;
    this.balanceResult = balanceResult;
    this.pointsResult = pointsResult;
    this.trades = trades;
  }
}
