import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, ScrollView, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 160;
const SPACING = 15;

const coaches = [
  {
    id: 1,
    name: 'Trevor',
    image: { uri: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/3a91b1d398238c10e21c005800c91406.jpg' },
    rating: 4.8,
    hobbies: ['Football'],
  },
  {
    id: 2,
    name: 'Franklin',
    image: { uri: 'https://staticg.sportskeeda.com/editor/2022/02/2784e-16458125531054-1920.jpg' },
    rating: 4.5,
    hobbies: ['Cricket'],
  },
  {
    id: 3,
    name: 'David Beckham',
    image: { uri: 'https://randomuser.me/api/portraits/men/43.jpg' },
    rating: 4.9,
    hobbies: ['Badminton'],
  },
  {
    id: 4,
    name: 'Michael',
    image: { uri: 'https://cdn.staticneo.com/w/gta5/thumb/Michael.png/280px-Michael.png' },
    rating: 4.9,
    hobbies: ['Badminton'],
  },
];

const loopData = [...coaches, ...coaches];

const RecommendedCoaches = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const totalWidth = (CARD_WIDTH + SPACING) * coaches.length;

    if (contentOffsetX >= totalWidth) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended Coaches</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text style={styles.seeAllText}>See all</Text>
          <FontAwesome name="angle-right" size={18} color="#00A9C0" />
        </TouchableOpacity>
      </View>

      
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        {loopData.map((coach, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-10, 0, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={index} style={[styles.card, { opacity }]}>
              <Animated.View style={[styles.imageWrapper, { transform: [{ translateX }] }]}>
                <Image source={coach.image} style={styles.image} />
                <View style={styles.reviewContainer}>
                  <FontAwesome name="star" size={14} color="gold" />
                  <Text style={styles.ratingText}>{coach.rating}</Text>
                </View>
              </Animated.View>

              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.hobbies}>{coach.hobbies.join(', ')}</Text>

              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectText}>Connect</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default RecommendedCoaches;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  seeAllText: {
    color: '#00A9C0',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  scrollView: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginRight: SPACING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  reviewContainer: {
    position: 'absolute',
    bottom: -5,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 10,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
  coachName: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    color: '#333',
  },
  hobbies: {
    fontSize: 12,
    color: '#777',
    marginVertical: 5,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#0050c8',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  connectText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
