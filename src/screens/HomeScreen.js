import sanityClient from "../services/sanity";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { Categories } from "../components/Categories";
import { FeaturedRow } from "../components/FeaturedRow";
import { Header } from "../components/Header";

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
      <Header />

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
