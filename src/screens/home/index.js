//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppColors} from '../../theme/appColors';
import {Map, NoteAdd, Notepad2} from 'iconsax-react-native';
import FlatActionButton from '../../components/uı/flatActionButton';
import {NOTELIST} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';
import {notes} from '../../utils/mockData';
import CustomMarker from '../../components/maps/customMarker';
import LoadingModal from '../../components/loading';
// create a component
const Home = props => {
  const navigation = useNavigation();
  const [mapType, setMapType] = useState('standart');
  const [notes,setNotes]=useState([])
  const [visible,setVisible]=useState(false)
  const changeMapType = () => {
    if ((mapType == 'standart')) setMapType('hybrid');
    else setMapType('standart');
  };
  const getNotes = async () => {
    setVisible(true)
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        const fetchedNotes = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedNotes.push(documentSnapshot.data());
        });
        setNotes(fetchedNotes);
      }).catch((eror)=>{
        console.log(eror)
      }).finally(()=>{
        setVisible(false)
      })
  };
  useEffect(() => {
    getNotes()
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoadingModal visible={visible}/>
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
            backgroundColor: mapType=="standart"?AppColors.WHITE:AppColors.BLUE,
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
          <Map size={35} color={mapType=="standart"?AppColors.BLACK:AppColors.WHITE} />
        </TouchableOpacity>
        <MapView
          zoomControlEnabled={false}
          mapType={mapType}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 41.0541648,
            longitude: 28.9764438,
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
        </MapView>
        <FlatActionButton {...props} />
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
export default Home;
