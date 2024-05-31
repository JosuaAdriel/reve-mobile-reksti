import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from "react-native";
import HelpCenterAccordion from "@/components/Accordion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="Home" />
          <ScrollView>
            <Hero />
            <View>
              <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>Catalogue</Text>
            </View>
            <View style={styles.columnCatalogue}>
              <View style={styles.row1}>
                <TouchableOpacity onPress={() => router.push("../catalogue/pants/")} style={[styles.box1, styles.box]}>
                  <Text style={styles.boxText}>Pants</Text>
                  <Image
                    source={require("@/assets/images/pants.jpg")} // Use the imported image
                    style={styles.fotobesar}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("../catalogue/shirts/")} style={[styles.box2, styles.box]}>
                  <Text style={styles.boxText}>Shirts</Text>
                  <Image
                    source={require("@/assets/images/shirts.jpg")} // Use the imported image
                    style={styles.fotobesar}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row2}>
                <TouchableOpacity onPress={() => router.push("../catalogue/skirts/")} style={[styles.box3, styles.box]}>
                  <Text style={styles.boxText}>Skirts</Text>
                  <Image
                    source={require("@/assets/images/skirts.jpg")} // Use the imported image
                    style={styles.fotobesar}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("../catalogue/sweaters/")} style={[styles.box4, styles.box]}>
                  <Text style={styles.boxText}>Sweater</Text>
                  <Image
                    source={require("@/assets/images/sweater.jpg")} // Use the imported image
                    style={styles.fotobesar}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", marginTop: 20, marginLeft: 20, marginBottom: 10 }}>Help Center</Text>
            </View>
            <HelpCenterAccordion />
          </ScrollView>
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
    position: "relative",
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
  test: {
    fontSize: 24,
  },
  columnCatalogue: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row2: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    height: 120,
    width: 163,
    alignItems: "center", //kanan kiri
    justifyContent: "center", //atas bawah
    borderRadius: 10,
    overflow: "hidden",
  },
  box1: {
    backgroundColor: "red",
  },
  box2: {
    backgroundColor: "cyan",
  },
  box3: {
    backgroundColor: "green",
  },
  box4: {
    backgroundColor: "yellow",
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
  boxText: {
    fontSize: 25,
    color: "white", // Adjust text color as needed
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    zIndex: 1,
    position: "absolute",
  },
});
