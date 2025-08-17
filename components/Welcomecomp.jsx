




import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import '../global.css'
 const Welcomecomp = (props) => {


 return(
  <View clasName='w-full bg-[#E53842]' >
        <Text>
          Hello WOrld
        </Text>
  </View>
  )
}

export default Welcomecomp;
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})

