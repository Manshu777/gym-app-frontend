import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Logo from "../../assets/images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";   

const { height } = Dimensions.get("window");
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please enter both email and password",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
      });

      setTimeout(() => {
        router.replace("/(tab)");
      }, 1200);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    router.replace("/signup");
  };

  return (
    <LinearGradient colors={["#1a1a1d", "#3b0a45", "#1a1a1d"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo with fade animation */}
            <Animated.View entering={FadeInDown.duration(1000)} style={styles.logoContainer}>
              <Image source={Logo} style={styles.logo} />
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to continue</Text>
            </Animated.View>

            {/* Input Fields */}
            <Animated.View
              entering={FadeInUp.delay(300).duration(800)}
              style={{ width: "100%" }}
            >
              {/* Email */}
              <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                  <Icon name={secureText ? "eye-slash" : "eye"} size={20} color="#aaa" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Button */}
            <Animated.View
              entering={FadeInUp.delay(600).duration(800)}
              style={{ width: "100%" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Signup link */}
            <Animated.View
              entering={FadeInUp.delay(900).duration(800)}
              style={{ marginTop: 20 }}
            >
              <Text style={styles.signupText}>
                Don’t have an account?{" "}
                <Text style={styles.signupLink} onPress={handleSignup}>
                  Sign Up
                </Text>
              </Text>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* ✅ Toast must be mounted once */}
      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 240,
    height: 140,
    marginBottom: 2,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 2,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    marginTop: height * 0.02,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  input: {
    flex: 1,
    paddingVertical: height * 0.02,
    fontSize: 16,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    width: "100%",
    marginTop: height * 0.03,
    paddingVertical: height * 0.02,
    borderRadius: 50,
    backgroundColor: "#E53842",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E53842",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  signupText: {
    color: "#ccc",
    fontSize: 16,
  },
  signupLink: {
    color: "#E53842",
    fontWeight: "bold",
  },
  forgotPassword: {
  color: "#E53842",
  fontSize: 14,
  marginTop: 8,
  alignSelf: "flex-end",
  fontWeight: "600",
},

});
