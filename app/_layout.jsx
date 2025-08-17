import { useEffect } from 'react';
import "../global.css"

import { Stack, Redirect,router } from 'expo-router';

export default function RootLayout() {
  

  const isAuthenticated = false; 

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tab)'); 
    } else {
      router.replace('/welcome'); 
    }
  }, [isAuthenticated]);


  return (<>
  <Stack screenOptions={{headerShown: false}}  >
   
  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  <Stack.Screen name="(tab)" options={{ headerShown: false }} />
  <Stack.Screen name="choices" options={{ headerShown: false }} />


    {/* <Stack.Screen name="index" />
    <Stack.Screen name="welcome" />
    <Stack.Screen name="signup" />
    <Stack.Screen name="login" /> */}
  </Stack>
  </>);
}
