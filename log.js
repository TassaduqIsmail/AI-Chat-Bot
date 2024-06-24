import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import mic from './src/assets/mic.png';
import sentmail from './src/assets/sentmail.png';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const VoiceInputButton = ({ onVoiceRecord, onSendPress, onInputTextChanged, inputText }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordButtonPress = () => {
    if (isRecording) {
      // Stop recording logic
      setIsRecording(false);
    } else {
      // Start recording logic
      setIsRecording(true);
    }
  };

  const shouldRenderSendButton = !!inputText || isRecording;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRecordButtonPress} style={styles.recordButton}>
        {isRecording ? (
          <Text style={styles.recordButtonText}>Recording...</Text>
        ) : (
          <Image
            source={mic}
            resizeMode="contain"
            style={{
              width: responsiveWidth(6),
              height: responsiveWidth(6),
              tintColor: '#fff',
            }}
          />
        )}
      </TouchableOpacity>

      <TextInput
        multiline
        placeholder="Type your message..."
        value={inputText}
        onChangeText={onInputTextChanged}
        style={styles.textInput}
      />

      {shouldRenderSendButton && (
        <TouchableOpacity onPress={onSendPress} style={styles.sendButton}>
          <Image
            source={sentmail}
            resizeMode="contain"
            style={{
              width: responsiveWidth(6),
              height: responsiveWidth(6),
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  recordButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  recordButtonText: {
    color: '#FFF',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 50,
  },
});

export default VoiceInputButton;
