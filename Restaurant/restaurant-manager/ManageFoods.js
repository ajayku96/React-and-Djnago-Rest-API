import React,{useEffect} from 'react';
import { FlatList, StyleSheet,RefreshControl,TextInput,Modal,Pressable, Text, Image, View, TouchableOpacity,ScrollView,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';
import { Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';

const Imgwidth =  Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;

function RestaurantFoods(){
  const navigation = useNavigation();
  const {url} = React.useContext(AuthContext)
    let [Data, setData] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [foodName, setFoodName] = React.useState({"username": ""});
    const [description, setDescription] = React.useState({"name": ""});
    const [price, setPrice] = React.useState({"email": ""});

    async function updateFood(id,name,price,description,foodcat){
      fetch(url+"/order/food-manager-update/",{
        method: 'PUT',
      headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json',
        'id':id,
        'name':name,
        'price':price,
        'description':description,
        'foodcat':foodcat,
         
    }})
    .then(setModalVisible1(!modalVisible1),fetchApiCall())
    }


    async function delFood(id){
      fetch(url+"/order/food-manager-delete/",{
        method: 'DELETE',
      headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json',
        'id':id
    }})
    .then(setModalVisible(!modalVisible),fetchApiCall())
    }
    

    async function fetchApiCall(){
        fetch(url+"/restfoodMangerlist/?format=json",{
        headers: {
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'application/json',
          'data':await AsyncStorage.getItem("email"),
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
     
        const wait = (timeout) => {
          return new Promise(resolve => setTimeout(resolve, timeout));
        }

        const onRefresh = React.useCallback(() => {
          setRefreshing(true);
          fetchApiCall();
          wait(500).then(() => setRefreshing(false),setData(null));
        }, []);

        if(typeof Data !== 'undefined' && Data !== null){
          return(  
    <View style={styles.container}>
      
        {(() => {
          if(typeof Data !== 'undefined' && Data !== null){
          return <View >
          <Image source={{uri:Data[0].res_name.res_img}}  style={styles.imgsource} />
          <View style={{position:'absolute',top:20}}>
             <Text style={styles.imgText}>{Data[0].res_name.name}</Text>
          </View>
          <View style={{height:40,backgroundColor:'black'}}>
            <View style={{position:'absolute',}}><Text style={{fontSize:19,color:'yellow'}}><Icon name='star' type='font-awesome' size={17} color='yellow' />{Data[0].res_name.res_avg_rating}/5</Text></View>
          <Text style={{fontSize:19,fontWeight:'bold',color:'yellow',textAlign:'right'}}>{Data[0].res_name.location}</Text>
          </View>
          </View>
          }
          })()}
         
         <TouchableOpacity onPress={() => navigation.navigate('Add Food')}><Text style={{margin:20,backgroundColor:'#42cef5',fontSize:24,textAlign:'center',borderRadius:30,width:150}}>Add Food</Text></TouchableOpacity>
        <FlatList 
          data={Data}
          renderItem={({item,index}) =>
          //  <View >
            <ScrollView style={{bottom:0,top:0}}>
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
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.place}>
              <Text style={styles.text1}>Price : </Text>
                <Icon2 style={styles.iconn} name="rupee" size={16} color="black" />
                <Text style={styles.text1}>{item.price}</Text>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible1}
                  onRequestClose={() => {
                    fetchApiCall();
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView1}>
                      <Text style={styles.modalText}>Edit Food</Text>
                      <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Food Name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => setFoodName({name})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Description of Food"
              underlineColorAndroid='transparent'
              onChangeText={(description) => setDescription({description})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Price"
              underlineColorAndroid='transparent'
              onChangeText={(price) => setPrice({price})}/>
        </View>
                      <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={[styles.button, styles.buttonClose,{marginRight:40}]} onPress={() => updateFood(item.id,foodName.name,price.price,description.description,item.food_cat)} ><Text style={styles.textStyle}> Submit </Text></TouchableOpacity>
                      <Text style={{marginBottom:10}}></Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible1(!modalVisible1)}
                      >
                        <Text style={styles.textStyle}> Cancel </Text>
                      </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={styles.buttonOpen}
                  onPress={() => setModalVisible1(true)}
                >
                <Icon1 style={styles.icondot} name="pencil" size={29} color="black" />
                 <Text style={styles.text1}>Edit</Text>
                </Pressable>
                
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    fetchApiCall();
                    setModalVisible(modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Confirm Delete</Text>
                      <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={[styles.button, styles.buttonClose,{marginRight:40}]} onPress={() => delFood(item.id)} ><Text style={styles.textStyle}>Okay</Text></TouchableOpacity>
                      <Text style={{marginBottom:10}}></Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={styles.buttonOpen}
                  onPress={() => setModalVisible(true)}
                >
                 <Icon1 style={styles.icondot} name="squared-cross" size={29} color="black" />
                <Text style={styles.icon}></Text>
                </Pressable>
              </View>
            </View>
          </View>
          </ScrollView>
          
          // {/* </View> */}
          }  
          keyExtractor={(item,index) => index.toString()}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
          }
        />
        </View>
        
        )}
        else{
          return <View>
            {/* <Text style={{fontSize:40}}>NO Result Found</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate('Add Food')}><Text style={{margin:20,backgroundColor:'#42cef5',fontSize:24,textAlign:'center',borderRadius:30,width:150}}>Add Food</Text></TouchableOpacity>
          </View>
        }
      }

export default RestaurantFoods;




const resizeMode = 'center';
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
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
  regButtonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:180,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  RegisterButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  RegisterText: {
    color: 'white',
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
    fontWeight:'bold'
  },
  modalView: {
    margin: 20,
    width:300,
    height:173,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView1: {
    margin: 20,
    width:300,
    height:373,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    flexDirection:'row',
  },
  buttonClose: {
    backgroundColor: "#34cceb",
    elevation:10,
    borderRadius:10
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:28
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:29
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
        width:Imgwidth/4,
        height:Imgheight/9,
        borderRadius:10
      },
      text: {
        fontWeight: 'bold',
        textTransform:'uppercase',
        fontSize:20
      },
      text1: {
        color: 'grey',
        fontSize:22
      },
      iconn: {
        color: 'grey',
        position: 'relative',
        paddingTop:5.4
      },
      icondot: {
        color: 'grey',
        position: 'relative',
        paddingRight: 2,
        paddingTop: 3,
        marginLeft:20
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


