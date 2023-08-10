import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Container, Paragraph, theme } from "../../styles/styles";

interface ITradeJournalListItem {
  asset: string;
  assetName: String | undefined;
  result: number;
  index: number;
  tradeId: string;
  openEditScreen: (tradeId: string) => void;
  // journalId: string;
  // finalBalance?: number;
  isClosed: boolean;
}

const TradeJournalListItem = ({
  asset,
  assetName,
  result,
  index,
  tradeId,
  openEditScreen,
  isClosed,
}: ITradeJournalListItem) => {
  const numberResult = Number(result?.toFixed(2));
  const normalizedResult = numberResult.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <TouchableOpacity onPress={() => openEditScreen(tradeId)}>
      <Container>
        <View style={styles.xView}>
          <View style={[styles.xView, styles.leftView]}>
            <Paragraph>{index + 1}</Paragraph>

            <View>
              <Paragraph style={styles.bold}>
                {asset === "win" || asset == "wdo" ? asset.toUpperCase() : assetName?.toUpperCase()}
              </Paragraph>
            </View>

            {isClosed ? (
              <Paragraph style={styles.positivo}>Concluído</Paragraph>
            ) : (
              <Paragraph style={styles.negativo}>Em aberto</Paragraph>
            )}
          </View>
          <View style={styles.resultView}>
            {result > 0 ? (
              <Paragraph style={styles.positivo}>+{normalizedResult}</Paragraph>
            ) : (
              <Paragraph style={styles.negativo}>{normalizedResult}</Paragraph>
            )}
          </View>
        </View>
      </Container>
    </TouchableOpacity>
  );
};

export default TradeJournalListItem;

const styles = StyleSheet.create({
  numberView: {
    padding: 5,
  },
  leftView: {
    flex: 1,
  },
  xView: {
    flexDirection: "row",
    gap: 15,
  },
  resultView: {},
  positivo: {
    fontWeight: "bold",
    color: theme.green,
  },
  negativo: {
    color: theme.red,
  },
  bold: {
    fontWeight: "bold",
  },
});
