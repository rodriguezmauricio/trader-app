import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { MainContainer, Paragraph, Title, theme } from "../../styles/styles";
import { NbtTextInput } from "../../screens/NewBacktest/newBacktestScreenStyle";
import Button from "../Buttons/Button";
import { IJournal, updateJournal } from "../../redux/newJournalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { XView } from "../../screens/Home/HomeScreenStyle";
import { Modalize } from "react-native-modalize";
import ConfirmDeleteJournalModal from "../confirmDeleteJournalModal/ConfirmDeleteJournalModal";

interface EditJournalModalProps {
  closeModal: () => void;

  // Outras propriedades do modal, se houver
}

interface confirmDeleteJournalModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

const EditJournalModal = ({ closeModal }: EditJournalModalProps) => {
  const dispatch = useDispatch();

  // refs to use in the delete journal modal
  const confirmDeleteJournalModal = useRef<confirmDeleteJournalModalProps>(null);

  // padronização de tamanho e cor dos ícones (no momento, só a lixeira)
  const ICON_SIZE = 20;
  const ICON_COLOR = "#fff";
  const PLACEHOLDER_COLOR = "#535b6e";

  const allJournals = useSelector((state: RootState) => state.journals);
  const journalId = useSelector((state: RootState) => state.selectJournal);
  const selectedJournal = allJournals.find((item: IJournal) => item.journalId === journalId);

  // opens the modal to type the backtest exclusion confirmation code
  const openConfirmDeleteJournalModal = () => {
    confirmDeleteJournalModal.current?.open();
  };

  const closeConfirmDeleteJournalModal = () => {
    confirmDeleteJournalModal.current?.close();
  };

  const [journalForm, setJournalForm] = useState({
    journalName: selectedJournal?.journalName,
    initialBalance: selectedJournal?.initialBalance,
  });

  const editJournalButton = () => {
    if (journalForm.journalName.length > 0) closeModal();
    dispatch(updateJournal({ ...selectedJournal, ...journalForm }));
  };

  // open the modal to remove the selected journal
  const removeSelectedJournal = () => {
    openConfirmDeleteJournalModal();
  };
  return (
    <MainContainer style={styles.mainContainer}>
      <Modalize ref={confirmDeleteJournalModal} adjustToContentHeight>
        <ConfirmDeleteJournalModal
          closeEditJournalModal={closeModal}
          selectedJournal={selectedJournal}
        />
      </Modalize>
      <XView>
        <View style={{ flex: 1 }}>
          <Title>Editar diário de trades</Title>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={removeSelectedJournal}>
          <Paragraph style={{ fontSize: 16 }}>Excluir</Paragraph>
          <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={ICON_COLOR} />
        </TouchableOpacity>
      </XView>

      <Paragraph>Nome do diário</Paragraph>

      <NbtTextInput
        placeholder="ex.: Diário da Binance"
        placeholderTextColor="#888"
        value={journalForm.journalName}
        onChangeText={(t) => setJournalForm({ ...journalForm, journalName: t })}
      />

      <NbtTextInput
        placeholder="ex.: 1000"
        placeholderTextColor="#888"
        value={String(journalForm.initialBalance)}
        onChangeText={(t) => setJournalForm({ ...journalForm, initialBalance: Number(t) })}
      />

      <Button title="Salvar" onPressButton={editJournalButton} />
    </MainContainer>
  );
};

export default EditJournalModal;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
  },
  deleteButton: {
    backgroundColor: theme.red,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  input: {
    borderBottomColor: theme.text,
    borderBottomWidth: 1,
    color: theme.text,
    fontSize: 18,
  },
});
