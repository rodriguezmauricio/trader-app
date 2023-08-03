import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { Paragraph, theme } from "../../styles/styles";
import { FontAwesome } from "@expo/vector-icons";
import { removeTradesFromBacktest } from "../../redux/tradesFromBacktestsSlice";
import { deleteBacktest } from "../../redux/backtestsSlice";
import { useDispatch } from "react-redux";
import { deleteResults } from "../../redux/backtestResultsSlice";

interface IConfirmDeleteBacktestModal {
  closeEditStrategyModal: () => void;
  selectedBacktest: string;
}

const ConfirmDeleteBacktestModal = ({
  closeEditStrategyModal,
  selectedBacktest,
}: IConfirmDeleteBacktestModal) => {
  const dispatch = useDispatch();

  // contains the random security code to delete the bascktest
  const [deleteCode, setDeleteCode] = useState("");

  // create the code to delete the backtest
  useEffect(() => {
    const securityCode = Math.round(Math.random() * 10000);
    setDeleteCode(String(securityCode));
  }, []);

  // input to type the code to delete the backtest
  const [codeInput, setCodeInput] = useState("");

  // check if the typed code is the same as the generated one. If true, deletes the backtest
  const deleteConfirmed = () => {
    // confirm the backtest removal. If the setTimeout is removed the app will brake
    if (deleteCode === codeInput) {
      closeEditStrategyModal();
      dispatch(removeTradesFromBacktest(selectedBacktest));
      setTimeout(() => {
        dispatch(deleteBacktest(selectedBacktest));
        dispatch(deleteResults(selectedBacktest));
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir backtest?</Text>
      <Text style={styles.text}>
        Esta ação é permanente. Todos os dados relacionados a este backtest também serão apagados.
      </Text>
      <Text>Para excluir, digite o código abaixo.</Text>
      <Text style={{ fontSize: 30 }}>{deleteCode}</Text>
      <View style={styles.buttonsContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          value={codeInput}
          onChangeText={(value) => setCodeInput(value)}
        ></TextInput>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteConfirmed()}>
          <Paragraph>Confirmar exclusão</Paragraph>
          <FontAwesome name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  buttonsContainer: {
    // flexDirection: "row",
    gap: 15,
  },
  textInput: {
    borderColor: theme.bgLight,
    borderWidth: 1,
    width: 250,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: theme.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default ConfirmDeleteBacktestModal;
