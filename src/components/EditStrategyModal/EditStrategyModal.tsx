// REGULAR IMPORTS
import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

// CUSTOM IMPORTS
import { Container, MainContainer, Paragraph, Title, theme } from "../../styles/styles";
import { NbtTextInput, TitleContainer } from "../../screens/NewBacktest/newBacktestScreenStyle";
import Button from "../Buttons/Button";
import { Report } from "../../classes/reportClass";
import ConfirmDeleteBacktestModal from "../confirmDeleteBacktestModal/ConfirmDeleteBacktestModal";

// REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { IBacktestStrategy, updateBacktest } from "../../redux/backtestsSlice";
import { RootState } from "../../redux/store";
import { ITradeBacktest, updateTradesPositionSize } from "../../redux/tradesFromBacktestsSlice";
import { calcResults, updateResultsPositionSize } from "../../redux/backtestResultsSlice";

interface IEditStrategyModalProps {
  closeEditStrategyModal: () => void;
}

interface confirmDeleteBacktestModalProps {
  open: () => void;
  close: () => void;
  // Outras propriedades do modal, se houver
}

const EditStrategyModal = ({ closeEditStrategyModal }: IEditStrategyModalProps) => {
  const dispatch = useDispatch();

  // refs to use in the delete backtest modal
  const confirmDeleteBacktestModal = useRef<confirmDeleteBacktestModalProps>(null);

  // icons and inputs default patterns
  const ICON_SIZE = 20;
  const ICON_COLOR = theme.green;
  const PLACEHOLDER_COLOR = "#535b6e";

  // gets the trades and backtests to update on the inputs
  const trades = useSelector((state: RootState) => state.tradesFromBacktests);
  const allBacktests = useSelector((state: RootState) => state.backtests);
  const selectedBacktest = useSelector((state: RootState) => state.selectBacktest);
  const backtestToUpdate: IBacktestStrategy | undefined = allBacktests.find(
    (item) => item.backtestId === selectedBacktest
  );

  const initialBalance = backtestToUpdate?.initialBalance;
  const tradesFromBacktest: ITradeBacktest[] = trades.filter(
    (trade) => trade.backtestId === selectedBacktest
  );

  let pointsResult = 0;
  let balanceResult = 0;

  // finds the trades from the selected backtest and calc points and financial result
  tradesFromBacktest.map((item) => {
    const result = item.result;
    const points = item.points;
    pointsResult += points;
    balanceResult += result;
  });

  // calc the final balance of all trades from that backtest
  const finalBalance = initialBalance && initialBalance + balanceResult;

  // form: initialized with the backtest loaded data
  const [formContent, setFormContent] = useState({
    strategyName: backtestToUpdate?.strategyName,
    positionSize: backtestToUpdate?.positionSize,
    timeframe: backtestToUpdate?.timeframe,
    initialBalance: backtestToUpdate?.initialBalance,
    otherInfo: backtestToUpdate?.otherInfo,
  });

  // receives the key value painr to add to the object
  const handleFormContent = (name: string, value: string) => {
    setFormContent({ ...formContent, [name]: value });
  };

  const asset = backtestToUpdate && backtestToUpdate.asset;

  // update the backtest with the form data
  // update the results report

  const handleUpdate = () => {
    if (backtestToUpdate) {
      const { strategyName, positionSize, timeframe, initialBalance, otherInfo } = formContent;
      const { asset } = backtestToUpdate;
      const updatedBacktest = {
        ...backtestToUpdate,
        strategyName,
        positionSize: Number(positionSize) > 0 ? Number(positionSize) : 1,
        timeframe,
        initialBalance: Number(initialBalance),
        otherInfo,
      };

      // makes a new instance of the results object that is sent to the redux
      const report = new Report(
        asset,
        selectedBacktest,
        initialBalance ?? 0,
        finalBalance ?? 0,
        balanceResult,
        pointsResult,
        tradesFromBacktest
      );

      // normalize tge report to avoid the non-serialized value error
      const normalizedReport = JSON.stringify(report);

      // sends the object eith the data top update the selected backtest at the redux
      const updatedTradePositionSize = {
        asset: asset,
        positionSize: positionSize,
        backtestId: selectedBacktest,
      };

      dispatch(calcResults(normalizedReport));
      dispatch(updateBacktest(updatedBacktest));
      dispatch(updateTradesPositionSize(updatedTradePositionSize));
      dispatch(
        updateResultsPositionSize({
          asset: asset,
          positionSize: positionSize,
          report: normalizedReport,
        })
      );
      closeEditStrategyModal();
    }
  };

  // opens the modal to type the backtest exclusion confirmation code
  const openConfirmDeleteBacktestModal = () => {
    confirmDeleteBacktestModal.current?.open();
  };

  // if the backtest exists, open the modal to type the security code
  const removeBacktestSelecionado = () => {
    if (selectedBacktest) {
      openConfirmDeleteBacktestModal();
    }
  };

  return (
    <MainContainer>
      <Modalize ref={confirmDeleteBacktestModal} snapPoint={500}>
        <ConfirmDeleteBacktestModal
          closeEditStrategyModal={closeEditStrategyModal}
          selectedBacktest={selectedBacktest}
        />
      </Modalize>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Title style={{ marginBottom: 10, flex: 1 }}>Editar Backtest</Title>
        <TouchableOpacity style={styles.deleteButton} onPress={removeBacktestSelecionado}>
          <Paragraph style={{ fontSize: 16 }}>Excluir</Paragraph>
          <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* SECTION: STRATEGY NAME BEGIN */}
      <Container>
        <TitleContainer>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <Paragraph style={{ fontSize: 14 }}>Nome da estratégia</Paragraph>
        </TitleContainer>
        <NbtTextInput
          value={formContent.strategyName}
          onChangeText={(value) => handleFormContent("strategyName", value)}
          placeholderTextColor={PLACEHOLDER_COLOR}
          placeholder="ex.: Setup QQ1"
        />
      </Container>
      {/* SECTION: STRATEGY NAME END */}

      {/* SECTION: CTTS/LOTES BEGIN */}
      <Container>
        <TitleContainer>
          <MaterialCommunityIcons name="sort-numeric-variant" size={ICON_SIZE} color={ICON_COLOR} />
          <Paragraph style={{ fontSize: 14 }}>Contratos / Lotes</Paragraph>
        </TitleContainer>
        <NbtTextInput
          value={String(formContent.positionSize)}
          onChangeText={(value) => handleFormContent("positionSize", value)}
          placeholderTextColor={PLACEHOLDER_COLOR}
          placeholder="Ex.: 10"
          keyboardType="numeric"
        />
      </Container>

      {/* SECTION: CTTS/LOTES END */}

      {/* SECTION: TIMEFRAME BEGIN */}
      <Container>
        <TitleContainer>
          <MaterialCommunityIcons
            name="clock-time-five-outline"
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <Paragraph style={{ fontSize: 14 }}>Timeframe</Paragraph>
        </TitleContainer>
        <NbtTextInput
          value={formContent.timeframe}
          onChangeText={(value) => handleFormContent("timeframe", value)}
          placeholderTextColor={PLACEHOLDER_COLOR}
          placeholder="Ex.: Diário / 15 min"
        />
      </Container>

      {/* SECTION: TIMEFRAME END */}

      {/* SECTION: SALDO INICIAL BEGIN */}
      <Container>
        <TitleContainer>
          <MaterialCommunityIcons name="currency-usd" size={ICON_SIZE} color={ICON_COLOR} />
          <Paragraph style={{ fontSize: 14 }}>Saldo inicial</Paragraph>
        </TitleContainer>
        <NbtTextInput
          value={String(formContent.initialBalance)}
          onChangeText={(value) => handleFormContent("initialBalance", value)}
          placeholderTextColor={PLACEHOLDER_COLOR}
          placeholder="Ex.: 1000"
          keyboardType="numeric"
        />
      </Container>

      {/* SECTION: SALDO INICIAL END */}

      {/* SECTION: INFORMAÇÕES ADICIONAIS BEGIN */}
      <Container>
        <TitleContainer>
          <MaterialCommunityIcons name="form-textbox" size={ICON_SIZE} color={ICON_COLOR} />
          <Paragraph style={{ fontSize: 14 }}>Informações adicionais</Paragraph>
        </TitleContainer>
        <NbtTextInput
          value={formContent.otherInfo}
          onChangeText={(value) => handleFormContent("otherInfo", value)}
          placeholderTextColor={PLACEHOLDER_COLOR}
          multiline
          numberOfLines={5}
          placeholder="Ex.: Alvo: 3%. Stop: 2%. Entradas na compra somente acima da média de 20"
        />
      </Container>
      {/* SECTION: INFORMAÇÕES ADICIONAIS END */}

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
});

export default EditStrategyModal;
