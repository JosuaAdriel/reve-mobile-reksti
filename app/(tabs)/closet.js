import React, { useEffect, useState, useFocusEffect, useCallback } from "react";
import { View, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, RefreshControl } from "react-native";

import Header from "../../components/Header";
import { ClosetData } from "../../data/closet";
import { useRouter } from "expo-router";
import { getFirestore, collection, onSnapshot, getDocs, query, where, orderBy, doc } from "firebase/firestore";
import { db } from "../_layout"

export default function Closet() {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const [rents, setRents] = useState([]);

  const router = useRouter();

  const { userEmail } = "josua.sinabutar@gmail.com";

  const fetchData = async () => {
    try {
      const postRef = collection(db, "Rent");
      const q = query(postRef, orderBy("rentStatus", "desc"));
      const querySnapshot = await getDocs(q);

      // const querySnapshot = await getDocs(collection(db, "Rent"));

      const rentList = [];
      setRents([]);
      querySnapshot.forEach((doc) => {
        console.log("Docs: ",doc.data());
        setRents(rents=>[...rents, doc.data()]);
      });
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  }, []);


  

  // join rents with clothes based on clothesID
  


  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }


  const [items, setItems] = useState(ClosetData);

  const MyFlatList = () => {
    const router = useRouter();
    return (
      <FlatList data={rents} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{uri: item.image}} style={styles.image}/>
          <View style={styles.details}>
            <Text style={styles.name}>{item.clothesName}</Text>
            <Text style={styles.brand}>{item.brandName}</Text>
            <Text style={styles.rentingRange}>Renting Range:</Text>
            <Text style={styles.rentingRange}>
              {item.rentStart} - {item.rentEnd}
            </Text>
            {/* <Text  style={styles.loker}>No Loker: {item.noLoker}</Text>
            <Text  style={styles.loker}>Kode Loker: {item.kodeLoker}</Text> */}
            { item.rentStatus == 0 ? (
              <View style={[styles.button]}>
                <Text className="text-center font-bold text-white">Returned</Text>
              </View> 
            )
            : 
              <TouchableOpacity onPress={() => (router.push({ pathname: "/locker", 
                params: {name: item.clothesName, brand: item.brandName, image: item.image, outlet: item.outlet,lockerNumber:item.lockerNumber,pin:item.pin,latitude:item.latitude,longitude:item.longitude} }))} 
                style={[styles.button, { backgroundColor: item.status === 2 ? "#B71800" : "black" }]} >
                <Text style={styles.buttonText}>Go To Locker</Text>
              </TouchableOpacity>
            
             }
          </View>
        </View>
      )}
     />
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Closet" />
          {/* <TouchableOpacity onPress={console.log("rent",rents)} clothesName="w-screen bg-gray-400 border"><Text>Test</Text></TouchableOpacity> */}

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
