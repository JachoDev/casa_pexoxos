import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home';
import LogIn from '../views/LogIn';

const Stack = createNativeStackNavigator();

function AppRouter (): React.JSX.Element {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='LogIn'>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={Home} />
            
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default AppRouter;