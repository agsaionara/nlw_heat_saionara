import React, {useState} from 'react';
import {
  Alert,
  TextInput,
  View,
  Keyboard
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){
  const [message, setMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();
   

    if(messageFormatted.length>0){
      setSendMessage(true);
      await api.post('/messages', {message: messageFormatted});

      setMessage('');
      Keyboard.dismiss();
      setSendMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
    }else{
      Alert.alert("Escreva a messagem para enviar.")
    }
    
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance='dark'
        placeholder="Qual a sua expecticativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        maxLength={140}
        onChangeText={setMessage}
        value = {message}
        style={styles.input}
        editable={!sendMessage}
      />


      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendMessage}
        onPress = {handleMessageSubmit}
      />

    </View>
  );
}