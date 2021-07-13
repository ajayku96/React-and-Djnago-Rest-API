import Swiper from 'react-native-swiper';
import React,{useEffect}from 'react'
import {Image,View,StyleSheet,Dimensions,Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context' 



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
console.log(screenHeight/3)





const Imgwidth =  Dimensions.get('window').width;



export default function SwiperImage(){

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
            // console.log(response)
          })
          .catch(err => {
            console.log(err);
          });
      }
    useEffect(() => {
        fetchApiCall()
        }, [])



        try{
    return(
<View style={{flex:1,height:screenHeight / 4}}><Swiper
        height={screenHeight/3.5}
        horizontal={true}
        autoplay={true}
        activeDotColor="#FF6347">
        <Image style={styles.imgswiper} source={{uri:Data[1].res_img}} />
        <Image style={styles.imgswiper} source={{uri:Data[0].res_img}} />
        <Image style={styles.imgswiper} source={{uri:Data[3].res_img}} />
        <Image style={styles.imgswiper} source={{uri:Data[2].res_img}} />
        <Image style={styles.imgswiper} source={{uri:Data[4].res_img}} />
        </Swiper>
    {/* <Text>{JSON.stringify(Data)}</Text> */}
    </View>
    ) }
catch{
    return(<View><Text>Loading</Text></View>)
}

}

const styles = StyleSheet.create({
imgswiper: {
    width: screenWidth,
    height: screenHeight / 4
}})