// REGULAR IMPORTS
import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

// CUSTOM IMPORTS
import { AbsoluteBgHeader, MainContainer, Paragraph, Title } from "../../styles/styles";
import { BalanceLarge, Header, SubTag, SubTagWrapper, Tag } from "./backtestScreenStyle";
import TradingListItem from "../../components/TradingListItem/TradingListItem";
import AddTradingItem from "../../components/TradingListItem/AddTradingItem";
import Chart from "../../components/Chart/Chart";
import CloseNav from "../../components/headerNavigationComp/CloseNav";
import { Report } from "../../classes/reportClass";
import EditTradeModal from "../../components/EditTradeModal/EditTradeModal";
import { theme } from "../../styles/styles";

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { selectTrade } from "../../redux/selectedTradeSlice";
import { RootState } from "../../redux/store";
import { IBacktestStrategy } from "../../redux/backtestsSlice";
import { calcResults } from "../../redux/backtestResultsSlice";

// NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import { BacktestsParamList } from "../../routes/RootRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

interface EditStrategyModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

type Props = StackNavigationProp<BacktestsParamList>;

const BacktestScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  //create the reference for the modal
  //open the edit trade modal and set the selected trade to be edited
  //close the edit trade modal

  const editTradeModal = useRef<EditStrategyModalProps>(null);

  const openEditModal = (tradeId: string) => {
    editTradeModal.current?.open();
    dispatch(selectTrade(tradeId));
  };

  const closeEditModal = () => {
    editTradeModal.current?.close();
  };

  //gets all the backtests and find all the trades related to the selected backtest
  const allBacktests = useSelector((state: RootState) => state.backtests);
  const selectedBacktest = useSelector((state: RootState) => state.selectBacktest);
  const trades = useSelector((state: RootState) => state.tradesFromBacktests);

  //finds the selected backtest
  const findBacktest: IBacktestStrategy | undefined = allBacktests.find((bt: IBacktestStrategy) => {
    return bt.backtestId === selectedBacktest;
  });

  // extract the values from the backtest to pass as arguments to the report
  // and uses to render results on the screen
  const positionSize = findBacktest && findBacktest.positionSize;
  const strategyName = findBacktest && findBacktest.strategyName;
  const asset = findBacktest && findBacktest.asset;
  const initialBalance = findBacktest && findBacktest.initialBalance;

  // select all the trades from a specific backtest
  // it's necessary to pass as arguments to the results
  const tradesFromBacktest = trades.filter((trade) => trade.backtestId === selectedBacktest);

  //calculate the financial results, points results and
  //generate the array with results history to use in the chart

  let pointsResult = 0;
  let balanceResult = 0;
  const resultsChart = tradesFromBacktest.map((item) => {
    const result = item.result;
    const points = item.points;
    pointsResult += points;
    balanceResult += result;
    return balanceResult;
  });

  //calculate the final balance to pass as argument to the report
  const finalBalance = initialBalance && initialBalance + balanceResult;

  //should calculate the results of each trade to assure the correct output
  // when rendering the flatlist.
  useEffect(() => {
    const report = new Report(
      asset ?? "acao",
      selectedBacktest,
      initialBalance ?? 0,
      finalBalance ?? 0,
      balanceResult,
      pointsResult,
      tradesFromBacktest
    );

    const normalizedReport = JSON.stringify(report);

    dispatch(calcResults(normalizedReport));
  }, [tradesFromBacktest]);

  return (
    <MainContainer>
      <StatusBar />

      {/* MODAL BEGIN */}
      <Modalize ref={editTradeModal} snapPoint={500} adjustToContentHeight>
        <EditTradeModal closeEditModal={closeEditModal} />
      </Modalize>
      {/* MODAL END */}

      <AbsoluteBgHeader />
      <CloseNav />

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
        <Paragraph>{asset}</Paragraph>
        <Paragraph>{positionSize} ctts/qtd</Paragraph>

        <TouchableOpacity onPress={() => navigation.navigate("Resultados")}>
          <Tag style={styles.tag}>
            <Paragraph style={styles.paragraph}>ver resultados</Paragraph>
            <MaterialCommunityIcons name="eye-outline" size={16} color="#fff" />
          </Tag>
        </TouchableOpacity>
      </SubTagWrapper>

      <Title>{strategyName}</Title>
      {/* HEADER END */}

      {/* GRÁFICO BEGIN */}
      <Chart resultsArray={resultsChart} tradesFromBacktest={tradesFromBacktest} />
      {/* GRÁFICO END */}

      {/* LISTA DE TRADES BEGIN */}
      <FlatList
        style={{ marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.tradeId}
        data={tradesFromBacktest}
        renderItem={({ item, index }) => {
          return (
            <TradingListItem
              key={item.tradeId}
              entry={item.entry}
              exit={item.exit}
              index={index}
              isLong={item.isLong}
              result={item.result}
              points={item.points}
              tradeId={item.tradeId}
              openEditModal={openEditModal}
              asset={asset ?? "win"}
            />
          );
        }}
      />

      {/* LISTA DE TRADES END */}

      <AddTradingItem positionSize={positionSize ?? 1} asset={asset ?? "error"} />
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

export default BacktestScreen;
