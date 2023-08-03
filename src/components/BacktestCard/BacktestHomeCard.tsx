import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Title,
  Infos,
  Paragraph,
  theme,
  ParagraphDark,
  ContainerBTHome,
} from "../../styles/styles";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tag } from "../../screens/Backtest/backtestScreenStyle";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootTabParamsList } from "../../routes/RootRoutes";

interface IBackTestCard {
  strategyName: string | undefined;
  asset: string | undefined;
  backtestId?: string;
  openResults: () => void;
}

type Props = StackNavigationProp<RootTabParamsList, "Backtests">;

const BackTestHomeCard = ({ strategyName, asset, openResults }: IBackTestCard) => {
  const navigation = useNavigation<Props>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Backtests", { screen: "MyBacktests" });
        setTimeout(() => {
          navigation.navigate("Backtests", { screen: "SingleBacktest" });
        }, 100);
      }}
    >
      <ContainerBTHome>
        <View style={{ flexDirection: "row", marginBottom: -10 }}>
          <Title style={{ flex: 10 }}>{strategyName}</Title>
        </View>
        <Infos>
          <Paragraph>{asset}</Paragraph>
        </Infos>
        <TouchableOpacity
          onPress={() => {
            openResults();
          }}
        >
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
            <ParagraphDark style={{ fontSize: 14, fontWeight: "400" }}>
              ver resultados
            </ParagraphDark>
            <MaterialCommunityIcons name="eye-outline" size={16} color={theme.bg} />
          </Tag>
        </TouchableOpacity>
      </ContainerBTHome>
    </TouchableOpacity>
  );
};

export default BackTestHomeCard;
