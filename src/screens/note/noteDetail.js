//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CutomButton from '../../components/uı/customButton';
import {AppColors} from '../../theme/appColors';
import {useNavigation} from '@react-navigation/native';
import { EDITNOTE } from '../../utils/routes';

// create a component
const NoteDetail = ({route}) => {
  const navigation = useNavigation();
  const {item} = route?.params;
  const handleDelete = () => {
    firestore()
      .collection('Notes')
      .doc(item?.id)
      .delete()
      .then(() => {
        Alert.alert('Başarılı', 'Not Başarılı Bir Şekilde Silindi.', [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      })
      .catch(eror => {
        Alert.alert('Başarısız', 'Not Silme Başarısız.');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text>ID</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.id}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text>Başlık</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.title}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <View style={{flex: 1}}>
            <Text>Açıklama</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.description}</Text>
          </View>
        </View>
      </View>
      <CutomButton title={'Düzenle'} color={AppColors.BLUE} onPress={()=>navigation.navigate(EDITNOTE,{item:item})}/>
      <CutomButton title={'Sil'} color={AppColors.RED} onPress={handleDelete} />
    </SafeAreaView>
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
export default NoteDetail;
