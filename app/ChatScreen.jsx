import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio, Video } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';

export default function ChatScreen({ navigation }) {
  const { id, name, image } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(null);
  const [playingSound, setPlayingSound] = useState(null);
  const [clipMenuVisible, setClipMenuVisible] = useState(false);
  const [mediaView, setMediaView] = useState(null);
  const videoRef = useRef(null);

  const sendMessage = (newMessage) => {
    setMessages((prev) => [
      { id: Date.now().toString(), ...newMessage },
      ...prev,
    ]);
    setInputText('');
    setClipMenuVisible(false);
  };

  const onSendText = () => {
    if (inputText.trim().length === 0) return;
    sendMessage({ type: 'text', text: inputText.trim() });
  };

  const pickGallery = async () => {
    setClipMenuVisible(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        if (asset.type === 'image') sendMessage({ type: 'image', uri: asset.uri });
        else if (asset.type === 'video') sendMessage({ type: 'video', uri: asset.uri });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to pick media');
    }
  };

  const takeCamera = async () => {
    setClipMenuVisible(false);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        if (asset.type === 'image') sendMessage({ type: 'image', uri: asset.uri });
        else if (asset.type === 'video') sendMessage({ type: 'video', uri: asset.uri });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const pickDocument = async () => {
    setClipMenuVisible(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        sendMessage({ type: 'document', name: result.name });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

 const getAudioPermission = async () => {
  const { status } = await Audio.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Audio recording permission needed');
    return false;
  }
  return true;
};

const startRecording = async () => {
  if (recording) {
    console.log("Already recording!");
    return;
  }

  const hasPermission = await getAudioPermission();
  if (!hasPermission) return;

  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await rec.startAsync();

    setRecording(rec);
    console.log('Recording started');
  } catch (error) {
    console.error('Failed to start recording:', error);
    Alert.alert('Error', 'Failed to start recording');
  }
};

const stopRecording = async () => {
  if (!recording) return;

  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped. URI:', uri);
    if (uri) {
      sendMessage({ type: 'audio', uri });
    }
  } catch (error) {
    console.warn('Non-critical error stopping recording:', error);
  } finally {
    setRecording(null);
  }
};



  const playAudio = async (uri) => {
    try {
      if (playingSound) {
        await playingSound.unloadAsync();
        setPlayingSound(null);
      }
      const { sound } = await Audio.Sound.createAsync({ uri });
      setPlayingSound(sound);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setPlayingSound(null);
          sound.unloadAsync();
        }
      });
    } catch (e) {
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const renderMediaModal = () => {
    if (!mediaView) return null;
    if (mediaView.type === 'image') {
      return (
        <Modal visible={true} transparent onRequestClose={() => setMediaView(null)}>
          <TouchableOpacity style={styles.mediaModal} activeOpacity={1} onPress={() => setMediaView(null)}>
            <Image source={{ uri: mediaView.uri }} style={styles.fullscreenMedia} resizeMode="contain" />
          </TouchableOpacity>
        </Modal>
      );
    } else if (mediaView.type === 'video') {
      return (
        <Modal visible={true} transparent onRequestClose={() => setMediaView(null)}>
          <View style={styles.mediaModal}>
            <Video
              ref={videoRef}
              source={{ uri: mediaView.uri }}
              style={styles.fullscreenMedia}
              useNativeControls
              resizeMode="contain"
              shouldPlay
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setMediaView(null)}>
              <MaterialIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  };

  const renderMessageItem = ({ item }) => {
    let content;
    switch (item.type) {
      case 'text':
        content = <Text style={styles.messageText}>{item.text}</Text>;
        break;
      case 'image':
        content = (
          <TouchableOpacity onPress={() => setMediaView({ type: 'image', uri: item.uri })}>
            <Image source={{ uri: item.uri }} style={styles.media} />
          </TouchableOpacity>
        );
        break;
      case 'video':
        content = (
          <TouchableOpacity onPress={() => setMediaView({ type: 'video', uri: item.uri })}>
            <Video source={{ uri: item.uri }} style={styles.media} resizeMode="cover" />
            <View style={styles.videoPlayIcon}>
              <MaterialIcons name="play-arrow" size={36} color="#fff" />
            </View>
          </TouchableOpacity>
        );
        break;
      case 'audio':
        content = (
          <TouchableOpacity style={styles.audioButton} onPress={() => playAudio(item.uri)}>
            <MaterialIcons name="play-arrow" size={24} color="black" />
            <Text style={{ color: 'black', marginLeft: 6 }}>Play Audio</Text>
          </TouchableOpacity>
        );
        break;
      case 'document':
        content = (
          <View style={styles.documentBubble}>
            <MaterialIcons name="insert-drive-file" size={24} color="#444" />
            <Text style={styles.documentText}>{item.name}</Text>
          </View>
        );
        break;
      default:
        content = null;
    }
    return <View style={styles.messageBubble}>{content}</View>;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <MaterialIcons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.headerImage} />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 12 }}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setClipMenuVisible(true)} style={styles.clipButton}>
          <MaterialIcons name="attach-file" size={28} color="#007AFF" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          multiline
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          onPressIn={startRecording}
          onPressOut={stopRecording}
          style={styles.micButton}
        >
          <MaterialIcons name="mic" size={24} color={recording ? 'red' : '#007AFF'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSendText}
          disabled={!inputText.trim()}
          style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
        >
          <MaterialIcons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {recording && (
        <View style={{ padding: 8, alignItems: 'center' }}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Recording...</Text>
        </View>
      )}

      {/* Clip Menu */}
      <Modal
        animationType="slide"
        transparent
        visible={clipMenuVisible}
        onRequestClose={() => setClipMenuVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setClipMenuVisible(false)}>
          <View style={styles.clipMenu}>
            <TouchableOpacity style={styles.clipMenuItem} onPress={pickGallery}>
              <MaterialIcons name="photo-library" size={28} color="#007AFF" />
              <Text style={styles.clipMenuText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clipMenuItem} onPress={takeCamera}>
              <MaterialIcons name="photo-camera" size={28} color="#007AFF" />
              <Text style={styles.clipMenuText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clipMenuItem} onPress={pickDocument}>
              <MaterialIcons name="description" size={28} color="#007AFF" />
              <Text style={styles.clipMenuText}>Document</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Media modal */}
      {renderMediaModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerImage: { width: 42, height: 42, borderRadius: 21, marginLeft: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 12, color: '#222' },
  messageBubble: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginVertical: 6,
    maxWidth: '75%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor:'#ccc',
    padding:5
  },
  messageText: { color: 'black', fontSize: 16 },
  media: { width: 200, height: 200, borderRadius: 14, backgroundColor: '#ddd' },
  videoPlayIcon: {
    position: 'absolute',
    top: '40%',
    left: '42%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    padding: 4,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  documentBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  documentText: { marginLeft: 8, color: '#444', fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    fontSize: 16,
    marginHorizontal: 8,
  },
  sendButton: {
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    padding: 6,
    marginRight: 4,
  },
  clipButton: {
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  clipMenu: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  clipMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  clipMenuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  mediaModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenMedia: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 6,
  },
});
