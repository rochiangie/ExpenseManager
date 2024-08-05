import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = () => {
    // Logic to add expense
  };

  return (
    <View>
      <Text>Add Expense</Text>
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Add" onPress={handleAddExpense} />
    </View>
  );
};

export default AddExpenseScreen;
