import React, { useState, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import SwitchInfo from "../../components/profile/SwitchInfo";
import Review from "../../components/profile/Review";
import CoachSuggestion from "../../components/profile/CoachSuggestion";

const Profile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [reviewVisible, setReviewVisible] = useState(false);
  const reviewRef = useRef(null);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    reviewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      if (pageY < yOffset + 600 && !reviewVisible) {
        setReviewVisible(true);
      }
    });
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <Animated.ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: Platform.OS==="ios"?50:70 }}
    >
     
      <View style={styles.header}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={26} color="black" />
        </TouchableOpacity>
      </View>

     
      <View style={styles.profileCard}>
        <View style={styles.cardContent}>
          
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://alexis.lindaikejisblog.com/photos/shares/59c5b03f8850c.png" }}
              style={styles.profileImage}
            />
            
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="gold" />
              <Text style={styles.ratingText}>5</Text>
            </View>
          </View>

          
          <View style={styles.profileDetails}>
            <View style={styles.topSection}>
              <Text style={styles.name}>Himanshu</Text>
              
              <MaterialIcons name="verified" size={20} color="green" />
            </View>
            <Text style={styles.interests}>
              Fitness, Nutrition
              </Text>
            <Text style={styles.languages}>English, Hindi</Text>
            <Text style={styles.experience}>8 yrs</Text>

            
            <TouchableOpacity style={styles.onlineButton}>
              <Text style={styles.onlineText}>Online</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" />
            <Text style={styles.chatText}> Chat Now</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="call-outline" size={24} color="gray" />
            <Text style={styles.contactText}> Get in Touch</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <SwitchInfo/>
      <View ref={reviewRef} onLayout={() => {}}>
        <Review isVisible={reviewVisible} />
      </View>
      <CoachSuggestion/>
     
    </Animated.ScrollView>
    </SafeAreaView>

  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 5,
  },
  profileCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1, // Ensuring full border covers the card and buttons
    borderColor: "#ccc",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -8,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#000",
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  interests: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  languages: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  experience: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  onlineButton: {
    backgroundColor: "#dfffd8",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  onlineText: {
    color: "green",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1, // Ensures buttons are visually part of the card
    borderColor: "#ccc",
  },
  chatButton: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth:1,
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    flexDirection:'row',
    justifyContent:'center'
  },
  chatText: {
    color: "gray",
    fontWeight: "bold",
  },
  contactButton: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth:1,
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    flexDirection:'row',
    justifyContent:'center'

  },
  contactText: {
    color: "gray",
    fontWeight: "bold",
  },
});
