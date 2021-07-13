import React,{useEffect,useState} from 'react';
import { View,FlatList,ScrollView,Button,SafeAreaView,Image,RefreshControl,TouchableOpacity,Text,Dimensions,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function HomeScreen(){
  const {url,signOut} = React.useContext(AuthContext)
  let [Data, setData] = React.useState(null)
  const navigation = useNavigation();

  const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
  const [refreshing, setRefreshing] = React.useState(false);
  const [UserLocation,setUserLocation] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(setData(null),fetchApiCall(),setRefreshing(false));
  }, []);

  const update = async (id,status) => {
    fetch(url+'/order/food-pickup-update/',{
      method: 'PUT',
      headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'id':id,
      'update':status,
      'by':await AsyncStorage.getItem("email"),
  }})
  .then(fetchApiCall())
  }
  async function fetchApiCall(){
    fetch(url+"/order/food-delevery-details/?format=json",{
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
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
  var handle=setInterval( () => {
    fetchApiCall()

}, 7000);
return ()=>{
  clearInterval(handle);
  setUserLocation([])
}
  }, [])

// console.log(UserLocation)
    return (
    <View style={{flex:1}}>
      <Text style={{fontSize:30,textAlign:'center'}}>All Orders</Text>
      <FlatList
        data={Data}
        renderItem={({item,index}) => <View style={{borderWidth:1,borderColor:'green'}}>
          <View style={{flexDirection:'row',padding:10,width:50}}>
          <Image
            source={{uri:item.product.res_name.res_img}}
            resizeMode="cover"
            style={styles.image}
          />
        <View>
        <Text style={[styles.regButtonContainer,styles.loginButton]}>
            <Text style={styles.loginText}>{item.order.invoice_no}</Text>
        </Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{marginBottom:4,textAlign:'center',fontSize:16,marginLeft:5,fontWeight:'bold'}}>Restaurant</Text>
        <Text style={{marginBottom:4,textAlign:'center',fontSize:16,marginLeft:20,fontWeight:'bold'}}>-</Text>
        <Text style={{marginBottom:4,textAlign:'center',fontSize:16,marginLeft:20,fontWeight:'bold'}}>User</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text style={{marginBottom:10,textAlign:'center',width:80,marginLeft:6}}>{item.product.res_name.location}</Text>
        <Text style={{marginBottom:10,marginLeft:40,width:80}}>{item.order.address}</Text>
        </View>
        </View>
        {(() => {
               if(item.order.order_picked === false && item.order.order_delivered === false ) 
               {
                 return <View style={{marginLeft:-30}}>
                 <TouchableOpacity onPress={() => update(item.order.id,true)} style={[styles.buttonContainer,styles.loginButton]}>
                     <Text style={styles.loginText}>Accept</Text>
                 </TouchableOpacity>
                 </View>
               }
               else if(item.order.order_picked === true && typeof UserLocation !== 'undefined') {
                 return <View style={{marginLeft:0,marginTop:7}}>
                 <TouchableOpacity style={{width:80}} onPress={() => update(item.order.id,true),() => navigation.navigate('Route to User House',{'id':item.order.id,'name':item.order.full_name,'address':item.product.res_name.user.address,'mobile':item.product.res_name.user.mobile,'order':item.order.invoice_no,'email':item.order.email})} >
                 {/* <Icon1  name="location-pin" size={50} color="black" /> */}
                 <MaterialIcons name="delivery-dining"  size={50} color="black" />
                 <Text style={{marginTop:6,fontWeight:'bold',marginLeft:1,textTransform:'uppercase'}}>Deliver</Text>
                 </TouchableOpacity>
                 </View>
               }
           })()} 
        
        
        </View>
        
        
    </View>
    }
        keyExtractor={(item,index) => index.toString()}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
          }
      />
      <Button title="sign Out" onPress={signOut}></Button>
          </View>  
    )}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "#00b5ec",
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
    
        elevation: 19,
        marginHorizontal:3
      },
      loginText: {
        color: 'white',
        fontSize:22
      },
      regButtonContainer: {
        height:35,
        flexDirection: 'row',
        width:180,
        borderRadius:10,
      },
      buttonContainer: {
        position: 'absolute',
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        marginLeft:20,
        marginTop:10,
        width:80,
        borderRadius:30,
        backgroundColor:'transparent'
      },
      image: {
        width:width/4,
        height:height/9,
        borderRadius:10
      },
      
    })
