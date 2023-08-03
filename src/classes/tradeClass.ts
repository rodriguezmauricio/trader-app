import { nanoid } from "@reduxjs/toolkit";

export class Trade {
  backtestId: string;
  positionSize: number;
  asset: string;
  tradeId: string;
  entry: number;
  exit: number;
  isLong: boolean;

  constructor(
    backtestId: string,
    entry: number,
    exit: number,
    isLong: boolean,
    positionSize: number,
    asset: string
  ) {
    this.backtestId = backtestId;
    this.entry = entry;
    this.exit = exit;
    this.isLong = isLong;
    this.positionSize = positionSize;
    this.asset = asset;
    this.tradeId = nanoid();
  }
}
