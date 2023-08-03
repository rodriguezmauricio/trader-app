// REGULAR IMPORTS
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// CUSTOM IMPORTS
import { AbsoluteBgHeader, Container, MainContainer, Paragraph, theme } from "../../styles/styles";
import { NbtTextInput, TitleContainer } from "./newBacktestScreenStyle";
import { Title } from "../../styles/styles";
import Button from "../../components/Buttons/Button";

// REDUX IMPORTS
import { useDispatch } from "react-redux";
import { saveBacktest } from "../../redux/backtestsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { selectBacktest } from "../../redux/selectedBacktestSlice";

// NAVIGATION IMPORTS
import { useNavigation } from "@react-navigation/native";
import { BacktestsParamList } from "../../routes/RootRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

// CLASS IMPORTS
import { TradingStrategy } from "../../classes/tradingStrategyClass";
import GoBackNav from "../../components/headerNavigationComp/GoBackNav";
import { StatusBar } from "expo-status-bar";

type Props = StackNavigationProp<BacktestsParamList, "NewBacktest">;

const NewBacktest = () => {
  const dispatch = useDispatch();

  const [selectedAsset, setSelectedAsset] = useState("");

  // form that will create the backtest
  const [formContent, setFormContent] = useState({
    strategyName: "",
    asset: selectedAsset,
    assetName: "",
    positionSize: "",
    timeframe: "",
    initialBalance: "",
    otherInfo: "",
  });

  const { strategyName, assetName, positionSize, timeframe, initialBalance, otherInfo } =
    formContent;

  // update the key value int the form
  const handleFormContent = (name: string, value: string) => {
    setFormContent({ ...formContent, [name]: value });
  };

  // pattar of the icons and placeholder
  const ICON_SIZE = 20;
  const ICON_COLOR = theme.green;
  const PLACEHOLDER_COLOR = theme.textGray;

  const navigation = useNavigation<Props>();

  return (
    <>
      <MainContainer>
        <StatusBar />
        <AbsoluteBgHeader />
        <GoBackNav />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Novo Backtest</Title>
          <Paragraph style={{ marginBottom: 10, color: PLACEHOLDER_COLOR }}>
            Preencha as informações para iniciar seu backtest
          </Paragraph>

          {/* SECTION: BEGIN */}
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

          {/* SECTION: END */}

          {/* SECTION: BEGIN */}
          <Container>
            <TitleContainer>
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />

              <Paragraph style={{ fontSize: 14 }}>Ativo</Paragraph>
            </TitleContainer>
            <Picker
              selectedValue={selectedAsset}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedAsset(itemValue);
              }}
              dropdownIconColor="#fff"
              dropdownIconRippleColor={theme.bg}
            >
              <Picker.Item
                style={selectedAsset === "" ? styles.selectedPickerItem : styles.pickerItem}
                label="Selecione"
                value=""
              />
              <Picker.Item
                style={selectedAsset === "win" ? styles.selectedPickerItem : styles.pickerItem}
                label="Mini índice"
                value="win"
              />
              <Picker.Item
                style={selectedAsset === "wdo" ? styles.selectedPickerItem : styles.pickerItem}
                label="Mini dólar"
                value="wdo"
              />
              <Picker.Item
                style={selectedAsset === "acao" ? styles.selectedPickerItem : styles.pickerItem}
                label="Ações"
                value="acao"
              />
              <Picker.Item
                style={selectedAsset === "cripto" ? styles.selectedPickerItem : styles.pickerItem}
                label="Criptomoedas"
                value="cripto"
              />
            </Picker>
          </Container>
          {selectedAsset === "acao" || selectedAsset === "cripto" ? (
            // SECTION: END

            // SECTION: BEGIN
            <Container>
              <TitleContainer>
                <MaterialCommunityIcons
                  name="format-letter-case"
                  size={ICON_SIZE}
                  color={ICON_COLOR}
                />
                <Paragraph style={{ fontSize: 14 }}>Nome do ativo</Paragraph>
              </TitleContainer>
              <NbtTextInput
                value={formContent.assetName}
                onChangeText={(value) => handleFormContent("assetName", value)}
                placeholderTextColor={PLACEHOLDER_COLOR}
                placeholder="Ex.: Bitcoin"
              />
            </Container>
          ) : (
            ""
          )}

          {/* SECTION: END */}

          {/* SECTION: BEGIN */}
          <Container>
            <TitleContainer>
              <MaterialCommunityIcons
                name="sort-numeric-variant"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
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

          {/* SECTION: END */}

          {/* SECTION: BEGIN */}
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

          {/* SECTION: END */}

          {/* SECTION: BEGIN */}
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

          {/* SECTION: END */}

          {/* SECTION: BEGIN */}
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
        </ScrollView>

        <View>
          <Button
            title="Iniciar Backtest"
            onPressButton={() => {
              const backtestId = nanoid();
              const newBackteste = new TradingStrategy(
                strategyName !== "" ? strategyName : "Minha Estratégia",
                selectedAsset !== "" ? selectedAsset : "win",
                assetName !== "" ? assetName : "",
                positionSize !== "" ? Number(positionSize) : 1,
                timeframe !== "" ? timeframe : "Diário",
                initialBalance !== "" ? Number(initialBalance) : 1000,
                otherInfo,
                backtestId
              );
              dispatch(saveBacktest({ ...newBackteste }));

              dispatch(selectBacktest(backtestId));
              navigation.navigate("SingleBacktest");
            }}
          />
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    color: "gray",
    backgroundColor: "#2A3247",
  },
  selectedPickerItem: {
    color: "#fff",
    backgroundColor: "#2A3247",
  },
});

export default NewBacktest;
