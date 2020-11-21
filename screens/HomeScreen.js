import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar,Modal ,
  TouchableHighlight} from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios'
import { ListItem, Avatar,Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  const [dataUser,setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")

  const theme = useTheme();
  useEffect(()=>{
    data()
  })
  const data = () =>{
    axios.get('http://10.0.2.2:3001/data/posting').then(res =>{
    setData(res.data)
  })
} 

const submit = () =>{
  const data = {
    title:title,
    desc:desc
  }
  axios.post('http://10.0.2.2:3001/data/posting',data).then(res =>{
    setModalVisible(!modalVisible)
    setDesc("")
    setTitle("")
  })
  
}
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        {
          dataUser.map(user =>{
            return (
              <ListItem key={user._id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{user.title}</ListItem.Title>
                    <ListItem.Subtitle>{user.desc}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
            );
          })
        }
      <TouchableOpacity style={styles.addButon} onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.addText} >+</Text>
      </TouchableOpacity>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Todos</Text>
            <Input
              placeholder='Title'
              containerStyle={styles.inputTitle}
              value={title}
              onChangeText = {(value) => setTitle(value)}
            />
            <Input
              placeholder='Description'
              containerStyle={styles.inputTitle}
              value={desc}
              onChangeText = {(value) => setDesc(value)}
            />
            <TouchableHighlight
              style={{ ...styles.saveButton, backgroundColor: "#4CDAAD" }}
              onPress={submit}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.saveButton, backgroundColor: "#4CDAAD" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
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
  addButon:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:35,
    backgroundColor:'#18E5A4',
    width:50,
    height:50,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center"
  },
  addText:{
    fontSize:25,
    color:'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center"
  },
  inputTitle:{
    width:200,
    height:50
  },
  saveButton:{
    height:30,
    width:80,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    marginTop:20
  }
});
