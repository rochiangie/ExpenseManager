import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
      <Button title="View Expenses" onPress={() => navigation.navigate('ExpenseList')} />
      <Button title="View Category Chart" onPress={() => navigation.navigate('CategoryChart')} />
    </View>
  );
};

export default HomeScreen;
