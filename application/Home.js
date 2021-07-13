import React from 'react';
import { View,ScrollView,SafeAreaView,RefreshControl,TouchableOpacity,Text} from 'react-native';
import { Header } from 'react-native-elements';
import SwiperImage from './Components/Home/swiperImage';
import ThreeGroupImg from './Components/Home/threegroupimg';
import FlatlistHome from './Components/Home/flatlistHome';
import Card from './Components/Home/Card';
import { TextInput } from 'react-native-gesture-handler';
import SlideDownIcon from './Components/Home/slideDownIcon';
import { useNavigation } from '@react-navigation/native';

import SearchOptions from './Components/Home/searchOption';

import { AuthContext } from './Components/context';

export default function HomeScreen(){
  const {signOut} = React.useContext(AuthContext)


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

    return (  <View style={{flex:2,backgroundColor:'#fff'}}>
    <View>
    <SearchOptions />
        </View>
     
     <View style={{flex:1}}>
        <ScrollView refreshControl={<RefreshControl  refreshing={refreshing}  onRefresh={onRefresh} />}>
        <SwiperImage  />  
        
        <FlatlistHome />
        <ThreeGroupImg />
        <View style={{overflow:'hidden',marginBottom:10}}>
        <SlideDownIcon />
        </View>
        
        
        <Card />
        </ScrollView>
        </View>
        </View>
            
    )}

