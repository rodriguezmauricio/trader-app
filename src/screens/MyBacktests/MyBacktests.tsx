// REGULAR IMPORTS
import { FlatList, StyleSheet } from "react-native";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Modalize } from "react-native-modalize";

// CUSTOM IMPORTS
import BackTestCard from "../../components/BacktestCard/BacktestCard";
import { AbsoluteBgHeader, MainContainer, Title } from "../../styles/styles";
import Button from "../../components/Buttons/Button";
import EditStrategyModal from "../../components/EditStrategyModal/EditStrategyModal";

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { selectBacktest } from "../../redux/selectedBacktestSlice";

//NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import { BacktestsParamList } from "../../routes/RootRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

interface EditStrategyModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

interface IListItem {
  backtestId: string;
  strategyName: string;
  asset: string;
}

type Props = StackNavigationProp<BacktestsParamList, "MyBacktests">;

const MyBacktests = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  // all backtests from the redux (not trades)
  const backtests = useSelector((state: any) => state.backtests);

  // ref to interact with the strategy modal
  const editStrategyModal = React.useRef<EditStrategyModalProps>(null);

  // opens the strategy modal with the selected backtest
  const openEditStrategyModal = (backtestId: string) => {
    editStrategyModal.current?.open();
    dispatch(selectBacktest(backtestId));
  };

  // closes the strategy modal
  const closeEditStrategyModal = () => {
    editStrategyModal.current?.close();
  };

  // checks if there are backtests to render
  const doesListExist = backtests[0]?.backtestId && true;

  // navigate to the backtest page
  const openItem = (id: string) => {
    dispatch(selectBacktest(id));
    navigation.navigate("SingleBacktest");
  };

  // navigate to the results page
  const openResults = (id: string) => {
    dispatch(selectBacktest(id));
    navigation.navigate("Resultados");
  };

  return (
    <MainContainer>
      <StatusBar />
      <View style={{ paddingTop: 35 }}></View>

      <Modalize ref={editStrategyModal} snapPoint={500} adjustToContentHeight>
        <EditStrategyModal closeEditStrategyModal={closeEditStrategyModal} />
      </Modalize>

      <AbsoluteBgHeader />

      <Title style={styles.headerTop}>Meus</Title>
      <Title style={styles.headerBottom}>Backtestes</Title>

      {doesListExist ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={backtests}
          keyExtractor={(item) => item.backtestId}
          // initialScrollIndex={backtest.length - 1}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  openItem(item.backtestId);
                }}
              >
                <BackTestCard
                  strategyName={item.strategyName}
                  asset={item.asset}
                  openStrategyModal={openEditStrategyModal}
                  backtestId={item.backtestId}
                  openResults={openResults}
                  index={index}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        ""
      )}

      <Button
        title="Novo backtest"
        onPressButton={() => {
          navigation.navigate("NewBacktest");
        }}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    fontSize: 46,
    marginBottom: -20,
  },
  headerBottom: {
    fontSize: 46,
  },
});

export default MyBacktests;
