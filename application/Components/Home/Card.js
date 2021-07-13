import { View, Text, Image,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import React ,{useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Stars from 'react-native-stars';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context' 

const Imgwidth =  Dimensions.get('window').width;

export default function CardHome(){

  const {url} = React.useContext(AuthContext)

    const navigation = useNavigation();
    let [Data, setData] = React.useState({refreshing:false})

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
            <ScrollView horizontal={true}>
            <FlatList horizontal={false}
                data={Data}
                renderItem={({item,index}) =>
                <View style={{minWidth:Imgwidth,alignItems:'center',borderWidth:10,borderColor:'white'}}>
                <TouchableOpacity  onPress={() => navigation.navigate('Restaurant',{name:item.name,rating:item.res_avg_rating,img:item.res_img,locaiton:item.location,restaurantname:item.name,rest_img:item.res_img})} >
                  <Image source={{uri:item.res_img}}  style={styles.imgsource} />
                  <View style={{position:'absolute',top:20}}>
                     <Text style={styles.imgText}>{item.location}</Text>
                  </View>
                  <View style={{height:70,borderWidth:1,borderColor:'gray',borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
                    <Text style={{fontSize:19}}>{item.name}</Text>
                    <Text style={{alignSelf: 'flex-end',marginTop:-20,flexDirection:'row'}}><Icon name='star' type='font-awesome' size={17} color='orange' />{item.res_avg_rating}/5</Text>
                    <Text style={{fontSize:19,fontWeight:'bold'}}>{item.location}</Text>
                  </View>
                  
                  {/* <Stars
                default={item.res_avg_rating}
                count={5}
                half={true}
                starSize={50}
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                /> */}
                
                </TouchableOpacity>
                </View>}  
                keyExtractor={(item,index) => index.toString()}
            />
            </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
      item: {  
          padding: 10,
      },
      myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      },
      imgText:{
        fontSize:12,
        elevation:10,
        backgroundColor:'yellow',
        padding:5,
        borderTopRightRadius:15,
        borderBottomRightRadius:15,
        color:'black',
      },
      imgsource:{
        width:Imgwidth-30,
        height:200,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
      }
  });


