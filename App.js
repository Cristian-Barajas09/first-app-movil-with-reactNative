import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity,Platform } from "react-native";
import React, { useState } from "react";
import Diamond from './assets/diamante.jpg'
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'
import uploadToAnonymousFileAsync from'anonymous-files'
const App = () => {

  const [selectImage, setSelectImage] = useState(null)

  const OpenImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Pemission to access camara is requerid')
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.canceled === true) {
      return
    }

    if(Platform.OS === 'web'){
      const remoteUri = await uploadToAnonymousFileAsync(pickerResult.assets[0].uri)
      setSelectImage({localUri: pickerResult.assets[0].uri,remoteUri})
    }else{
      setSelectImage({
        localUri: pickerResult.assets[0].uri
      })
    }
    

  }
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`the image is available for sharing at: ${selectImage.remoteUri}`)
      return;
    }
    await Sharing.shareAsync(selectImage.localUri)
  }
  return (
    <View style={style.container}>
      <Text style={style.title}>Pick an image</Text>
      <Image
        source={Diamond}
        style={style.image}
      />
      <TouchableOpacity
        onPress={OpenImagePickerAsync}
      >
        <Image
          style={style.image}
          source={{
            uri: selectImage !== null ? selectImage.localUri : 'https://picsum.photos/200/200'
          }}
        />
      </TouchableOpacity>

      {
        selectImage ?
          (<Button
            title="Share this image"
            color='green'
            onPress={openShareDialog}
          />)
          : (<View/>)
      }

<TouchableOpacity style={style.button} onPress={() => {Alert.alert('tantantan')}}>
  <Text style={style.text}>
    press me
  </Text>
</TouchableOpacity>
    </View >
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
    color: '#fff'
  },
  title: { fontSize: 30, },
  image: {
    height: 200,
    width: 200,
    margin: 10,
    borderRadius: 10,

  },
  button: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    margin: 10
  },
  text: {

  }
})



export default App