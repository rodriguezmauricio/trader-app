import { nanoid } from "@reduxjs/toolkit";

export class TradingStrategy {
  strategyName: string;
  asset: string;
  assetName?: string;
  positionSize: number;
  timeframe: string;
  initialBalance: number;
  otherInfo?: string;
  backtestId: string;

  constructor(
    strategyName: string,
    asset: string,
    assetName: string | undefined,
    positionSize: number,
    timeframe: string,
    initialBalance: number,
    otherInfo: string | undefined,
    backtestId: string
  ) {
    this.backtestId = nanoid();
    this.strategyName = strategyName;
    this.asset = asset;
    this.assetName = assetName;
    this.positionSize = positionSize;
    this.timeframe = timeframe;
    this.initialBalance = initialBalance;
    this.otherInfo = otherInfo;
    this.backtestId = backtestId;
  }
}
