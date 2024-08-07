import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import AddExpenseScreen from './components/AddExpenseScreen';
import ExpenseListScreen from './components/ExpenseListScreen';
import CategoryChartScreen from './components/CategoryChartScreen';
import { View } from 'react-native';
import { WelcomeComponent, ExpenseButton, formatCurrency } from './AppModules';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add Expense" component={AddExpenseScreen} />
      <Tab.Screen name="Expenses" component={ExpenseListScreen} />
      <Tab.Screen name="Categories" component={CategoryChartScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  const handlePress = () => {
    console.log(formatCurrency(100)); // Ejemplo de uso de la función formatCurrency
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
