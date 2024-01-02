//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppColors} from '../../theme/appColors';
import {Map, ArrowCircleRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {ADDNOTE} from '../../utils/routes';
import CustomMarker from '../../components/maps/customMarker';
import CustomAnimation from '../../components/uı/customAnimation';
// create a component
const SelectCordinate = ({route}) => {
  const {currentPosition} = route?.params;
  const navigation = useNavigation();
  const [coordinate, setCordinate] = useState(null);
  const [mapType, setMapType] = useState('standart');

  const changeMapType = () => {
    if (mapType == 'standart') setMapType('hybrid');
    else setMapType('standart');
  };
  const handleMarkerPress = e => {
    const {coordinate} = e?.nativeEvent;
    setCordinate(coordinate);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => changeMapType()}
          style={{
            width: 70,
            height: 70,
            position: 'absolute',
            top: 20,
            left: 10,
            zIndex: 99,
            backgroundColor:
              mapType == 'standart' ? AppColors.WHITE : AppColors.BLUE,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}>
          <Map
            size={35}
            color={mapType == 'standart' ? AppColors.BLACK : AppColors.WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ADDNOTE, {
              cordinate: coordinate ? coordinate : currentPosition,
              type: 'Add',
            })
          }
          style={{
            width: 70,
            height: 70,
            position: 'absolute',
            bottom: 20,
            right: 10,
            zIndex: 99,
            backgroundColor: AppColors.GREEN,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}>
          <ArrowCircleRight2 size={35} color={AppColors.WHITE} />
        </TouchableOpacity>
        <MapView
          zoomControlEnabled={false}
          mapType={mapType}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMarkerPress}>
          {coordinate && (
            <Marker coordinate={coordinate} title="Seçilen Konum" />
          )}
          <Marker
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <CustomAnimation />
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

//make this component available to the app
export default SelectCordinate;
