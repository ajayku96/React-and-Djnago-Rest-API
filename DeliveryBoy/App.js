import React,{useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import {ActivityIndicator, View,Alert  } from 'react-native';
import { AuthContext } from './Components/context';
import RootStackScreen from './RootStackScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './Home';
import LocationSearch from './Location';

// const domain = 'https://efoods.seoservicespark.com'
const domain = 'http://192.168.1.3:5900'


const App = () => {

  const [isLoading,setIsLoading] = React.useState(true)
  const [userToken,setUserToken] = React.useState(null)
  const [usrType,setUserType] = React.useState(null)
  const [user,setUser] = React.useState(null)
  const [profileDetails,setProfileDetails] = React.useState([{'type':'other'}])


  function profile(token){
    // console.log(token)
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
  async function UserType(){ return await AsyncStorage.getItem("userType")}
  // profile('3b6af1b3e2ad724897053b199a526cb1cff9e0a8')
UserType().then((value) => setUserType(value))

  const authContext = React.useMemo(() => ({
    token:userToken,
    url:domain,
    email:user,
    
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
      setUser(username)
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
    signUp: (username,email,mob,name,password,password2) => {
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
      form.append("type", 'da')

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
        Alert.alert('Successfully Registered', 'Login Now', [
          {text: 'Okay'}
        ])
          } catch (error) {
       console.log("Something went wrong", error);
          }
      }
      else{
        setUserToken(null)
        Alert.alert('Unsuccessful', 'Kindly Check Your Input', [
          {text: 'Okay'}
        ])
        try {
          await AsyncStorage.setItem("userToken", null);
          await AsyncStorage.setItem('email', null);
          await AsyncStorage.setItem('userType',null)
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
      
  const Stack  = createStackNavigator();
  return(
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    { userToken !== null && usrType == "da" ? (
      <Stack.Navigator>
      <Stack.Screen name="Delivery Agenct Portal" component={HomeScreen}  />
      <Stack.Screen name="Route to User House" component={LocationSearch}  />
      </Stack.Navigator>
       )
       :
       <RootStackScreen />
       }
    </NavigationContainer>
    </AuthContext.Provider>
);
}
  
export default App;