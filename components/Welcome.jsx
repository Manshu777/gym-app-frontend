import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import mainimg from "../assets/images/mainimg.jpg";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

const Welcome = () => {
  const router = useRouter();

  const handleroute = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      {/* Top Half - Image with Animation */}
      <Animatable.View animation="fadeInDown" duration={1200} style={styles.topHalf}>
        <Image source={mainimg} style={styles.mainImage} />
      </Animatable.View>

      {/* Bottom Half - Content */}
      <Animatable.View animation="fadeInUp" duration={1200} delay={500} style={styles.bottomHalf}>
        <Animatable.Text animation="bounceIn" delay={800} style={styles.title}>
          Tracker
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" delay={1200} style={styles.subtitle}>
          Your Smart Savings Tracker
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" delay={1500} style={styles.description}>
          Set savings goals, track progress, and achieve your dreams with ease.
        </Animatable.Text>

        <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-in-out" delay={2000}>
          <TouchableOpacity style={styles.button} onPress={() => handleroute()}>
            <Text style={styles.buttonText}>Let’s Start</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHalf: {
    flex: 1,
    overflow: "hidden",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#E53842",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#E53842",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "90%",
    shadowColor: "#E53842",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
