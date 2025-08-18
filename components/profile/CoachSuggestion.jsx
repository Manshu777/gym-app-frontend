import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const coaches = [
  { id: "1", name: "Acharya", sport: "Tennis", image: "https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg" },
  { id: "2", name: "Dharmik", sport: "Tennis", image: "https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg" },
  { id: "3", name: "Sujoy Sen", sport: "Tennis", image: "https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg" },
  { id: "4", name: "Rohit Sharma", sport: "Cricket", image: "https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg" },
  { id: "5", name: "Virat Kohli", sport: "Cricket", image: "https://i.pinimg.com/originals/ef/0d/ec/ef0dec7cb8b80b65ae925ccb9286f567.jpg" },
];

const CoachSuggestion = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Check Similar Coaches</Text>
        <TouchableOpacity>
          <Text style={styles.infoIcon}>ℹ</Text>
        </TouchableOpacity>
      </View>

    
      <View style={{ flex: 1, minHeight: 200 }}>
        <Animated.FlatList
          data={coaches}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
          renderItem={({ item, index }) => {
            const translateY = scrollX.interpolate({
              inputRange: [index * 140, (index + 1) * 140], 
              outputRange: [10, -10],
              extrapolate: "clamp",
            });

            return (
              <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sport}>{item.sport}</Text>
              </Animated.View>
            );
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
        />
      </View>
    </Animated.View>
  );
};

export default CoachSuggestion;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    marginVertical: 10,
    width: width - 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoIcon: {
    fontSize: 20,
    color: "#888",
  },
  card: {
    width: 140,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height:180
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  sport: {
    fontSize: 14,
    color: "#666",
  },
});
