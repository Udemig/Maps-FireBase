//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {AppColors} from '../../theme/appColors';
import {Edit} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {EDITNOTE, NOTEDETAIL} from '../../utils/routes';

// create a component
const NoteCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        minHeight: 100,
        backgroundColor: AppColors.NOTE,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
      }}>
      <Pressable
      onPress={()=>navigation.navigate(NOTEDETAIL,{item:item,id:30})}
      style={{flex: 4}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={{marginVertical:10,color:AppColors.GRAY}}>{item.date}</Text>
      </Pressable>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Pressable onPress={() => navigation.navigate(EDITNOTE, {item: item,type:"Update"})}>
          <Edit color={AppColors.BLACK} />
        </Pressable>
      </View>
    </View>
  );
};

//make this component available to the app
export default NoteCard;
