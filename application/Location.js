import React, { useState, useEffect } from 'react';
import { Platform, Text,Image, View, StyleSheet,Dimensions,FlatList } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, CalloutSubview,Polyline } from 'react-native-maps';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

export default function LocationSearch({route}) {
  const ordernumber = route.params.orderstatus
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Data,setData] = useState(null);
  const [DA,setDA] = useState(null);
  const [coords, setCoords] = useState( {longitude : 74.872261,latitude : 31.633980});
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  
  const {url,deliveryUpdate} = React.useContext(AuthContext)
  const [coordinates,setCoordinates] = useState([
    {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
    {
      latitude: 31.6255961,
      longitude: 74.5320943,
    },
  ]);


  

  async function fetchApiCallOrders(){
    fetch(url+"/order/user-food-update/?format=json",{
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'order':ordernumber,
      // 'order':'FoodApp#440009',
      'Content-Type': 'application/json'}})
    
      .then(response => response.json())
      .then(response => {
        setData(response)
      })
      .catch(err => {
        console.log(err);
      });
  }
  async function daCall(email){
    fetch(url+"/order/user-deliveryAgency-info/?format=json",{
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'email': email,
      'Content-Type': 'application/json'}})
    
      .then(response => response.json())
      .then(response => {
        setDA(response)
      })
      .catch(err => {
        console.log(err);
      });
  }



  useEffect(()=>{
    var handle=setInterval( () => {
      fetchApiCallOrders();
      if(Data !== null){
        if(Data[0].order.pick_up_by != '')
        {
        daCall(Data[0].order.pick_up_by);
      }
      if(Data[0].order.order_delivered === true)
        {
          deliveryUpdate(true)
      }
      }
      lineLocationUpdate();
    },2000);    

    return ()=>{
      clearInterval(handle);
    }
  });


  
  function lineLocationUpdate(){
    if(typeof DA !== 'undefined' && DA !== null){
    setCoordinates([{
      
      latitude : coords.latitude,
      longitude: coords.longitude
    },
    {
      latitude: Number(DA.latitude),
      longitude: Number(DA.longitude),
    }])
  }
  }

  // console.log(Data,DA)
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, Try again on your device!'
        );
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoords({latitude:location.coords.latitude,longitude:location.coords.longitude})
    })();
  }, []);

  let text = 'Waiting..';
  let longitude;
  let latitude;
  
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    longitude = location.coords.longitude
    latitude = location.coords.latitude
    text = JSON.stringify(location);
  }

  return (

    <ScrollView style={styles.container}>
      {(() => { if(Data !== null){
         return <View>
           <View style={{borderColor:'grey',borderWidth:1,alignContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:40,marginTop:40}}>{Data[0].order.invoice_no}</Text>
         </View>
         <Text style={{fontSize:20,marginTop:10}}> {(() => {if(Data[0].order.order_delivered){
           return 'Order Deliverd'
         }else{
           return 'Your Order in the way'
         }
         })()}</Text>
         <View style={{borderColor:'grey',borderWidth:1}}>
         <Text style={{fontSize:27,marginTop:10}}>Address: {Data[0].order.address}</Text>
         </View>
         <View style={{flex:1,flexDirection:'row',marginTop:-2}}>
         <View style={{borderColor:'grey',borderWidth:1,width:140,alignItems:'center',alignContent:'center'}}>
         <Text style={{fontSize:20,marginTop:10}}>{(() => {if(Data[0].order.rest_approval){
           return 'Restaurant Accepted Your Order'
         }else{
           return 'Waiting for Restaurant Approval'
         }
         })()}</Text>
         </View>

         <View style={{borderColor:'grey',borderWidth:1,width:140,alignItems:'center',alignContent:'center'}}>
         <Text style={{fontSize:20,marginTop:10}}>{(() => {if(Data[0].order.order_picked){
           return 'Order PickedUp'
         }else{
           return 'Order not PickedUp Yet'
         }
         })()}</Text>
         </View>
         
         <View style={{borderColor:'grey',borderWidth:1,width:140,alignItems:'center',alignContent:'center'}}>
         <Text style={{fontSize:20,marginTop:10}}>{(() => {if(Data[0].order.paid){
           return 'allready Paid'
         }else{
           return 'Cash On delivery'
         }
         })()}</Text>
         </View>
         </View>
         {(() => {if(DA !== null){
           return <Text style={{fontSize:20,marginTop:10}}>Delivery Agent Name {DA.full_name}</Text>
         }
         })()}
    
         {(() => {if(DA !== null){
           return <Text style={{fontSize:20,marginTop:10}}>Delivery Agent mobile {DA.mobile}</Text>
         }
         })()}

         
 
 
         </View>

      }
      
      })()}
      
        <MapView style={styles.map} 
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
      initialRegion={{
      latitude: coordinates[0].latitude,
      longitude: coordinates[0].longitude,
      latitudeDelta: 0.1092,
      longitudeDelta: 0.10151 * ASPECT_RATIO,
      
    }}
      >
          <Marker coordinate={coords}>
            
          <Callout style={styles.plainView}>
            <View>
              <Text>My Location</Text>
            </View>
          </Callout>
          
        </Marker>
        
            <Marker coordinate={coordinates[1]}>
            
<Image source={require('./assets/delivery_scooter.png')} style={{height: 37, width:37 }} />

          <Callout >
            <View>
              {(() => {
                if(typeof DA !== 'undefined' && DA !== null){
                  return <Text>{DA.full_name}</Text>
                }
                else {
                 return <Text>Delivery Agency</Text>
                }
              })()}
              
            </View>
          </Callout>
        </Marker>
        {(() => {
          if(DA != null && typeof DA != 'undefined'){
            return <Polyline
          coordinates={coordinates}
          strokeColor="#000" 
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />
          }
        })()}
        
      </MapView>
    
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
  },
});
