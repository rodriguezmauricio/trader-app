import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Container, MainContainer, Paragraph, Title, theme } from "../../styles/styles";
import { NbtTextInput, TitleContainer } from "../../screens/NewBacktest/newBacktestScreenStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { updateTrade, removeTrade } from "../../redux/tradesFromBacktestsSlice";
import { RootState } from "../../redux/store";
import { TextInputMask } from "react-native-masked-text";

type ITrade = {
  backtestId: string;
  tradeId: string;
  entry: number;
  exit: number;
  isLong: true;
  positionSize: number;
  result: number;
  points: number;
};

interface IEditTradeModal {
  closeEditModal: () => void;
  tradeToUpdate?: ITrade;
}

const EditTradeModal = ({ closeEditModal }: IEditTradeModal) => {
  const dispatch = useDispatch();

  // padrozinação de tamanho e cor dos ícones (no momento, só a lixeira)
  const ICON_SIZE = 20;
  const ICON_COLOR = "#fff";

  // importação dos estados para selecionar o backtest que será editado
  const allBacktests = useSelector((state: RootState) => state.backtests);
  const selectedBacktest = useSelector((state: RootState) => state.selectBacktest);
  const allTrades = useSelector((state: RootState) => state.tradesFromBacktests);
  const selectedTrade = useSelector((state: RootState) => state.selectTrade);
  const tradeToUpdate: ITrade | undefined = allTrades.find(
    (trade) => trade.tradeId === selectedTrade
  );
  const findBacktest = allBacktests.find((item) => item.backtestId === selectedBacktest);
  const asset = findBacktest?.asset;
  const positionSize = findBacktest?.positionSize;

  // form do input com valores de entrada e saída.
  // se existir trade pra atualizar ele retorna em string.
  // se não tiver, preenche com uma string vazia
  const [formContent, setFormContent] = useState({
    entry: tradeToUpdate ? String(tradeToUpdate.entry) : "",
    exit: tradeToUpdate ? String(tradeToUpdate.exit) : "",
  });

  // atualiza o objeto do formulário com a chave e valor novos.
  const handleFormContent = (name: string, value: string) => {
    setFormContent({ ...formContent, [name]: value });
  };

  // atualiza o trade selecionado e fecha o modal
  const handleUpdate = () => {
    if (tradeToUpdate) {
      const entrada = formContent.entry.replace(",", ".");
      const saida = formContent.exit.replace(",", ".");
      const newPositionSize = positionSize;

      const updatedTrade = {
        ...tradeToUpdate,
        entry: Number(entrada),
        exit: Number(saida),
        positionSize: newPositionSize,
      };
      dispatch(updateTrade(updatedTrade));
      closeEditModal();
    }
  };

  // remove o trade selecionado
  const removeTradeSelecionado = () => {
    if (selectedTrade) {
      closeEditModal();

      setFormContent({
        entry: tradeToUpdate ? String(tradeToUpdate.entry) : "",
        exit: tradeToUpdate ? String(tradeToUpdate.exit) : "",
      });
      setTimeout(() => {
        dispatch(removeTrade(selectedTrade));
      }, 500);
    }
  };

  return (
    <MainContainer>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Title style={{ marginBottom: 10, flex: 1 }}>Editar Trade</Title>
        <TouchableOpacity style={styles.deleteButton} onPress={removeTradeSelecionado}>
          <Paragraph style={{ fontSize: 16 }}>Excluir</Paragraph>
          <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={ICON_COLOR} />
        </TouchableOpacity>
      </View>

      {/* SECTION: ENTRY INPUT BEGIN */}
      <Container>
        <TitleContainer>
          <Paragraph style={{ fontSize: 16 }}>Valor de entrada</Paragraph>
        </TitleContainer>

        {/* {inputToShow(asset, "entry")} */}
        {asset === "win" ? (
          <TextInputMask
            style={styles.input}
            type="money"
            options={{
              maskType: "BRL",
              precision: 0,
              separator: ",",
              delimiter: ".",
              unit: "",
            }}
            value={formContent.entry}
            onChangeText={(value) => handleFormContent("entry", value)}
          />
        ) : (
          <NbtTextInput
            value={formContent.entry}
            onChangeText={(value) => handleFormContent("entry", value)}
          />
        )}
      </Container>
      {/* SECTION: ENTRY INPUT END */}

      {/* SECTION: EXIT INPUT BEGIN */}
      <Container>
        <TitleContainer>
          <Paragraph style={{ fontSize: 16 }}>Valor de saída</Paragraph>
        </TitleContainer>
        {asset === "win" ? (
          <TextInputMask
            style={styles.input}
            type="money"
            options={{
              maskType: "BRL",
              precision: 0,
              separator: ",",
              delimiter: ".",
              unit: "",
            }}
            value={formContent.exit}
            onChangeText={(value) => handleFormContent("exit", value)}
          />
        ) : (
          <NbtTextInput
            value={formContent.exit}
            onChangeText={(value) => handleFormContent("exit", value)}
          />
        )}
      </Container>
      {/* SECTION: EXIT INPUT END */}

      <Button title="Salvar alterações" onPressButton={handleUpdate} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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
  },
  input: {
    borderBottomColor: theme.text,
    borderBottomWidth: 1,
    color: theme.text,
    fontSize: 18,
  },
});

export default EditTradeModal;
