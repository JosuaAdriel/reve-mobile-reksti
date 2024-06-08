import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Page() {
  const router = useRouter();

  const { id, name, brand, size, image, price, outlet, latitude, longitude, lockerNumber, pin, weight } =
    useLocalSearchParams();
  // const clothe = { id, name, brand, image, size, description, price };

  return (
    <View className="relative flex-1">
      <ScrollView contentContainerStyle={styles.container}>
        <View >
          <Image source={{uri:image}} style={{width:Dimensions.get('window').width, height:Dimensions.get('window').width}}></Image>
        </View>
        <View className="w-screen">
          <View className="py-3 px-7 border-b border-gray-300">
            <Text>Rent Price</Text>
            <Text className="text-xl font-bold">{currencyFormatter.format(price)} /day</Text>
          </View>
          <View className="py-3 px-7">
            <Text className="text-2xl font-bold text-center mb-3">{name}</Text>
            <Text className="text-base">Size: {size}</Text>
            <Text className="text-base mb-3">Brand: {brand}</Text>
            <View className="flex-row">
              <Text className="text-base">Available at </Text><Text className="text-base font-bold">{outlet}</Text>
            </View>
            <MapView 
              style={{width: '100%', height: 200}}
              initialRegion={{
                latitude:parseFloat(latitude),
                longitude:parseFloat(longitude),
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
              }}
              provider={PROVIDER_GOOGLE}
              className="my-2"
              scrollEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude:parseFloat(latitude),
                  longitude:parseFloat(longitude),
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00421
                }}
                title={outlet}
              />

            </MapView>
          </View>
        </View>
      </ScrollView>
        <View className="fixed bottom-0 left-0 px-7 w-screen py-3 border-t-[3px] border-gray-400 bg-[#f5f5f5]">
          <TouchableOpacity
            className="h-[50] bg-gray-800 rounded-lg items-center justify-center"
            onPress={() =>
              router.push({ pathname: "/purchase", params: 
                {id: id, name: name, brand: brand, size: size, image: image, price: price, lockerNumber: lockerNumber, pin: pin, weight: weight, latitude: latitude, longitude: longitude, outlet: outlet}
              })
            }>
            <Text style={styles.buttonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  detailsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    // elevation: 3, // For Android shadow
    // shadowColor: "#000", // For iOS shadow
    // shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    // shadowOpacity: 0.2, // For iOS shadow
    // shadowRadius: 4, // For iOS shadow
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  size: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "justify",
  },
  addToBagButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  orderNowButton: {
    backgroundColor: "#B71800",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
