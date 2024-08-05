import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ExpenseListScreen = () => {
  const expenses = []; // Replace with actual data

  return (
    <View>
      <Text>Expense List</Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}: {item.amount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ExpenseListScreen;
