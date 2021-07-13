import * as React from 'react';
import { Text,Button, View, StyleSheet, Image,Animated,TouchableOpacity ,Easing} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SlideDownIcon() {
  const navigation = useNavigation();

const [expanded, setExpanded] = React.useState(true);
const [more, setMore] = React.useState('View More')
const animationHeight = React.useRef(new Animated.Value(2)).current;

const toggleExpansion = () => {
  console.log("press")
  setExpanded(!expanded);
  setMore('View Less')
};

React.useEffect(() => {
   if (expanded) {
    setMore('View More')
  Animated.timing(animationHeight, {
    duration: 200,
    toValue: 114,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();
   }
   else{
     Animated.timing(animationHeight, {
    duration: 200,
    toValue: 368,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();
  }

}, [expanded]);

  return (
    <View style={styles.container}>
    
  <Animated.View style={[{ height: animationHeight }]}>
  
      <View style={{justifyContent:'space-around',flexDirection:'row'}} ellipsizeMode="tail">
      <View>
      <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'pizza'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/pizza.jpg')} />
        <Text style={styles.textView} >Pizza</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'fish'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/fish.jpg')} />
        <Text style={styles.textView} >Fish</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'manchurian'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/manchurian.jpg')} />
        <Text style={styles.textView} >manchurian</Text></TouchableOpacity>
      </View>
      <View >
      <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'burger'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/burger.png')} />
        <Text style={styles.textView} >Burger</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'indian_food'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/indian_food.jpg')} />
        <Text style={styles.textView} >Indian food</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'salad'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/salad.jpg')} />
        <Text style={styles.textView} >salad</Text></TouchableOpacity>
      </View>
      <View >
      <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'chicken'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/chicken.jpg')} />
        <Text style={styles.textView} >Chicken</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'noodles'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/hakka_noodles.jpg')} />
        <Text style={styles.textView} >Noodles</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'egg'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/egg_curry.jpg')} />
        <Text style={styles.textView} >Egg Items</Text></TouchableOpacity>
      </View>
      <View >
      <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'mutton'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/mutton.jpg')} />
        <Text style={styles.textView} >Mutton</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'icecream'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/icecream.webp')} />
        <Text style={styles.textView} >icecream</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SlideDownIconSearch',{searchquery:'pizza'})} >
        <Image style={styles.imgmr} source={require('../../assets/SlideDownIcon/pizza.jpg')} />
        <Text style={styles.textView} >Pizza</Text></TouchableOpacity>
      </View>
     
      
    </View>
    
  </Animated.View>
  <View style={{backgroundColor:"white",padding:20}}>
  <Button color='tomato' style={{borderRadius:20}} onPress={() => {
      toggleExpansion();
    }}
    title={more} />
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  imgmr:{
    width:85, 
    height:85,
    borderRadius:100,
    marginBottom:10
  },
  textView:{
    fontSize:14,textShadowRadius:12,elevation:6,textAlign:'center',marginBottom:13
  }
 
});