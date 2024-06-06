import React, { useState } from "react";
import { View, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";

import Header from "../../components/Header";
import { ClosetData } from "../../data/closet";
import { useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";
const initialItems = [
  {
    id: "1",
    name: "Blue Jeans",
    brand: "Brand B",
    rentStart: "2 Apr 2024",
    rentEnd: "7 Apr 2024",
    status: "Shipment",
    image: "https://via.placeholder.com/150",
    kodeLoker: "123456",
  },
  {
    id: "2",
    name: "White T-Shirt",
    brand: "Brand C",
    rentStart: "2 Apr 2024",
    rentEnd: "7 Apr 2024",
    status: "Return Now!",
    image: "https://via.placeholder.com/150",
    kodeLoker: "123456",
  },
];

export default function Closet() {
  const router = useRouter();

  const { user } = useUser();

  if (!user) {
    router.push("/login");
    return null;
  }

  const [items, setItems] = useState(ClosetData);

  const MyFlatList = () => {
    const router = useRouter();
    return (
      <FlatList data={items} 
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.rentingRange}>Renting Range:</Text>
            <Text style={styles.rentingRange}>
              {item.rentStart} - {item.rentEnd}
            </Text>
            {/* <Text  style={styles.loker}>No Loker: {item.noLoker}</Text>
            <Text  style={styles.loker}>Kode Loker: {item.kodeLoker}</Text> */}
            { item.status == "Finished" ? 
              <View style={[styles.button]}>
                <Text style={styles.buttonText}>{item.status}</Text>
              </View> 
            : 
            <TouchableOpacity onPress={() => (router.push({ pathname: "/locker", params: {name: item.name, brand: item.brand, image: item.image} }))} 
            style={[styles.button, { backgroundColor: item.status === "Return Now!" ? "#B71800" : "black" }]}>
              <Text style={styles.buttonText}>{item.status}</Text>
            </TouchableOpacity>
             }
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id} />
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Closet" />

          {/* <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} /> */}
          <MyFlatList />
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Match the background color of the header
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  kodeLoker: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  rentingRange: {
    fontSize: 14,
    color: "#666",
  },
  loker: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures space between the items
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center", // Centers the title horizontally within this container
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuText: {
    padding: 10,
    fontSize: 16,
  },
});
