import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Image,Dimensions,Modal,Linking,Pressable } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker,Polyline,Callout } from 'react-native-maps';
import Icon1 from 'react-native-vector-icons/Entypo';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LocationSearch({route}) {
  const navigation = useNavigation();
  const {url} = React.useContext(AuthContext)
  const item = route.params
  const [modalVisible, setModalVisible] = React.useState(false);
  const [UserData, setUserData] = useState({latitude : 31.6255961,longitude : 74.8330977});
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState( {latitude : 31.6255961,longitude : 74.8330977});
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
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

 useEffect(() => {
  (async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, Try again on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      updateCoordinates(location.coords.longitude,location.coords.latitude);
      setCoords({latitude:location.coords.latitude,longitude:location.coords.longitude});
  })();
}, []);


useEffect(()=>{
  var handle=setInterval( () => {
    CallUserUpdate(item.email);
    updateCoordinates(location.coords.longitude,location.coords.latitude);
    lineLocationUpdate(location);
  },4000);    

  return ()=>{
    clearInterval(handle);
  }
});

// console.log(UserData)
  async function updateCoordinates(long,lat){
    fetch(url+"/order/food-delivery-update-cooardinates/",{
      method: 'PUT',
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'email':await AsyncStorage.getItem("email"),
      'longitude':long,
      'latitude':lat,
       
  }})
  }

  async function CallUserUpdate(email){
    fetch(url+"/order/user-deliveryAgency-info/?format=json",{
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'email': email,
      'Content-Type': 'application/json'}})
    
      .then(response => response.json())
      .then(response => {
        setUserData(response)
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  const update = async (id,status) => {
    fetch(url+'/order/food-delivery-update/',{
      method: 'PUT',
      headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'id':id,
      'update':status,
  }})
  .then(setModalVisible(!modalVisible),navigation.navigate('Delivery Agenct Portal'))
  }


function lineLocationUpdate(location){
  if(typeof location !== 'undefined' && location !== null){
  setCoordinates([{
    
    latitude : location.coords.latitude,
    longitude: location.coords.longitude
  },
  {
    latitude: Number(UserData.latitude),
    longitude: Number(UserData.longitude),
  }])
}
}

  return (
    <View style={styles.container}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirming Delivery</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => update(item.id,true)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Icon1 onPress={()=>{Linking.openURL(`tel:${item.mobile}`);}} name="phone" size={38} style={{zIndex:1,color:'white',backgroundColor:'#329ea8',position:'absolute',bottom:40,right:40,borderRadius:40,padding:10}} color="black" ></Icon1>
      <Icon1 onPress={()=>setModalVisible(true)} name="home" size={30} style={{zIndex:1,color:'white',backgroundColor:'#329ea8',position:'absolute',top:height/3.3,right:6,borderRadius:10,padding:10}} color="black" ><Text> deliver</Text></Icon1>
      <View style={{flex:4}}>
      <View style={{backgroundColor:'#329ea8'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:28,color:'white'}}>#Order no.</Text>
        <Text style={{fontSize:28,marginLeft:30,color:'white'}}>{item.order}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:20,color:'white'}}>
        <Text style={{fontSize:24,marginLeft:20,color:'white'}}>Name</Text>
        <Text style={{fontSize:24,marginLeft:80,textTransform:'uppercase',color:'white'}}>{item.name}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10,color:'white'}}>
        <Text style={{fontSize:24,marginLeft:20,color:'white'}}>Address</Text>
        <Text style={{fontSize:24,marginLeft:57,width:200,color:'white'}}>{item.address}</Text>
        </View>
        <Text style={{}}></Text>

        </View>
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
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.1092,
      longitudeDelta: 0.1151 * ASPECT_RATIO,
      
    }}
      >
        
       <Marker  
            coordinate={coordinates[0]}  
            
            title="Delivery Agent"

            description={"Reaching at your location with delicious food"}  
            
          ><Image source={require('./assets/delivery_scooter.png')} style={{height: 38, width:38 }} /></Marker>  
          <Marker  
          description={item.address}  
            coordinate={coordinates[1]}  
            title={item.name}  
            description={item.address}  
          ><Image source={require('./assets/home.png')} style={{height: 38, width:38 }} />
            </Marker> 
          
          
        <Polyline
          coordinates={coordinates}
          strokeColor="#000" 
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />
      </MapView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:300,
    height:200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontSize:17,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:30,
    marginBottom: 15,
    textAlign: "center"
  }
});
