import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const starData = [
  { star: 5, percentage: 80 },
  { star: 4, percentage: 60 },
  { star: 3, percentage: 40 },
  { star: 2, percentage: 20 },
  { star: 1, percentage: 10 },
];

const reviewsData = [
  { id: "1", name: "Anonymous", rating: 5, review: "Amazing Coach, most of my doubts are clear.", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" },
  { id: "2", name: "Farnaz", rating: 5, review: "Coaches answered gently to my questions and shared the best advice, which created a good impact on my performance.", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" },
  { id: "3", name: "Ravi", rating: 4, review: "He has revealed the problems and gave solutions to come out of it.", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" },
  { id: "4", name: "Sanjay", rating: 5, review: "The training sessions were highly effective, and the techniques were very practical.", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" },
  { id: "5", name: "Meena", rating: 5, review: "A well-experienced coach, highly recommended for beginners and advanced players.", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" },
];

const Review = ({ isVisible }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviewsData : reviewsData.slice(0, 3);

  
  const progressAnim = useRef(starData.map(() => new Animated.Value(0))).current;

 
  const fadeAnimArray = useRef(reviewsData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (isVisible) {
      progressAnim.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: starData[index].percentage,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      });

      // Animate reviews appearing one by one
      fadeAnimArray.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: index * 150, 
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isVisible, showAll]);

  return (
    <Animated.View style={styles.container}>
      
      <Text style={styles.heading}>Rating Overview</Text>
      <View style={styles.ratingOverview}>
        <Text style={styles.overallRating}>5/5</Text>
        <View style={styles.starRow}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <FontAwesome key={i} name="star" size={18} color="gold" />
            ))}
        </View>
        <Text style={styles.totalRatings}>348 Ratings</Text>
      </View>

      
      <View style={styles.starGraph}>
        {starData.map((item, index) => (
          <View key={index} style={styles.starRow}>
            <Text style={styles.starNumber}>{item.star}</Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      
      <FlatList
        data={visibleReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.reviewItem, { opacity: fadeAnimArray[index] }]}>
            <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
            <View style={styles.reviewContent}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <View style={styles.starRow}>
                  {Array(item.rating)
                    .fill()
                    .map((_, i) => (
                      <FontAwesome key={i} name="star" size={14} color="gold" />
                    ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          </Animated.View>
        )}
      />

     
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.showMoreText}>{showAll ? "See Less Comments ↑" : "See All Comments →"}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingOverview: {
    alignItems: "center",
    marginBottom: 15,
  },
  overallRating: {
    fontSize: 28,
    fontWeight: "bold",
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  totalRatings: {
    fontSize: 14,
    color: "#666",
  },
  starGraph: {
    marginBottom: 15,
  },
  starNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFC107",
    borderRadius: 4,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E9E9",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  footer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  showMoreText: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
});
