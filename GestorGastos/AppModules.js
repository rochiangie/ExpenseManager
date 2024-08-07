import React from 'react';
import { Text, View, Button } from 'react-native';

// Un componente simple
export const WelcomeComponent = () => (
  <View>
    <Text>Welcome to GestorGastos!</Text>
  </View>
);

// Función de utilidad
export const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toFixed(2)}`;
};

// Un componente con una función
export const ExpenseButton = ({ onPress }) => (
  <Button title="Add Expense" onPress={onPress} />
);
