import { createSlice } from "@reduxjs/toolkit";

const selectedJournal = createSlice({
  name: "journal",
  initialState: "",
  reducers: {
    // define o estado como o id da playlist recebida
    setSelectedJournal: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSelectedJournal } = selectedJournal.actions;
export default selectedJournal.reducer;
