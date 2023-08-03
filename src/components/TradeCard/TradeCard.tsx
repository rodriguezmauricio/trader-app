import { View, StyleSheet } from "react-native";
import React from "react";
import { Container, Paragraph, theme } from "../../styles/styles";
import { XView } from "../../screens/Home/HomeScreenStyle";
import { SubTag } from "../../screens/Backtest/backtestScreenStyle";

const TradeCard = () => {
  return (
    <Container>
      <XView style={{ alignItems: "center" }}>
        <View style={styles.topDiv}>
          <Paragraph style={{ fontSize: 22 }}>BTCUSDT</Paragraph>
        </View>

        <View style={styles.topDiv}>
          <Paragraph>03/07/2023</Paragraph>
          <SubTag style={styles.subtag}>
            <Paragraph>Long</Paragraph>
          </SubTag>
        </View>
      </XView>

      <View style={{ height: 1, width: "100%", backgroundColor: "#888" }} />

      <XView style={{ justifyContent: "space-between" }}>
        <View style={styles.yview}>
          <Paragraph>120</Paragraph>
          <Paragraph style={styles.label}>qtd</Paragraph>
        </View>
        <View style={styles.yview}>
          <Paragraph>110.250</Paragraph>
          <Paragraph style={styles.label}>entrada</Paragraph>
        </View>
        <View style={styles.yview}>
          <Paragraph>110.370</Paragraph>
          <Paragraph style={styles.label}>saída</Paragraph>
        </View>
        <View style={styles.yview}>
          <Paragraph>+ R$120,00</Paragraph>
          <Paragraph style={styles.label}>Profit/Loss</Paragraph>
        </View>
      </XView>
    </Container>
  );
};

const styles = StyleSheet.create({
  topDiv: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: {
    opacity: 0.5,
  },
  yview: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtag: {
    backgroundColor: theme.darkGreen,
  },
});

export default TradeCard;
