import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Container, MainContainer, Paragraph, Title } from "../../styles/styles";
import { NbtTextInput } from "../../screens/NewBacktest/newBacktestScreenStyle";
import Button from "../Buttons/Button";
import { nanoid } from "@reduxjs/toolkit";
import { addJournal } from "../../redux/newJournalSlice";
import { useDispatch } from "react-redux";

interface AddJournalModalProps {
  closeModal: () => void;
  // Outras propriedades do modal, se houver
}

const AddJournalModal = ({ closeModal }: AddJournalModalProps) => {
  const dispatch = useDispatch();

  const [journalForm, setJournalForm] = useState({
    journalName: "",
    initialBalance: "",
    journalId: nanoid(),
  });

  const addNewJournalButton = () => {
    if (journalForm.journalName.length > 0) closeModal();
    const normalizedForm = { ...journalForm, initialBalance: Number(journalForm.initialBalance) };
    dispatch(addJournal(normalizedForm));
  };

  return (
    <MainContainer style={styles.mainContainer}>
      <Title>Novo diário de trades</Title>

      <View>
        <Paragraph>Nome do diário</Paragraph>

        <NbtTextInput
          placeholder="ex.: Diário da Binance"
          placeholderTextColor="#888"
          value={journalForm.journalName}
          onChangeText={(t) => setJournalForm({ ...journalForm, journalName: t })}
        />
      </View>

      <View>
        <Paragraph>Saldo inicial</Paragraph>
        <NbtTextInput
          placeholder="ex.: 1000"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={String(journalForm.initialBalance)}
          onChangeText={(t) => setJournalForm({ ...journalForm, initialBalance: t })}
        />
      </View>

      <Button title="Salvar" onPressButton={addNewJournalButton} />
    </MainContainer>
  );
};

export default AddJournalModal;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
  },
});
