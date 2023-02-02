import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../../services/sanity";
import { useNavigation } from "@react-navigation/native";

export function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mr-3 w-72 bg-white shadow rounded"
      onPress={() => {
        navigation.navigate("restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).auto("format").fit("max").width(1000).url(),
        }}
        className="h-48 w-auto min-w-fit rounded"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>

        <View className="flex-row items-center space-x-1 ">
          <StarIcon color="#fab206" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating.toFixed(1)}</Text> .{" "}
            {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="green" opacity={0.4} size={22} />
          <Text className="text-cx text-gray-500 pr-6">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
