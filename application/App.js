import React,{useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Detail from './Detail'
import HomeScreen from './Home'
import Cart from './Cart'
import Search from './Search'
import Restaurant from './restaurant'
import LocationSearch from './Location';
import Orders from './MyOrder';
import {ActivityIndicator, View,Alert  } from 'react-native';
import { AuthContext } from './Components/context';
import RootStackScreen from './RootStackScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchOptions from './Components/Home/searchOption';
import SlideDownIconSearch from './SlideDownIconSearch';
import Profile from './Profile';
import OrderDetails from './OrderData'
// const domain = 'https://efoods.seoservicespark.com'
const domain = 'http://192.168.1.3:5900'
const stackApp = () => {

  const Stack  = createStackNavigator();
  return(
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="SearchOptions" component={SearchOptions} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="SlideDownIconSearch" component={SlideDownIconSearch} options={{headerShown: false}}/>
      </Stack.Navigator>
)}


const ProfileStack = () => {

  const Stack  = createStackNavigator();
  return(
      <Stack.Navigator>
      <Stack.Screen name="Profile View" component={Profile} />
      <Stack.Screen name="My Orders" component={Orders} />
      <Stack.Screen name="Order Details" component={OrderDetails} />
      </Stack.Navigator>
)}


const cartStack = () => {

  const Stack  = createStackNavigator();
  return(
      <Stack.Navigator>
      <Stack.Screen name="My Cart" component={Cart} headerShown={false}/>
      <Stack.Screen name="location" component={LocationSearch} />
      </Stack.Navigator>
)}



const App = () => {

  const [isLoading,setIsLoading] = React.useState(true)
  const [userToken,setUserToken] = React.useState(null)
  const [itemdetail,setItemdetail] = React.useState([])
  const [cart,setCart] = React.useState([])
  const [isDelivered,setIsDelivered] = React.useState(false)

  
  async function cartCall(id){
    fetch(domain+"/foodCart/?format=json",
    {
      headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json',
        'data':[Object.keys(id)],
    }
    })
      .then(response => response.json())
      .then(response => {
        setCart(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log(itemdetail)
  const authContext = React.useMemo(() => ({

    token:userToken,
    url:domain,

    deliveryUpdate: (status) => {
      setIsDelivered(status)
    },
    orderDeliveryStatus:isDelivered,

   
    cartItems: itemdetail,
    setCartItems:setItemdetail,
    cartData:cart,
    addCart: (id,resname) => {
      setItemdetail(id)
      cartCall(id,resname)
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
    .then(async (data) => {if (typeof data.token != "undefined") {
      setUserToken(data.token)
      try {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem('email', username);
          } catch (error) {
       console.log("Something went wrong", error);
          }
      }
      else{
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'}
      ])
        setUserToken(null)
        }
      })
    }
  },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("email")
      } catch (error) {
        console.log(error)
      }
      setUserToken(null);
      setIsLoading(false);
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
      if(rtype == true){
        form.append("type", 'man')
      }
      else{
        form.append("type",'cus')
      }

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
      setIsLoading(false);
      try {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem('email', username);
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
        }
      })
    }},
  }))
  useEffect(() => {
    setTimeout( () => {
      setIsLoading(false);}
      ,100),
      setUserToken( async () => await AsyncStorage.getItem("userToken"));
  },[])

  if (isLoading){
    return(
      <View style={{ flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large" color="#00ff00" />
          </View>
    );
  }
  const Tab  = createBottomTabNavigator();
  return(
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    { userToken !== null ? (
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }
            else if (route.name === 'Cart') {
              iconName = 'cart';
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
        <Tab.Screen name="Search" component={Search} />
        {/* <Tab.Screen name="location" component={LocationSearch} /> */}
        {/* <Tab.Screen name="Orders" component={Orders} /> */}
        <Tab.Screen name="Cart" component={cartStack} options={{ tabBarBadge:Object.keys(itemdetail).length }}/>
        <Tab.Screen name="Profile" component={ProfileStack}/>
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