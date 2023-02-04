import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { urlFor } from "../services/sanity";
import { GoBackButton } from "../components/GoBackButton";
import {
  StarIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { DishRow } from "../components/DishRow";
import { Basket } from "../components/Basket";

export function RestaurantScreen() {
  const navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).auto("format").fit("max").width(1000).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <GoBackButton />
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-2xl font-bold">{title}</Text>

            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="#fab206" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating.toFixed(1)}</Text> .{" "}
                  {genre}
                </Text>
              </View>

              <View className="flex-row items-center shrink">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs break-before-auto text-gray-500 px-2 ">
                  Nearby . {address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row p-3 space-x-2 border-y border-gray-300"
          >
            <QuestionMarkCircleIcon color="gray" size={20} opacity={0.6} />
            <Text className="font-semibold flex-1 pl-2">
              Do you have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" size={20} />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dish rows */}

          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              title={dish.name}
              price={dish.price}
              short_description={dish.short_description}
              imageUrl={dish.image.asset._ref}
            />
          ))}
        </View>
      </ScrollView>
      <Basket />
    </>
  );
}
