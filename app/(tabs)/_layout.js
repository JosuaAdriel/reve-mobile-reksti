import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = "white";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Home",
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color="white" />,
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          headerTitle: "My Bag",
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "bag" : "bag-outline"} color="white" />,
        }}
      />

      <Tabs.Screen
        name="closet"
        options={{
          title: "Closet",
          headerTitle: "My Closet",
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name={focused ? "wardrobe" : "wardrobe-outline"} size={24} color="white" />,
        }}
      />

      <Tabs.Screen
        name="space"
        options={{
          title: "space",
          headerTitle: "Space",
          tabBarIcon: ({ focused }) => <AntDesign name={focused ? "star" : "staro"} size={24} color="white" />,
        }}
      />
    </Tabs>
  );
}
