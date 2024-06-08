import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from "react-native";
import HelpCenterAccordion from "@/components/Accordion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default function LockerScreen() {

  const [revealPin, setRevealPin] = React.useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const {name, brand, image, outlet, lockerNumber, pin, latitude, longitude} = params;

  const initialLocation = {
    latitude:-6.890734406865988,
    longitude:107.61070201534383
  }
  const [myLocation, setMyLocation] = React.useState(initialLocation);
  handleRevealPin = () => {
    setRevealPin(!revealPin);
  }
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View className="items-center">
          <Text className="text-xl my-3">Here's the Location of Your Locker</Text>
          <MapView 
            style={{width: '100%', height: 400}}
            initialRegion={{
              latitude:parseFloat(latitude),
              longitude:parseFloat(longitude),
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
            }}
            provider={PROVIDER_GOOGLE}
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
          <View className="mt-5 flex-row items-center w-screen px-5">
            <Image source={{uri: image}} style={{ width: 100, height: 100 }}/>
            <View className="justify-center mx-5">
              <View className="mb-3">
                <Text className="font-bold text-base">{ name }</Text>
                <Text>{brand}</Text>
              </View>
              <View>
                <Text className="font-bold">Locker Info:</Text>
                <Text>Location: {outlet}</Text>
                <Text>Locker: {lockerNumber}</Text>
                <View className="flex-row items-center mt-2">
                  <Text>Locker Pin:</Text>
                  <Text className={`ml-2 rounded-lg border p-1 font-bold ${revealPin ? 'bg-white': 'bg-black'}`}>{pin}</Text>
                  <TouchableOpacity onPress={()=>(handleRevealPin())} className="ml-2 p-1">
                    <AntDesign name="eye" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // Match the background color of the header
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
