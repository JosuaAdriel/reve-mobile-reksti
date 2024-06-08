import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { getFirestore } from "firebase/firestore";

import { UserProvider } from "@/hooks/useUser";
import { PaperProvider } from "react-native-paper";
import { MenuProvider } from "react-native-popup-menu";

// import auth from "@react-native-firebase/auth";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const firebaseConfig = {
  apiKey: "AIzaSyDWwUZA3R4XaDGKlT8MmXbsJu86Im0GMFg",
  authDomain: "reve-database.firebaseapp.com",
  projectId: "reve-database",
  storageBucket: "reve-database.appspot.com",
  messagingSenderId: "459096764748",
  appId: "1:459096764748:web:e53740211a430aefb29fe9",
  measurementId: "G-TK8BXHSPRK"
};

console.log("TEST", firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
export default function RootLayout() {
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState(null);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  //   const app = initializeApp(firebaseConfig);

  // let app;
  // let auth;
  // if (!getApps().length) {
  //   try {
  //     app = initializeApp(firebaseConfig);
  //     auth = initializeAuth(app, {
  //       persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // } else {
  //   app = getApp();
  //   auth = getAuth(app);
  // }

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = 1
  //   return subscriber;
  // }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // if (initializing) {
  //   return null;
  // }

  return (
    <UserProvider>
      <MenuProvider>
        <PaperProvider>
          <ThemeProvider value={DarkTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </MenuProvider>
    </UserProvider>
  );
}
