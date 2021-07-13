import React,{useEffect} from 'react';
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';

export default function FlatlistHome(){

  const {url} = React.useContext(AuthContext)
  
  const navigation = useNavigation();
    let [Data, setData] = React.useState({refreshing:false})

    async function fetchApiCall(){
        fetch(url+"/food/?format=json",{
        headers: {
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'application/json'
      }})
        
          .then(response => response.json())
          .then(response => {
            setData(response);
          })
          .catch(err => {
            console.log(err);
          });
      }
    useEffect(() => {
        fetchApiCall()
        }, [])

    return(
        <View>
            <FlatList 
            horizontal
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
                data={Data}
                renderItem={({item,index}) => <View>
                <TouchableOpacity onPress={() => navigation.navigate('Detail',{name:item.name,price:item.price,img:item.food_img,restName:item.res_name.name,restId:item.res_name.id,res_img:item.res_name.res_img,desc:item.description,food_rating:item.food_rating})} >
                <View style={styles.item}>
                  
                  <Image source={{uri:item.food_img}}  style={{width:80, height:80,borderRadius:100}} />
                  <Text numberOfLines={0} style={{fontSize:14,textShadowRadius:12,elevation:6,textAlign:'center'}}>{item.name.length < 12
                      ? `${item.name}`
                      : `${item.name.substring(0, 9)}...`}</Text>
                </View>
                </TouchableOpacity>
                </View>}  
                keyExtractor={(item,index) => index.toString()}
            />
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
      item: {  
          padding: 10,
      },
  });


