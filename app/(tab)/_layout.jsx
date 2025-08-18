import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabRoot() {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#E53842",
      tabBarInactiveTintColor: "#8E8E93",
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 0,
        height: 60,
        borderRadius: 15,
        marginHorizontal: 20,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        
      },
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
     

{/* <Tabs.Screen
        name="profilenew"
        options={{
          title: "Profile new",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="users" color={color} />
          ),
        }}
      /> */}
       <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
