// REGULAR IMPORTS
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";

// CUSTOM IMPORTS
import { AbsoluteBgHeader, MainContainerForScroll, Title } from "../../styles/styles";
import { View } from "react-native";
import Button from "../../components/Buttons/Button";

// REDUX IMPORTS

// NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import TradeJournalCover from "../../components/TradeJournalCover/TradeJournalCover";
import { useDispatch, useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import AddJournalModal from "../../components/AddJournalModal/AddJournalModal";
import { RootState } from "../../redux/store";
import EditJournalModal from "../../components/EditJournalModal copy/EditJournalModal";
import { setSelectedJournal } from "../../redux/selectedJournal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootTabParamsList } from "../../routes/RootRoutes";

interface AddJournalModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

interface EditJournalModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

type Props = StackNavigationProp<RootTabParamsList>;

const TradesJournalScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  const journals = useSelector((state: RootState) => state.journals);

  const addJournalModal = useRef<AddJournalModalProps>(null);
  const editJournalModal = useRef<EditJournalModalProps>(null);

  const openAddJournalModal = () => {
    addJournalModal.current?.open();
  };

  const closeAddJournalModal = () => {
    addJournalModal.current?.close();
  };

  const openEditJournalModal = (journalId: string) => {
    editJournalModal.current?.open();
    dispatch(setSelectedJournal(journalId));
  };

  const closeEditJournalModal = () => {
    editJournalModal.current?.close();
  };

  const openJournal = (journalId: string) => {
    dispatch(setSelectedJournal(journalId));
    setTimeout(() => {
      navigation.navigate("Diário", { screen: "TradesFromJournal" });
    }, 200);
  };

  return (
    <MainContainerForScroll style={styles.mainScroll}>
      {/* MODAL BEGIN */}
      <Modalize ref={addJournalModal} snapPoint={500} adjustToContentHeight>
        <AddJournalModal closeModal={closeAddJournalModal} />
      </Modalize>

      <Modalize ref={editJournalModal} snapPoint={500} adjustToContentHeight>
        <EditJournalModal closeModal={closeEditJournalModal} />
      </Modalize>
      {/* MODAL END */}

      <AbsoluteBgHeader />
      <StatusBar />
      <View style={styles.paddingTop}></View>
      {/* <Chart /> */}

      <Title style={styles.headerTop}>Meus Diários</Title>
      <Title style={styles.headerBottom}>de Trade</Title>

      <View style={styles.mainView}>
        <FlatList
          data={journals}
          keyExtractor={(item) => item.journalId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openJournal(item.journalId)}>
              <TradeJournalCover
                title={item.journalName}
                openEditJournalModal={openEditJournalModal}
                journalId={item.journalId}
                initialBalance={item.initialBalance}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Button title="Novo Diário" onPressButton={openAddJournalModal} />
    </MainContainerForScroll>
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
  mainScroll: { paddingHorizontal: 15, paddingBottom: 15 },
  tag: {
    width: 150,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  paddingTop: {
    paddingTop: 50,
  },
  mainView: {
    flex: 1,
    gap: 5,
  },
});

export default TradesJournalScreen;
