import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  const { id, name, brand, image, size, description, price } =
    useLocalSearchParams();
  const clothe = { id, name, brand, image, size, description, price };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp{price}/week</Text>
        <Text style={styles.size}>Size: {size}</Text>
        <Text style={styles.description}>{description}</Text>
        <View>
          {/* <TouchableOpacity style={styles.addToBagButton}>
          <Text style={styles.buttonText}>Add to Bag</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.orderNowButton}
            onPress={() =>
              router.push({ pathname: "/purchase", params: clothe })
            }>
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
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
