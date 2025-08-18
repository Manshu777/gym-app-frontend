import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";

import reading from '../../assets/images/reading.png';
import language from '../../assets/images/language.png';
import exp from '../../assets/images/exp.png';


const coaches = [
  {
    id: 1,
    name: 'Lester Crest',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    games: 'Football, Basketball, Tennis, Tennis',
    languages: 'Kannada, English, huii',
    experience: '10 Years',
  },
  {
    id: 2,
    name: 'Emma Watson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8,
    games: 'Cricket, Chess, Baseball',
    languages: 'Hindi, French, hhh, kr r',
    experience: '8 Years',
  },
  {
    id: 3,
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/38.jpg',
    rating: 4.9,
    games: 'Badminton, Volleyball',
    languages: 'English, Spanish',
    experience: '12 Years',
  },
  {
    id: 4,
    name: 'Sophia Lee',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
    rating: 4.7,
    games: 'Tennis, Golf',
    languages: 'Mandarin, English',
    experience: '6 Years',
  },
];

const MostRated = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Most Rated</Text>

     
      <FlatList
  data={coaches}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
   
    const gamesList = item.games ? item.games.split(', ') : [];
    const languagesList = item.languages ? item.languages.split(', ') : [];

   
    const gamesDisplay =
    gamesList.length > 3
      ? (
        <>
          <Text>{gamesList.slice(0, 3).join(', ')}</Text>
          <Text style={{ color: '#00A9C0' }}> + {gamesList.length - 3} more</Text>
        </>
      )
      : <Text>{gamesList.join(', ')}</Text>;

        const languagesDisplay =
        languagesList.length > 2
          ? (
            <>
              <Text>{languagesList.slice(0, 2).join(', ')}</Text>
              <Text style={{ color: '#00A9C0' }}> + {languagesList.length - 2} more</Text>
            </>
          )
          : <Text>{languagesList.join(', ')}</Text>;

    return (
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Image source={{ uri: item.image }} style={styles.profileImage} />
          <View style={styles.rating}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <MaterialIcons name="verified" size={20} color="green" />
          </View>

          <View style={styles.infoRow}>
            <Image source={reading} style={styles.icon} />
            <Text style={styles.description}>{gamesDisplay}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={language} style={styles.icon} />
            <Text style={styles.description}>{languagesDisplay}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={exp} style={styles.icon} />
            <Text style={styles.description}>{item.experience}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.chatButton}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="green" />
              <Text style={styles.chatText}> Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call-outline" size={24} color="green" />
              <Text style={styles.callText}> Call Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }}
/>

    </View>
  );
};

export default MostRated;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
    margin:2
  },
  leftSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    borderColor: '#F8F8F8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    borderWidth:1,
    backgroundColor:'white'
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    
      },
  chatButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection:'row',
    alignItems:'center',gap:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chatText: {
    color: 'green',
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection:'row',
    alignItems:'center',gap:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  callText: {
    color: 'green',
    fontWeight: '600',
  },
});
