

import { Image, Text, TouchableOpacity, View } from "react-native";
import mainimg from '../assets/images/mainimg.jpg';


import { useRouter } from "expo-router"; // ✅ Import useRouter
export default function Index() {
  const router = useRouter(); // ✅ Initialze Router
  const handleroute =()=>{
    router.push("/(tab)"); // ✅ Navigate to Welcome page

  }
  return (
    <View className="flex-1 relative justify-end bg-[#E53842]">
      
      {/* Background Image */}
      <View className="absolute flex justify-center items-center top-0 left-0 w-full h-full">
        <Image 
          source={mainimg} 
          className="w-[90%] h-[800px]" 
          style={{ resizeMode: "cover" }} 
        />
      </View>


      <View className="w-full h-[400px] rounded-t-[40px] p-5 pb-20 bg-white relative z-10">
        <Text className="text-3xl my-4 text-center font-bold">
          Tracker - Your Smart Savings Tracker
        </Text>
        <Text className="text-xl my-2 text-center text-slate-600">
          Set savings goals, track your progress, and achieve your dreams with ease. Tracker makes managing
        </Text>

        <TouchableOpacity className="w-full mt-auto py-2 rounded-full px-10 bg-[#E53842]"  onPress={()=>handleroute()} >

         <Text className="text-white font-bold text-center text-2xl">
         Lets Start's
         </Text>

        </TouchableOpacity>
      </View>

    </View>
  );
}
