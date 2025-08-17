import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

const slides = [
  {
    img: "https://images.unsplash.com/photo-1649789261044-0c6a9fb528ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Push Your Limits"
  },
  {
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Train Hard, Stay Strong"
  },
  {
    img: "https://images.unsplash.com/photo-1651840403917-50e629a8f3e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "No Pain, No Gain"
  }
];

const screenWidth = Dimensions.get('window').width;

const ImageGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.useRef(null);

  return (
    <View style={styles.screen}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          loop
          width={screenWidth * 0.9}
          height={250}
          autoPlay
          autoPlayInterval={3000}
          onSnapToItem={(index) => setActiveIndex(index)}
          data={slides}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradient} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          )}
          scrollAnimationDuration={800}
        />
      </View>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => {
              setActiveIndex(index);
              carouselRef.current.scrollTo({ index, animated: true });
            }}
          >
            <View
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    borderColor:'#001B7A',
    borderWidth:1
  },
  activeDot: {
    backgroundColor: '#001B7A',
    width: 10,
    height: 10,
    borderRadius:5
  },
});

export default ImageGrid;
