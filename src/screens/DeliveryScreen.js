import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../store/reducers/restaurantSlice";
import MapView, { Marker } from "react-native-maps";

export function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00bbcc] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("home")}
          >
            <XMarkIcon size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 shadow-md">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400 text-lg">Estimated Arrival</Text>
              <Text className="font-bold text-4xl">45-60 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar color="#00ccbb" indeterminate />

          <Text className="text-gray-500 mt-3">
            Your order at {restaurant.title}
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center justify-between space-x-5 h-28">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 rounded-full bg-gray-300 ml-2"
        />
        <View className="flex-1">
          <Text className="text-lg">Deliveroo Rider</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[#00bbcc] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
