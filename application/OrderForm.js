import { AuthContext } from './Components/context';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

export default function Order(){
  const navigation = useNavigation()
  const {signUp} = React.useContext(AuthContext)
  const [username, setUsername] = useState({"username": ""});
  const [agree, setAgree] = useState(false);
  console.log(agree)
    return (
      <View style={styles.container}>
      <Text style={{fontSize:38,marginBottom:20}}>New Registration</Text>
      <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => setUsername({username})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => setEmail({email})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Mobile no."
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(mob) => setMob({mob})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Full Name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => setName({name})}/>
        </View>
        
        <View style={{flexDirection:'row',maxWidth:400,flexBasis:40}}>
        <TouchableOpacity style={[styles.regButtonContainer, styles.RegisterButton]} onPress={() => signUp(username.username,email.email,mob.mob,name.name,password.password,password2.password2,agree)} >
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

