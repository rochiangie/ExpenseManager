import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const CategoryChartScreen = () => {
  const data = [
    // Replace with actual data
    { name: 'Food', amount: 50, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Transport', amount: 30, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <View>
      <Text>Category Chart</Text>
      <PieChart
        data={data}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default CategoryChartScreen;
