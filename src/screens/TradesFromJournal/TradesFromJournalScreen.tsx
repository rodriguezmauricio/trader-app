// REGULAR IMPORTS
import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// CUSTOM IMPORTS
import { AbsoluteBgHeader, MainContainer, Paragraph, Title } from "../../styles/styles";
import { BalanceLarge, Header, SubTag, SubTagWrapper, Tag } from "../Backtest/backtestScreenStyle";
import Chart from "../../components/Chart/Chart";
import { theme } from "../../styles/styles";

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

// NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import { TradingJournalParamList } from "../../routes/RootRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/Buttons/Button";
import GoBackNav from "../../components/headerNavigationComp/GoBackNav";
import TradeJournalListItem from "../../components/TradeJournalListItem/TradeJournalListItem";
import { setSelectedJournalTrade } from "../../redux/selectedJournalTradeSlice";
import { calcJournalResults } from "../../redux/journalResultsSlice";

interface EditStrategyModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

interface IJournalProps {
  journalId: string;
  journalName: string;
  initialBalance: number;
}

type Props = StackNavigationProp<TradingJournalParamList>;

const TradesFromJournalScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  //create the reference for the modal
  //open the edit trade modal and set the selected trade to be edited
  //close the edit trade modal

  //gets all the backtests and find all the trades related to the selected backtest
  const allJournals = useSelector((state: RootState) => state.journals);
  const selectedJournalId = useSelector((state: RootState) => state.selectJournal);
  const allTrades = useSelector((state: RootState) => state.tradesFromJournal);

  //finds the selected backtest
  const findJournal: IJournalProps | undefined = allJournals.find((journal: IJournalProps) => {
    return journal.journalId === selectedJournalId;
  });

  // extract the values from the backtest to pass as arguments to the report
  // and uses to render results on the screen

  const strategyName = findJournal && findJournal.journalName;

  const initialBalance = findJournal && findJournal.initialBalance;

  // select all the trades from a specific backtest
  // it's necessary to pass as arguments to the results
  const tradesFromJournal = allTrades.filter((trade) => trade.journalId === selectedJournalId);

  //calculate the financial results, points results and
  //generate the array with results history to use in the chart

  //TODO: Here is the fucking bug. Find a way to make it work

  let balanceResult = 0;
  const resultsChart = tradesFromJournal.map((item) => {
    const result = item.result;
    balanceResult += result;
    return balanceResult;
  });

  //calculate the final balance to pass as argument to the report
  const finalBalance = initialBalance !== undefined && initialBalance + balanceResult;

  const openEditTradeScreen = (tradeId: string) => {
    dispatch(setSelectedJournalTrade(tradeId));

    const parsedData = JSON.stringify({
      journalId: selectedJournalId,
      initialBalance,
      finalBalance,
      balanceResult,
      trades: tradesFromJournal,
    });

    dispatch(calcJournalResults(parsedData));

    setTimeout(() => {
      navigation.navigate("EditTradeFromJournal");
    }, 100);
  };

  //should calculate the results of each trade to assure the correct output
  // when rendering the flatlist.
  useEffect(() => {
    const report = {
      journalId: findJournal?.journalId,
      initialBalance: findJournal?.initialBalance,
      finalBalance,
      balanceResult,
      trades: tradesFromJournal,
    };
    const normalizedReport = JSON.stringify(report);
    dispatch(calcJournalResults(normalizedReport));
  }, [tradesFromJournal]);

  return (
    <MainContainer>
      <StatusBar />

      <AbsoluteBgHeader />
      <GoBackNav />

      {/* HEADER BEGIN */}
      <Header>
        <BalanceLarge>
          {Number(finalBalance).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </BalanceLarge>
        <SubTag style={styles.subtag}>
          <Paragraph>
            {balanceResult.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Paragraph>
        </SubTag>
      </Header>

      <SubTagWrapper>
        <TouchableOpacity onPress={() => navigation.navigate("ResultsJournal")}>
          <Tag style={styles.tag}>
            <Paragraph style={styles.paragraph}>ver resultados</Paragraph>
            <MaterialCommunityIcons name="eye-outline" size={16} color="#fff" />
          </Tag>
        </TouchableOpacity>
      </SubTagWrapper>

      <Title>{strategyName}</Title>
      {/* HEADER END */}

      {/* GRÁFICO BEGIN */}
      <Chart resultsArray={resultsChart} tradesFromBacktest={tradesFromJournal} />
      {/* GRÁFICO END */}

      {/* LISTA DE TRADES BEGIN */}
      <FlatList
        style={{ marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.tradeId}
        data={tradesFromJournal}
        renderItem={({ item, index }) => {
          return (
            <TradeJournalListItem
              key={item.tradeId}
              index={index}
              result={item.result}
              tradeId={item.tradeId}
              openEditScreen={openEditTradeScreen}
              asset={item.asset ?? "win"}
              assetName={item.assetName}
              isClosed={item.isClosed}
            />
          );
        }}
      />

      {/* LISTA DE TRADES END */}

      <Button
        title="Adicionar Trade"
        onPressButton={() => navigation.navigate("NewTradeJournal")}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  subtag: {
    backgroundColor: theme.darkGreen,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "400",
  },
});

export default TradesFromJournalScreen;
