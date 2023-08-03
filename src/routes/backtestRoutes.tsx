import React from "react";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import BacktestScreen from "../screens/Backtest/BacktestScreen";
import { AntDesign } from "@expo/vector-icons";
import MyBacktests from "../screens/MyBacktests/MyBacktests";
import NewBacktest from "../screens/NewBacktest/NewBacktestScreen";
import { useNavigation } from "@react-navigation/native";
import ResultsScreen from "../screens/Results/BacktestResultsScreen";
import { RootTabParamsList } from "./RootRoutes";
import { theme } from "../styles/styles";

const Stack = createStackNavigator();

export type Props = StackNavigationProp<RootTabParamsList, "Backtests">;

const BacktestRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyBacktests"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyBacktests" component={MyBacktests} />
      <Stack.Screen
        name="NewBacktest"
        component={NewBacktest}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Novo Backtest",
        }}
      />
      <Stack.Screen
        name="SingleBacktest"
        component={BacktestScreen}
        options={{
          headerLeft: (props) => {
            const navigation = useNavigation<Props>();
            return (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.popToTop()}>
                <AntDesign name="arrowleft" size={24} color="#fff" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="Resultados"
        component={ResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Resultados",
        }}
      />
    </Stack.Navigator>
  );
};

export default BacktestRoutes;
