import React,{useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home'
import {ActivityIndicator, View,Alert  } from 'react-native';
import { AuthContext } from './Components/context';
import RootStackScreen from './RootStackScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestaurantOrders from './FoodRequests';
import RestaurantFoods from './ManageFoods';
import profilePage from './Profile';

import AddItems from './AddItems';


// const domain = 'https://efoods.seoservicespark.com'
// const domain = 'http://192.168.243.199:5900'
const domain = 'http://192.168.1.3:5900'

const stackApp = () => {

  const Stack  = createStackNavigator();
  return(
      <Stack.Navigator>
      <Stack.Screen name="Restaurant Manager" component={HomeScreen}  />
      </Stack.Navigator>
)}
const stackAppManger = () => {

  const Stack  = createStackNavigator();
  return(
      <Stack.Navigator>
      <Stack.Screen name="Manage Foods" component={RestaurantFoods}  />
      <Stack.Screen name="Add Food" component={AddItems} />
      </Stack.Navigator>
)}


const App = () => {

  const [isLoading,setIsLoading] = React.useState(true)
  const [userToken,setUserToken] = React.useState(null)
  const [usrType,setUserType] = React.useState(null)
  const [orders,setOrders] = React.useState(0)
  const [profileDetails,setProfileDetails] = React.useState(null)
  

  function profile(token){
    console.log(token)
    fetch(domain+"/profile/?format=json",
    {
      headers: {
        'Authorization': 'Token '+token,
        'Content-Type': 'application/json',
    }
    })
      .then(response => response.json())
      .then(async (response) => {
        setProfileDetails(response);
        try {
          await AsyncStorage.setItem('userType', response[0].type);
            } catch (error) {
         console.log("Something went wrong", error);
            }
      })
  }
  console.log(userToken)

  async function UserType(){ return await AsyncStorage.getItem("userType")}
UserType().then((value) => setUserType(value))

  const authContext = React.useMemo(() => ({
    token:userToken,
    url:domain,
    bottomOrderUpdate:(x) =>{
      setOrders(Object.keys(x).length)
    },

    setOrders:() => {

    },
    
    signIn: (username,password) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(username.length == 0 || password.length == 0){
        Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
          {text: 'Okay'}
        ])
      }
      else if(re.test(username) === false){
        Alert.alert('Wrong Input!', 'Enter Valid Email Address', [
          {text: 'Okay'}
        ])
      }
      else if(password.length < 8 ){
        Alert.alert('Wrong Input!', 'Password Cannot be less than 8 Character', [
          {text: 'Okay'}
        ])
      }
      else{
      console.log(username,password)
      const form = new FormData();
      form.append('username', username)
      form.append("password", password)

      fetch(domain+'/x/api/login',
        {
          method: 'post',
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          body:form
        }
      ).then(res=>res.json())
    .then(async (data) => 
    {if (typeof data.token != "undefined") {
      setUserToken(data.token);
      profile(data.token);
      try {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem('email', username);
        await AsyncStorage.setItem('userType',profileDetails[0].type)
          } catch (error) {
       console.log("Something went wrong", error);
          }
      }
      else{
        setUserToken(null)
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'}
      ])
        try {
          await AsyncStorage.setItem("userToken", null);
          await AsyncStorage.setItem('email', null);
          await AsyncStorage.setItem('userType',null)
            } catch (error) {
         console.log("Something went wrong", error);
         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'},
      ])
            }
        }
      }
    )
    }},
    signOut: async () => {
      Alert.alert('Signed Out Successfully','Thanks for using this Application!', [
        {text: 'Okay'}])
      try {
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("userType")
      } catch (error) {
        console.log(error)
      }
      setUserToken(null);
      setIsLoading(false);
      setProfileDetails([{'type':'other'}]);
    },
    signUp: (username,email,mob,name,password,password2,rtype) => {
      if(username.length == 0 || password.length == 0  || email.length == 0  || name.length == 0  || password.length == 0  || password2.length == 0){
        Alert.alert('Wrong Input!', 'No field can be empty.', [
          {text: 'Okay'}
        ])
      }
      else if( password != password2){
        Alert.alert('Wrong Input!', 'Passwords fields should be same', [
          {text: 'Okay'}
        ])
      }
      else
        if(mob.length != 10){
        Alert.alert('Wrong Input!', 'Invalid Mobile number', [
          {text: 'Okay'}
        ])
    }
    else{
      const form = new FormData();
      form.append('email', email)
      form.append('username', username)
      form.append('mobile',mob)
      form.append('full_name',name)
      form.append("password", password)
      form.append("password2", password2)
      form.append("type", 'man')

      fetch(domain+'/x/api/reg/',
        {
          method: 'post',
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          body:form
        }
      ).then(res=>res.json())
    .then(async (data) => {if (typeof data.token != "undefined") {
      setUserToken(data.token)
      profile(data.token);
      setIsLoading(false);
      try {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem('email', username);
        await AsyncStorage.setItem('userType',profileDetails[0].type)
          } catch (error) {
       console.log("Something went wrong", error);
          }
      }
      else{
        setUserToken(null)
        try {
          await AsyncStorage.setItem("userToken", null);
          await AsyncStorage.setItem('email', null);
          await AsyncStorage.setItem('userType',null)
          Alert.alert('Successfully Registered', 'Login Now', [
            {text: 'Okay'}
          ])
            } catch (error) {
         console.log("Something went wrong", error);
            }
        }
      })
    }},
  }))

  useEffect(() => {
    setTimeout( () => {setIsLoading(false)},200),
    setUserToken( async () => await AsyncStorage.getItem("userToken"),
    )
  },[])

  if (isLoading){
    return(
      <View style={{ flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#00ff00" />
          </View>
    );
  } 
  console.log(orders)
      
  const Tab  = createBottomTabNavigator();
  return(
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    {typeof userToken !== 'undefined' && usrType == "man" ? (
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } 
            else if (route.name === 'Manage') {
              iconName = 'pizza';
            }
            else if (route.name === 'Food Requests') {
              iconName = 'fast-food';
            }
            else if (route.name === 'Profile') {
              iconName = 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={stackApp} options={{headerShown: false}} />
        <Tab.Screen name="Manage" component={stackAppManger}/>
        <Tab.Screen name="Food Requests" component={RestaurantOrders} />
        <Tab.Screen name="Profile" component={profilePage} />
      </Tab.Navigator>
       )
       :
       <RootStackScreen />
       }
    </NavigationContainer>
    </AuthContext.Provider>
);
}
  
export default App;