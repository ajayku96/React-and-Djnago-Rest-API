import React ,{useEffect} from 'react';
import {StyleSheet, Text, Image,Dimensions,TextInput, View,FlatList, ScrollView, Button } from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';

// import { Appbar } from 'react-native-paper';
// import { Rating, AirbnbRating } from 'react-native-elements';

import { Avatar, Badge, Icon, withBadge,Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;
function OrderDetails({route}){
  const {addCart,url} = React.useContext(AuthContext)

    const item = route.params;
    let [orders, setOrders] = React.useState()
    let [total, setTotal] = React.useState(0)

    const fetchApiCallOrders = async () => {
    fetch(url+'/order/order-Details-for-user/?format=json',{headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'ordernumber':item.ordernumber
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
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20}}>Item:{index+1} </Text>
                    <Text style={{fontSize:20}}>{parseInt(item.price)} </Text>
                    <Text style={{fontSize:20}}>X </Text>
                    <Text style={{fontSize:20}}>{item.quantity} </Text>
                    <Text style={{fontSize:20}}>= </Text>
                  <Text style={{fontSize:20}}>{parseInt(item.price) * item.quantity}</Text>
                  </View>
                  {/* {(() => {
                    setTotal(total+(parseInt(item.price) * parseInt(item.quantity)))
                  })}
                  <Text> {total}</Text> */}
              </ScrollView>
          </View>}  
          keyExtractor={(item,index) => index.toString()}
        />
            {/* <Text>{total}</Text> */}
        </View>
    )}

export default OrderDetails;

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
