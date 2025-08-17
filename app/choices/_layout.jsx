import { useEffect } from 'react';


import { Stack, Redirect,router } from 'expo-router';

export default function RootLayout() {
  



  return (<>
  <Stack screenOptions={{headerShown: false}}  >

  <Stack.Screen name="choices" />
  
  </Stack>
  </>);
}
