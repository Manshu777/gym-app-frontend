import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';


import callimg from '../../assets/images/call.png';
import chatimg from '../../assets/images/chat.png';
import reportimg from '../../assets/images/report.png';

const GetInTouch = () => {
  const handlePress = (type) => {
    console.log(`Tapped on: ${type}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Get In Touch</Text>
      
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handlePress('Call')}>
          <Image source={callimg} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Chat')}>
          <Image source={chatimg} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('report')}>
          <Image source={reportimg} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetInTouch;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
    
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#FFE9D9',
    padding:15,
    borderRadius:10
  },
  icon: {
    width: 85, 
    height: 85,
    resizeMode: 'contain',
  },
});
