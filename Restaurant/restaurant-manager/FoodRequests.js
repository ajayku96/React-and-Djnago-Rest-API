import React,{useEffect} from 'react';
import { View,ScrollView,Button,Image,SafeAreaView,Dimensions,RefreshControl,StyleSheet,FlatList,TouchableOpacity,Text} from 'react-native';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import { Col, Row, Grid } from "react-native-easy-grid";
const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;


export default function RestaurantOrders(){
    const [orders,setOrders] = React.useState()
    const {url} = React.useContext(AuthContext) 


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApiCallFoodCat();
    wait(500).then(() => setRefreshing(false),setOrders([]));
  }, []);
  

  const update = async (id,name,email,phone,address,status) => {
    fetch(url+'/order/order-update/',{
      method: 'PUT',
      headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'id':id,
      'name':name,
      'email':email,
      'phone':phone,
      'address':address,
      'update':status,
  }})
  .then(fetchApiCallFoodCat())
  }
    const fetchApiCallFoodCat = async () => {
      fetch(url+'/order/restorders/?format=json',{headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json',
        'email':await AsyncStorage.getItem("email")
    }})
        .then(response => response.json())
        .then(response => {
            setOrders(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setTimeout(()=>{fetchApiCallFoodCat();},5000)

    


    if(typeof orders !== 'undefined')
    {
      return (  
        <View style={styles.container}>
                   <Text style={{marginTop:40,fontSize:24,textAlign:'center',borderColor:'red',borderWidth:3}}>All Pending Orders</Text>
                 <View style={styles.container}>
           <FlatList 
             data={orders}
             renderItem={({item,index}) => <View>
               <ScrollView>
                 <Grid style={{borderWidth:1,borderColor:'black',marginHorizontal:20,marginVertical:4}}>      
         <Col>
         <Row >
         <Text>{item.order.invoice_no}</Text>
         </Row>
         {(()=> {
           let x = new Date(`${item.order.created}`);
           let date = x.getDate();
           let month = x.getMonth();
           let year = x.getFullYear();
           let h = x.getHours();
           let m = x.getMinutes();
           let s = x.getSeconds();
           return <Text style={{fontSize:10}}>{date+'/'+month+'/'+year+'   '+h+':'+m+':'+s}</Text>
         }
         )()}
         
         <View style={{padding:10}}>
               <Image
                 source={{uri:item.product.food_img}}
                 resizeMode="cover"
                 style={styles.image}
               />
             </View>
             <Text style={{textAlign:'center',fontWeight:'bold'}}>{item.product.name}</Text>
         </Col>
         <Col>
         <Text style={{fontWeight:'bold'}}>
           Order Accept
         </Text>
         
         
         {(() => {
               if(item.order.rest_approval === true ) 
               {
                 return <Text style={{marginTop:30,fontWeight:'bold'}}>
                 Pickup Status
                </Text>
               }
           })()} 
         {(() => {
               if(item.order.rest_approval === true && item.order.order_picked === true) 
               {
                 return <Text style={{marginTop:21,fontWeight:'bold'}}>
                 Delivery Status
                </Text>
               }
               else if(item.order.order_delivered === true && item.order.order_picked === true){
                 return <Text style={{fontWeight:'bold',marginTop:10,color:'black'}}>Delivered</Text>
               }
           })()} 
         
         </Col>
         <Col>
         <View >
           <View style={{flexDirection:'row'}}>
         {(() => {
               if(item.order.rest_approval === false) 
               {
                 return <TouchableOpacity style={styles.appButtonContainernotapproved} onPress={() => update(item.order.id,item.order.full_name,item.order.email,item.order.phone,item.order.address,true)}><Text style={{fontWeight:'bold',textAlign:'center',color: "#fff"}}>  accept  </Text></TouchableOpacity>
               }
               else{
                 return <TouchableOpacity style={styles.appButtonContainer}><Text style={{fontWeight:'bold',textAlign:'center',color: "#fff"}}>accepted</Text></TouchableOpacity>
               }
           })()} 
           {(() => {
               if(item.order.rest_approval === true && item.order.order_picked === false) 
               {
                 return <TouchableOpacity onPress={() => update(item.order.id,item.order.full_name,item.order.email,item.order.phone,item.order.address,false)}><Icon1 style={styles.icondot} name="cross" size={34} color="black" /></TouchableOpacity>
               }
           })()} 
           </View>
           <Text style={{marginTop:12}}>
         {(() => {
               if(item.order.rest_approval === true && item.order.order_picked === false) 
               {
                 return <Text style={{fontWeight:'bold',textAlign:'center',color:'black'}}>  Not Picked Up  </Text>
               }
               else if(item.order.rest_approval === true && item.order.order_picked === true) {
                 return <Text style={{fontWeight:'bold',textAlign:'center',color:'black'}}>Picked Up</Text>
               }
           })()} 
           </Text>
           <Text style={{marginTop:20}}>
         {(() => {
               if(item.order.order_delivered === false && item.order.order_picked === true) 
               {
                 return <Text style={{fontWeight:'bold',textAlign:'center',color:'black'}}>  Not Delivered  </Text>
               }
               else if(item.order.order_delivered === true && item.order.order_picked === true){
                 return<View>
                 <Text style={{fontWeight:'bold',textAlign:'center',color:'black'}}>Delivered</Text>
                 {(()=> {
                  let x = new Date(`${item.order.updated}`);
                  let date = x.getDate();
                  let month = x.getMonth();
                  let year = x.getFullYear();
                  let h = x.getHours();
                  let m = x.getMinutes();
                  let s = x.getSeconds();
                  return <Text style={{fontSize:10}}>{date+'/'+month+'/'+year+'   '+h+':'+m+':'+s}</Text>
                }
                )()}
                </View>
               }
           })()} 
           </Text>
           </View>
           </Col>
         </Grid>
           </ScrollView>
                 
             </View>}  
             keyExtractor={(item,index) => index.toString()}
   
             refreshControl={
               <RefreshControl
                   refreshing={refreshing}
                   onRefresh={onRefresh}
               />
             }
           />
   
           
       </View>
               
           </View>
               
       )
    }
    else{
      return <View style={styles.container}>
               <TouchableOpacity onPress={fetchApiCallFoodCat}>
                   <Text style={{marginTop:40,fontSize:24,textAlign:'center',borderColor:'red',borderWidth:3}}>No Pending Orders</Text>
               </TouchableOpacity>
                 <View style={styles.container}></View>
                 </View>
    }
    }

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonContainernotapproved: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtoncross: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
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
    width:Imgwidth/6,
    height:Imgheight/12,
    borderRadius:10
  },
  text: {
    fontWeight: 'bold',
    fontSize:23
  },
  text1: {
    color: 'grey',
    fontSize:18
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
    paddingTop: 8,
  },
  container1: {
    paddingBottom: 0,
  }
});