

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export  function Coustombutton({text,btnFun}) {


 return(
    <TouchableOpacity onPress={btnFun} className="w-full mt-auto py-2 rounded-full px-10 bg-[#E53842]" >

    <Text className="text-white font-bold text-center text-2xl">
     {text}
    </Text>

   </TouchableOpacity>
  )
}

