import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {AppColors} from '../theme/appColors';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: AppColors.WHITE,
            borderRadius: 5,
            padding: 15,
          }}>
          <ActivityIndicator size={'large'} color={AppColors.GRAY} />
          <Text>Yükleniyor</Text>
        </View>
      </View>
    </Modal>
  );
}
