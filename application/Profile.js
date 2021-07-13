import React,{useEffect,useState} from 'react';
import { FlatList,Modal,Pressable,TextInput,Alert, StyleSheet, Text, Image, View, TouchableOpacity,Dimensions,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/context';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';


const width =  Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function profile(){
  const navigation = useNavigation();
  const {url,signOut} = React.useContext(AuthContext)
  let [Data, setDataX] = React.useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [oldpass, setOldPass] = useState({"oldpass": ""});
  const [data, setData] = React.useState({
    username: '',
    password: '',
    mobile:'',
    name:'',
    password:'',
    password2:'',
    check_textInputChange: false,
    check_emailInputChange: false,
    check_mobileInputChange: false,
    check_textNameInputChange: false,
    check_PasswordInputChange: false,
    check_Password2InputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidMobile: true,
    isValidName:true,
    isValidPassword: true,
    isValidPassword2: true,
    isValidPhone:true,
});

const changePassword = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          check_PasswordInputChange: true,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          check_PasswordInputChange: false,
          isValidPassword: false
      });
  }
}
const changePassword2 = (val) => {
  if( data.password == val  ) {
      setData({
          ...data,
          password2: val,
          check_Password2InputChange: true,
          isValidPassword2: true
      });
  } else {
      setData({
          ...data,
          password2: val,
          check_Password2InputChange: false,
          isValidPassword2: false
      });
  }
}
const handlevalidPassword = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          isValidPassword: false
      });
  }
}

const handlevalidPassword2 = (val) => {
  if(data.password == val) {
      setData({
          ...data,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          isValidPassword: false
      });
  }
}

  async function fetchApiCallChangePass(pass,pass2){
    fetch(url+"/x/api/password-reset/?format=json",{
      method:'PUT',
    headers: {
      'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
      'email':await AsyncStorage.getItem("email"),
      'pass':pass,
      'pass2':pass2,
      'Content-Type': 'application/json'}})
    
      .then(response => response.json())
      .then(response => {
        setDataX(response),
        Alert.alert('Your Password Changed Successfully!', 'Kindy Login with New Credentials', [
          {text: 'Okay'}
        ])
      }).then(() => setModalVisible(!modalVisible))
      .catch(err => {
        console.log(err);
      });
  }


  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }
  
  async function fetchApiCall(){
      fetch(url+"/profile/?format=json",{
      headers: {
        'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
        'Content-Type': 'application/json'}})
      
        .then(response => response.json())
        .then(response => {
          setDataX(response)
        })
        .catch(err => {
          console.log(err);
        });
    }
  useEffect(() => {
      fetchApiCall()
      }, [])
  if(typeof Data !== 'undefined' && Data.length === 0){
    return(
      <View style={{alignContent:'center',alignItems:'center',marginTop:height/6,elevation:10,alignItems:'center',margin:40}}>
      <View ><Button 
       onPress={signOut}
       title="Sign Out"
       />
   </View>
    </View>
      )
    
  }
  else{
    return(
      
 <View>
   <View style={{position:'absolute',right:1,top:1}}>
       <Pressable
        style={{backgroundColor:'green',width:120,borderRadius:10,height:50,justifyContent:'center'}}
        onPress={() => navigation.navigate('My Orders')}
      >
        <Text style={styles.textStyle2}>My orders</Text>
      </Pressable>
      </View>
   <View style={{marginBottom:20,marginTop:70}}><Text style={{textAlign:'center',fontSize:30}}>User Profile View</Text></View>
 <View style={{marginTop:height/8.7,elevation:10,alignItems:'center',margin:40}}>
 
   <Image source={{uri:Data[0].image}}  style={{width:150, height:150,borderRadius:100}} />
   <Text>{Data[0].full_name}</Text>
     </View> 
     <View style={{position:'absolute',top:height/6,left:10}}><Text style={{fontSize:18,fontWeight:'bold'}}>Welcome {Data[0].full_name}</Text></View>
     <View ><Button 
       onPress={signOut}
       title="Sign Out"
       />
       
   </View>
   <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize:22,fontWeight:'bold',marginBottom:20}}>Change Password</Text>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Old Password"
              underlineColorAndroid='transparent'
              onChangeText={(val) => setOldPass(val)}
              />
              </View>
            <View style={styles.inputContainer}>
        <View style={{marginLeft:13}}>
            <Feather 
                name="lock"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Password"
              underlineColorAndroid='transparent'
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => changePassword(val)}
              onEndEditing={(e)=>handlevalidPassword(e.nativeEvent.text)}
              
              />
              <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <View style={{marginRight:12}}>
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    </View>
                    :
                    <View style={{marginRight:12}}>
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                      
                    />
                    </View>
                    }
                </TouchableOpacity>
        </View>
        { data.isValidPassword ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password must be at least 8 characters long</Text>
          </Animatable.View>
          </View>
        }

<View style={styles.inputContainer}>
        <View style={{marginLeft:13}}>
            <Feather 
                name="lock"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Confirm Password"
              underlineColorAndroid='transparent'
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => changePassword2(val)}
              onEndEditing={(e)=>handlevalidPassword2(e.nativeEvent.text)}
              
              />
              <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <View style={{marginRight:12}}>
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    </View>
                    :
                    <View style={{marginRight:12}}>
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                      
                    />
                    </View>
                    }
                </TouchableOpacity>
        </View>
        { data.isValidPassword2 ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password must be same as above</Text>
          </Animatable.View>
          </View>
        }
        
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => fetchApiCallChangePass(data.password,data.password2)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Change Password</Text>
      </Pressable>
    </View>
   </View>
      )
  }
  
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:-90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:230,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:height/2.3,
    width:300,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    position:'absolute',
    top:height/-2.5,
    right:20,
    zIndex:3,
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize:13,
    textAlign: "center"
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    fontSize:15,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:20,
  }
});