import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import {ListItem, Avatar, Input, Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const [dataUser, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedUser, setSelected] = useState({});
  const [selectedUserDelete, setSelectedDelete] = useState({});
  const [button, setButton] = useState('simpan');
  const [image, setImage] = useState('');
  const [likeCount, setLikeCount] = useState('');
  const [token, setToken] = useState('');
  const [userId, setuserId] = useState('');

  const theme = useTheme();
  useEffect(() => {
    data();
    displayData();
  });
  const data = () => {
    axios
      .get('http://10.0.2.2:3001/data/posting', {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setData(res.data);
      });
  };

  displayData = async () => {
    let data = await AsyncStorage.getItem('userToken');
    let userId = await AsyncStorage.getItem('userId');
    setuserId(userId);
    setToken(data);
  };

  const submit = () => {
    const data = new FormData();
    data.append('title', title);
    data.append('desc', desc);
    data.append('postImage', image);
    const config = {
      headers: {'content-type': 'multipart/form-data'},
    };
    console.log(button);
    if (button === 'simpan') {
      axios
        .post('http://10.0.2.2:3001/data/posting', data, config)
        .then(res => {
          setModalVisible(!modalVisible);
          setDesc('');
          setTitle('');
        });
    } else if (button === 'update') {
      axios
        .put(`http://10.0.2.2:3001/data/posting/${selectedUser._id}`, data)
        .then(res => {
          setModalVisible(!modalVisible);
          setDesc('');
          setTitle('');
          setButton('simpan');
        });
    }
  };

  const selectedItem = event => {
    setSelected(event);
    console.log(selectedUser);
    setDesc(event.desc);
    setTitle(event.title);
    setModalVisible(true);
    setButton('update');
  };

  const selectedItemDelete = event => {
    setSelectedDelete(event);
    setModalDelete(true);
  };

  const selectedLike = ev => {
    // console.log(ev.likes);
    let postingId = ev._id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      postId: postingId,
    };
    axios.put('http://10.0.2.2:3001/data/like', data, config).then(res => {
      console.log(res);
    });
  };

  const unlike = ev => {
    let postingId = ev._id;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      postId: postingId,
    };
    axios.put('http://10.0.2.2:3001/data/unlike', data, config).then(res => {
      console.log(res);
    });
  };

  const cancel = () => {
    setModalVisible(!modalVisible);
    setDesc('');
    setTitle('');
    setButton('simpan');
  };

  const deletedData = () => {
    axios
      .delete(`http://10.0.2.2:3001/data/posting/${selectedUserDelete._id}`)
      .then(res => {
        setModalDelete(!modalDelete);
      });
  };

  // add photo in post

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      const name = image.path.substr(image.path.lastIndexOf('/') + 1);
      let myImage = {
        uri: image.path,
        filename: name,
        type: image.mime,
      };
      setImage(myImage);
    });
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      // const name = image.path.substr(image.path.lastIndexOf('/') + 1)
      // console.log(name)
      // let myImage = {
      //   uri:image.path,
      //   filename:name,
      //   type:image.mime
      // }
      // setImage(name)
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <ScrollView>
        {dataUser.map(user => {
          return (
            // <ListItem key={user._id} bottomDivider style={styles.post} >
            //   <Avatar  />
            //     <ListItem.Content>
            //       <ListItem.Title>{user.title}</ListItem.Title>
            //       <ListItem.Subtitle>{user.desc}</ListItem.Subtitle>
            //     </ListItem.Content>
            //     <Icon
            //         raised
            //         name='trash'
            //         type='font-awesome'
            //         color='#f50'
            //         size={15}
            //         onPress={() => selectedItemDelete(user)} />
            //     <Icon
            //         raised
            //         name='pencil'
            //         type='font-awesome'
            //         color='#f50'
            //         size={15}
            //         onPress={() => selectedItem(user)} />

            //   </ListItem>
            <Card key={user._id}>
              <Card.Title>{user.title}</Card.Title>
              <Card.Divider />
              {/* <Card.Image source={require('../assets/logo.png')}> */}
              <Text style={{marginBottom: 10}}>{user.desc}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Icon
                    raised
                    name="thumbs-up"
                    type="font-awesome"
                    color="#f50"
                    size={15}
                    onPress={() => selectedLike(user)}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    raised
                    name="thumbs-down"
                    type="font-awesome"
                    color="#f50"
                    size={15}
                    onPress={() => unlike(user)}
                  />
                </View>
                <View style={{flex:1}}>
                <TextInput>Like : {user.likes.length}</TextInput>
                
                </View>
                <View style={{flex:2}}>
                <TextInput>Coment : {user.likes.length}</TextInput>
                
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    raised
                    name="comment"
                    type="font-awesome"
                    color="#f50"
                    size={15}
                    onPress={() => selectedComment(user)}
                  />
                </View>
              </View>
              {/* </Card.Image> */}
            </Card>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButon}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Posting</Text>
              {/* <View style={{flexDirection:'row',justifyContent:"space-between"}}>
            <TouchableHighlight
              style={{ ...styles.pictureButton, backgroundColor: "#E5D457",marginRight:10 }}
              onPress={takePhoto}
            >
              <Text style={styles.textStyle}>Take a Picture </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.pictureButton, backgroundColor: "#E5D457" }}
              onPress={choosePhoto}
            >
              <Text style={styles.textStyle}>Choose Photo </Text>
            </TouchableHighlight>
            </View> */}
              <Input
                placeholder="Title"
                containerStyle={styles.inputTitle}
                value={title}
                onChangeText={value => setTitle(value)}
              />
              <Input
                placeholder="Description"
                containerStyle={styles.inputTitle}
                value={desc}
                onChangeText={value => setDesc(value)}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                  style={{
                    ...styles.saveButton,
                    backgroundColor: '#4CDAAD',
                    marginRight: 10,
                  }}
                  onPress={submit}>
                  <Text style={styles.textStyle}>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{...styles.saveButton, backgroundColor: '#4CDAAD'}}
                  onPress={cancel}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDelete}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                apakah anda yakin ingin menghapus data "
                {selectedUserDelete.title}"
              </Text>
              <TouchableHighlight
                style={{...styles.saveButton, backgroundColor: '#4CDAAD'}}
                onPress={deletedData}>
                <Text style={styles.textStyle}>Iya</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.saveButton, backgroundColor: '#4CDAAD'}}
                onPress={() => setModalDelete(!modalDelete)}>
                <Text style={styles.textStyle}>Tidak</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  addButon: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 35,
    backgroundColor: '#18E5A4',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 25,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center"
  },
  inputTitle: {
    width: 200,
    height: 50,
  },
  saveButton: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  pictureButton: {
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  post: {
    marginBottom: 4,
  },
});
