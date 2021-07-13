import * as React from 'react';
import { Button, View, Text } from 'react-native';


function About({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{navigation.greet}</Text>
      <Button
        title="Go Back "
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default About;