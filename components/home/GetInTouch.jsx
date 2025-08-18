import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const actions = [
  { icon: 'call', type: MaterialIcons, label: 'Call' },
  { icon: 'chatbubble-ellipses', type: Ionicons, label: 'Chat' },
  { icon: 'file-alt', type: FontAwesome5, label: 'Detail Report' },
];

const GetInTouch = () => {
  const handlePress = (label) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log(`Tapped on: ${label}`);
  };

  const scales = useRef(actions.map(() => new Animated.Value(0.8))).current;
  const opacities = useRef(actions.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = actions.map((_, index) =>
      Animated.parallel([
        Animated.timing(scales[index], {
          toValue: 1,
          duration: 700,
          delay: index * 150,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacities[index], {
          toValue: 1,
          duration: 700,
          delay: index * 150,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(150, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Get In Touch</Text>
      <View style={styles.iconContainer}>
        {actions.map((item, index) => {
          const IconComponent = item.type;

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handlePress(item.label)}
            >
              <Animated.View
                style={[
                  styles.item,
                  { transform: [{ scale: scales[index] }], opacity: opacities[index] },
                ]}
              >
                <View style={styles.iconWrapper}>
                  <IconComponent name={item.icon} size={22} color="green" />
                </View>
                <Text style={styles.label}>{item.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default GetInTouch;

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: '#333' },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE9D9',
    padding: 15,
    borderRadius: 10,
  },
  item: { alignItems: 'center', flex: 1 },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: { fontSize: 14, fontWeight: '500', color: '#333' },
});
