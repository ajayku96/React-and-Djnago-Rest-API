import React,{useEffect} from 'react';
import {SimpleStepper} from 'react-native-simple-stepper';
import { View ,Dimensions,TouchableOpacity,Text,FlatList,StyleSheet,Image,Button} from 'react-native';
import { AuthContext } from './Components/context';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationSearch from './Location';
import { useNavigation } from '@react-navigation/native';

const Imgwidth = Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;


export default function Cart(){
  const navigation = useNavigation();
  const {cartData,url,cartItems,setCartItems,addCart,cartView,cartOrMap} = React.useContext(AuthContext)
  let [orderstatus,setOrderStatus] = React.useState(false)
  let [login, setLoginData] = React.useState([])
  let [Data, setData] = React.useState([])
  let [qty,setQty] = React.useState()
  let x = cartItems
  let sum = 0
  var res_name = []
  var price = []

    

  // if(orderstatus != false){
  
  // }
console.log(orderstatus)
  async function orderCall(name,email,address,mobile,price,cartdata){
  const form = new FormData();
    form.append('email', email)
    form.append('full_name', name)
    form.append('phone', mobile)
    form.append('address', address)
    form.append('created_by', await AsyncStorage.getItem("email"))
    form.append('paid', false)
  
    fetch(url+'/order/create/',
      {
        method: 'post',
        headers:{
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'multipart/form-data',
          'items':Object.keys(cartdata),
          'price':price,
          'quantity':Object.values(cartdata),
          
        },
        body:form
  
      }
      ).then(res=>res.json())
      .then(response => setOrderStatus(response),setCartItems([]))
      // .then(async (res) => AsyncStorage.setItem('pendingOrder',res))
  
    }

  async function fetchApiCall(){
    fetch(url+"/profile/?format=json",{
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json'}})
    
      .then(response => response.json())
      .then(response => {
        setLoginData(response)
      })
      .catch(err => {
        console.log(err);
      });
  }
  

    useEffect(()=>{
      var handle=setInterval( () => {
        fetchApiCall()
      },1000);    
      return ()=>{
        clearInterval(handle);
      }
    });

console.log(Data)
  if(orderstatus == false){
    if(typeof cartData === 'undefined' || Object.keys(cartItems).length !== 0){
      var count = 0
      cartData.map(item => {
       sum = sum + (item.price * Object.values(cartItems)[count])
       price.push(item.price);
       res_name.push(item.res_name.id);
        count++;
      });
    }
  if(typeof cartData === 'undefined' || Object.keys(cartItems).length === 0 || cartView === false){
    return(
      <View style={{alignItems:'center',justifyContent:'center',textAlign:'center',marginTop:50}}>
      <View ><Text style={{fontSize:40}}>No Items In Cart</Text>
   </View>
    </View>
      )
  }
  
  else{
  return (  
      <View style={{padding:15,marginTop:0}}>
      
            <FlatList 
                  data={cartData}
                  renderItem={({item,index}) => <View>
    <Grid>      
      <Col>
        <View style={styles.card}>
          <View >
            <Image
              source={{uri:url+item.food_img}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      </Col>
      <Col>
        <Row>
          <Text numberOfLines = { 1 } ellipsizeMode = 'tail' style={styles.text}>{item.name.length < 16 ? `${item.name}` : `${item.name.substring(0, 14)}...`}</Text>
        </Row>
        <Row>
          <View style={styles.container1}>
            <Icon1 style={styles.icon} name="star" color="black" />
            <Text style={styles.icon}>{item.food_rating}</Text>
          </View>
          <View style={{marginLeft:30}}>
            <SimpleStepper
            valueChanged={value => {
            const nextval = Number(value)
            setQty({...qty,[`${item.id}`]: nextval})  
            } }
            showText={true}
            initialValue={Object.values(cartItems)[index]}
            minimumValue={0}
            maximumValue={5}
            
            containerStyle={{ backgroundColor: 'white', flexDirection: 'row', borderWidth: 1, borderRadius: 10, overflow: 'hidden', alignItems: 'center', borderColor: 'green' }}
            incrementImageStyle={{height:16,width:20}}
            decrementImageStyle={{height:16,width:20}}
            textStyle={{color:'red',fontSize:22,fontWeight:'bold'}}
            />
          </View>
        </Row>
        <Row>
          <View style={{flexDirection:'row',marginLeft:50}}>
          <Icon2 style={styles.iconn,{marginTop:8,fontSize:17}} name="rupee" size={13} color="black" />
                    <Text style={styles.text1}> {item.price}</Text>
                    <Text style={styles.text1}> x </Text>
                    
                    {(() => {
                      return <Text style={styles.text1}>{(Object.values(cartItems)[index])}</Text>
                    })()}
                    {/* <Text style={styles.text1}> = </Text> */}
          </View>
        
        </Row>
      </Col>
      <Col>
      <View style={{marginTop:40,alignItems:'center'}}>
      <Button style={{marginTop:40,height: 100}} color="#ff5c5c" title='X' onPress={() => {
        {(() => {
            if(x[item.id] === (Object.values(cartItems)[index])) 
            {
              delete x[item.id];
            }
            addCart(x)
        })()}
      }}></Button>
      <View style={{marginTop:10}}>
      {(() => {
            var x = item.price
            return  <View style={{flexDirection:'row-reverse'}}>
            <Text style={styles.text1}>{x*(Object.values(cartItems)[index])}</Text>
            <Icon2 style={styles.iconn,{marginTop:8,fontSize:17}} name="rupee" size={13} color="black" /> 
            </View>
          })()}
          </View>
      </View>
      </Col>
  </Grid>
                </View>}  
                  keyExtractor={(item,index) => index.toString()}
              />
              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
              <View style={{flexDirection:'row-reverse',marginLeft:40}}>
              <Text style={styles.text2}>{sum}</Text>
              <Icon2 style={{marginTop:8,fontSize:18,marginTop:10}} name="rupee" size={13} color="black" />
              <Text style={styles.text2}> = </Text>
              <Text style={styles.text2}>Total</Text>
              
          
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10,marginBottom:10}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
  
              <View>
                <Button title="order now" onPress={() => orderCall(login[0].full_name,login[0].email,login[0].address,login[0].mobile,price,cartItems) }></Button>
              </View>
              
              </View>
              
          )}
    
  }
else{
  if(cartView !== false){
  Object.keys(x).forEach(key => {
    delete x[key];
    addCart(x)
    cartOrMap(false)
  })}
  return(
    <View style={{flex:1,alignItems:'center'}}>
    <View>
    
    
    <Text style={{fontSize:30}}>Order Confirmed</Text>
    <Text>Your Order Number is {orderstatus}</Text>
    <TouchableOpacity style={{marginTop:30}} onPress={() => navigation.navigate('location',{"orderstatus":orderstatus})}>
    <View style={{borderWidth:1,borderColor:'grey',backgroundColor:'#12997a',borderRadius:20}}>
    <Text style={{fontSize:24}}>Click Here for Updates</Text>
    </View>
    </TouchableOpacity>
    </View>    
    
  </View>
  )
}

  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
  },
  text2:{
    color: 'black',
    fontSize:30
  },
    sectionStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      borderRadius: 5,
    },
    imageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
  imgText:{
    fontSize:15,
    backgroundColor:'black',
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
    width:Imgwidth/1.1,
    borderColor:'grey',
    borderWidth:1,
    borderBottomRightRadius:29,
    borderTopLeftRadius:29
  },
  image: {
    width:105,
    height:105,
    borderTopLeftRadius:30,
    borderBottomRightRadius:30,
  },
  text: {
    marginTop:8,
    fontWeight: 'bold',
    fontSize:20
  },
  text1: {
    color: 'black',
    fontSize:23
  },
  iconn: {
    color: 'grey',
    position: 'relative',
    paddingTop: 3
  },
  icon: {
    color: 'black',
    fontSize:19,
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
    justifyContent: 'flex-start'
  },
  container: {
    paddingBottom: 2,
    paddingTop: 8,
    flexDirection:'row',
  },
  container1: {
    marginTop:3,
    flexDirection:'row'
  }
});



           