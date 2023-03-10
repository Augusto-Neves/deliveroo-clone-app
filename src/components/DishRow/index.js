import CurrencyFormat from "react-currency-format";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../../services/sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBasket,
  removeItemFromBasket,
  selectedBasketItemsWithId,
} from "../../store/reducers/basketSlice";

export function DishRow({ id, title, price, short_description, imageUrl }) {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const itensOnBasket = useSelector((state) =>
    selectedBasketItemsWithId(state, id)
  );
  

  function handleAddItemToBasket() {
    dispatch(
      addItemToBasket({ id, title, price, short_description, imageUrl })
    );
    Toast.show({
      type: "success",
      text1: "Item added to basket",
      text2: `${title}`,
      visibilityTime: 2000,
    });
  }

  function handleRemoveItemFromTheBasket() {
    if (!itensOnBasket.length) return;
    dispatch(removeItemFromBasket({ id }));
    Toast.show({
      type: "info",
      text1: "Item removed",
      text2: `${title}`,
      visibilityTime: 2000,
    });
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`bg-white pb-4 pr-2 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pl-4 pr-2">
            <Text className="text-lg mb-1 mt-2">{title}</Text>
            <Text className="text-gray-400">{short_description}</Text>
            <Text className="text-gray-400 mt-2">
              <CurrencyFormat
                value={price.toFixed(2)}
                displayType="text"
                prefix="$"
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{
                uri: urlFor(imageUrl).auto("format").width(500).url(),
              }}
              className="w-20 h-20 bg-gray-300 p-4 "
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleRemoveItemFromTheBasket}
              disabled={itensOnBasket.length === 0}
            >
              <MinusCircleIcon
                color={itensOnBasket > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{itensOnBasket.length}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddItemToBasket}
            >
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
