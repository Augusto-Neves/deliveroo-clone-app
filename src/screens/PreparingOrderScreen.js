import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export function PreparingOrderScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("delivery");
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="bg-[#01ccbd] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../../assets/deliveroo-Riders.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle indeterminate color="white" />
    </SafeAreaView>
  );
}
