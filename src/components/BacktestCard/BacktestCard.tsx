import { TouchableOpacity } from "react-native-gesture-handler";
import { Container, Title, Infos, Paragraph, theme, ParagraphDark } from "../../styles/styles";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tag } from "../../screens/Backtest/backtestScreenStyle";

interface IBackTestCard {
  strategyName: string;
  asset: string;
  backtestId: string;
  index: number;
  openStrategyModal: (id: string) => void;
  openResults: (id: string) => void;
}

const BackTestCard = ({
  strategyName,
  asset,
  openStrategyModal,
  backtestId,
  openResults,
  index,
}: IBackTestCard) => {
  return (
    <Container style={{ position: "relative" }}>
      <Text
        style={{
          position: "absolute",
          top: -30,
          right: 0,
          fontSize: 130,
          fontWeight: "bold",
          letterSpacing: -5,
          color: theme.bg,
          // alignSelf: "flex-end",
        }}
      >
        {index + 1}
      </Text>
      <View style={{ flexDirection: "row", marginBottom: -10 }}>
        <Title style={{ flex: 10 }}>{strategyName}</Title>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => openStrategyModal(backtestId)}
        >
          <MaterialCommunityIcons name="pencil" size={18} color={theme.text} />
        </TouchableOpacity>
      </View>
      <Infos>
        <Paragraph>{asset}</Paragraph>
      </Infos>
      <TouchableOpacity onPress={() => openResults(backtestId)}>
        <Tag
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "flex-end",
            justifyContent: "center",
            width: 130,
            backgroundColor: theme.green,
          }}
        >
          <ParagraphDark style={{ fontSize: 14, fontWeight: "400" }}>ver resultados</ParagraphDark>
          <MaterialCommunityIcons name="eye-outline" size={16} color={theme.bg} />
        </Tag>
      </TouchableOpacity>
    </Container>
  );
};

export default BackTestCard;
