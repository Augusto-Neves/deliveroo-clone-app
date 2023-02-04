import CurrencyFormat from "react-currency-format";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  selectedBasketItems,
  selectedBasketItemsValue,
} from "../../store/reducers/basketSlice";

export function Basket() {
  const items = useSelector(selectedBasketItems);
  const navigation = useNavigation();
  const basketTotalPrice = useSelector(selectedBasketItemsValue);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01a286] py-1 px-3 rounded">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <Text>
          <CurrencyFormat
            value={basketTotalPrice}
            displayType="text"
            prefix="$"
            renderText={(value) => (
              <Text className="text-white font-extrabold text-lg">{value}</Text>
            )}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
