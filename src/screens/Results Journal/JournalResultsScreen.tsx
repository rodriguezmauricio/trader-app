// REGULAR IMPORTS
import { ScrollView, View, StyleSheet } from "react-native";
import Chart from "../../components/Chart/Chart";

// CUSTOM IMPORTS
import { Container, MainContainer, Paragraph, Title } from "../../styles/styles";
import { StatusBar } from "expo-status-bar";

// REDUX IMPORTS
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import GoBackNav from "../../components/headerNavigationComp/GoBackNav";
import CloseButton from "../../components/CloseButton/CloseButton";

interface IResultsScreenProps {
  closeViewResultsScreen?: () => void;
}

type IJournal = {
  initialBalance: number;
  journalId: string;
  journalName: string;
};
const JournalResultsScreen = ({ closeViewResultsScreen }: IResultsScreenProps) => {
  // import the redux states
  const allJournals = useSelector((state: RootState) => state.journals);
  const selectedJournal = useSelector((state: RootState) => state.selectJournal);
  const results = useSelector((state: RootState) => state.journalResults);
  const trades = useSelector((state: RootState) => state.tradesFromJournal);

  // all the trades from the selected backtest
  const tradesFromJournal = trades.filter((trade) => trade.journalId === selectedJournal);

  // an array with all the results in chronological order
  const tradeResultsArray = tradesFromJournal.map((trade) => {
    return trade.result;
  });

  // the selected backtest
  const findJournal: IJournal | undefined = allJournals.find((trade: IJournal) => {
    return trade.journalId === selectedJournal;
  });

  console.log(findJournal);

  // name of the backtest strategy
  const strategyName = findJournal?.journalName || "";

  // extracts all the variables to render
  let {
    initialBalance,
    finalBalance,
    balanceResult,
    percentWin,
    payoff,
    percentRent,
    totalTrades,
    winningTrades,
    losingTrades,
    avgWin,
    biggestWin,
    smallestWin,
    biggestLoss,
    smallestLoss,
    avgLoss,
    longTrades,
    shortTrades,
    percentLong,
  } = results[selectedJournal];

  balanceResult = 0;
  const tradeResultsArray2 = tradeResultsArray.map((results: number) => {
    return (balanceResult += results);
  });

  // the infos that will be rendered in each row
  const renderReport = [
    {
      title1: "Saldo Inicial",
      title2: "Saldo Final",
      title3: "Profit/Loss",
      content1: Number(initialBalance).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      content2: Number(finalBalance).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      content3: balanceResult.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    {
      title1: "% Acerto",
      title2: "Payoff",
      title3: "Rent. %",
      content1: percentWin,
      content2: payoff,
      content3: percentRent + "%",
    },
    {
      title1: "Total Trades",
      title2: "Vencedoras",
      title3: "Perdedoras",
      content1: totalTrades,
      content2: winningTrades,
      content3: losingTrades,
    },
    {
      title1: "Long Trades",
      title2: "Short Trades",
      title3: "% Long Trades",
      content1: longTrades,
      content2: shortTrades,
      content3: percentLong + "%",
    },
    {
      title1: "Maior Lucro",
      title2: "Menor Lucro",
      title3: "Média Lucro",
      content1: biggestWin.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      content2: smallestWin.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      content3: avgWin.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    {
      title1: "Maior Perda",
      title2: "Menor Perda",
      title3: "Média perda",
      content1: biggestLoss.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      content2: smallestLoss.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      content3: Number(avgLoss).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
  ];

  const navigation = useNavigation();

  return (
    <MainContainer>
      <StatusBar />
      <GoBackNav />
      <ScrollView>
        <View style={styles.resultsHeader}>
          <View style={{ flex: 10 }}>
            <Title style={{ marginBottom: 10 }}>{strategyName}</Title>
          </View>

          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <CloseButton onPress={() => navigation.goBack()} type="dark" />
          </View>
        </View>

        <Chart resultsArray={tradeResultsArray2} />

        <Paragraph style={{ marginBottom: 10, textAlign: "center" }}>Resultados</Paragraph>

        {/* //TODO: SUBSTITUIR POR DADOS QUE VIRÃO DA SLICE DE RESULTADOS. AINDA NÃO SEI COMO. *THUMBS UP* */}
        {renderReport.map((item) => (
          <Container key={item.title1}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Paragraph style={styles.textOpacity}>{item.title1}</Paragraph>
                <Paragraph>{item.content1}</Paragraph>
              </View>

              <View style={{ flex: 1 }}>
                <Paragraph style={styles.textOpacity}>{item.title2}</Paragraph>
                <Paragraph>{item.content2}</Paragraph>
              </View>

              <View style={{ flex: 1 }}>
                <Paragraph style={styles.textOpacity}>{item.title3}</Paragraph>
                <Paragraph>{item.content3}</Paragraph>
              </View>
            </View>
          </Container>
        ))}
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textOpacity: {
    opacity: 0.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JournalResultsScreen;
