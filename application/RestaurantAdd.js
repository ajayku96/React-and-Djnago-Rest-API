import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image} from 'react-native';

export default function RestaurantAdd(){

  const [state, setState] = useState({"name": "",
  "location": "",
  "res_avg_rating": null,
  "res_img": null});
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  onClickListener = () => {
  const form = new FormData();

  form.append('name', 'test')
  form.append("location", 'hshs')
  form.append("res_avg_rating", '4')
  form.append("res_img",{uri: image,
    type: 'image/jpg',
    name: 'IMG_' + Math.random(4000000)+'.jpg'})
            fetch('http://192.168.1.10:5900/restaurant/',
            {
              method: 'post',
              headers:{
                'Content-Type': 'multipart/form-data',
              },
              body:form
      
            }).then(res=>res.json())
            .then(data=>console.log(data))

            return (
              <Text>Restaurant Added</Text>
            )
          }

    return (
      <View style={styles.container}>
      <Text style={{fontSize:50}}>Add Restaurant</Text>
        <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/2/" }}/>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(name) => setState({name})}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="location"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(location) => setState({location})}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="res_avg_rating"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(res_avg_rating) => setState({res_avg_rating})}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <View style={{flexDirection:'row',maxWidth:300,flexBasis:40}}>
        <Button title="Pick an image" onPress={pickImage} />
        <Text></Text>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener()}>
          <Text style={styles.loginText}>Add</Text>
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

