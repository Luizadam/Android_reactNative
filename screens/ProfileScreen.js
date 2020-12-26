import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Icon, Button} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  return (
    <View style={styles.profilePhoto}>
      <View style={{alignItems: 'center', marginTop: 18}}>
        <Avatar
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          onPress={() => console.log('horehore')}
          size="xlarge"
          rounded
        />
        <Text style={{marginTop: 10, fontSize: 20}}>Luiz Adam Rifaldi </Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 18}}>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>100K</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>8 </Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>10K</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>Following</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>Post</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center'}}>Followers</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          opacity: 0.3,
          marginTop: 8,
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profilePhoto: {
    flex: 1,
  },
});
