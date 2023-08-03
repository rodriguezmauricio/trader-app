import { createSlice } from "@reduxjs/toolkit";

const selectedBacktestSlice = createSlice({
  name: "selectedBacktest",
  initialState: "",
  reducers: {
    // define o estado como o backtest ID recebido
    selectBacktest(state, action) {
      return (state = action.payload);
    },
  },
});

export const { selectBacktest } = selectedBacktestSlice.actions;
export default selectedBacktestSlice.reducer;
