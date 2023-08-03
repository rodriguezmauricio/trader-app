import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backtestsSlice from "./backtestsSlice";
import selectedBacktestSlice from "./selectedBacktestSlice";
import tradesFromBacktestsSlice from "./tradesFromBacktestsSlice";
import backtestResultsSlice from "./backtestResultsSlice";
import selectedTradeSlice from "./selectedTradeSlice";
import selectedPlaylist from "./selectedPlaylist";
import tradesFromJournalsSlice from "./tradesFromJournalsSlice";
import selectedJournal from "./selectedJournal";
import newJournalSlice from "./newJournalSlice";
// import reactotron from "../config/ReactotronConfig";
import selectedJournalTradeSlice from "./selectedJournalTradeSlice";
import journalResultsSlice from "./journalResultsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    backtests: backtestsSlice,
    selectBacktest: selectedBacktestSlice,
    tradesFromBacktests: tradesFromBacktestsSlice,
    backtestResults: backtestResultsSlice,
    selectTrade: selectedTradeSlice,
    selectPlaylist: selectedPlaylist,
    selectJournal: selectedJournal,
    selectJournalTrade: selectedJournalTradeSlice,
    tradesFromJournal: tradesFromJournalsSlice,
    journals: newJournalSlice,
    journalResults: journalResultsSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  // enhancers: [reactotron.createEnhancer!()],
});

const persistor = persistStore(store);

export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     backtests: backtestsSlice,
//     selectBacktest: selectedBacktestSlice,
//     trades: tradesSlice,
//     results: resultsSlice,
//     selectTrade: selectedTradeSlice,
//     selectPlaylist: selectedPlaylist,
//   },
// });

// export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
