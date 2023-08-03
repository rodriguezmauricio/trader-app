import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJournal {
  journalName: string;
  journalId: string;
  initialBalance: number;
}

const newJournalSlice = createSlice({
  name: "newJournal",
  initialState: Array<IJournal>,
  reducers: {
    // cria e salva um novo backtest
    addJournal: (state, action: PayloadAction<IJournal>) => {
      state.push({ ...action.payload });
    },

    // atualiza o backtest selecionado
    updateJournal: (state, action) => {
      const { journalId } = action.payload;

      return state.map((item) => {
        if (item.journalId === journalId) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
    },

    // deleta o backtest selecionado
    deleteJournal: (state, action) => {
      const index = state.findIndex((item) => item.journalId === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addJournal, updateJournal, deleteJournal } = newJournalSlice.actions;
export default newJournalSlice.reducer;
