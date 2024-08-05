import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveExpense = async (expense) => {
  try {
    const expenses = await AsyncStorage.getItem('expenses');
    const expensesArray = expenses ? JSON.parse(expenses) : [];
    expensesArray.push(expense);
    await AsyncStorage.setItem('expenses', JSON.stringify(expensesArray));
  } catch (e) {
    console.error(e);
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await AsyncStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
  } catch (e) {
    console.error(e);
  }
};
