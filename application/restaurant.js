import React,{useEffect} from 'react';
import { FlatList, StyleSheet, Text, Image,Button, View, TouchableOpacity,ScrollView,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';
import { Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;
import {SimpleStepper} from 'react-native-simple-stepper';


function Restaurant({route}){
  var resData = route.params;
  const [state,setState] = React.useState({search:null})
  const {url,cartItems,addCart} = React.useContext(AuthContext)
  
    let [Data, setData] = React.useState()
    let [qty,setQty] = React.useState()
    let [resName,setResName] = React.useState()
    let [finalresName, setFinalResName] = React.useState()
    let [finalQty,setFinalQty] = React.useState()
    let [showtext,setShowText] = React.useState(false)
    const x = qty
    const y = resName

    function finalquan(x){
      if(typeof(x) !== 'undefined' && x != null){
        if(Object.keys(x).length === 0){
          return false;
        }
        else{
          return true;
        }
        
      }
      else{
        
        return false;
      }
    }

    async function fetchApiCall(){
        fetch(url+"/restfoodlist/?format=json",{
        headers: {
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'application/json',
          'data':resData.name,
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


        useEffect(() => {
          for(var key in x) {
            if(x[key] === 0) delete x[key];
          }
          for(var key in y){
            if(y[key] === 0) delete y[key];
          }
          setFinalQty(x)
          setFinalResName(y)
          setShowText(finalquan(x))
          
       },
        [qty]);

       console.log(finalresName)
const { search } = state;

  return(  
    <View style={styles.container}>
        <View >
        <Image source={{uri:resData.rest_img}}  style={styles.imgsource} />
        <View style={{position:'absolute',top:20}}>
           <Text style={styles.imgText}>{resData.name}</Text>
        </View>
        <View style={{height:40,backgroundColor:'black'}}>
          <View style={{position:'absolute',}}><Text style={{fontSize:19,color:'yellow'}}><Icon name='star' type='font-awesome' size={17} color='yellow' />{resData.rating}/5</Text></View>
        <Text style={{fontSize:19,fontWeight:'bold',color:'yellow',textAlign:'right'}}>{resData.location}</Text>
        </View>
        </View> 
          
        <FlatList 
            data={Data}
            renderItem={({item,index}) => <View style={{flex:1,justifyContent:'space-between'}}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Detail',{name:item.name,price:item.price,img:item.food_img,restName:item.res_name,restId:item.res_name.id})} > */}
          <View style={styles.card}>
            <View >
              <Image
                source={{uri:item.food_img}}
                resizeMode="cover"
                style={styles.image}
              />
            </View>

            <View style={styles.textContainer}>
              <View style={styles.container}>
                <Text numberOfLines={0} style={styles.text}>{item.name.length < 12
                      ? `${item.name}`
                      : `${item.name.substring(0, 9)}...`}</Text>
                <View style={{marginRight:10,marginLeft:Imgwidth/5,position: 'absolute',zIndex:40}}>
         <SimpleStepper
            valueChanged={value => {
              const nextval = Number(value)
              setResName({...resName,[`${item.res_name.id}`]: nextval})
              setQty({...qty,[`${item.id}`]: nextval})
              
              } }
              showText={showtext}
              initialValue={0}
              minimumValue={0}
              maximumValue={5}
              
              containerStyle={{ backgroundColor: 'white', flexDirection: 'row', borderWidth: 1, borderRadius: 10, overflow: 'hidden', alignItems: 'center', borderColor: 'green' }}
              incrementImageStyle={{height:16,width:20}}
              decrementImageStyle={{height:16,width:20}}
              textStyle={{color:'red',fontSize:22,fontWeight:'bold'}}
              />
              </View >
              <View style={{marginLeft:Imgwidth/2.3,marginTop:-Imgheight/32,position: 'relative'}}>
              
              {(() => {
                if(Object.keys(cartItems).includes(item.id.toString())){
                  return <Button title='Update' color="#ff5c5c" onPress={() => addCart(finalQty,finalresName)}/>
                }
                else {
                  return <Button title='Add'onPress={() => addCart(finalQty,finalresName)}/>
                  
                }
              })()}
              </View>
             
              </View>
              
              <View style={styles.container1}>
      
                <Text style={styles.text1}>{item.category}</Text>
              </View>
              <View style={styles.place}>
                <Text style={styles.icon}>{item.res_name.location}</Text>
                <Text style={styles.icon}> | </Text>
                <Text style={styles.text1}>4 km</Text>
              </View>
              <View style={styles.place1}>
                <Icon1 style={styles.icon} name="star" size={15} color="black" />
                <Text style={styles.icon}>{item.food_rating}</Text>
                <Icon1 style={styles.icondot} name="dot-single" size={13} color="black" />
                <Text style={styles.icon}>39 min</Text>
                <Icon1 style={styles.icondot} name="dot-single" size={13} color="black" />
                <Icon2 style={styles.iconn} name="rupee" size={13} color="black" />
                <Text style={styles.text1}>{item.price}</Text>
              </View>
            </View>
          </View>
          {/* </TouchableOpacity> */}
            </View>}  
            keyExtractor={(item,index) => index.toString()}
        />
        
        </View>
        )}

export default Restaurant;





const styles = StyleSheet.create({
      imgText:{
        fontSize:15,
        backgroundColor:'black',
        padding:8,
        color:'yellow',
        fontWeight:"bold"
      },
      imgsource:{
        width:Imgwidth,
        height:(Imgheight)/8,
      },
      card: {
        flexDirection: 'row',
        padding: Imgwidth/50,
        margin:Imgwidth/90,
        width:Imgwidth/1.03,
        borderColor:'grey',
        borderWidth:1,
      },
      image: {
        width:Imgwidth/4,
        height:Imgheight/9,
        borderRadius:10
      },
      text: {
        fontWeight: 'bold'
      },
      text1: {
        color: 'grey'
      },
      iconn: {
        color: 'grey',
        position: 'relative',
        paddingTop: 3
      },
      icondot: {
        color: 'grey',
        position: 'relative',
        paddingRight: 2,
        paddingTop: 3
      },
      icon: {
        color: 'grey',
        paddingRight: 4,
      },
      textContainer: {
        paddingLeft: 20,
      },
      place: {
        flexDirection: 'row',
        paddingBottom: 10,
      },
      place1: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between'
      },
      container: {
        paddingBottom: 2,
        paddingTop: 1,
      },
      container1: {
        paddingBottom: 0,
      }
  });


