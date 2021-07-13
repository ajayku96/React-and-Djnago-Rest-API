import { Col, Row, Grid } from "react-native-easy-grid";
import {View, Text, Image, FlatList, ActivityIndicator,Dimensions, TouchableOpacity} from 'react-native';
import React,{useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ThreeGroupImg()

{
  const {url,signOut} = React.useContext(AuthContext)
  const navigation = useNavigation();
  let [restData, setrestData] = React.useState({isLoading:true})
  const width =  Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  async function fetchApiCall(){
    fetch(url+"/restaurant/?format=json",
    {
      headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json'
    }
    })
        .then(response => response.json())
        .then(response => {
          setrestData(response);

        })
        .catch(err => {
          console.log(err);
        });
    }
  useEffect(() => {
      fetchApiCall()
      }, [])


if(restData.isLoading)
{
  return(
  <View>
  <ActivityIndicator />
  </View>
  )
}
else{
  try{

  
  return(

    <View style={{minHeight:200,marginBottom:15}}>
      <Grid>
    <Col>
    <TouchableOpacity onPress={() => navigation.navigate('Restaurant',{name:restData[1].name,location:restData[1].location,rating:restData[1].res_avg_rating,rest_img:restData[1].res_img,restaurantname:'Cafe Coffee day'})} >
    <Image style={{height:200,width:width/2.1,borderRadius:10,marginTop:5,marginLeft:5}} source={{uri:restData[1].res_img}} />
    </TouchableOpacity>
    </Col>
    <Col>
        <Row>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurant',{name:restData[0].name,location:restData[0].location,rating:restData[0].res_avg_rating,rest_img:restData[0].res_img})} >
        <Image style={{height:97,width:width/2.06,borderRadius:10,marginTop:5}} source={{uri:restData[0].res_img}} />
        </TouchableOpacity>
        </Row>
        <Row>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurant',{name:restData[2].name,location:restData[2].location,rating:restData[2].res_avg_rating,rest_img:restData[2].res_img,restaurantname:'GoldFish'})} >
        <Image style={{height:97,width:width/2.06,borderRadius:10,marginTop:7}} source={{uri:restData[2].res_img}} />
        </TouchableOpacity>
        </Row>
    </Col>
</Grid>
</View>
  )
}
catch(error){
  signOut()
  return(
    <View>
      <Text>Error</Text>
    </View>
  )
}
}
}