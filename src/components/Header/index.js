import React from "react";
import { View, Image, Text } from "react-native";
import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";

export function Header() {
  return (
    <View className="flex-row pb-3 items-center space-x-2 px-4">
      <Image
        source={{
          uri: "https://links.papareact.com/wru",
        }}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
      />

      <View className="flex-1">
        <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
        <Text className="font-bold text-xl">
          Current Location
          <ChevronDownIcon size={20} color="#00CCBB" />
        </Text>
      </View>

      <UserIcon size={35} color="#00CCBB" />
    </View>
  );
}
