// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { TextInput, Appbar,Button  } from 'react-native-paper';
// import { StyleSheet, Text, View,ScrollView,Image } from 'react-native';

// class App extends React.Component{

// state = {
//   email:'',
//   pass:''
// }

// // componentDidMount(){
// //   fetch('https://jsonplaceholder.typicode.com/users')
// //   .then(data =>data.json())
// //   .then(data2 => {console.log(data2)
// //     this.setState({
// //       text:data2[1].name
// //     })
// //   })
  
// // }

// render(){
//   return (
//     <View style={styles.container}>
//     <Appbar.Header>
//       <Appbar.Content style={{alignItems:"center"}} title="Login Page" />
//     </Appbar.Header>
//     <TextInput
//     style={{marginTop:200}}
//       label="Email"
//       value={this.state.email}
//       onChangeText={text => setText(text)}
//     />
//     <TextInput
//       label="Password"
//       value={this.state.pass}
//       onChangeText={text => setText(text)}
//     />
//      <Button style={{marginTop:40}} icon="login" mode="contained" onPress={() => console.log('Pressed')}>
//      Login
//   </Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }}

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('About',{greet:'Welcome'})}
//       />
//     </View>
//   );
// }


// function About({ route,navigation }) {
//   console.log(route)
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Text>{route.params.greet}</Text>
//       <Button
//         title="Go Back "
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="About" component={About} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;




// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { TextInput, Appbar,Button  } from 'react-native-paper';
// import { StyleSheet, Text, View,ScrollView,Image,FlatList } from 'react-native';

// class App extends React.Component{

// state = {
//   dataSource:[
//     {name:"loading",cus_mobile:'loading'}
//   ]

// }

// componentDidMount(){
//   fetch('http://192.168.1.5:5900/customer/?format=json')
//   .then(data =>data.json())
//   .then(data2 => {console.log(data2)
//     this.setState({
//       dataSource :data2[0]
//     })
//   })
// }

// rendritem = ({item}) =>
// {
//   return(
//     <View>
//     <Text style={{fontSize:20,textAlign:"center"}}>{item.name}</Text>
//     {/* <Text style={{fontSize:20,textAlign:"center"}}>{this.state.dataSource.cus_mobile}</Text>
//     <Image style={{width:200,height:200}} source={{uri:this.state.dataSource.cus_img}} /> */}
//     </View>
//   );
// }

// render(){
//   return (
//     // <View style={styles.container}>
//     // <Appbar.Header>
//     //   <Appbar.Content style={{alignItems:"center"}} title="Login Page" />
//     //   </Appbar.Header>

//     // <FlatList
//     //     data={this.state.dataSource}
//     //     renderItem={this.rendritem(data)}
//     //             />
//     // </View>

//     <View style={styles.container}>  
//                 <FlatList  
//                     data={[  
//                         {key: 'Android'},{key: 'iOS'}, {key: 'Java'},{key: 'Swift'},  
//                         {key: 'Php'},{key: 'Hadoop'},{key: 'Sap'},  
//                         {key: 'Python'},{key: 'Ajax'}, {key: 'C++'},  
//                         {key: 'Ruby'},{key: 'Rails'},{key: '.Net'},  
//                         {key: 'Perl'},{key: 'Sap'},{key: 'Python'},  
//                         {key: 'Ajax'}, {key: 'C++'},{key: 'Ruby'},  
//                         {key: 'Rails'},{key: '.Net'},{key: 'Perl'}  
//                     ]}  
//                     renderItem={({item}) =>  
//                         <Text style={styles.item}  
//                               onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>}  
//                     ItemSeparatorComponent={this.renderSeparator}  
//                 />  
//             </View>  
//   );
// }}

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });



// import React, { Component } from 'react';  
// import { Appbar } from 'react-native-paper';
// import { FlatList, StyleSheet, Text, Image,View,ActivityIndicator,TouchableOpacity,appheader, Button } from 'react-native';
// import About from './About';  
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
  
// export default class App extends Component {  

//   constructor(props){
//     super(props)
//     this.state = {
//       isLoading: true,
//       dataSource: []
//     }
//   }
//   componentDidMount(){
//     fetch('http://192.168.1.5:5900/food/?format=json')
//   // fetch('http://192.168.1.9:5900/customer/?format=json')
//   // fetch('https://jsonplaceholder.typicode.com/photos')
//   .then(data => data.json())
//   .then(data2 => {console.log(data2)
//     this.setState({
//       isLoading:false,
//       dataSource : data2
//     })
//   })

// }

// orderthis = () =>
// {
//   alert('Rs.'+item.price+'/-')
// }


// _renderItem = ({item,index}) => {
//   return(
//   <TouchableOpacity onPress={()=>alert('Rs.'+item.price+'/-')} >
//     <View style={styles.item}>
//       <Text style={{fontSize:30,textShadowRadius:10}} >{item.name}</Text>
//       <Image source={{uri:item.food_img}}  style={{width:160, height:160,borderRadius:15}} />
//     </View>
//     </TouchableOpacity>
//   )
// }

// HomeScreen({navigation}){
//         return (  
//             <View style={styles.container}>  
//             <Appbar.Header >
//              <Appbar.Content style={{alignItems:'center'}} title="Order Food"/>
//             </Appbar.Header>
//     <View style={{alignItems:'center'}}>
//                 {/* <FlatList 
//                     data={this.state.dataSource}  
//                     numColumns={2}
//                     renderItem={this._renderItem}  
//                     keyExtractor={(item,index) => index.toString()}
//                 />   */}
//                 <Button title='click me' onPress={() => navigation.navigate('About')} />
                
//                 </View>
//             </View>  
//         )}
        

// About(){
//   return (  
//       <View style={styles.container}>  
//       <Appbar.Header >
//        <Appbar.Content style={{alignItems:'center'}} title="Order Food"/>
//       </Appbar.Header>
// <View style={{alignItems:'center'}}>
//           {/* <FlatList 
//               data={this.state.dataSource}  
//               numColumns={2}
//               renderItem={this._renderItem}  
//               keyExtractor={(item,index) => index.toString()}
//           />   */}
//           <Text>tata</Text>
//           </View>
//       </View>  
//   )}
  

//   render(){
//     const Stack = createStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={this.HomeScreen} />
//         <Stack.Screen name="About" component={About} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );


//   }
// }
// const styles = StyleSheet.create({  
//   container: {  
//       flex: 1
//   },  
//   item: {  
//       padding: 10,
//   },  
// })  

  


// import React from 'react';
// //import React in our code.
// import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
// //import all the components we are going to use.
// import axios from 'axios';

// const App = () => {

//   const getDataUsingAsyncAwaitGetCall = async () => {
//     try {
//       const response = await axios.get(
//         'https://jsonplaceholder.typicode.com/posts/1',
//       );
//       alert(JSON.stringify(response.data));
//     } catch (error) {
//       // handle error
//       alert(error.message);
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <Text style={{fontSize: 30, textAlign: 'center'}}>
//         Example of Axios Networking in React Native
//       </Text>
//       {/*Running GET Request*/}
//       <TouchableOpacity
//         style={styles.buttonStyle}
//         onPress={getDataUsingAsyncAwaitGetCall}>
//         <Text>Multiple Concurrent Requests In Single Call</Text>
//       </TouchableOpacity>

//       <Text style={{textAlign: 'center', marginTop: 18}}>
//         www.aboutreact.com
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     flex: 1,
//     padding: 16,
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width: '100%',
//     marginTop: 16,
//   },
// });

// export default App;

// import React, { Component } from 'react'  
// import {StyleSheet,View, Text,Picker} from 'react-native'  
  
// export default class SwitchExample extends Component {  
//     state = {  
//         choosenIndex: 0  
//     };  

//     NumberList(props) {
//       const numbers = props.numbers;
//       const listItems = numbers.map((number) =>
//         <li>{number}</li>
//       );
//       return (
//         <ul>{listItems}</ul>
//       );
//     }
    
  
//     render() {  
//         return (  
//             <View style={styles.container}>  
//                 <Text style={styles.textStyle}>Picker Example</Text>  
//                 <Text style={styles.textStyle}>{this.state.choosenIndex}</Text>  
//                 <Picker style={styles.pickerStyle}  
//                         selectedValue={this.state.language}  
//                         onValueChange={(itemValue, itemPosition) =>  
//                             this.setState({language: itemValue, choosenIndex: itemPosition})}  
//                     >  
//                     <Picker.Item label="Java" value="java" /> 
//                     <Picker.Item label="JavaScript" value="js" />  
//                     <Picker.Item label="React Native" value="rn" />  
//                 </Picker>  
//                 <Text style={styles.textStyle}> {"Index ="+this.state.choosenIndex}</Text>  
//             </View>  
//         );  
//     }  
// }  
// const styles = StyleSheet.create ({  
//      container: {  
//          flex: 1,  
//          alignItems: 'center',  
//          justifyContent: 'center',  
//      },  
//     textStyle:{  
//         margin: 24,  
//         fontSize: 25,  
//         fontWeight: 'bold',  
//         textAlign: 'center',  
//     },  
//     pickerStyle:{  
//         height: 150,  
//         width: "80%",  
//         color: '#344953',  
//         justifyContent: 'center',  
//     }  
// })  

// import React, {Component} from 'react';
// import {Text, View} from 'react-native';

// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       array: [
//         {
//           key: '1',
//           title: 'example title 1',
//           subtitle: 'example subtitle 1',
//         },
//         {
//           key: '2',
//           title: 'example title 2',
//           subtitle: 'example subtitle 2',
//         },
//         {
//           key: '3',
//           title: 'example title 3',
//           subtitle: 'example subtitle 3',
//         },
//       ],
//     };
//   }

//   list = () => {
//     return this.state.array.map((element) => {
//       return (
//         <View key={element.key} style={{margin: 10}}>
//           <Text>{element.title}</Text>
//           <Text>{element.subtitle}</Text>
//         </View>
//       );
//     });
//   };

//   render() {
//     return <View>{this.list()}</View>;
//   }
// }



// import React, { Component } from 'react';  
// import { Appbar } from 'react-native-paper';
// import { FlatList, StyleSheet, Text, Image,View,ActivityIndicator,TouchableOpacity,appheader, Button } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


// const orderResultJson = [
//   {
//     key: 'Скачайте приложение по ссылке',
//     value: 'https://google.com'
//   },
//   {
//     key: 'Логин',
//     value: '879854'
//   },
//   {
//     key: 'Пароль',
//     value: '849846'
//   },
// ];
  
// export default class App extends Component {  

//   constructor(props){
//     super(props)
//     this.state = {
//       isLoading: true,
//       dataSource: []
//     }
//   }
//   componentDidMount(){
//     fetch('http://192.168.1.5:5900/food/?format=json')
//   // fetch('http://192.168.1.9:5900/customer/?format=json')
//   // fetch('https://jsonplaceholder.typicode.com/photos')
//   .then(data => data.json())
//   .then(data2 => {console.log(data2)
//     this.setState({
//       isLoading:false,
//       dataSource : data2
//     })
//   })
// }


// _renderItem = ({item,index}) => {
//   return(
//   <TouchableOpacity onPress={()=>alert('Rs.'+item.value+'/-')} >
//     <View style={styles.item}>
//       <Text style={{fontSize:30,textShadowRadius:10}} >{item.value}</Text>
//       <Image source={{uri:item.value}}  style={{width:160, height:160,borderRadius:15}} />
//     </View>
//     </TouchableOpacity>
//   )
// }

// HomeScreen({navigation}){

//           return (  
//             <View style={styles.container}>  
//             <Appbar.Header >
//              <Appbar.Content style={{alignItems:'center'}} title="Order Food"/>
//             </Appbar.Header>
//       <View style={{alignItems:'center'}}>
//                 {/* <FlatList 
//                     data={orderResultJson}  
//                     numColumns={2}
//                     renderItem={this._renderItem}  
//                     keyExtractor={(item,index) => index.toString()}
//                 />   */}
//                 <Text>{orderResultJson[0].value}</Text>
//                 <Button title='click me' onPress={() => navigation.navigate('About',{'key':orderResultJson[0].value})} />
//                 </View>
//             </View>
//           )}


// About({route}){
//     return (  
//         <View style={styles.container}>  
//         <Appbar.Header >
//          <Appbar.Content style={{alignItems:'center'}} title="Order Food"/>
//         </Appbar.Header>
//   <View style={{alignItems:'center'}}>
//             {/* <FlatList 
//                 data={this.state.dataSource}  
//                 numColumns={2}
//                 renderItem={this._renderItem}  
//                 keyExtractor={(item,index) => index.toString()}
//             />   */}
//             <Text>{route.params.key}</Text>
//             </View>
//         </View>  
//     )}


// render(){
//   const Stack = createStackNavigator();
//   return (
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen name="Home" component={this.HomeScreen} />
//             <Stack.Screen name="About" component={this.About} />
//             {this.state.dataSource.}
//           </Stack.Navigator>
//         </NavigationContainer>
//       );
// }
// }

//   const styles = StyleSheet.create({  
//     container: {  
//         flex: 1
//     },  
//     item: {  
//         padding: 10,
//     },  
//   })  



// import * as React from 'react';
// import { Text, View, Button } from 'react-native';
// import axios from 'axios';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


// // state = {
// //       isLoading: true,
// //       dataSource: []
// //     }

// // componentDidMount(){
// //     fetch('http://192.168.1.5:5900/food/?format=json')
// //   // fetch('http://192.168.1.9:5900/customer/?format=json')
// //   // fetch('https://jsonplaceholder.typicode.com/photos')
// //   .then(data => data.json())
// //   .then(data2 => {console.log(data2)
// //     this.setState({
// //       isLoading:false,
// //       dataSource : data2
// //     })
// //   })
// // }

// goForAxios = () => {
//   this.setState({
//       fromFetch: false,
//       loading: true,

//   })
//   axios.get("https://jsonplaceholder.typicode.com/users")
//       .then(response => {
//           console.log('getting data from axios', response.data);
//           setTimeout(() => {
//               this.setState({
//                   loading: false,
//                   axiosData: response.data
//               })
//           }, 2000)
//       })
//       .catch(error => {
//           console.log(error);
//       });
// }

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Text>{goForAxios}</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => {
//           /* 1. Navigate to the Details route with params */
//           navigation.navigate('Details', {
//             itemId: 86,
//             otherParam: 'anything you want here',
//           });
//         }}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ route, navigation }) {
//   /* 2. Get the param */
//   const { itemId } = route.params;
//   const { otherParam } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
      
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() =>
//           navigation.push('Details', {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList,SafeAreaView, StyleSheet, Text, Image, View, TouchableHighlight,TouchableOpacity } from 'react-native';
// import { FlatList, StyleSheet, Text, Image,View,ActivityIndicator,TouchableOpacity,appheader, Button } from 'react-native';

export default function App() {
  let [Data, setData] = React.useState('')
  

  renderItem = ({item,index}) => {
    console.log(item)
    return(
    <TouchableOpacity onPress={()=>alert('Rs.'+item.price+'/-')} >
      <View style={styles.item}>
        <Text style={{fontSize:30,textShadowRadius:10}} >{item.name}</Text>
        {/* <Image source={{uri:item.food_img}}  style={{width:160, height:160,borderRadius:15}} /> */}
        <Image source={{uri:item.cus_img}}  style={{width:160, height:160,borderRadius:15}} />
      </View>
      </TouchableOpacity>
    )
  }

  const fetchApiCall = () => {
    fetch("http://192.168.1.5:5900/food/?format=json")
      .then(response => response.json())
      .then(response => {console.log(response);
        setData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const fetchApiCallCustomer = () => {
    fetch("http://192.168.1.5:5900/customer/?format=json")
      .then(response => response.json())
      .then(response => {console.log(response);
        setData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight style={{marginTop:200}} onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Food Call</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={fetchApiCallCustomer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>customer Call</Text>
        </View>
      </TouchableHighlight>
      <View>
      <FlatList 
                data={Data}  
                numColumns={2}
                renderItem={renderItem}  
                keyExtractor={(item,index) => index.toString()}
            />
            
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  title: {
    fontSize: 35,
    color: '#fff'
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#0645AD'
  },
  buttonText: {
    color: '#fff'
  }
  ,  
    item: {  
        padding: 10,
    }
});
