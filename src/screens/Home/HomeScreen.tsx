import { View, ScrollView, Dimensions, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";

//DATA IMPORTS
import { playlists } from "../../data/videos";

//COMPONENTS IMPORTS
import {
  Container,
  MainContainerForScroll,
  Paragraph,
  ParagraphDark,
  Title,
  theme,
} from "../../styles/styles";
import { AddNovoButton, HeaderBlocks, XView } from "./HomeScreenStyle";
import BackTestHomeCard from "../../components/BacktestCard/BacktestHomeCard";
import TopResultsCard from "../../components/TopResultsCard/TopResultsCard";
import PlaylistHomeItem from "../../components/PlaytlistHomeItem/PlaylistHomeItem";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectedPlaylist } from "../../redux/selectedPlaylist";
import { IReport } from "../../redux/backtestResultsSlice";
import { IBacktestStrategy } from "../../redux/backtestsSlice";

//NAVIGATION IMPORTS
import { RootTabParamsList } from "../../routes/RootRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type Props = StackNavigationProp<RootTabParamsList>;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  // gets the states
  const allTrades = useSelector((state: RootState) => state.tradesFromBacktests);
  const allBacktests = useSelector((state: RootState) => state.backtests);
  const allResults = useSelector((state: RootState) => state.backtestResults);
  const selectedBacktest = useSelector((state: RootState) => state.selectBacktest);

  // objetos com todos os resultados, usado pra calcular o payoff
  const resultsArray = Object.values(allResults);

  // all the studies that have a positive result
  const winningStudies = resultsArray.filter((item) => item.balanceResult > 0);

  // the last backtest that the user interacted with
  const lastBacktest = allBacktests.find((bt) => bt.backtestId === selectedBacktest);

  // orders the array by payoff
  const comparePayoffs = (a: IReport, b: IReport) => {
    if (a.payoff > b.payoff) {
      return -1;
    } else if (a.payoff < b.payoff) {
      return 1;
    } else {
      return 0;
    }
  };

  // list trades with biggest payoffs in descending order
  const bestTradesByPayoff = resultsArray.sort(comparePayoffs);

  // get the id of the trades with the best payoff
  const idTop1 = bestTradesByPayoff[0]?.backtestId;
  const idTop2 = bestTradesByPayoff[1]?.backtestId;
  const idTop3 = bestTradesByPayoff[2]?.backtestId;

  //states to save the payoffs in order
  const [payoffTop1, setPayoffTop1] = useState<IBacktestStrategy>();
  const [payoffTop2, setPayoffTop2] = useState<IBacktestStrategy>();
  const [payoffTop3, setPayoffTop3] = useState<IBacktestStrategy>();

  //updates the list of best payoffs everytime it changes
  useEffect(() => {
    setPayoffTop1(allBacktests.find((item) => item.backtestId === idTop1));
    setPayoffTop2(allBacktests.find((item) => item.backtestId === idTop2));
    setPayoffTop3(allBacktests.find((item) => item.backtestId === idTop3));
  }, [bestTradesByPayoff]);

  // when clicked, navigates to the results screen of the selected backtest
  const openResultsButton = () => {
    navigation.navigate("Backtests", { screen: "MyBacktests" });
    setTimeout(() => {
      navigation.navigate("Backtests", { screen: "SingleBacktest" });
    }, 100);
    setTimeout(() => {
      navigation.navigate("Backtests", { screen: "Resultados" });
    }, 200);
  };

  // when clicked, navigate to the videos of the selected playlist
  const goToVideos = (playlistToRender: string) => {
    dispatch(setSelectedPlaylist(playlistToRender));
    navigation.navigate("Playlists", { screen: "Playlists" });
    setTimeout(() => {
      navigation.navigate("Playlists", { screen: "Videos" });
    }, 0);
  };

  // percentage of winning studies
  const percentWinningStudies = Math.round(
    Number(winningStudies.length / resultsArray.length) * 100
  );

  return (
    <MainContainerForScroll>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Paragraph style={{ fontSize: 38, fontWeight: "bold", marginLeft: 15 }}>Olá!</Paragraph>

          {/* BLOCOS TOPO BEGIN */}
          <View style={{ marginLeft: 5 }}>
            <View>
              <Title style={{ marginBottom: 5, marginLeft: 10 }}>Resumo dos estudos</Title>
            </View>

            <XView style={{ paddingHorizontal: 10 }}>
              <HeaderBlocks>
                <Paragraph style={styles.boxNumbers}>{allTrades.length}</Paragraph>
                <Paragraph style={styles.boxTitles}>Trades</Paragraph>
                <Paragraph style={styles.boxTitles}>realizados</Paragraph>
              </HeaderBlocks>

              <HeaderBlocks>
                <Paragraph style={styles.boxNumbers}>{allBacktests.length}</Paragraph>
                <Paragraph style={styles.boxTitles}>Backtests</Paragraph>
                <Paragraph style={styles.boxTitles}>iniciados</Paragraph>
              </HeaderBlocks>

              <HeaderBlocks>
                <Paragraph style={styles.boxNumbers}>
                  {resultsArray.length > 0 ? percentWinningStudies : 0}%
                </Paragraph>
                <Paragraph style={styles.boxTitles}>estudos</Paragraph>
                <Paragraph style={styles.boxTitles}>no lucro</Paragraph>
              </HeaderBlocks>
            </XView>
          </View>
        </View>
        {/* BLOCOS TOPO END */}

        {/* ULTIMO ESTUDO BEGIN */}
        <View style={{ margin: 15 }}>
          <Title style={{ marginBottom: 5 }}>Último estudo</Title>
          <XView style={{ marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              {lastBacktest ? (
                <BackTestHomeCard
                  strategyName={lastBacktest?.strategyName}
                  asset={lastBacktest?.asset}
                  openResults={openResultsButton}
                />
              ) : (
                <Container
                  style={{
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 0,
                  }}
                >
                  <Paragraph>Seu último estudo aparecerá aqui.</Paragraph>
                </Container>
              )}
            </View>
            <AddNovoButton
              onPress={() => navigation.navigate("Backtests", { screen: "MyBacktests" })}
            >
              <FontAwesome name="plus" size={24} color={theme.bg} />
              <ParagraphDark>novo</ParagraphDark>
            </AddNovoButton>
          </XView>
        </View>
        {/* ULTIMO ESTUDO END */}

        {/* PLAYLISTS BEGIN */}
        <View style={{ marginBottom: 20 }}>
          <Title style={{ marginBottom: 5, marginLeft: 15 }}>Playlists</Title>

          <FlatList
            keyExtractor={(item) => item.id}
            data={playlists}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => goToVideos(item.playlistToRender)}
                >
                  <PlaylistHomeItem title={item.nome} id={item.id} img={item.img} />
                </TouchableOpacity>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* PLAYLISTS END */}
        {/* TOP 3 BEGIN */}

        <View style={{ margin: 15 }}>
          <Title style={{ marginBottom: 5 }}>Top 3 melhores sistemas (payoff)</Title>
          {payoffTop1 ? (
            <TopResultsCard
              strategyName={payoffTop1.strategyName}
              asset={payoffTop1.asset}
              timeframe={payoffTop1.timeframe}
              id={payoffTop1.backtestId}
              payoff={bestTradesByPayoff[0].payoff}
            />
          ) : (
            ""
          )}
          {payoffTop2 ? (
            <TopResultsCard
              strategyName={payoffTop2.strategyName}
              asset={payoffTop2.asset}
              timeframe={payoffTop2.timeframe}
              id={payoffTop2.backtestId}
              payoff={bestTradesByPayoff[1].payoff}
            />
          ) : (
            ""
          )}
          {payoffTop3 ? (
            <TopResultsCard
              strategyName={payoffTop3.strategyName}
              asset={payoffTop3.asset}
              timeframe={payoffTop3.timeframe}
              id={payoffTop3.backtestId}
              payoff={bestTradesByPayoff[2].payoff}
            />
          ) : (
            ""
          )}
          {!payoffTop1 && (
            <Container
              style={{
                height: 100,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0,
              }}
            >
              <Paragraph style={{ textAlign: "center", paddingHorizontal: 35 }}>
                Seus 3 melhores sistemas baseados em payoff aparecerão aqui.
              </Paragraph>
            </Container>
          )}
        </View>

        {/* TOP 3 END */}
      </ScrollView>
    </MainContainerForScroll>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.green,
    paddingTop: 50,
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  boxNumbers: {
    fontSize: 32,
    fontWeight: "bold",
  },
  boxTitles: {
    fontSize: 15,
    lineHeight: 18,
  },
});

export default HomeScreen;
