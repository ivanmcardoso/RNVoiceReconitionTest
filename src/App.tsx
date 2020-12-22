import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getVoicePermission } from './utils/getVoicePermission';
import Voice, { SpeechEndEvent, SpeechRecognizedEvent, SpeechResultsEvent } from '@react-native-community/voice';

export default function App() {

  const [isReconizing, setIsReconizing] = useState(false)
  const [speechValue, setSpeechValue] = useState("Diga algo")

  useEffect(()=>{
      Voice.onSpeechResults = (e:SpeechResultsEvent) => {
        if(!!e.value && e.value.length > 0) {
            setSpeechValue(e.value[0])
        } else {
          setSpeechValue("Por favor, repita.")
        }
      }
      Voice.onSpeechStart = () =>{
        setIsReconizing(true)
      }
      Voice.onSpeechEnd = () => {
        setIsReconizing(false)
      }
      return Voice.removeAllListeners()
  }, [])

  function onClick() {
    getVoicePermission().then(res=>{
      if(res === 'granted') {
        Voice.start('pt-BR')
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text>{speechValue}</Text>
      <Button title="gravar" onPress={onClick}/>
      {isReconizing && <Text>Escutando...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
