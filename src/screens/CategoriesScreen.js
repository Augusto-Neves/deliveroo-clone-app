import sanityClient from "../services/sanity";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoBackButton } from "../components/GoBackButton";

import { NoRestaurantsFounded } from "../components/NoRestaurantsFounded";
import { RestaurantResumeCard } from "../components/RestaurantResumeCard";
import { Loading } from "../components/Loading";

export function CategoryScreen() {
  const {
    params: { id, title },
  } = useRoute();

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `
    *[_type == 'restaurant' && type._ref == $id ]{
      ...,
        dishes[]->,
          type->{
            name
          }       
    }
    `,
        { id }
      )
      .then((result) => {
        setRestaurants(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white pt-5 mb-32 h-full">
        <View className="flex-row items-center border-b border-[#00ccbb] pb-8">
          <GoBackButton positions="top-1 left-5" />
          <Text className="flex-1 text-center text-xl font-bold">{title}</Text>
        </View>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white pt-5 mb-32 h-full">
      <View className="flex-row items-center border-b border-[#00ccbb] pb-8">
        <GoBackButton positions="top-1 left-5" />
        <Text className="flex-1 text-center text-xl font-bold">{title}</Text>
      </View>

      <View className="flex-1 bg-gray-100">
        {restaurants.length === 0 ? (
          <NoRestaurantsFounded />
        ) : (
          <RestaurantResumeCard restaurants={restaurants} />
        )}
      </View>
    </SafeAreaView>
  );
}
