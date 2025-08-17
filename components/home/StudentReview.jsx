import { StyleSheet, Text, View, Image, ScrollView, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import finance from '../../assets/images/finance.png';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 140;
const SPACING = 15;

const students = [
  {
    id: 1,
    name: 'Arjun Singh',
    image: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
    game: 'Basketball',
    state: 'Maharashtra',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    image: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    game: 'Tennis',
    state: 'Delhi',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    image: { uri: 'https://randomuser.me/api/portraits/men/54.jpg' },
    game: 'Football',
    state: 'Punjab',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    image: { uri: 'https://randomuser.me/api/portraits/women/34.jpg' },
    game: 'Cricket',
    state: 'Karnataka',
  },
];

const infiniteData = [...students, ...students, ...students];

const StudentReview = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const totalWidth = (CARD_WIDTH + SPACING) * students.length;
    const interval = setInterval(() => {
      scrollPosition.current += CARD_WIDTH + SPACING;
      if (scrollPosition.current > totalWidth) {
        scrollPosition.current = 0;
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
      } else {
        scrollViewRef.current?.scrollTo({ x: scrollPosition.current, animated: true });
      }
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>Let's know About Our </Text>
            <Text style={styles.titleHighlight}>Students....</Text>
          </View>
          <Text style={styles.subtitle}>Our Coaches are there to Guide/Help you</Text>
        </View>
        <Image source={finance} style={styles.icon} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
      >
        {infiniteData.map((student, index) => (
          <View key={index} style={styles.card}>
            <Image source={student.image} style={styles.image} />
            <Text style={styles.studentName}>{student.name}</Text>

            <Text style={styles.detail}>{student.game} | {student.state}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentReview;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  titleHighlight: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E1353C',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  scrollView: {
    paddingLeft: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: SPACING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin:2
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12, 
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
    color: '#333',
  },
  detail: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
});
