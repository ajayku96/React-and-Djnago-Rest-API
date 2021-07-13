import React,{useEffect}from 'react';
import { View,Dimensions,Button,Text,FlatList,StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SimpleStepper} from 'react-native-simple-stepper';
import { AuthContext } from './Components/context';
import SearchOptions from './Components/Home/searchOption';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';

const Imgwidth = Dimensions.get('window').width;
const Imgheight = Dimensions.get('window').height;

function finalquan(x){
  if(typeof(x) !== 'undefined' && x != null){
    if(Object.keys(x).length === 0){
      return false;
    }
    else{
      return true;
    }
    
  }
  else{
    
    return false;
  }
}

function SlideDownIconSearch({route}){
  searchquery = route.params.searchquery;
  console.log(searchquery)
    let [Data, setData] = React.useState({refreshing:false})
    const {url,addCart,cartItems} = React.useContext(AuthContext)
    let [qty,setQty] = React.useState()
    let [resName,setResName] = React.useState()
    let [finalresName, setFinalResName] = React.useState()
    let [finalQty,setFinalQty] = React.useState()
    let [showtext,setShowText] = React.useState(false)
    const x = qty
    const y = resName
    
    const updateSearch = async (searchquery) => {
          fetch(url+"/list/?format=json&search="+searchquery,{
          headers: {
            'Authorization': 'Token '+await AsyncStorage.getItem("userToken"),
            'Content-Type': 'application/json'
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
            updateSearch(searchquery)
        }, [])
        useEffect(() => {
          for(var key in x) {
            if(x[key] === 0) delete x[key];
          }
          for(var key in y){
            if(y[key] === 0) delete y[key];
          }
          setFinalQty(x)
          setFinalResName(y)
          setShowText(finalquan(x))
          
       },
        [qty]);

       console.log(finalresName)


    return (  
<View style={{padding:15,marginTop:40}}>

<View><SearchOptions /></View>
<FlatList 
            data={Data}
            renderItem={({item,index}) => <View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Detail',{name:item.name,price:item.price,img:item.food_img,restName:item.res_name,restId:item.res_name.id})} > */}
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
                <Text numberOfLines={0} style={styles.text}>{item.name.length < 12
                      ? `${item.name}`
                      : `${item.name.substring(0, 9)}...`}</Text>
                <View style={{marginRight:10,marginLeft:Imgwidth/5,position: 'absolute',zIndex:40}}>
         <SimpleStepper
            valueChanged={value => {
              const nextval = Number(value)
              setResName({...resName,[`${item.res_name.id}`]: nextval})
              setQty({...qty,[`${item.id}`]: nextval})
              
              } }
              showText={showtext}
              initialValue={0}
              minimumValue={0}
              maximumValue={5}
              
              containerStyle={{ backgroundColor: 'white', flexDirection: 'row', borderWidth: 1, borderRadius: 10, overflow: 'hidden', alignItems: 'center', borderColor: 'green' }}
              incrementImageStyle={{height:16,width:20}}
              decrementImageStyle={{height:16,width:20}}
              textStyle={{color:'red',fontSize:22,fontWeight:'bold'}}
              />
              </View >
              <View style={{marginLeft:Imgwidth/2.4,position: 'absolute'}}>
              
              {(() => {
                if(Object.keys(cartItems).includes(item.id.toString())){
                  return <Button title='Update' color="#ff5c5c" onPress={() => addCart(finalQty,finalresName)}/>
                }
                else {
                  return <Button title='Add'onPress={() => addCart(finalQty,finalresName)}/>
                  
                }
              })()}
              </View>
              </View>
              
              <View style={styles.container1}>
                
                <Text style={styles.text1}>{item.category}</Text>
              </View>
              <View style={styles.place}>
                <Text style={styles.icon}>{item.res_name.location}</Text>
                <Text style={styles.icon}> | </Text>
                <Text style={styles.text1}>4 km</Text>
              </View>
              <View style={styles.place1}>
                <Icon1 style={styles.icon} name="star" size={15} color="black" />
                <Text style={styles.icon}>{item.food_rating}</Text>
                <Icon1 style={styles.icondot} name="dot-single" size={13} color="black" />
                <Text style={styles.icon}>39 min</Text>
                <Icon1 style={styles.icondot} name="dot-single" size={13} color="black" />
                <Icon2 style={styles.iconn} name="rupee" size={13} color="black" />
                <Text style={styles.text1}>{item.price}</Text>
              </View>
            </View>
          </View>
          {/* </TouchableOpacity> */}
            </View>}  
            keyExtractor={(item,index) => index.toString()}
        />
    
        </View>
        
    )}

export default SlideDownIconSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
    sectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      borderRadius: 5,
    },
    imageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
  imgText:{
    fontSize:15,
    backgroundColor:'black',
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
    width:Imgwidth/1.1,
    borderColor:'grey',
    borderWidth:1,
    borderBottomRightRadius:29,
    borderTopLeftRadius:29
  },
  image: {
    width:105,
    height:105,
    borderTopLeftRadius:30,
    borderBottomRightRadius:30,
  },
  text: {
    fontWeight: 'bold',
    fontSize:16
  },
  text1: {
    color: 'grey'
  },
  iconn: {
    color: 'grey',
    position: 'relative',
    paddingTop: 3
  },
  icondot: {
    color: 'grey',
    position: 'relative',
    paddingRight: 2,
    paddingTop: 3
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
    flexDirection:'row',
  },
  container1: {
    paddingBottom: 0,
  }
});
