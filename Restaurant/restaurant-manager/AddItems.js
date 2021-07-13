import React,{useEffect} from 'react';
import { View,ScrollView,Button,FlatList,SafeAreaView,TextInput,Image,RefreshControl,Picker,TouchableOpacity,Text,Dimensions,StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from './Components/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function AddItems(){
  const navigation = useNavigation()
    const {signOut,url} = React.useContext(AuthContext) 
    const [pickedImagePath, setPickedImagePath] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [foodDesc, setFoodDesc] = React.useState('');
    const [restData,setRestData] = React.useState();
    const [selectedValue, setSelectedValue] = React.useState("Category");
    const [foodCat,setFoodCat] = React.useState()
    
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const fetchApiCallFoodCat = async () => {
        fetch(url+'/foodCat/?format=json',{headers: {
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'application/json'
      }})
          .then(response => response.json())
          .then(response => {
            setFoodCat(response);
          })
          .catch(err => {
            console.log(err);
          });
      }
      useEffect(() => {
        foodRestIdHelper();
      }, [])

      const foodRestIdHelper = async () => {
        fetch(url+'/order/food-manager-add-help-rest-id/?format=json',{headers: {
          'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
          'Content-Type': 'application/json',
          'email' :await AsyncStorage.getItem("email")
      }})
          .then(response => response.json())
          .then(response => {
            setRestData(response);
          })
          .catch(err => {
            console.log(err);
          });
      }


      useEffect(() => {
        fetchApiCallFoodCat();
      }, [])

      console.log(restData)


      var photo = {
        uri: pickedImagePath,
        type: 'image/jpeg',
        name: 'foodItem.jpg',
      };
      async function addFoodItems(){
        const form = new FormData();
        form.append('res_name',restData[0].id)
        form.append('name', name)
        form.append('description', foodDesc)
        form.append('food_cat',selectedValue)
        form.append('food_rating','0')
        form.append("price", price)
        form.append("food_img", photo);
        fetch(url+'/itemAdd/',
          {
            method: 'POST',
            headers:{
              'Accept' : "application/json",
              'Content-Type': 'multipart/form-data',
              'email' : await AsyncStorage.getItem('email')
            },
            body:form
          }
        ).then(res=>res.json())
        .then(setTimeout(() => {
          navigation.navigate('Manage Foods')
        }, 3000) )
      }

      



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false),console.log(restData));
  }, []);

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled){
      setPickedImagePath(result.uri);
      
    }
  }
    if(typeof foodCat !== 'undefined'){
    var serviceItems = foodCat.map( (s, i) => {
        return <Picker.Item key={i} value={s.id} label={s.category} />
    });
    }

    return (
        <ScrollView refreshControl={<RefreshControl  refreshing={refreshing}  onRefresh={onRefresh} />}>
             <View style={styles.container}>
             
      <Text style={{fontSize:38,marginBottom:20}}>Add Food</Text>
      <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Food Name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => setName(name)}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Food Description"
              underlineColorAndroid='transparent'
              onChangeText={(foodDesc) => setFoodDesc(foodDesc)}/>
        </View>
        <View style={styles.inputContainer}>
              <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 300 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
          {serviceItems}  
        </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Price"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(price) => setPrice(price)}/>
        </View>
        <View>
          <Text style={{fontSize:20,}}>Choose Photo</Text>
        </View>
        <Grid>
    <Col>
    
    <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
    </Col>
    <Col>
    <Row>
       <TouchableOpacity onPress={showImagePicker}><Text style={{fontSize:16}}><Ionicons style={{fontSize:30}} name="image-outline"/>Choose from Gallary</Text></TouchableOpacity>
        </Row>
        <Row>
        <Text style={{fontSize:20}}>OR</Text>
        </Row>
        <Row>
        <TouchableOpacity onPress={openCamera}><Text style={{fontSize:16}}><Ionicons style={{fontSize:30}} name="camera"></Ionicons>Use Camera</Text></TouchableOpacity>
        </Row>
    </Col>
</Grid>
<View style={{flexDirection:'row',maxWidth:400,flexBasis:40,marginTop:30}}>
        <TouchableOpacity style={[styles.regButtonContainer, styles.RegisterButton]} onPress={() => addFoodItems()} >
          <Text style={styles.RegisterText}>Add Food</Text>
        </TouchableOpacity>
        </View>
      </View>

        <Button title="sign Out" onPress={signOut}></Button>
        </ScrollView>
    )}

    const resizeMode = 'center';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
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
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageContainer: {
        padding: 10,
        marginLeft:38
      },
      image: {
        width: 140,
        height: 90,
        resizeMode: 'cover'
      }
      
    })
