import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import sanityClient from "../../services/sanity";
import { RestaurantCard } from "../RestaurantCard";

export function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == 'featured' && _id == $id]{
        ...,
        restaurants[] ->{
          ...,
          dishes[] ->,
          type->{
            name
          }
        }        
      }[0]
    `,
        { id }
      )
      .then((result) => setRestaurants(result?.restaurants))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.7}>
        <View className="mt-4 flex-row items-center justify-between px-4">
          <Text className="font-bold text-lg">{title}</Text>
          <ArrowRightIcon color="#00CCBB" />
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurants Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            id={restaurant._id}
            key={restaurant._id}
            title={restaurant.name}
            address={restaurant.address}
            genre={restaurant.type.name}
            rating={restaurant.rating}
            long={restaurant.long}
            latitude={restaurant.lat}
            imgUrl={restaurant.image.asset._ref}
          />
        ))}
      </ScrollView>
    </View>
  );
}
