// REGULAR IMPORTS
import { StyleSheet, TextInput, View } from "react-native";
import { useState, createRef, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { TextInputMask } from "react-native-masked-text";

// CUSTOM IMPORTS
import { Container, Paragraph, theme } from "../../styles/styles";
import { STextInput } from "../../screens/Backtest/backtestScreenStyle";
// import TradingButton from "../Buttons/TradingButton";
import CurrencyInput from "react-native-currency-input";

// REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { Trade } from "../../classes/tradeClass";
import { placeTrade } from "../../redux/tradesFromBacktestsSlice";
import { RootState } from "../../redux/store";
import TradingButton from "../Buttons/TradingButton";

interface IAddTradingItem {
  positionSize: number;
  asset: string;
}

const AddTradingItem = ({ positionSize, asset }: IAddTradingItem) => {
  const dispatch = useDispatch();
  const sTextInputRef = createRef<TextInput>();
  useEffect(() => {
    sTextInputRef.current?.focus();
  }, []);

  const selectedBacktest = useSelector((state: RootState) => state.selectBacktest);
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  // const entryValue = Number(entry.replace(".", "").replace(",", ".")).toFixed(2);
  // const exitValue = Number(exit.replace(".", "").replace(",", ".")).toFixed(2);

  const clearFormValues = () => {
    setEntry("");
    setExit("");
  };

  const sendBuyOrder = () => {
    const newTrade = new Trade(
      selectedBacktest,
      Number(entry),
      Number(exit),
      true,
      positionSize,
      asset
    );

    sTextInputRef.current?.focus();
    dispatch(placeTrade({ ...newTrade }));
    clearFormValues();
  };

  const sendSellOrder = () => {
    const newTrade = new Trade(
      selectedBacktest,
      Number(entry),
      Number(exit),
      false,
      positionSize,
      asset
    );
    sTextInputRef.current?.focus();
    dispatch(placeTrade({ ...newTrade }));
    clearFormValues();
  };

  const fixValue = (value: any) => {
    if (value === undefined || value === null) {
      return "";
    }
    return value;
  };

  return (
    <Container style={{ flexDirection: "row", alignItems: "center" }}>
      <Paragraph>+</Paragraph>
      <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
        {asset === "win" ? (
          // <TextInputMask
          //   style={styles.input}
          //   placeholder="Entrada"
          //   placeholderTextColor="#aaa"
          //   keyboardType="numeric"
          //   type="money"
          //   options={{
          //     maskType: "BRL",
          //     precision: 0,
          //     separator: ",",
          //     delimiter: ".",
          //     unit: "",
          //   }}
          //   value={String(entry)}
          //   onChangeText={(value) => setEntry(value)}
          // />
          <CurrencyInput
            style={styles.input}
            ref={sTextInputRef}
            precision={0}
            separator=","
            delimiter="."
            prefix=""
            placeholder="Entrada"
            placeholderTextColor={theme.textGray}
            keyboardType="numeric"
            // onChangeText={(formattedValue) => console.log(formattedValue)}
            onChangeValue={(value) => setEntry(value)}
            value={fixValue(entry)}
          />
        ) : (
          // <STextInput
          //   ref={sTextInputRef}
          //   keyboardType="numeric"
          //   placeholder="Entrada"
          //   placeholderTextColor="#aaa"
          //   value={String(entry)}
          //   onChangeText={(value) => setEntry(value)}
          // />
          <CurrencyInput
            style={styles.input}
            ref={sTextInputRef}
            precision={0}
            separator=","
            delimiter="."
            prefix=""
            placeholder="Entrada"
            placeholderTextColor={theme.textGray}
            keyboardType="numeric"
            // onChangeText={(value) => handleFormContent("entry", value)}
            onChangeValue={(value) => setEntry(value)}
            value={fixValue(entry)}
          />
        )}

        {asset === "win" ? (
          // <TextInputMask
          //   style={styles.input}
          //   placeholder="Saída"
          //   placeholderTextColor="#aaa"
          //   keyboardType="numeric"
          //   type="money"
          //   options={{
          //     maskType: "BRL",
          //     precision: 0,
          //     separator: ",",
          //     delimiter: ".",
          //     unit: "",
          //   }}
          //   value={String(exit)}
          //   onChangeText={(value) => setExit(value)}
          // />
          <CurrencyInput
            style={styles.input}
            // ref={sTextInputRef}
            precision={0}
            separator=","
            delimiter="."
            prefix=""
            placeholder="Saída"
            placeholderTextColor={theme.textGray}
            keyboardType="numeric"
            // onChangeText={(value) => handleFormContent("entry", value)}
            onChangeValue={(value) => setExit(value)}
            value={fixValue(exit)}
          />
        ) : (
          // <STextInput
          //   ref={sTextInputRef}
          //   keyboardType="numeric"
          //   placeholder="Saída"
          //   placeholderTextColor="#aaa"
          //   value={String(exit)}
          //   onChangeText={(value) => setExit(value)}
          // />
          <CurrencyInput
            style={styles.input}
            // ref={sTextInputRef}
            precision={2}
            separator=","
            delimiter="."
            prefix=""
            placeholder="Saída"
            placeholderTextColor={theme.textGray}
            keyboardType="numeric"
            // onChangeText={(value) => handleFormContent("entry", value)}
            onChangeValue={(value) => setExit(value)}
            value={fixValue(exit)}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <TouchableOpacity onPress={sendBuyOrder}>
          <TradingButton isBuy={true} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendSellOrder}>
          <TradingButton isBuy={false} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: theme.text,
    padding: 5,
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 5,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default AddTradingItem;
