import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Container, Paragraph, Title, theme } from "../../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { XView } from "../../screens/Home/HomeScreenStyle";

interface ITradeJournalCover {
  title: string;
  openEditJournalModal: (journalId: string) => void;
  journalId: string;
  initialBalance: number;
}

const TradeJournalCover = ({
  title,
  openEditJournalModal,
  journalId,
  initialBalance,
}: ITradeJournalCover) => {
  const dispatch = useDispatch();

  const allTrades = useSelector((state: RootState) => state.tradesFromJournal);
  const tradesFromJournal = allTrades.filter((trades) => trades.journalId === journalId);

  const balance = tradesFromJournal.reduce((acc, sum) => {
    return acc + sum.result;
  }, 0);

  const finalBalance = initialBalance + balance;

  return (
    <Container style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.centerView}>
          <Title>{title}</Title>
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={() => openEditJournalModal(journalId)}>
          <MaterialCommunityIcons name="lead-pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={balance >= 0 ? styles.dividerPositive : styles.dividerNegative}></View>

      <XView style={styles.bigXview}>
        <View>
          <Paragraph style={styles.resultHeader}>saldo total</Paragraph>
          <Paragraph style={styles.result}>
            {finalBalance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Paragraph>
        </View>
        <View>
          <Paragraph style={styles.resultHeader}>$ lucro</Paragraph>
          <Paragraph style={styles.result}>
            {balance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Paragraph>
        </View>
        <View>
          <Paragraph style={styles.resultHeader}>% lucro</Paragraph>

          <Paragraph style={balance >= 0 ? styles.positive : styles.negative}>
            {balance === 0 ? 0 : (finalBalance / initialBalance)?.toFixed(2)}%
          </Paragraph>
        </View>
      </XView>
    </Container>
  );
};

export default TradeJournalCover;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flexDirection: "row",
    padding: 50,
  },
  closeBtn: {
    padding: 10,
    backgroundColor: theme.bgLighter,

    borderRadius: 5,
  },
  topView: {
    flexDirection: "row",
    flex: 1,
  },
  dividerPositive: {
    width: "100%",
    height: 2,
    marginVertical: 10,
    backgroundColor: theme.green,
  },
  dividerNegative: {
    width: "100%",
    height: 2,
    marginVertical: 10,
    backgroundColor: theme.red,
  },
  centerView: {
    justifyContent: "center",
    flex: 1,
  },
  bigXview: {
    justifyContent: "space-between",
    paddingRight: 50,
  },
  xview: {
    flexDirection: "row",
    gap: 10,
  },
  addTradeBtn: {
    backgroundColor: theme.green,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  resultHeader: {
    opacity: 0.5,
  },
  result: {
    fontSize: 18,
  },
  positive: {
    color: theme.green,
    fontSize: 18,
  },
  negative: {
    color: theme.red,
    fontSize: 18,
  },
});
