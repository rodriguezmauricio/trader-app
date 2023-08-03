import { View, TouchableOpacity } from "react-native";
import React from "react";
import { XView } from "../../screens/Home/HomeScreenStyle";
import { GoldenPlaceholder } from "./TopResultsCardStyle";
import { Paragraph, ParagraphGreen, theme } from "../../styles/styles";
import { useDispatch } from "react-redux";
import { selectBacktest } from "../../redux/selectedBacktestSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootTabParamsList } from "../../routes/RootRoutes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ITopResultsCardProps {
  strategyName: string;
  asset: string;
  timeframe: string;
  id: string;
  payoff: number;
}

type NavigationProps = StackNavigationProp<RootTabParamsList>;

const TopResultsCard = ({ strategyName, asset, timeframe, id, payoff }: ITopResultsCardProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();

  // navega para a página do backtest selecionado
  const navigateToSingleBacktest = (id: string) => {
    dispatch(selectBacktest(id));
    navigation.navigate("Backtests", { screen: "MyBacktests" });
    setTimeout(() => {
      navigation.navigate("Backtests", { screen: "SingleBacktest" });
    }, 100);
  };

  return (
    <TouchableOpacity onPress={() => navigateToSingleBacktest(id)}>
      <XView style={{ padding: 10, backgroundColor: theme.bgLight, borderRadius: 15 }}>
        <GoldenPlaceholder>
          {payoff !== 0 ? (
            <ParagraphGreen style={{ fontSize: 26, fontWeight: "bold" }}>
              {payoff.toFixed(1)}
            </ParagraphGreen>
          ) : (
            <MaterialCommunityIcons name="chart-areaspline" size={24} color={theme.green} />
          )}
        </GoldenPlaceholder>
        <View>
          <Paragraph style={{ fontWeight: "bold" }}>{strategyName}</Paragraph>
          <Paragraph style={{ fontSize: 15, opacity: 0.5 }}>
            {asset} / {timeframe}
          </Paragraph>
        </View>
      </XView>
    </TouchableOpacity>
  );
};

export default TopResultsCard;
