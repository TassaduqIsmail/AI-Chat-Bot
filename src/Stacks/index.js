// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Chatscreen from '../Screens/Chatscreen';
import Categry from '../Screens/Categry';
import {useSelector} from 'react-redux';
import Language from '../Screens/Language';
import WritingTone from '../Screens/WritingTone';
import WritingStyle from '../Screens/WritingStyle';

const Stack = createNativeStackNavigator();

function Stacks() {
  const isVerified = useSelector(state => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isVerified ? (
          <>
            <Stack.Screen name="Categry" component={Categry} />
            <Stack.Screen name="Chatscreen" component={Chatscreen} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="WritingTone" component={WritingTone} />
            <Stack.Screen name="WritingStyle" component={WritingStyle} />
            
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}

        {/* <Stack.Screen name="Categry" component={Categry} />
        <Stack.Screen name="Chatscreen" component={Chatscreen} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="WritingTone" component={WritingTone} />
        <Stack.Screen name="WritingStyle" component={WritingStyle} />
        <Stack.Screen name="Activity" component={Activity} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Stacks;
