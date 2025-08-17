import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";

export default function SwitchInfo() {
  const [activeTab, setActiveTab] = useState("About Me");

 
  const hobbies = [
    {
      title: "Football Coaches",
      description:
        "Experienced professionals focusing on technical skills, tactical awareness, and fitness. They help players of all levels develop their game and passion for football.",
    },
    {
      title: "Tennis",
      description:
        "Experts in technique and strategy, dedicated to improving your game. They offer personalized coaching to help players of all ages enhance their skills.",
    },
    {
      title: "Basketball",
      description:
        "Dynamic and experienced, focusing on skill development, game strategy, and teamwork. They tailor sessions to individual needs, fostering growth and sportsmanship.",
    },
  ];

 
  const certificates = [
    { id: 1, title: "Certified Sports Coach", image: "https://marketplace.canva.com/EAFtLMllF3s/1/0/1600w/canva-blue-and-gold-simple-certificate-zxaa6yB-uaU.jpg" },
    { id: 2, title: "Advanced Coaching Techniques", image: "https://marketplace.canva.com/EAFtLMllF3s/1/0/1600w/canva-blue-and-gold-simple-certificate-zxaa6yB-uaU.jpg" },
  ];

  return (
    <View style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        {["About Me", "Awards", "Certificates"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

  
      <ScrollView style={styles.contentContainer}>
        {activeTab === "About Me" && (
          <>
            <Text style={styles.aboutText}>
              I’m [Your Name], a dedicated coach with a passion for football, tennis, and basketball. 
              My journey spans from player to coach, focusing on skill development and personal growth. 
              I’m committed to helping athletes of all levels reach their full potential.
            </Text>

           
            <Text style={styles.hobbyHeader}>Hobbies:</Text>
            {hobbies.length > 0 ? (
              hobbies.map((hobby, index) => (
                <View key={index} style={styles.hobbyItem}>
                  <Text style={styles.hobbyTitle}>{hobby.title}</Text>
                  <Text style={styles.hobbyDescription}>{hobby.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noInfoText}>No information to display</Text>
            )}
          </>
        )}

{activeTab === "Awards" && (
          <>
            
            <Text style={styles.contentText}>
              Over the years, I’ve been honored with various awards for excellence in coaching and sports training, recognizing my commitment to developing athletes, innovative training methods, and significant contributions to youth sports.
            </Text>

            {certificates.map((award, index) => (
              <View key={index} style={styles.awardItem}>
                <Text style={styles.awardTitle}>{award.title}</Text>
                <Text style={styles.awardDescription}>{award.description}</Text>
                <Image source={{ uri: award.image }} style={styles.certificateImage} />
              </View>
            ))}
          </>
        )}

        {activeTab === "Certificates" && (
         <>
         
         <Text style={styles.contentText}>
         I’m [Your Name], a dedicated coach with a passion for football, tennis, and basketball. My journey spans from player to coach, focusing on skill development and personal growth. I’m committed to helping athletes of all levels reach their full potential.
         </Text>

         {certificates.map((award, index) => (
           <View key={index} style={styles.awardItem}>
             <Text style={styles.awardTitle}>{award.title}</Text>
             <Text style={styles.awardDescription}>{award.description}</Text>
             <Image source={{ uri: award.image }} style={styles.certificateImage} />
           </View>
         ))}
       </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "black",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    minHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  hobbyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hobbyItem: {
    marginBottom: 10,
  },
  hobbyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  hobbyDescription: {
    fontSize: 14,
    color: "#666",
  },
  noInfoText: {
    fontSize: 14,
    color: "red",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  awardItem: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  awardDescription: {
    fontSize: 14,
    color: "#666",
  },
  certificateItem: {
    alignItems: "center",
    marginBottom: 15,
  },
  certificateImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  awardItem: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  awardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  certificateItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  certificateDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  certificateImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
});
