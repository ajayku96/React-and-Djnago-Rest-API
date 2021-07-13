import { AuthContext } from './Components/context';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

export default function Register(){
  const navigation = useNavigation()
  const {signUp} = React.useContext(AuthContext)
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

const textInputChange = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });
  }
}

const changeEmail = (val) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if( re.test(val) === true) {
      setData({
          ...data,
          email: val,
          check_emailInputChange: true,
          isValidEmail: true
      });
  } else {
      setData({
          ...data,
          username: val,
          check_emailInputChange: false,
          isValidEmail: false
      });
  }
}

const changeMobile = (val) => {
  var IndNum = /^[0]?[6789]\d{9}$/;
  if(IndNum.test(val)) {
      setData({
          ...data,
          mobile: val.replace(/[^0-9]/g, ''),
          check_mobileInputChange: true,
          isValidMobile: true
      });
  } else {
      setData({
          ...data,
          mobile: val,
          check_mobileInputChange: false,
          isValidMobile: false
      });
  }
}

const changeName = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          name: val,
          check_textNameInputChange: true,
          isValidName: true
      });
  } else {
      setData({
          ...data,
          name: val,
          check_textNameInputChange: false,
          isValidName: false
      });
  }
}

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

const handleValidEmail = (val) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if( re.test(val) === true) {
     setData({
          ...data,
          isValidEmail: true
      });
  } else {
      setData({
          ...data,
          isValidEmail: false
      });
  }
}

const handleValidMobile = (val) => {
  var IndNum = /^[0]?[6789]\d{9}$/;
  if(IndNum.test(val)){
     setData({
          ...data,
          isValidMobile: true
      });
  } else {
      setData({
          ...data,
          isValidMobile: false
      });
  }
}

const handleValidName = (val) => {
  if( val.trim().length >= 6 ) {
      setData({
          ...data,
          isValidName: true
      });
  } else {
      setData({
          ...data,
          isValidName: false
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


     


    return (
      <View style={styles.container}>
      <Text style={{fontSize:38,marginBottom:20}}>New Registration</Text>
      <View style={styles.inputContainer}>
      <View style={{marginLeft:13}}>
            <Feather 
                name="user"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Username"
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
          <Text style={styles.errorMsg}>Username must be at least 4 characters long.</Text>
          </Animatable.View>
          </View>
        }
        
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
              onChangeText={(val) => changeEmail(val)}
              onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
              
              />
              <View style={{marginRight:13}}>
              {data.check_emailInputChange ? 
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
        { data.isValidEmail ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Enter Valid Email Address.</Text>
          </Animatable.View>
          </View>
        }
        
        <View style={styles.inputContainer}>
        <View style={{marginLeft:13}}>
            <Feather 
                name="phone"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Mobile no."
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(val) => changeMobile(val)}
              onEndEditing={(e)=>handleValidMobile(e.nativeEvent.text)}/>
              <View style={{marginRight:13}}>
              {data.check_mobileInputChange ? 
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
        { data.isValidMobile ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Please Enter a Valid Mobile Number</Text>
          </Animatable.View>
          </View>
        }
        <View style={styles.inputContainer}>
        <View style={{marginLeft:13}}>
            <Feather 
                name="smile"
                color="black"
                size={20}
                    />
                    </View>
          <TextInput style={styles.inputs}
              placeholder="Full Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(val) => changeName(val)}
              onEndEditing={(e)=>handleValidName(e.nativeEvent.text)}
              
              />
              <View style={{marginRight:13}}>
              {data.check_textNameInputChange ? 
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
        { data.isValidName ? null : 
        <View style={{marginTop:-19,marginBottom:20}}>
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Name must be at least 8 characters long</Text>
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
        
        <View style={{flexDirection:'row',maxWidth:400,flexBasis:40}}>
        <TouchableOpacity style={[styles.regButtonContainer, styles.RegisterButton]} onPress={() => signUp(data.username,data.email,data.mobile,data.name,data.password,data.password2,false)} >
          <Text style={styles.RegisterText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-100,
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
  }
});

