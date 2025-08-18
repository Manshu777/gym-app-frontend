import { Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Welcome from '../components/Welcome'

export default function Index() {
    const [user, setUser] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     {
      user?  <Redirect href={'/(tab)'}/>:<Welcome/>
     }
    </View>
  );
}
