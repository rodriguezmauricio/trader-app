import { createSlice } from "@reduxjs/toolkit";

const selectedTradeSlice = createSlice({
  name: "selectedTrade",
  initialState: "",
  reducers: {
    // define o estado como o tradeID recebido
    selectTrade(state, action) {
      return (state = action.payload);
    },
  },
});

export const { selectTrade } = selectedTradeSlice.actions;
export default selectedTradeSlice.reducer;
