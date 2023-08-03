// REGULAR IMPORTS
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";

// CUSTOM IMPORTS
import { theme } from "./src/styles/styles";

// REDUX IMPORTS
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// NAVIGATION IMPORTS
import RootRoutes from "./src/routes/RootRoutes";
import { useState } from "react";
import { pt, registerTranslation } from "react-native-paper-dates";

import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.green,
    // onPrimary: theme.green,
    primaryContainer: theme.green,
    surfaceVariant: theme.greenOpacity,
    secondaryContainer: theme.green,
  },
};

export default function App() {
  const [data, setData] = useState(null);

  registerTranslation("pt", pt);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <PaperProvider theme={paperTheme}>
              <RootRoutes />
            </PaperProvider>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
