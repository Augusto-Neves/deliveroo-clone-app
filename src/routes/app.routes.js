import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionSpecs } from "@react-navigation/stack";
import { BasketScreen } from "../screens/BasketScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { PreparingOrderScreen } from "../screens/PreparingOrderScreen";
import { RestaurantScreen } from "../screens/RestaurantScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="restaurant" component={RestaurantScreen} />
      <Screen
        name="basket"
        component={BasketScreen}
        options={{
          presentation: "modal",
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          },
        }}
      />
      <Screen
        name="preparingOrder"
        component={PreparingOrderScreen}
        options={{
          presentation: "fullScreenModal",
        }}
      />
    </Navigator>
  );
}
