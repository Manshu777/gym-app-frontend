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
import axios from "axios";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // 📱 phone state
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

const handleSignup = async () => {
  if (!username || !email || !password || !phone) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please fill all fields.",
    });
    return;
  }

  if (phone.length !== 10) {
    Toast.show({
      type: "error",
      text1: "Invalid Phone Number",
      text2: "Phone number must be exactly 10 digits.",
    });
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post(`${API_BASE_URL}/register`, {
      name: username,
      email,
      phone_number: phone,
      password,
      role,
    });

    console.log(response)

    setLoading(false);

    Toast.show({
      type: "success",
      text1: "Account Created",
      text2: "Your account has been registered successfully!",
    });

    router.replace("/(tab)");
  } catch (error) {
    setLoading(false);
    console.error(error);

    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    Toast.show({
      type: "error",
      text1: "Signup Failed",
      text2: message,
    });
  }
};


  const handleLogin = () => {
    router.replace("/login");
  };

  return (
    <LinearGradient colors={["#1a1a1d", "#3b0a45", "#1a1a1d"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
  >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo + Header */}
            <Animated.View entering={FadeInDown.duration(1000)} style={styles.logoContainer}>
              <Image source={Logo} style={styles.logo} />
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </Animated.View>

            {/* Input Fields */}
            <Animated.View entering={FadeInUp.delay(300).duration(800)} style={{ width: "100%" }}>
              {/* Username */}
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#aaa"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#aaa"
                  keyboardType="phone-pad"
                  value={phone}
                    maxLength={10}
                     onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    setPhone(numericText);
                  }}
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
            </Animated.View>

            {/* Role Toggle Chips */}
            <Animated.View entering={FadeInUp.delay(500).duration(800)} style={styles.chipWrapper}>
              <TouchableOpacity
                style={[styles.chip, role === "user" && styles.chipActive]}
                onPress={() => setRole("user")}
              >
                <Text style={[styles.chipText, role === "user" && styles.chipTextActive]}>
                  User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.chip, role === "trainer" && styles.chipActive]}
                onPress={() => setRole("trainer")}
              >
                <Text style={[styles.chipText, role === "trainer" && styles.chipTextActive]}>
                  Trainer
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Signup Button */}
            <Animated.View entering={FadeInUp.delay(700).duration(800)} style={{ width: "100%" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.signupButton}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.signupText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Footer - Go to Login */}
            <Animated.View entering={FadeInUp.delay(900).duration(800)} style={{ marginTop: 20 }}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text style={styles.loginLink} onPress={handleLogin}>
                  Login
                </Text>
              </Text>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Toast Component */}
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
    fontSize: 28,
    marginTop: 10,
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
  chipWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
    gap: 12,
  },
  chip: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  chipActive: {
    backgroundColor: "#E53842",
    borderColor: "#E53842",
    shadowColor: "#E53842",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  chipText: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
  },
  signupButton: {
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
  signupText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  footerText: {
    color: "#ccc",
    fontSize: 16,
  },
  loginLink: {
    color: "#E53842",
    fontWeight: "bold",
  },
});
