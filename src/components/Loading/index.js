import * as Progress from "react-native-progress";
import { View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <Progress.Circle indeterminate color="#00bbcc" />
    </View>
  );
}
