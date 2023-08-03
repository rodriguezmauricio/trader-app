import { useEffect, useState } from "react";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

import BacktestRoutes from "./backtestRoutes";
import HomeScreen from "../screens/Home/HomeScreen";
import { theme } from "../styles/styles";
import VideosRoutes from "./VideosRoutes";
import TradesJournalScreen from "../screens/TradeJournal/TradesJournalScreen";
import JournalRoutes from "./JournalRoutes";

export type RootTabParamsList = {
  Home: undefined | BacktestsParamList;
  Backtests:
    | BacktestsParamList
    | { screen: "MyBacktests" | "NewBacktest" | "SingleBacktest" | "Resultados" };
  Playlists: PlaylistsParamList | { screen: "Playlists" | "Videos" };
  Estrategias: undefined;
  Diário: undefined | TradingJournalParamList | { screen: "TradesFromJournal" };
};

export type BacktestsParamList = {
  MyBacktests: undefined;
  NewBacktest: undefined;
  SingleBacktest: undefined;
  Resultados: undefined;
};

export type PlaylistsParamList = {
  Playlists: undefined;
  Videos: undefined;
};

export type TradingJournalParamList = {
  TradesJournal: undefined;
  NewTradeJournal: undefined;
  NewTrade: undefined;
  TradesFromJournal: undefined;
  EditTradeFromJournal: undefined;
  ResultsJournal: undefined;
};

export type TabTypes = BottomTabScreenProps<RootTabParamsList>;

const Tab = createBottomTabNavigator<RootTabParamsList>();

export default function RootRoutes() {
  const [_keyboardDidShow, set_keyboardDidShow] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      set_keyboardDidShow(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      set_keyboardDidShow(false);
    });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.bg,
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          display: _keyboardDidShow ? "none" : "flex",
        },
        tabBarActiveTintColor: theme.green,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          //ÍCONE DA TAB BAR
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={color} />;
            } else {
              return <Ionicons name="home-outline" size={size} color={color} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Backtests"
        component={BacktestRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="grid" size={size} color={color} />;
            } else {
              return <Ionicons name="grid-outline" size={size} color={color} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={VideosRoutes}
        options={{
          headerStyle: {
            backgroundColor: theme.green,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Playlists",

          //ÍCONE DA TAB BAR
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="videocam" size={size} color={color} />;
            } else {
              return <Ionicons name="videocam-outline" size={size} color={color} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Diário"
        component={JournalRoutes}
        options={{
          headerStyle: {
            backgroundColor: theme.green,
            shadowColor: "transparent",
          },
          headerTintColor: theme.text,
          headerTitle: "Diário",

          //ÍCONE DA TAB BAR
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="journal" size={size} color={color} />;
            } else {
              return <Ionicons name="journal-outline" size={size} color={color} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
