import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from './screens/login';
import { register } from './screens/register';
import { home } from './screens/homescreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="register"
        component={register} 
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;