import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </NavigationContainer>
    </>
  );
}
