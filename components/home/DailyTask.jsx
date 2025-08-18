import { StyleSheet, Text, View, ScrollView, Image, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

// Import images
import basketballImg from '../../assets/images/basketball.gif';
import tennisImg from '../../assets/images/tennis.gif';
import footballImg from '../../assets/images/football.gif';
import cricketImg from '../../assets/images/cricket.gif';
import hockeyImg from '../../assets/images/hockey.gif';     
import boxingImg from '../../assets/images/boxing.gif';

const sports = [
  { name: 'Basketball', image: basketballImg },
  { name: 'Tennis', image: tennisImg },
  { name: 'Football', image: footballImg },
  { name: 'Cricket', image: cricketImg },
   { name: 'Hockey', image: hockeyImg },         
  { name: 'Boxing', image: boxingImg }, 
];

const DailyTask = () => {
  const fadeAnim = useRef(sports.map(() => new Animated.Value(0))).current; // Initial value 0 for each card

  useEffect(() => {
    fadeAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200, // Each card will appear with a delay
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Your Daily Guide</Text>
        <Text style={styles.subText}>
          Let's begin your day with the best coaches in your area with our best guide.
        </Text>
      </View>

      {/* Horizontal Scrollable Cards with Animation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {sports.map((sport, index) => (
          <Animated.View key={index} style={[styles.card, { opacity: fadeAnim[index], transform: [{ scale: fadeAnim[index] }] }]}>
            <Image source={sport.image} style={styles.image} />
            <Text style={styles.sportName}>{sport.name}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DailyTask;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  subText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
  scrollView: {
    paddingHorizontal: 15,
    marginVertical:10
  },
  card: {
    width: 120,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin:2
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  sportName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop:8
  },
});
