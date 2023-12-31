// REGULAR IMPORTS
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// CUSTOM IMPORTS
import {
  AbsoluteBgHeader,
  Container,
  MainContainer,
  Paragraph,
  Title,
  theme,
} from "../../styles/styles";
import { NbtTextInput } from "../NewBacktest/newBacktestScreenStyle";
import { XView } from "../Home/HomeScreenStyle";
import Button from "../../components/Buttons/Button";
// import { TextInputMask } from "react-native-masked-text";
import CurrencyInput from "react-native-currency-input";
// import { MaskedTextInput } from "react-native-mask-text";
import TimePlaceholder from "../../components/DateTimePlaceholder/TimePlaceholder";
import DatePlaceholder from "../../components/DateTimePlaceholder/DatePlaceholder";

// REDUX IMPORTS
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addTradeToJournal,
  deleteSingleTradeFromJournal,
  updateTradeOnJournal,
} from "../../redux/tradesFromJournalsSlice";
import RootRoutes from "../../routes/RootRoutes";
import GoBackNav from "../../components/headerNavigationComp/GoBackNav";
import { useNavigation } from "@react-navigation/native";

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

type FormData = {
  journalId: string | undefined;
  tradeId: string | undefined;
  asset: string | undefined;
  assetName: string | undefined;
  isLong: boolean | undefined;
  entryValue: string | number | undefined;
  exitValue: string | number | undefined;
  positionSize: string | number | undefined;
  takeProfit: string | undefined;
  stopLoss: string | undefined;
  timeframe: string | undefined;
  entryTime: TimeDate | string | number | undefined;
  entryDate: Date | string | number | undefined;
  isClosed: boolean | undefined;
  exitTime: TimeDate | string | number | undefined;
  exitDate: Date | string | number | undefined;
  notes: string | undefined;
};

type TimeDate = {
  hours: number | string | undefined;
  minutes: number | string | undefined;
};

interface TType {
  hours: number;
  minutes: number;
}

const EditTradeJournalScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // icons and inputs default patterns
  const ICON_SIZE = 20;
  const ICON_COLOR = theme.green;
  const PLACEHOLDER_COLOR = "#535b6e";

  // gets the selected trade
  const selectedJournal = useSelector((state: RootState) => state.selectJournal);
  const selectedTradeID = useSelector((state: RootState) => state.selectJournalTrade);
  const allTrades = useSelector((state: RootState) => state.tradesFromJournal);
  const selectedTrade = allTrades.find((trade) => trade.tradeId === selectedTradeID);

  // gets the hours and miuntes to add to the new object of entry date and time
  const entryHour = Number(selectedTrade?.entryTime?.split(":")[0]);
  const entryMinute = Number(selectedTrade?.entryTime?.split(":")[1]);
  const exitHour = selectedTrade?.exitTime?.split(":")[0];
  const exitMinute = selectedTrade?.exitTime?.split(":")[1];

  // changes the state to change the color of the button
  const [isLongButton, setIsLongButton] = useState<Boolean>(selectedTrade?.isLong ? true : false);

  // set the trade status
  const [isTradeClosed, setIsTradeClosed] = useState<Boolean>(
    selectedTrade?.isClosed ? true : false
  );

  // set the selected asset os empty string
  const [selectedAsset, setSelectedAsset] = useState(selectedTrade?.asset || "");

  const hasEntryDate = () => {
    return selectedTrade?.entryDate ? new Date(selectedTrade.entryDate) : undefined;
  };
  const hasEntryTime = () => {
    return selectedTrade?.entryTime
      ? { hours: Number(entryHour), minutes: Number(entryMinute) }
      : { hours: -1, minutes: -1 };
  };
  const hasExitDate = () => {
    return selectedTrade?.exitDate ? new Date(selectedTrade.exitDate) : undefined;
  };
  const hasExitTime = () => {
    return selectedTrade?.entryTime
      ? { hours: Number(exitHour), minutes: Number(exitMinute) }
      : { hours: -1, minutes: -1 };
  };

  // variables for the entry and exit input fields
  const [entryTime, setEntryTime] = useState(hasEntryTime());
  const [entryDate, setEntryDate] = useState(hasEntryDate());
  const [exitTime, setExitTime] = useState(hasExitTime());
  const [exitDate, setExitDate] = useState(hasExitDate());

  //TODO: definir as verificações
  const [tradeForm, setTradeForm] = useState<FormData>({
    journalId: selectedJournal,
    tradeId: selectedTrade?.tradeId,
    asset: selectedTrade?.asset,
    assetName: selectedTrade?.assetName,
    isLong: selectedTrade?.isLong,
    entryValue: String(selectedTrade?.entryValue),
    positionSize: String(selectedTrade?.positionSize),
    takeProfit: String(selectedTrade?.takeProfit),
    stopLoss: String(selectedTrade?.stopLoss),
    timeframe: selectedTrade?.timeframe,
    entryTime: { hours: entryHour, minutes: entryMinute },
    entryDate: selectedTrade && new Date(selectedTrade.entryDate),
    isClosed: selectedTrade?.isClosed,
    exitValue: String(selectedTrade?.exitValue),
    exitTime: { hours: exitHour, minutes: exitMinute },
    exitDate: selectedTrade && new Date(selectedTrade.exitDate),
    notes: selectedTrade?.notes,
  });

  // entry date modal functions
  const [openEntryDate, setOpenEntryDate] = useState(false);
  const onDismissSingleEntryDate = useCallback(() => {
    setOpenEntryDate(false);
  }, [setOpenEntryDate]);

  const onConfirmSingleEntryDate = useCallback(
    (params: any) => {
      setOpenEntryDate(false);
      setEntryDate(params.date);
    },
    [setOpenEntryDate, setEntryDate]
  );

  // entry time functions
  const [visibleEntryTime, setVisibleEntryTime] = useState(false);
  const onDismissEntryTime = useCallback(() => {
    setVisibleEntryTime(false);
  }, [setVisibleEntryTime]);

  const onConfirmEntryTime = useCallback(
    ({ hours, minutes }: TType) => {
      setVisibleEntryTime(false);
      setEntryTime({ hours, minutes });
    },
    [setVisibleEntryTime]
  );

  // exit date modal functions
  const [openExitDate, setOpenExitDate] = useState(false);
  const onDismissSingleExitDate = useCallback(() => {
    setOpenExitDate(false);
  }, [setOpenExitDate]);

  const onConfirmSingleExitDate = useCallback(
    (params: any) => {
      setOpenExitDate(false);
      setExitDate(params.date);
    },
    [setOpenExitDate, setExitDate]
  );

  // exit time functions
  const [visibleExitTime, setVisibleExitTime] = useState(false);
  const onDismissExitTime = useCallback(() => {
    setVisibleExitTime(false);
  }, [setVisibleExitTime]);

  const onConfirmExitTime = useCallback(
    ({ hours, minutes }: TType) => {
      setVisibleExitTime(false);
      setExitTime({ hours, minutes });
    },
    [setVisibleExitTime]
  );

  // buttons handles
  const handleClickLongButton = () => {
    setIsLongButton(true);
    setTradeForm({ ...tradeForm, isLong: true });
  };
  const handleClickShortButton = () => {
    setIsLongButton(false);
    setTradeForm({ ...tradeForm, isLong: false });
  };

  const handleClickClosedTrade = () => {
    setIsTradeClosed(true);
    setTradeForm({ ...tradeForm, isClosed: true });
  };

  const handleClickOpenTrade = () => {
    setIsTradeClosed(false);

    //set exitdate and time to null
    setTradeForm({
      ...tradeForm,
      exitDate: undefined,
      exitTime: undefined,
      isClosed: false,
      exitValue: undefined,
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      assetName: selectedTrade?.assetName,
      entryValue: selectedTrade?.entryValue,
      positionSize: selectedTrade?.positionSize,
      exitValue: selectedTrade?.exitValue,
      notes: selectedTrade?.notes,
    },
  });

  // envia os dados para a store e volta para a tela do diário
  const onSubmit = (data: FormData) => {
    setTradeForm({
      ...tradeForm,
      ...data,
      entryDate,
      entryTime: entryTime.hours === -1 ? undefined : `${entryTime.hours}:${entryTime.minutes}`,
      exitValue: isTradeClosed === false ? undefined : data.exitValue,
      exitDate,
      exitTime: exitTime.hours === -1 ? undefined : `${exitTime.hours}:${exitTime.minutes}`,
    });

    dispatch(
      updateTradeOnJournal({
        ...tradeForm,
        ...data,
        entryDate,
        entryTime: entryTime.hours === -1 ? undefined : `${entryTime.hours}:${entryTime.minutes}`,
        exitValue: isTradeClosed === false ? undefined : data.exitValue,
        exitDate,
        exitTime: exitTime.hours === -1 ? undefined : `${exitTime.hours}:${exitTime.minutes}`,
      })
    );

    navigation.goBack();
  };

  const onDelete = () => {
    dispatch(deleteSingleTradeFromJournal(selectedTradeID));
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };

  const fixValue = (value: any) => {
    if (value === undefined) {
      return null;
    }
    return value;
  };

  const renderClosedTradeInputs = () => {
    if (tradeForm.asset === "win") {
      return (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            // <TextInputMask
            //   style={styles.input}
            //   type="money"
            //   options={{
            //     maskType: "BRL",
            //     precision: 0,
            //     separator: ",",
            //     delimiter: ".",
            //     unit: "",
            //   }}
            //   placeholder="ex.: 120.025"
            //   placeholderTextColor={theme.textGray}
            //   keyboardType="numeric"
            //   onBlur={onBlur}
            //   onChangeText={onChange}
            //   value={String(value)}
            // />
            <CurrencyInput
              style={styles.input}
              precision={0}
              separator=","
              delimiter="."
              prefix=""
              placeholder="ex.: 120.025"
              placeholderTextColor={theme.textGray}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(formattedValue) => {
                setTradeForm({ ...tradeForm, exitValue: formattedValue });
              }}
              onChangeValue={onChange}
              value={fixValue(value)}
            />
          )}
          name="exitValue"
          rules={{
            required: {
              value: true,
              message: "Insira o preço do saída",
            },
          }}
        />
      );
    }

    return (
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          // <NbtTextInput
          //   style={styles.input}
          //   placeholder="ex.: 120,20"
          //   placeholderTextColor={theme.textGray}
          //   keyboardType="numeric"
          //   onBlur={onBlur}
          //   onChangeText={onChange}
          //   value={String(value)}
          // />
          <CurrencyInput
            style={styles.input}
            precision={2}
            separator=","
            delimiter="."
            prefix=""
            placeholder="ex.: 120,00"
            placeholderTextColor={theme.textGray}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(formattedValue) => {
              setTradeForm({ ...tradeForm, exitValue: formattedValue });
            }}
            onChangeValue={onChange}
            value={fixValue(value)}
          />
        )}
        name="exitValue"
        rules={{
          required: {
            value: true,
            message: "Insira o preço do saída",
          },
        }}
      />
    );
  };

  // data from the form to setup a new trade to the journal

  return (
    <MainContainer>
      <AbsoluteBgHeader />
      {/* <View style={{ height: 35 }} /> */}
      <GoBackNav />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title style={styles.headerTop}>Editar</Title>
        <Title style={styles.headerBottom}>Trade</Title>

        <Container style={styles.xview}>
          <View style={styles.xview2}>
            <Paragraph style={styles.pTitle}>Selecione o ativo</Paragraph>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Paragraph style={{ fontSize: 16 }}>Excluir</Paragraph>
              <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* HEADER: ASSET */}
          <View>
            <Picker
              selectedValue={selectedAsset}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedAsset(itemValue);
                setTradeForm({ ...tradeForm, asset: itemValue });
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

            {/* HEADER: ASSET NAME */}
            {selectedAsset === "acao" || selectedAsset === "cripto" ? (
              <>
                <Paragraph style={{ marginTop: 20 }}>Nome do ativo</Paragraph>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <NbtTextInput
                      style={styles.input}
                      placeholder={selectedAsset === "acao" ? "ex.: PETR4" : "ex.: BTCUSDT"}
                      placeholderTextColor={theme.textGray}
                      autoCapitalize="characters"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="assetName"
                  rules={{
                    required: {
                      value: true,
                      message: "Insira o nome do ativo",
                    },
                  }}
                />

                {errors.assetName && (
                  <Paragraph style={styles.error}>{errors.assetName?.message}</Paragraph>
                )}
              </>
            ) : (
              ""
            )}
          </View>

          {selectedAsset ? (
            <>
              <Paragraph style={styles.pTitle}>Dados de entrada</Paragraph>

              {/* HEADER: LONG OR SHORT */}
              <XView style={styles.xview}>
                <TouchableOpacity
                  style={isLongButton === true ? styles.longButton : styles.disabledButton}
                  onPress={handleClickLongButton}
                >
                  <Paragraph>Long</Paragraph>
                </TouchableOpacity>

                <TouchableOpacity
                  style={isLongButton === false ? styles.shortButton : styles.disabledButton}
                  onPress={handleClickShortButton}
                >
                  <Paragraph>Short</Paragraph>
                </TouchableOpacity>
              </XView>

              {/* HEADER: ENTRY VALUE */}
              <XView style={styles.xview}>
                <View style={styles.inputView}>
                  <Paragraph>Valor de entrada</Paragraph>
                  {selectedAsset === "win" ? (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // <TextInputMask
                        //   style={styles.input}
                        //   type="money"
                        //   options={{
                        //     maskType: "BRL",
                        //     precision: 0,
                        //     separator: ",",
                        //     delimiter: ".",
                        //     unit: "",
                        //   }}
                        //   placeholder="ex.: 120.350"
                        //   placeholderTextColor={theme.textGray}
                        //   keyboardType="numeric"
                        //   onBlur={onBlur}
                        //   onChangeText={onChange}
                        //   value={String(value)}
                        // />
                        <CurrencyInput
                          style={styles.input}
                          precision={0}
                          separator=","
                          delimiter="."
                          prefix=""
                          placeholder="ex.: 120.350"
                          placeholderTextColor={theme.textGray}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(formattedValue) => {
                            setTradeForm({ ...tradeForm, entryValue: formattedValue });
                          }}
                          onChangeValue={onChange}
                          value={fixValue(value)}
                        />
                      )}
                      name="entryValue"
                      rules={{
                        required: {
                          value: true,
                          message: "Insira o preço de entrada",
                        },
                      }}
                    />
                  ) : (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // <TextInputMask
                        //   style={styles.input}
                        //   type="money"
                        //   options={{
                        //     maskType: "BRL",
                        //     precision: 0,
                        //     separator: ",",
                        //     delimiter: ".",
                        //     unit: "",
                        //   }}
                        //   placeholder="ex.: 120,00"
                        //   placeholderTextColor={theme.textGray}
                        //   keyboardType="numeric"
                        //   onBlur={onBlur}
                        //   onChangeText={onChange}
                        //   value={String(value)}
                        // />
                        <CurrencyInput
                          style={styles.input}
                          precision={2}
                          separator=","
                          delimiter="."
                          prefix=""
                          placeholder="ex.: 120,00"
                          placeholderTextColor={theme.textGray}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(formattedValue) => {
                            setTradeForm({ ...tradeForm, entryValue: formattedValue });
                          }}
                          onChangeValue={onChange}
                          value={fixValue(value)}
                        />
                      )}
                      name="entryValue"
                      rules={{
                        required: {
                          value: true,
                          message: "Insira o preço de entrada",
                        },
                      }}
                    />
                  )}
                  {errors.entryValue && (
                    <Paragraph style={styles.error}>{errors.entryValue?.message}</Paragraph>
                  )}
                </View>
              </XView>

              {/* HEADER: POSITION SIZE AND TIMEFRAME */}
              <XView style={styles.xview}>
                {/* HEADER: POSITION SIZE */}
                <View style={styles.inputView}>
                  <Paragraph>Tamanho da posição</Paragraph>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      // <TextInputMask
                      //   type="money"
                      //   options={{
                      //     maskType: "BRL",
                      //     precision: 0,
                      //     separator: ",",
                      //     delimiter: ".",
                      //     unit: "",
                      //   }}
                      //   style={styles.input}
                      //   placeholder="ex.: 50"
                      //   placeholderTextColor={theme.textGray}
                      //   keyboardType="numeric"
                      //   onBlur={onBlur}
                      //   onChangeText={onChange}
                      //   value={String(value)}
                      // />
                      <CurrencyInput
                        style={styles.input}
                        precision={0}
                        separator=","
                        delimiter="."
                        prefix=""
                        placeholder="ex.: 10"
                        placeholderTextColor={theme.textGray}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={(formattedValue) => {
                          setTradeForm({ ...tradeForm, positionSize: formattedValue });
                        }}
                        onChangeValue={onChange}
                        value={fixValue(value)}
                      />
                    )}
                    name="positionSize"
                    rules={{
                      required: {
                        value: true,
                        message: "Insira o tamanho da posição",
                      },
                    }}
                  />

                  {errors.positionSize && (
                    <Paragraph style={styles.error}>{errors.positionSize?.message}</Paragraph>
                  )}
                </View>

                <View style={styles.inputView}>
                  <Paragraph>Timeframe</Paragraph>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <NbtTextInput
                        style={styles.input}
                        placeholder="ex.: 15 min"
                        placeholderTextColor={theme.textGray}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="timeframe"
                    rules={{
                      required: {
                        value: false,
                        message: "Insira o timeframe",
                      },
                    }}
                  />

                  {errors.positionSize && (
                    <Paragraph style={styles.error}>{errors.positionSize?.message}</Paragraph>
                  )}
                </View>
              </XView>

              {/* HEADER: TAKE PROFIT */}
              <XView style={styles.xview}>
                <View style={styles.inputView}>
                  <Paragraph>Take Profit (alvo)</Paragraph>
                  {selectedAsset === "win" ? (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // <TextInputMask
                        //   style={styles.input}
                        //   type="money"
                        //   options={{
                        //     maskType: "BRL",
                        //     precision: 0,
                        //     separator: ",",
                        //     delimiter: ".",
                        //     unit: "",
                        //   }}
                        //   placeholder="ex.: 120.715"
                        //   placeholderTextColor={theme.textGray}
                        //   keyboardType="numeric"
                        //   onBlur={onBlur}
                        //   onChangeText={onChange}
                        //   value={value}
                        // />
                        <CurrencyInput
                          style={styles.input}
                          precision={0}
                          separator=","
                          delimiter="."
                          prefix=""
                          placeholder="ex.: 120.715"
                          placeholderTextColor={theme.textGray}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(formattedValue) => {
                            setTradeForm({ ...tradeForm, takeProfit: formattedValue });
                          }}
                          onChangeValue={onChange}
                          value={fixValue(value)}
                        />
                      )}
                      name="takeProfit"
                      rules={{
                        required: {
                          value: false,
                          message: "Insira o preço do take profit (alvo)",
                        },
                      }}
                    />
                  ) : (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // <NbtTextInput
                        //   style={styles.input}
                        //   placeholder="ex.: 120,50"
                        //   placeholderTextColor={theme.textGray}
                        //   keyboardType="numeric"
                        //   onBlur={onBlur}
                        //   onChangeText={onChange}
                        //   value={value}
                        // />
                        <CurrencyInput
                          style={styles.input}
                          precision={2}
                          separator=","
                          delimiter="."
                          prefix=""
                          placeholder="ex.: 120,50"
                          placeholderTextColor={theme.textGray}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(formattedValue) => {
                            setTradeForm({ ...tradeForm, takeProfit: formattedValue });
                          }}
                          onChangeValue={onChange}
                          value={fixValue(value)}
                        />
                      )}
                      name="takeProfit"
                      rules={{
                        required: {
                          value: false,
                          message: "Insira o preço do take profit (alvo)",
                        },
                      }}
                    />
                  )}
                  {errors.takeProfit && (
                    <Paragraph style={styles.warn}>{errors.takeProfit?.message}</Paragraph>
                  )}
                </View>

                {/* HEADER: STOP LOSS */}
                <View style={styles.inputView}>
                  <Paragraph>Stop loss</Paragraph>
                  {selectedAsset === "win" ? (
                    <>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          // <TextInputMask
                          //   style={styles.input}
                          //   type="money"
                          //   options={{
                          //     maskType: "BRL",
                          //     precision: 0,
                          //     separator: ",",
                          //     delimiter: ".",
                          //     unit: "",
                          //   }}
                          //   placeholder="ex.: 120.025"
                          //   placeholderTextColor={theme.textGray}
                          //   keyboardType="numeric"
                          //   onBlur={onBlur}
                          //   onChangeText={onChange}
                          //   value={value}
                          // />
                          <CurrencyInput
                            style={styles.input}
                            precision={0}
                            separator=","
                            delimiter="."
                            prefix=""
                            placeholder="ex.: 120.025"
                            placeholderTextColor={theme.textGray}
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={(formattedValue) => {
                              setTradeForm({ ...tradeForm, exitValue: formattedValue });
                            }}
                            onChangeValue={onChange}
                            value={fixValue(value)}
                          />
                        )}
                        name="stopLoss"
                        rules={{
                          required: {
                            value: false,
                            message: "Insira o preço do stop loss",
                          },
                        }}
                      />
                    </>
                  ) : (
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // <NbtTextInput
                        //   style={styles.input}
                        //   placeholder="ex.: 120,00"
                        //   placeholderTextColor={theme.textGray}
                        //   keyboardType="numeric"
                        //   onBlur={onBlur}
                        //   onChangeText={onChange}
                        //   value={value}
                        // />
                        <CurrencyInput
                          style={styles.input}
                          precision={2}
                          separator=","
                          delimiter="."
                          prefix=""
                          placeholder="ex.: 120,00"
                          placeholderTextColor={theme.textGray}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={(formattedValue) => {
                            setTradeForm({ ...tradeForm, stopLoss: formattedValue });
                          }}
                          onChangeValue={onChange}
                          value={fixValue(value)}
                        />
                      )}
                      name="stopLoss"
                      rules={{
                        required: {
                          value: false,
                          message: "Insira o preço do stop loss",
                        },
                      }}
                    />
                  )}
                  {errors.stopLoss && (
                    <Paragraph style={styles.warn}>{errors.stopLoss?.message}</Paragraph>
                  )}
                </View>
              </XView>

              {/* HEADER: ENTRY DATE & TIME */}
              <XView style={styles.xview}>
                <View style={styles.inputView}>
                  {/* TODO: DATA E HORA DE ENTRADA */}
                  <Paragraph>Hora da entrada</Paragraph>

                  <TimePlaceholder time={entryTime} timePicker={() => setVisibleEntryTime(true)} />
                  <TimePickerModal
                    visible={visibleEntryTime}
                    onDismiss={onDismissEntryTime}
                    onConfirm={onConfirmEntryTime}
                    hours={12}
                    minutes={14}
                    use24HourClock
                    cancelLabel="Cancelar"
                    label="Hora de entrada"
                  />
                </View>
                <View style={styles.inputView}>
                  <Paragraph>Data da entrada</Paragraph>

                  <DatePlaceholder date={entryDate} datePicker={() => setOpenEntryDate(true)} />
                  <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={openEntryDate}
                    onDismiss={onDismissSingleEntryDate}
                    date={entryDate}
                    onConfirm={onConfirmSingleEntryDate}
                  />
                </View>
              </XView>

              {/* HEADER: EXIT DATA */}

              <View>
                {/* HEADER: IS TRADE CLOSED? */}

                <Paragraph style={{ marginBottom: 20 }}>Status do trade</Paragraph>
                <XView style={styles.xview}>
                  <TouchableOpacity
                    style={isTradeClosed === false ? styles.shortButton : styles.disabledButton}
                    onPress={handleClickOpenTrade}
                  >
                    <Paragraph>Em aberto</Paragraph>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={isTradeClosed === true ? styles.longButton : styles.disabledButton}
                    onPress={handleClickClosedTrade}
                  >
                    <Paragraph>Concluído</Paragraph>
                  </TouchableOpacity>
                </XView>

                {isTradeClosed ? (
                  <>
                    <Paragraph style={[styles.pTitle, { marginBottom: 20 }]}>
                      Dados de saída
                    </Paragraph>

                    <Paragraph>Valor de saída</Paragraph>
                    {renderClosedTradeInputs()}
                    <XView style={[styles.xview, { marginTop: 20 }]}>
                      <View style={styles.inputView}>
                        <Paragraph>Hora da saída</Paragraph>
                        <TimePlaceholder
                          time={exitTime}
                          timePicker={() => setVisibleExitTime(true)}
                        />
                        <TimePickerModal
                          visible={visibleExitTime}
                          onDismiss={onDismissExitTime}
                          onConfirm={onConfirmExitTime}
                          hours={12}
                          minutes={14}
                          use24HourClock
                          cancelLabel="Cancelar"
                          label="Hora de saída"
                        />
                      </View>
                      <View style={styles.inputView}>
                        <Paragraph>Data da saída</Paragraph>

                        <DatePlaceholder date={exitDate} datePicker={() => setOpenExitDate(true)} />
                        <DatePickerModal
                          locale="pt"
                          mode="single"
                          visible={openExitDate}
                          onDismiss={onDismissSingleExitDate}
                          date={exitDate}
                          onConfirm={onConfirmSingleExitDate}
                        />
                      </View>
                    </XView>
                  </>
                ) : (
                  ""
                )}
              </View>

              {/* HEADER: NOTES */}
              <View>
                <Paragraph style={styles.pTitle}>Anotações</Paragraph>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <NbtTextInput
                      style={styles.notes}
                      placeholder="ex.: Dados relevantes para a entrada e saída"
                      multiline
                      numberOfLines={6}
                      placeholderTextColor={theme.textGray}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="notes"
                  rules={{
                    required: {
                      value: false,
                      message: "Insira o preço do saída",
                    },
                  }}
                />
              </View>
            </>
          ) : (
            ""
          )}
        </Container>
        <Button title="Salvar alterações" onPressButton={handleSubmit(onSubmit)} />
      </ScrollView>
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
  inputView: {
    flex: 1,
  },
  xview: {
    gap: 25,
  },
  xview2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  pTitle: {
    fontSize: 22,
    marginBottom: -15,
    color: theme.green,
  },
  pOpacity: {
    opacity: 0.5,
  },
  disabledButton: {
    backgroundColor: theme.bgLighter,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
  },
  longButton: {
    backgroundColor: theme.green,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
  },
  shortButton: {
    backgroundColor: theme.red,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
  },
  pickerItem: {
    color: "gray",
    backgroundColor: "#2A3247",
  },
  selectedPickerItem: {
    color: "#fff",
    backgroundColor: theme.bgLighter,
  },
  notes: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  input: {
    borderBottomColor: theme.text,
    borderBottomWidth: 1,
    color: theme.text,
    fontSize: 18,
  },
  error: {
    color: theme.red,
  },
  warn: {
    color: theme.warn,
  },
});

export default EditTradeJournalScreen;
