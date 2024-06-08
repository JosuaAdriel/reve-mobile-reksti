import { useNavigation, useRouter } from "expo-router";

import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

import { StackActions } from "@react-navigation/native";
import { useUser } from "@/hooks/useUser";

export default function PurchaseConfirmed() {
  const { userEmail } = "josua.sinabutar@gmail.com";

  const navigation = useNavigation();

  return (
    <View className="bg-gray-100 h-full w-full flex flex-col my-auto items-center p-8 gap-y-4 justify-center">
      <Image
        source={require("@/assets/images/order-confirmed.png")}
        className=" shadow-xl overflow-visible mb-16"
      />
      <View className="flex flex-col items-center gap-y-1 w-full mb-16">
        <Text className="text-xl mt-8 font-bold">
          Thank you for your purchase!
        </Text>
        <Text className="text-lg">Your order has been confirmed.</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.dispatch(StackActions.popToTop())}
        buttonColor="black"
        labelStyle={{ width: "100%" }}
        textColor="white"
        className="w-full rounded-lg">
        Back to Home
      </Button>
    </View>
  );
}
