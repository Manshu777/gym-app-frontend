import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const dummyUsers = [
  { id: 1, name: 'Alice Johnson', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob Smith', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, name: 'Catherine Blake', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, name: 'David Lee', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 5, name: 'Ella Brown', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 6, name: 'Frank Wilson', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { id: 7, name: 'Grace Kim', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: 8, name: 'Harry Patel', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { id: 9, name: 'Isabella Rose', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: 10, name: 'Jack Miller', image: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { id: 11, name: 'Kara James', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { id: 12, name: 'Liam Davis', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: 13, name: 'Mia Scott', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
  { id: 14, name: 'Noah Reed', image: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { id: 15, name: 'Olivia Hill', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
  { id: 16, name: 'Paul Clark', image: 'https://randomuser.me/api/portraits/men/16.jpg' },
  { id: 17, name: 'Queenie Roy', image: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 18, name: 'Ryan Lewis', image: 'https://randomuser.me/api/portraits/men/18.jpg' },
  { id: 19, name: 'Sophia Green', image: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { id: 20, name: 'Tom Walker', image: 'https://randomuser.me/api/portraits/men/20.jpg' },
];



const Chat = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();


  const handleClear = () => {
    setSearch('')
  }

  return (
    <View style={{ padding: 15,backgroundColor:'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Text style={{ color: '#006FFD', fontSize: 18, fontWeight: '500' }}>Edit</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Chats</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#006FFD" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="black" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, fontSize: 16 }}
          placeholderTextColor="gray"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Feather name="x" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
  style={{ marginTop: 20 }}
  contentContainerStyle={{ paddingBottom: 100 }} 
>
  {dummyUsers.map(user => (
    <TouchableOpacity
      key={user.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
      onPress={() => router.push({
        pathname: '/ChatScreen',
        params: { id: user.id, name: user.name, image: user.image }
      })}

    >
      <Image
        source={{ uri: user.image }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, color: 'black' }}>{user.name}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>



    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
  }
})
