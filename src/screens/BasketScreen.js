import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromBasket,
  selectedBasketItems,
  selectedBasketItemsValue,
} from "../store/reducers/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../store/reducers/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../services/sanity";
import CurrencyFormat from "react-currency-format";

export function BasketScreen() {
  const navigation = useNavigation();
  const items = useSelector(selectedBasketItems);
  const restaurant = useSelector(selectRestaurant);
  const totalPriceItems = useSelector(selectedBasketItemsValue);
  const dispatch = useDispatch();
  const [groupedItemsInTheBasket, setGroupedItemsInTheBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInTheBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xl">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInTheBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text>{items.length}x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.imageUrl).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.title}</Text>
              <Text>
                <CurrencyFormat
                  value={items[0]?.price.toFixed(2)}
                  displayType="text"
                  prefix="$"
                  renderText={(value) => (
                    <Text className=" text-gray-600">{value.replace('.', ',')}</Text>
                  )}
                />
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  className="text-[#00bbcc]"
                  onPress={() => dispatch(removeItemFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <CurrencyFormat
              value={totalPriceItems.toFixed(2)}
              displayType="text"
              prefix="$"
              renderText={(value) => (
                <Text className="text-gray-400">{value.replace('.', ',')}</Text>
              )}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <CurrencyFormat
              value={5.99}
              displayType="text"
              prefix="$"
              renderText={(value) => (
                <Text className="text-gray-400">{value.replace('.', ',')}</Text>
              )}
            />
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <CurrencyFormat
              value={(totalPriceItems + 5.99).toFixed(2)}
              displayType="text"
              prefix="$"
              renderText={(value) => (
                <Text className="font-extrabold text-gray-400">{value.replace('.', ',')}</Text>
              )}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-[#00bbcc] p-4 rounded-lg"
            onPress={() => navigation.navigate("preparingOrder")}
          >
            <Text className="text-white text-center text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
