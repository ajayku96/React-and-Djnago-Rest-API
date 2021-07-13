import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login';
import Register from './Register';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    
    <RootStack.Navigator >
        <RootStack.Screen name="login" component={Login} options={{
            headerShown:false,
          }}/>  
        <RootStack.Screen name="Register" component={Register} options={{
            title: 'Register',
            headerTitleAlign: 'center',
          }} />
    </RootStack.Navigator>
);

export default RootStackScreen;