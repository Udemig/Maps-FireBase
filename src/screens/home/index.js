//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppColors} from '../../theme/appColors';
import {Map, Notepad2} from 'iconsax-react-native';
import FlatActionButton from '../../components/uı/flatActionButton';
import {NOTELIST} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';
import CustomMarker from '../../components/maps/customMarker';
import LoadingModal from '../../components/loading';
import CustomAnimation from '../../components/uı/customAnimation';
// create a component
const Home = props => {
  const navigation = useNavigation();
  const [mapType, setMapType] = useState('standart');
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPosition, setCurrentPossition] = useState(null);
  const changeMapType = () => {
    if (mapType == 'standart') setMapType('hybrid');
    else setMapType('standart');
  };
  const getNotes = async () => {
    setVisible(true);
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        const fetchedNotes = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedNotes.push(documentSnapshot.data());
        });
        setNotes(fetchedNotes);
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setVisible(false);
      });
  };
  const getCurrentPosition = () => {
    setVisible(true);
    Geolocation.getCurrentPosition(
      pos => {
        setCurrentPossition(pos.coords);
        getNotes();
        setVisible(false);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };
  useEffect(() => {
    getCurrentPosition();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoadingModal visible={visible} />
      {!visible && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NOTELIST, {id: 34})}
            style={{
              width: 70,
              height: 70,
              position: 'absolute',
              top: 20,
              right: 10,
              zIndex: 99,
              backgroundColor: AppColors.WHITE,
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
            <Notepad2 size={35} color={AppColors.BLACK} />
          </TouchableOpacity>
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
            }}>
            {notes.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.region}
                title={marker.title}
                description={marker.description}>
                <CustomMarker />
              </Marker>
            ))}
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
          <FlatActionButton {...props} currentPosition={currentPosition} />
        </View>
      )}
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
export default Home;
