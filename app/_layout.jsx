import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <SafeAreaView
              style={{
                flex: 1,backgroundColor:'#fff'}}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
              </Stack>
              <Toast />
            </SafeAreaView>
  );
}
