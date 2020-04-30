import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

console.log('Stack');
console.log(Stack);

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#7159c1' },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen testID="Home" name="Home" component={Main} />
        <Stack.Screen
          name="User"
          component={User}
          options={{ title: 'Usuários' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
