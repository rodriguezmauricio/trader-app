import React from "react";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { RootTabParamsList } from "./RootRoutes";
import { theme } from "../styles/styles";
import NewTradeJournalScreen from "../screens/NewTradeJournal/NewTradeJournalScreen";
import TradesJournalScreen from "../screens/TradeJournal/TradesJournalScreen";
import TradesFromJournalScreen from "../screens/TradesFromJournal/TradesFromJournalScreen";
import EditTradeJournalScreen from "../screens/EditTradeJournal/EditTradeJournalScreen";
import JournalResultsScreen from "../screens/Results Journal/JournalResultsScreen";

const Stack = createStackNavigator();

export type Props = StackNavigationProp<RootTabParamsList, "Diário">;

const JournalRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="TradesJournal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TradesJournal" component={TradesJournalScreen} />
      <Stack.Screen
        name="NewTradeJournal"
        component={NewTradeJournalScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Novo Trade",
        }}
      />
      <Stack.Screen
        name="TradesFromJournal"
        component={TradesFromJournalScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Novo Trade",
        }}
      />
      <Stack.Screen
        name="EditTradeFromJournal"
        component={EditTradeJournalScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Editar trade",
        }}
      />
      <Stack.Screen
        name="ResultsJournal"
        component={JournalResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Editar trade",
        }}
      />
      {/* <Stack.Screen
        name="EditTradeJournal"
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
      /> */}
      {/* <Stack.Screen
        name="TradeJournalResults"
        component={ResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.bg,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Resultados",
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default JournalRoutes;
