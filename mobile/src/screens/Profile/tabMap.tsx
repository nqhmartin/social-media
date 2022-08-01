import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ScaleW} from '../../shared/common';
import {DATAMARKET} from './constants';
import ModalImageMap from './components/modalImageMap';
interface Props {}

const TabMap: React.FC<Props> = () => {
  const [isModalImages, setisModalImages] = useState<boolean>(false);
  const [data, setdata] = useState<any>([]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 14.475033435546004,
          longitude: 108.1386062060866,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}>
        {DATAMARKET.map((marker, index) => (
          <Marker
            key={index}
            // title={marker.title}
            onPress={() => {
              setisModalImages(true);
              setdata(marker);
            }}
            coordinate={marker.latlng}
            // description={marker.description}
          >
            <View style={styles.marker}>
              <Image
                source={{uri: marker.images}}
                style={[styles.markerImg]}
                resizeMode="center"
              />
            </View>
          </Marker>
        ))}
      </MapView>
      <ModalImageMap
        onClose={() => setisModalImages(false)}
        data={data}
        isVisible={isModalImages}
      />
    </View>
  );
};

export default TabMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: ScaleW(40),
    height: ScaleW(40),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  markerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
