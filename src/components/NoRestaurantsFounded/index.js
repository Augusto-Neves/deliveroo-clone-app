import * as Animatable from "react-native-animatable";
import { View } from "react-native";

export function NoRestaurantsFounded() {
  return (
    <View className="flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../../../assets/deliveroo-rider-goDown.gif")}
        className=" h-40 w-40"
        animation="slideInUp"
        iterationCount={1}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="font-bold text-xl"
      >
        No restaurants founded
      </Animatable.Text>
    </View>
  );
}
