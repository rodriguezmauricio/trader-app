import { createSlice } from "@reduxjs/toolkit";

const selectedJournalTradeSlice = createSlice({
  name: "selectedJournalTrade",
  initialState: "",
  reducers: {
    setSelectedJournalTrade: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSelectedJournalTrade } = selectedJournalTradeSlice.actions;
export default selectedJournalTradeSlice.reducer;
