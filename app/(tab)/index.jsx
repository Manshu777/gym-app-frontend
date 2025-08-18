import { Image, ScrollView, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageGrid from '../../components/home/ImageGrid';
import DailyTask from '../../components/home/DailyTask';
import GetInTouch from '../../components/home/GetInTouch';
import RecommendedCoaches from '../../components/home/RecommendedCoaches';
import StudentReview from '../../components/home/StudentReview';
import MostRated from '../../components/home/MostRated';
import TrainingJourney from '../../components/home/TrainingJourney';
import Animated from 'react-native-reanimated';

const Index = () => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Fetching your location...");
  const isNotification = false;

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable your location services to continue.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(true);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please allow location access to continue.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = location.coords;
      const response = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (response.length > 0) {
        const address = response[0];
        const formattedAddress = `${address.name}, ${address.city}, ${address.postalCode}`;
        setDisplayCurrentAddress(formattedAddress);
      }
    } catch (error) {
      setDisplayCurrentAddress("Unable to fetch location");
    }
  };

  return (
    <View style={styles.container}>
       <Animated.ScrollView
           
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: Platform.OS==="ios"?50:70 }}
          >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/gta-5-michael-pistol.jpg" }} 
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userName}>Abhinav</Text>
              <Text style={styles.userLocation}>{displayCurrentAddress}</Text>
            </View>
          </View>
          <View style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            {isNotification && <View style={styles.redDot} />}
          </View>
        </View>
        <View>
        <ImageGrid />
        <DailyTask />
        <GetInTouch/>
        <RecommendedCoaches/>
        <StudentReview/>
        <MostRated/>
        <TrainingJourney/>
        
        </View>
     </Animated.ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f9fa',
    backgroundColor:'white'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
  notificationWrapper: {
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
