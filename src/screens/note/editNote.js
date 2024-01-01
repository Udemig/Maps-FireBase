//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from '../../components/uı/TextInput';
import CutomButton from '../../components/uı/customButton';
import { useNavigation } from '@react-navigation/native';
import { NOTELIST } from '../../utils/routes';

// create a component
const EditNote = ({route}) => {
    const navigation=useNavigation()
  const {item,type} = route?.params;
  const [title, setTitle] = useState(item?.title);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(item?.description);
  const handleUpdate=()=>{
    setLoading(true);
    const form = {
      title: title,
      description: description,
      region: item?.region,
    };
    firestore()
    .collection('Notes')
    .doc(item?.id)
    .update(form)
    .then(() => {
        Alert.alert('Başarılı', 'Not Başarılı Bir Şekilde Güncelleendi.', [
            {
              text: 'Tamam',
              onPress: () => navigation.navigate(NOTELIST),
              style: 'cancel',
            },
          ]);
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setLoading(false);
      });
  }
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
        title={'Güncelle'}
         onPress={handleUpdate}
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
export default EditNote;
