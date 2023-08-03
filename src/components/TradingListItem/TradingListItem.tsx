import { View, TouchableOpacity } from "react-native";

import { Container, Paragraph } from "../../styles/styles";
import TradingTypeTag from "../TradingTypeTag/TradingTypeTag";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLong } from "../../redux/tradesFromBacktestsSlice";
import { RootState } from "../../redux/store";

interface ITradingListItemProps {
  entry: number;
  exit: number;
  isLong: boolean;
  index: number;
  result: number;
  points: number;
  tradeId: string;
  openEditModal: (id: string) => void;
  asset: string;
}

const TradingListItem = ({
  entry,
  exit,
  isLong,
  index,
  result,
  points,
  tradeId,
  openEditModal,
  asset,
}: ITradingListItemProps) => {
  const dispatch = useDispatch();

  // encontra o trade selecionado
  const allTrades = useSelector((state: RootState) => state.tradesFromBacktests);
  const selectedTrade = allTrades.find((trade) => trade.tradeId === tradeId);

  // troca e recalcula a posição para short ou long
  const changeIsLong = () => {
    const updatedIsLong = selectedTrade && !selectedTrade.isLong;
    dispatch(updateIsLong({ ...selectedTrade, isLong: updatedIsLong }));
  };

  // renderiza o valor de entrada e saída formatado de acordo com o tipo de ativo
  const renderEntryExitValue = (entryExit: number) => {
    if (asset === "acao") {
      return String(Number(entryExit).toLocaleString("pt-BR"));
    } else if (asset === "cripto") {
      return String(Number(entryExit).toLocaleString("pt-BR"));
    } else if (asset === "win") {
      return String(Number(entryExit).toLocaleString("pt-BR"));
    } else if (asset === "wdo") {
      return String(Number(entryExit).toLocaleString("pt-BR"));
    }
  };

  return (
    <Container>
      <TouchableOpacity
        onPress={() => openEditModal(tradeId)}
        style={{ flexDirection: "row", alignItems: "center", position: "relative" }}
      >
        {/* SECTION: INFOS DO TRADE BEGIN */}
        <Paragraph>{index + 1}</Paragraph>
        <View
          // onPress={() => openEditModal(tradeId)}
          style={{
            flexDirection: "row",
            flex: 5,
            justifyContent: "space-around",
          }}
        >
          <Paragraph>{renderEntryExitValue(entry)}</Paragraph>
          <Paragraph>{renderEntryExitValue(exit)}</Paragraph>
        </View>
        {/* SECTION: INFOS DO TRADE END*/}

        {/* SECTION: RESULTADOS BEGIN */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
            flex: 4,
          }}
        >
          <TouchableOpacity onPress={changeIsLong}>
            <TradingTypeTag isLong={isLong} />
          </TouchableOpacity>

          <View style={{ alignItems: "flex-end" }}>
            <Paragraph>
              {Number(result).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {" "}
              {Number(points).toLocaleString("pt-BR")} pts
            </Paragraph>
          </View>
        </View>
        {/* SECTION: RESULTADOS END */}
      </TouchableOpacity>
    </Container>
  );
};

export default TradingListItem;
