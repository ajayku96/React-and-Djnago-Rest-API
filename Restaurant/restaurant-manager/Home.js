import React,{useEffect} from 'react';
import { View,Image,ScrollView,Button,SafeAreaView,RefreshControl,TouchableOpacity,Text,Dimensions,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './Components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Avatar, Badge, Icon, withBadge,Divider  } from 'react-native-elements'

export default function HomeScreen(){
  const {url,signOut} = React.useContext(AuthContext)
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation();
  let [Data, setData] = React.useState(null)
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const fetchApiCallFoodCat = async () => {
    fetch(url+'/order/restorders/?format=json',{headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'Content-Type': 'application/json',
      'email':await AsyncStorage.getItem("email")
  }})
      .then(response => response.json())
      .then(response => {
        setData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  setTimeout(()=>{fetchApiCallFoodCat();},5000)
  console.log(Data)

    return (
    <View style={{flex:2}}>
      <View style={{width:100,top:0,left:width-120}}>
      <Button title="sign Out" onPress={signOut}></Button>
      </View>
      <View style={{marginBottom:20,marginTop:10,marginBottom:50}}><Text style={{textAlign:'center',fontSize:30}}>Manager Dashboard</Text></View>
    <View style={{flex:1,alignItems:'center',justifyContent:'space-around',zIndex:0}}>
    <View style={{flexDirection:'row'}}>
              <Badge
                status={(() => {if(Data){
                  let ret = 0;
                    if(Data)
                    {
                      ret = Object.keys(Data).length;
                    }
                 if(ret < 4){
                   return 'warning'
                  }
                  if(ret == 0){
                    return 'error'
                  }
                  else{
                    return 'success'
                  }
                }})()}

                value={(() => {if(Data){
                    if(Data)
                    {
                      return Object.keys(Data).length;
                    }

                }})()}
                containerStyle={{ position: 'absolute', top: -3, right: width/3,zIndex:43 }}
              />
            <Badge
                status={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == false){
                      ret = ret+1;
                   }
                 });
                 if(ret < 4){
                   return 'warning'
                  }
                  if(ret == 0){
                    return 'success'
                  }
                  else{
                    return 'error'
                  }
                }})()}

                value={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == false){
                      ret = ret+1;
                   }
                 });
                 return ret
                }})()}
                containerStyle={{ position: 'absolute', top: -4, right: -9,zIndex:43 }}
              />

            <TouchableOpacity style={[styles.regButtonContainerBadges,styles.loginButtonred]}>
            
            <Text style={styles.fontfortiles}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.regButtonContainerBadges,styles.loginButtonred]}>
            <Text  style={styles.fontfortiles} >Pending Approval</Text>

            </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row'}}>
            <Badge
                status={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == true){
                      ret = ret+1;
                   }
                 });
                 if(ret < 4){
                   return 'warning'
                  }
                  if(ret == 0){
                    return 'error'
                  }
                  else{
                    
                    return 'success'
                  }
                }})()}

                value={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == true){
                      ret = ret+1;
                   }
                 });
                 return ret
                }})()}
                containerStyle={{ position: 'absolute', top: -3, right: width/3,zIndex:43 }}
              />
            <Badge
                status={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == true && x.order.order_picked == false){
                      ret = ret+1;
                   }
                 });
                 if(ret < 4){
                   return 'warning'
                  }
                  if(ret == 0){
                    return 'success'
                  }
                  else{
                    return 'error'
                  }
                }})()}

                value={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.rest_approval == true && x.order.order_picked == false){
                      ret = ret+1;
                   }
                 });
                 return ret
                }})()}
                containerStyle={{ position: 'absolute', top: -4, right: -9,zIndex:43 }}
              />




            <TouchableOpacity  style={[styles.regButtonContainerBadges,styles.loginButtonred]}>
            <Text  style={styles.fontfortiles}>Number Of Order Approved</Text>
            {/* <Text>{(() => {if(Data){
              let ret = 0;
             Data.forEach(x => {
               if(x.order.rest_approval == true){
                 ret = ret+1;
               }
             });
             return ret
            }})()}</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.regButtonContainerBadges,styles.loginButtonred]}>
              
            <Text  style={styles.fontfortiles}>Number Of Pending Pickup</Text>
            {/* <Text>{(() => {if(Data){
              let ret = 0;
             Data.forEach(x => {
               if(x.order.rest_approval == true && x.order.order_picked == false){
                 ret = ret+1;
               }
             });
             return ret
            }})()}</Text> */}
            </TouchableOpacity>
            </View>
            
            
            <View style={{flexDirection:'row'}}>
            
            <Badge
                status={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.order_picked == true && x.order.order_delivered == false){
                      ret = ret+1;
                   }
                 });
                  if(ret == 0){
                    return 'success'
                  }else{
                    return 'warning'
                  }
                }})()}

                value={(() => {if(Data){
                  let ret = 0;
                  Data.forEach(x => {
                    if(x.order.order_picked == true && x.order.order_delivered == false){
                      ret = ret+1;
                   }
                 });
                 return ret
                }})()}
                containerStyle={{ position: 'absolute', top: -4, right: -9,zIndex:43 }}
              />

            <TouchableOpacity style={[styles.regButtonContainerBadges,styles.loginButtonred]}>
            <Text  style={styles.fontfortiles}>Picked Up But Not Delivered Yet</Text>
            </TouchableOpacity>
            </View>
        <ScrollView refreshControl={<RefreshControl  refreshing={refreshing}  onRefresh={onRefresh} />}>
            <View style={{marginRight:20,padding:10,alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Manage')} style={[styles.regButtonContainer,styles.loginButton]}>
                <Text style={styles.loginText}>Add / Edit / Delete Foods</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Food Requests')} style={[styles.regButtonContainer,styles.loginButton]}>
                <Text style={styles.loginText}>All Food Requests</Text>
            </TouchableOpacity>
            </View>

           
          
            
        </ScrollView>
        
        </View>
        
    </View>
    )}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginButtonred: {
        backgroundColor: "#00b5ec",
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        textAlign:'center',
      },
      fontfortiles:{
        textAlign:'center',fontWeight:'bold'
      },
      loginText: {
        color: 'white',
        fontSize:20,
        fontWeight:'bold'
      },
      regButtonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        height:90,
        borderRadius:30,
        backgroundColor:'transparent'
      },
      regButtonContainerBadges: {
        alignItems:'center',
        
        height:15,
        marginBottom:20,
        width:130,
        height:40,
        marginLeft:10,
        backgroundColor:'transparent',
        borderRadius:10,
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:80,
        borderRadius:30,
        backgroundColor:'transparent'
      },
      
    })
