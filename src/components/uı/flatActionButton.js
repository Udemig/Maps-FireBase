//import liraries
import React, { Component } from 'react';
import {TouchableOpacity } from 'react-native';
import { NoteAdd } from 'iconsax-react-native';
import { AppColors } from '../../theme/appColors';
import { ADDNOTE, SELECTCORDINATE } from '../../utils/routes';

// create a component
const FlatActionButton = (props) => {
    const {navigation}=props
    return (
        <TouchableOpacity
        onPress={()=>navigation.navigate(SELECTCORDINATE)}
        style={{
          width: 80,
          height: 80,
          backgroundColor: AppColors.BLUE,
          borderRadius: 200,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          right: 10,
        }}>
        <NoteAdd size={40} color={AppColors.WHITE} />
      </TouchableOpacity>
    );
};

export default FlatActionButton;
