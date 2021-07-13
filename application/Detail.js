import React ,{useEffect} from 'react';
import {StyleSheet, Text, Image,Dimensions,TextInput, View, ScrollView, Button } from 'react-native';
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
function Detail({route}){
  const {url} = React.useContext(AuthContext)
  const navigation = useNavigation();

    const item = route.params;
    let [Rest, setRest] = React.useState('')
    const fetchApiCallRestName = async () => {
    fetch(url+'/restaurant/'+item.restId+'/?format=json',{headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json'
  }})
      .then(response => response.json())
      .then(response => {
        setRest(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log(item.restId)
  useEffect(() => {
    fetchApiCallRestName()
  }, [])

  const [state,setState] = React.useState({qty:1 })
    return (  
        <View>
        <ScrollView style={styles.container,{marginTop:5} } >
        <View >
          <Image source={{uri:item.res_img}}  style={styles.imgsource} />
                  <View style={{position:'absolute',top:20}}>
                     <Text style={styles.imgText}>{Rest.name}</Text>
                  </View>
                  <View style={{height:40,backgroundColor:'black'}}>
                    <View style={{position:'absolute',}}><Text style={{fontSize:19,color:'yellow'}}><Icon name='star' type='font-awesome' size={17} color='yellow' />{Rest.res_avg_rating}/5</Text></View>
                  <Text style={{fontSize:19,fontWeight:'bold',color:'yellow',textAlign:'right'}}>{Rest.location}</Text>
                  </View>
                </View> 
        
         <Image source={{uri:item.img}}  style={{width:400, height:300,borderRadius:10}} />
         <Text style={{alignItems:'center',textAlign:'center',fontSize:40,marginBottom:10,}}>{item.name}</Text>
         <View style={{borderColor:'grey',borderWidth:2,flexDirection:'row'}}>
         <Text style={{fontSize:15,marginBottom:30,marginLeft:30}}>Description:</Text>
         <Text style={{fontSize:15,marginBottom:30,marginLeft:10}}>{item.desc}</Text>
         </View>
         <View style={{borderColor:'grey',borderWidth:2,flexDirection:'row',marginTop:-2}}>
         <Text style={{fontSize:15,marginBottom:30,marginLeft:30}}>Food Rating:</Text>
         <Text style={{fontSize:15,marginBottom:30,marginLeft:10}}>{item.food_rating}/5</Text>
         </View>
         <View><Button title='buy now' onPress={() => navigation.navigate('Restaurant',{name:Rest.name,rating:Rest.res_avg_rating,img:Rest.res_img,locaiton:Rest.location,rest_img:Rest.res_img})} /></View>
        </ScrollView>
        
        


        </View>
    )}

export default Detail;

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
  
