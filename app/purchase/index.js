import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View, Image, TouchableOpacity, processColor } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFirestore, collection, onSnapshot, getDocs, query, where, orderBy, doc, addDoc } from "firebase/firestore";
import { db } from "../_layout"

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Purchase() {
  const { userEmail } = "josua.sinabutar@gmail.com";
  const router = useRouter();

  const { id, name, brand, size, image, price, lockerNumber, pin, weight, latitude, longitude, outlet } = useLocalSearchParams(); 


  const [days, setDays] = useState(1);
  const [totalPrice, setPrice] = useState(price);

  const decrementDays = (values,setFieldValue) => {
    const newDays = values.days - 1;
    setFieldValue('days',newDays);
    const newTotalPrice = newDays*price;
    setFieldValue('totalPrice',newTotalPrice);
    setDays(newDays);
    setPrice(newTotalPrice);
  }

  const incrementDays = (values,setFieldValue) => {
    const newDays = values.days + 1;
    setFieldValue('days',newDays);
    const newTotalPrice = newDays*price;
    setFieldValue('totalPrice',newTotalPrice);
    setDays(newDays);
    setPrice(newTotalPrice);
  }

  const formattedDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const onSubmitMethod = (days, totalPrice) => {
    const rentStart = formattedDate(0);
    const rentEnd = formattedDate(days);

    const docData = {
      brandName: brand,
      clothesID: id,
      clothesName: name,
      clothesSize: size,
      email: String(userEmail),
      image: image,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      lockerNumber: lockerNumber,
      outlet: outlet,
      pin: pin,
      rentEnd: rentEnd,
      rentStart: rentStart,
      rentStatus: 1,
      totalPrice: parseInt(totalPrice),
      weight: parseFloat(weight)
    }
    console.log(JSON.stringify(docData))

    try {
      const docRef = addDoc(collection(db, "Rent"), docData);
      router.push("/purchase/confirmed");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View className="flex flex-col h-full w-full bg-white p-8 overflow-visible">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full overflow-visible max-w-full">
        <View className="flex flex-row rounded-md p-3 border border-gray-400 justify-start items-center">
          <View className="flex flex-row border rounded-md border-gray-400">
            <Image source={{uri:image}} style={{height:64, width:48}} className="border-2 rounded-md border-gray-400"/>
          </View>
          <View className="flex flex-col gap-1 ml-2">
            <Text className="text-lg font-bold">{name}</Text>
            <View className="flex flex-row">
              <Text className="text-sm">{brand}, </Text>
              <Text className="text-sm">Size: {size}</Text>
            </View>
            <Text className="text-sm mr-2">
              {currencyFormatter.format(price)} / day
            </Text>
          </View>
        </View>
        <View>
          <View className="items-center mt-4">
            <Formik
              initialValues={{days: 1, totalPrice: price}}
              onSubmit={value =>onSubmitMethod(value)}
            >
              {({handleChange,handleBlur,handleSubmit,values,setFieldValue,error})=> (
                <View>
                  <View className="flex-row justify-between w-full">
                    <Text className="text-lg font-bold">Rental Duration</Text>
                    <View className="flex-row">
                      <TouchableOpacity 
                        onPress={() => decrementDays(values,setFieldValue)}
                        className={`mr-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center ${parseInt(values.days) > 1 ? 'bg-black border-white' : ''}`}
                        disabled={parseInt(values.days) <= 1}
                      >
                        <AntDesign name="minus" size={15} color={`${parseInt(values.days) > 1 ? 'white' : 'black'}`} className=""/>
                      </TouchableOpacity>
                      <Text className="text-lg font-bold">{values.days} days</Text>
                      <TouchableOpacity 
                          onPress={() => incrementDays(values,setFieldValue)}
                          className="ml-[10] w-[30px] h-[30px] bg-black border-white rounded-full items-center justify-center"
                      >
                        <AntDesign name="plus" size={15} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="flex-row justify-between my-5 ">
                    <Text className="text-lg font-bold">Total: </Text><Text className="font-bold text-lg">{currencyFormatter.format(values.totalPrice)}</Text>
                  </View>
                </View>
                
              )}
            </Formik>
          </View>
        </View>
        <TouchableOpacity
          mode="contained"
          // onPress={() => router.push("/purchase/confirmed")}
          onPress={()=> onSubmitMethod(days,totalPrice)}
          className="rounded-md h-12 items-center justify-center bg-black"
          labelStyle={{ width: "100%" }}
          textColor="white">
          <Text className="font-bold text-white text-lg">Purchase</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
