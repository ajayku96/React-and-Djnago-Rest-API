import React ,{useEffect} from 'react';
import {StyleSheet, Text, Image,Dimensions,TextInput, View,FlatList, ScrollView,TouchableOpacity, Button } from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';
import { useNavigation } from '@react-navigation/native';

// import { Appbar } from 'react-native-paper';
// import { Rating, AirbnbRating } from 'react-native-elements';

import { Avatar, Badge, Icon, withBadge,Header } from 'react-native-elements'
const screenWidth = Dimensions.get('window').width;
const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;
function Orders({route}){
  const navigation = useNavigation();
  const {addCart,url} = React.useContext(AuthContext)

    const item = route.params;
    let [orders, setOrders] = React.useState()

    const fetchApiCallOrders = async () => {
    fetch(url+'/order/orders/?format=json',{headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'email':await AsyncStorage.getItem("email")
  }})
      .then(response => response.json())
      .then(response => {
        setOrders(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchApiCallOrders()
    }, [])
    return (  
        <View>
            <FlatList 
          data={orders}
          renderItem={({item,index}) => <View>
              <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Order Details',{ordernumber:item.invoice_no})}>
                
                <View style={{borderWidth:1,borderColor:'grey',margin:3,}}>
              
              
              
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:35}}>{item.invoice_no} </Text>
              {(() => {
                if(item.order_delivered == false && item.canceled == false){
                  return <TouchableOpacity onPress={() => navigation.navigate('Cart',{screen:'location',params:{"orderstatus":item.invoice_no}})}>
                   <Text style={{backgroundColor:'orange',color:'white',padding:4}}>Pending Delivery</Text>
                  </TouchableOpacity>
                }if(item.canceled == true && item.order_delivered == false){
                  return <Text style={{backgroundColor:'red',color:'white',padding:7}}>Order Canceled</Text>
                }
                else if(item.order_delivered == true){
                  return <Text style={{backgroundColor:'green',color:'white',padding:7}}>Order Delivered</Text>
                }
              })()}
              </View>
              {(()=> {
                  let x = new Date(`${item.updated}`);
                  let date = x.getDate();
                  let month = x.getMonth();
                  let year = x.getFullYear();
                  let h = x.getHours();
                  let m = x.getMinutes();
                  let s = x.getSeconds();
                  return <Text style={{fontSize:12}}>Order Created:    {date+'/'+month+'/'+year+'   '+h+':'+m+':'+s}</Text>
                }
                )()}
              {(()=> {
                  let x = new Date(`${item.created}`);
                  let date = x.getDate();
                  let month = x.getMonth();
                  let year = x.getFullYear();
                  let h = x.getHours();
                  let m = x.getMinutes();
                  let s = x.getSeconds();
                  if(item.created && item.order_delivered)
                  return <Text style={{fontSize:12}}>Order Delivered: {date+'/'+month+'/'+year+'   '+h+':'+m+':'+s}</Text>
                }
                )()}
                {(()=> {
                  let x = new Date(`${item.updated}`);
                  let date = x.getDate();
                  let month = x.getMonth();
                  let year = x.getFullYear();
                  let h = x.getHours();
                  let m = x.getMinutes();
                  let s = x.getSeconds();
                  if(item.canceled )
                  return <Text style={{fontSize:12}}>Canceled Time:  {date+'/'+month+'/'+year+'   '+h+':'+m+':'+s}</Text>
                }
                )()}

              </View>

              </TouchableOpacity>
              </ScrollView>
          </View>}  
          keyExtractor={(item,index) => index.toString()}
        />
            
        </View>
    )}

export default Orders;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
      },
      appbarheader : {
          alignItems: 'center',
      },
      image: {
        width: screenWidth - 20,
        height: 300,
        marginBottom: 5,
      },
      stepperContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: '#ccc',
      },
      itemContainer: {
        marginBottom: 20,
      },
      smallItemContainer: {
        marginBottom: 5,
      },
      mainText: {
        fontSize: 20,
      },
      subText: {
        fontSize: 14,
        color: '#3a3a3a',
      },
      priceText: {
        fontSize: 40,
        fontWeight: 'bold',
      },
      labelText: {
        fontSize: 18,
        color: '#303540',
      },
      stepperButton: {
        height: 20,
        width: 20,
      },
      stepperText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
      },
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgsource:{
      width:Imgwidth,
      height:(Imgheight)/8,
    },
    imgText:{
      fontSize:15,
      backgroundColor:'black',
      padding:8,
      color:'yellow',
      fontWeight:"bold"
    },
  });
