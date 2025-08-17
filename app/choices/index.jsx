

import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import Logo from '../../assets/images/logo.png'
import { useRouter } from "expo-router"; // ✅ Import useRouter
const { width, height } = Dimensions.get('window');
export default function choices() {
  const router = useRouter(); // ✅ Initialize Router
  const handleroute = () => {
      router.push('/(auth)/signup')
  };
  
  return (
    <View className="flex-1 justify-center items-center bg-[#323035]">
    <View className="imgcontain justify-center items-center ">
      <Image className='w-28 h-28' source={Logo} />

      <View className='mt-4 text-center'>
        <Text className='my-4 font-bold text-3xl  text-white'>
        Let’s Get Started!
        </Text>

        <Text className='text-lg text-white'>
        Let’s dive in into your account
        </Text>
      </View>
    </View>

    
    <View style={{ width: width * 0.9, marginTop: height * 0.04 }}>
      <TouchableOpacity 
        style={{ 
          width: '100%', 
          marginTop: height * 0.02, 
          paddingVertical: height * 0.02, 
          borderRadius: 50, 
          backgroundColor: '#DB4437' 
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
          Sign in with Google
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity 
          style={{ 
            width: '100%', 
            marginTop: height * 0.02, 
            paddingVertical: height * 0.02, 
            borderRadius: 50, 
            backgroundColor: '#000' 
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
            Sign in with Apple
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={{ 
          width: '100%', 
          marginTop: height * 0.02, 
          paddingVertical: height * 0.02, 
          borderRadius: 50, 
          backgroundColor: '#3b5998' 
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
          Sign in with Facebook
        </Text>
      </TouchableOpacity>
    </View>

    <View className='mt-16' style={{ width: width * 0.9 }}>
      <TouchableOpacity 
        style={{ 
          width: '100%', 
          marginTop: height * 0.02, 
          paddingVertical: height * 0.02, 
          borderRadius: 50, 
          backgroundColor: '#E53842' 
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 

        style={{ 
          width: '100%', 
          marginTop: height * 0.02, 
          paddingVertical: height * 0.02, 
          borderRadius: 50, 

          backgroundColor: '#F2F2FE',
          borderWidth: 2,
          borderColor:'#F2F2FE'
        }} 
        onPress={handleroute}
      >
        <Text className='text-[#E53842]' style={{  fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>

  </View>

  );
}
