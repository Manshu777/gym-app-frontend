
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true); // State for password visibility

  const handleSignup = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/(tab)');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#323035]">
      <View className="imgcontain justify-center items-center">
        <Image className="w-28 h-28" source={Logo} />
        <View className="mt-4 text-center">
          <Text className="my-4 font-bold text-3xl text-white">Create Your Account</Text>
          <Text className="text-lg text-white">Sign up to get started</Text>
        </View>
      </View>

      <View style={{ width: width * 0.9, marginTop: height * 0.04 }}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#888888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888888"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#888888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input with Eye Icon */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? "eye-slash" : "eye"} size={20} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: width * 0.9, marginTop: height * 0.04 }}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8">
        <Text className="text-[#888888] text-lg">
          Already have an account?{' '}
          <Text className="text-[#E53842] font-bold" onPress={handleLogin}>Login</Text>
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
  signupButton: {
    width: '100%',
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
    borderRadius: 50,
    backgroundColor: '#E53842',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
};

