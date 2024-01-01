//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from '../../components/uı/TextInput';
import CutomButton from '../../components/uı/customButton';

// create a component
const AddNote = ({route}) => {
  const {cordinate,type} = route?.params;
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const handeSaveNote = () => {
    setLoading(true);
    const form = {
      title: title,
      description: description,
      region: cordinate,
    };
    console.log(form);
    firestore()
      .collection('Notes')    
      .add(form)
      .then(() => {
        Alert.alert("Başarılı","Not Başarılı Bir Şekilde Eklendi.")
        console.log('Note added!');
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <CutomTextInput
        placeHolder={'Başlık'}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <CutomTextInput
        placeHolder={'Açıklama'}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <CutomButton
        loading={loading}
        disabled={!title || !description}
        title={'Kaydet'}
        onPress={handeSaveNote}
      />
      <Text>{type}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default AddNote;
