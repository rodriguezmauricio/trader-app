import React from "react";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import PlaylistScreen from "../screens/Playlists/PlaylistScreen";
import VideosScreen from "../screens/Videos/VideosScreen";
import { PlaylistsParamList } from "./RootRoutes";

const Stack = createStackNavigator();

type Props = StackNavigationProp<PlaylistsParamList>;

const VideosRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="PlaylistsScreen" screenOptions={{ headerShown: false }}>
      {/* SECTION: HOME SCREEN BEGIN */}
      <Stack.Screen name="PlaylistsScreen" component={PlaylistScreen} />

      {/* SECTION: HOME SCREEN END */}

      {/* SECTION: NEW BACKTEST SCREEN BEGIN */}
      <Stack.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          animationEnabled: false,
        }}
      />
      {/* SECTION: NEW BACKTEST SCREEN END */}
    </Stack.Navigator>
  );
};

export default VideosRoutes;
