import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

import { Link } from "expo-router";

import { Avatar } from "react-native-paper";

import { useUser } from "@/hooks/useUser";

export default function Header({ title }) {
  const { user, logout } = useUser();

  const onLogout = () => {
    logout();
  };

  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/reve-icon.png")} // Use the imported image
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {user ? (
        <Menu>
          {/* <MenuTrigger>
            <Image
              source={require("@/assets/images/pp-icon.png")} // Replace with your profile icon path
              style={styles.profileLogo}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={onLogout}>
              <Text style={styles.menuText}>Log Out</Text>
            </MenuOption>
          </MenuOptions> */}
        </Menu>
      ) : (
        <TouchableOpacity>
          <Link href="/login">
            <Avatar.Image
              size={40}
              source={require("@/assets/images/pp-icon.png")} // Replace with your profile icon path
              style={styles.profileLogo}
            />
          </Link>
        </TouchableOpacity>
      )}
    </View>
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
  heroContainer: {
    width: "100%", // Adjust the width of the container as needed
    height: 200, // Adjust the height of the container as needed
    overflow: "hidden", // This will clip the image to the container bounds
  },
  fotobesar: {
    width: "100%",
    height: "100%",
  },
  heroText: {
    fontSize: 15,
    color: "white", // Adjust text color as needed
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
  heroText2: {
    fontSize: 13,
    color: "white",
    width: "40%",
    marginTop: 10,
    flexShrink: 1,
  },
  textContainer: {
    position: "absolute",
    left: 175,
    paddingRight: 30,
    top: 40,
    zIndex: 1,
  },
});
