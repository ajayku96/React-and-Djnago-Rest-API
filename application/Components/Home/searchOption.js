import React from 'react';
import { View,StyleSheet ,Image,TextInput,Dimensions,TouchableOpacity,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const widthc = Dimensions.get('window').width;
function SearchOptions(){
    const navigation = useNavigation();

    return (  
<TouchableOpacity onPress={() => navigation.navigate('Search')} >
<View style={styles.sectionStyle}>
           <Image
            source={{
              uri:
                'https://www.pinclipart.com/picdir/big/7-79819_search-clipart.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            style={{flex: 1,padding:6}}
            placeholder="Type Here..."
            editable={false}
            selectTextOnFocus={false}
            underlineColorAndroid="transparent"
          />
        </View>

</TouchableOpacity>
        
    )}

export default SearchOptions;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
