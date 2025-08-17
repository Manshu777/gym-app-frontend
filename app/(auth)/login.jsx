import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import Logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true); // Password visibility state

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/(tab)');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#323035]">
      <View className="imgcontain justify-center items-center">
        <Image className="w-28 h-28" source={Logo} />
        <Text className="my-4 font-bold text-3xl text-white">HOME Back</Text>
        <Text className="text-lg text-[#ffffff]">Login to continue</Text>
      </View>

      <View style={{ width: width * 0.9, marginTop: height * 0.04 }}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#888888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input with Eye Icon */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888888"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? "eye-slash" : "eye"} size={20} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <View style={{ width: width * 0.9, marginTop: height * 0.04 }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Signup Link */}
      <View className="mt-8">
        <Text className="text-[#888888] text-lg">
          Don't have an account?{' '}
          <Text className="text-[#E53842] font-bold" onPress={handleSignup}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = {
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2FE',
    alignItems: 'center',
    marginTop: height * 0.02
  },
  input: {
    flex: 1,
    paddingVertical: height * 0.02,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    width: '100%',
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
    borderRadius: 50,
    backgroundColor: '#E53842',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
};

