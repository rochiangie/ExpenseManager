import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RegisterScreen = () => {
  return (
    <View>
      <Text>Register Screen</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
      <TextInput placeholder="Confirm Password" secureTextEntry />
      <Button title="Register" onPress={() => {}} />
    </View>
  );
};

export default RegisterScreen;
