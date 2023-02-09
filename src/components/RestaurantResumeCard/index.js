import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../../services/sanity";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export function RestaurantResumeCard({ restaurants }) {
  const navigation = useNavigation();

  function handleRestaurantPress(restaurant) {
    navigation.navigate("restaurant", {
      id: restaurant._id,
      key: restaurant._id,
      title: restaurant.name,
      address: restaurant.address,
      genre: restaurant.type.name,
      rating: restaurant.rating,
      long: restaurant.long,
      lat: restaurant.lat,
      imgUrl: restaurant.image.asset._ref,
      short_description: restaurant.short_description,
      dishes: restaurant.dishes,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView
        className="flex-row divide-y divide-gray-400"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <Text className="px-4  mb-3 font-bold text-xl">Restaurants</Text>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            className="flex-row w-full items-center space-x-3 py-2 px-5 bg-white"
            activeOpacity={0.7}
            onPress={() => handleRestaurantPress(restaurant)}
          >
            <Image
              source={{
                uri: urlFor(restaurant.image.asset._ref).url(),
              }}
              className="h-14 w-14 rounded-full"
            />
            <View>
              <Text className="font-bold text-sm mb-1">{restaurant.name}</Text>
              <Text className="text-gray-400">
                Distance -{" "}
                {(restaurant.rating / 1.85).toFixed(2).replace(".", ",")}
                km
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-xs">
                  {restaurant.rating.toFixed(1)}
                </Text>
                <StarIcon size={22} color="#fab206" opacity={0.5}/>
                <Text className="text-gray-600 text-xs"> - $5,99</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
