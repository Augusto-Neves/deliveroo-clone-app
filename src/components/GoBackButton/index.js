import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export function GoBackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute top-14 left-4 p-2 bg-gray-100 rounded-full"
      onPress={() => {
        navigation.goBack();
      }}
    >
      <ArrowLeftIcon size={20} color="#00CCBB" />
    </TouchableOpacity>
  );
}
