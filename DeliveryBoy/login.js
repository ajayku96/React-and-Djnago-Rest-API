import { AuthContext } from './Components/context';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

export default function Login(){
  const navigation = useNavigation()
  const {signIn} = React.useContext(AuthContext)

  // const [username, setUsername] = useState({"username": ""});
  // const [password, setPassword] = useState({"username": ""});
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
});

const textInputChange = (val) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if( re.test(val) === true) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
  } 
  else {
      setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });
  }
}

const handlePasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
  }
}

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const handleValidUser = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          isValidUser: false
      });
  }
}

    return (
      <View style={styles.container}>
      <Text style={{fontSize:50}}>Login</Text>
        {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/2/" }}/> */}
        <View style={styles.inputContainer}>
          <View style={{marginLeft:13}}>
            <Feather 
                name="mail"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}/>
              <View style={{marginRight:13}}>
              {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
                </View>
        </View>

            
        { data.isValidUser ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Enter Valid Email Address</Text>
          </Animatable.View>
          </View>
        }
        
        <View style={styles.inputContainer}>
          <View style={{marginLeft:13}}><Feather 
                    name="lock"
                    size={20}
                /></View>
                
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
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
            <Animatable.View animation="fadeInLeft" duration={500}>
              <View style={{marginTop:-19,marginBottom:20}}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </View>
            </Animatable.View>
            }
        
        <View style={{flexDirection:'row',maxWidth:400,flexBasis:40}}>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => signIn(data.username,data.password)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={{margin:4,fontSize:23}}>OR</Text>
        <TouchableOpacity style={[styles.regButtonContainer, styles.loginButton]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

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
  },
  loginText: {
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
  }
});

