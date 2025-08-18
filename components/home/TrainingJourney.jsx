import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';


import assessmentIcon from '../../assets/images/assessment.png';
import goalIcon from '../../assets/images/goal.png';
import trainingIcon from '../../assets/images/training.png';
import checkinIcon from '../../assets/images/checkin.png';
import completionIcon from '../../assets/images/completion.png';

const trainingSteps = [
  {
    id: 1,
    title: 'Onboarding & Assessment',
    description: 'Trainees undergo an initial assessment (e.g., fitness level, goals, etc.) to tailor the training plan.',
    icon: assessmentIcon,
    bgColor: ['#FFE5B4', '#FFD194'],
  },
  {
    id: 2,
    title: 'Goal Setting & Planning',
    description: "Coaches design a customized training plan based on the trainee's goals, including workouts and diet plans.",
    icon: goalIcon,
    bgColor: ['#A1EAFB', '#80D8F7'],
  },
  {
    id: 3,
    title: 'Training & Monitoring',
    description: 'The app tracks key metrics (e.g., calories burned, weights lifted) and provides analytics to visualize progress.',
    icon: trainingIcon,
    bgColor: ['#FEB6C1', '#FC96A6'],
  },
  {
    id: 4,
    title: 'Check-Ins & Adjustments',
    description: 'Coaches tweak the training plan based on performance, feedback, and evolving goals.',
    icon: checkinIcon,
    bgColor: ['#D2B5FF', '#B299FF'],
  },
  {
    id: 5,
    title: 'Completion & Review',
    description: 'Trainees receive a certificate or badge for completing the training program.',
    icon: completionIcon,
    bgColor: ['#B6F9A6', '#97E586'],
  },
];

const TrainingJourney = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Training Journey</Text>

      <FlatList
        data={trainingSteps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.bgColor[0] }]}>
            <View style={[styles.iconContainer, { backgroundColor: item.bgColor[1] }]}>
              <Image source={item.icon} style={styles.icon} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewText}>View {'>>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TrainingJourney;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    padding: 22, 
    marginBottom: 14, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    width: 60, 
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  icon: {
    width: 36, 
    height: 36,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 18, 
    fontWeight: '700',
    color: '#222',
  },
  description: {
    fontSize: 14, 
    color: '#555',
    marginTop: 6,
  },
  viewButton: {
    marginTop:10,
    alignSelf: 'flex-end',
  },
  viewText: {
    color: 'black',
    fontWeight: '600', 
    fontSize: 16, 
  },
});
