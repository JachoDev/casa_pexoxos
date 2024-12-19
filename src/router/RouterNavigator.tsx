import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home';
import LogIn from '../views/LogIn';
import Lodging from '../views/Lodging';
import Sales from '../views/Sales';
import User from '../views/User';
import Pets from '../views/Pets';
import Schedule from '../views/Schedule';

const Stack = createNativeStackNavigator();

function AppRouter (): React.JSX.Element {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="Lodging" component={Lodging} />
            <Stack.Screen name="Sales" component={Sales} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Pets" component={Pets} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default AppRouter;