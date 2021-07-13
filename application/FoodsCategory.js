import React ,{useEffect} from 'react';
import {StyleSheet, Text, Image,Dimensions,TextInput, View, ScrollView, Button } from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';

// import { Appbar } from 'react-native-paper';
// import { Rating, AirbnbRating } from 'react-native-elements';

import { Avatar, Badge, Icon, withBadge,Header } from 'react-native-elements'
const screenWidth = Dimensions.get('window').width;
const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;
function Detail({route}){
  const {addCart,url} = React.useContext(AuthContext)

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

  useEffect(() => {
    fetchApiCallRestName()
  }, [])

  const [state,setState] = React.useState({qty:1 })
  console.log(Rest)
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
         <Text style={{alignItems:'center',textAlign:'center',fontSize:50,marginBottom:30}}>{item.name}</Text>
         <Text style={{alignItems:'center',textAlign:'center',fontSize:60}}>Rs.{item.price*state.qty}/-</Text>
         <View style={{flexDirection:'column'}}>
<View style={{minWidth:280,marginLeft:5}}>
         <Button 
         title='Add to Cart'
         onPress={() => addCart(item.restId,item,state.qty,state.qty*item.price)}
          />
          </View>
          <View style={{maxWidth:130}}>
         <SimpleStepper
          valueChanged={value => {
            const nextValue = Number(value);
            setState({qty:nextValue})
  } }
          initialValue={1}
          minimumValue={1}
          maximumValue={5}
          showText={true}
          containerStyle={styles.stepperContainer}
          incrementImageStyle={styles.stepperButton}
          decrementImageStyle={styles.stepperButton}
          textStyle={styles.stepperText}
        />
    
          </View>
          </View>
        </ScrollView>
        
        


        </View>
    )}

export default FoodCategory;

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
  



//   <View><AirbnbRating
//             count={5}
//             reviews={["Bad ", "OK ", "Good ", "Very Good ","Amazing "]}
//             // defaultRating={1}
//             size={30}
//         /></View>