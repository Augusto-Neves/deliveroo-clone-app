import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { Categories } from "../components/Categories";
import { FeaturedRow } from "../components/FeaturedRow";
import sanityClient from "../services/sanity";

export function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ..., 
      restaurants[] -> {
          ...,
          dishes [] ->       
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5 mb-32">
      {/* Header */}
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

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-2">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-lg">
          <MagnifyingGlassIcon color="#909194" />
          <TextInput
            placeholder="Restaurant and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView className="bg-gray-100" contentContainerStyle={{}}>
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            description={category.short_description}
            title={category.name}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
