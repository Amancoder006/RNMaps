import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Dropdown} from 'react-native-element-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {EventRegister} from 'react-native-event-listeners';

const {height, width} = Dimensions.get('window');
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const Home = () => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [lat, setlat] = useState(null);
  const [long, setLong] = useState(null);
  const [desc, setDesc] = useState();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [theme, setTheme] = useState(true);

  const placesInLucknow = [
    {
      name: 'Bara Imambara',
      longitude: 80.9034,
      latitude: 26.8651,
      imageUrl: require('./images/imambara.jpeg'),
      description:
        'Bara Imambara is a historical monument in Lucknow, known for its unique architecture and the famous Bhool Bhulaiya (maze). It is a popular tourist attraction.',
    },
    {
      name: 'Rumi Darwaza',
      longitude: 80.9124,
      latitude: 26.8606,
      imageUrl: require('./images/rumigate.jpeg'),
      description:
        'Rumi Darwaza is an iconic gateway in Lucknow, also known as the Turkish Gate. It is known for its impressive structure and intricate design, and is a significant historical landmark.',
    },
    {
      name: 'Hazratganj',
      longitude: 80.9576,
      latitude: 26.8543,
      imageUrl: require('./images/hazratganj.jpeg'),
      description:
        'Hazratganj is a popular shopping and commercial area in Lucknow, known for its vibrant atmosphere, wide range of shops, restaurants, and entertainment options.',
    },
    {
      name: 'Lucknow Zoo',
      longitude: 80.9218,
      latitude: 26.8413,
      imageUrl: require('./images/zoo.jpeg'),
      description:
        'Lucknow Zoo, officially known as Nawab Wajid Ali Shah Prani Udyan, is a prominent zoo and wildlife conservation center in Lucknow, home to a variety of animals.',
    },
    {
      name: 'British Residency',
      longitude: 80.9378,
      latitude: 26.8552,
      imageUrl: require('./images/residency.jpeg'),
      description:
        'The British Residency is a historic complex in Lucknow that served as the residence of the British Resident General during the First War of Indian Independence in 1857. It is now a museum and memorial, showcasing the history and events of the uprising.',
    },
  ];

  const DarkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];
  console.log(theme);
  return (
    <SafeAreaView>
      <>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            top: hp(3),
          }}>
          <Dropdown
            data={placesInLucknow}
            placeholder="Search"
            value={name}
            labelField="name"
            valueField="name"
            onChange={item => {
              setlat(parseFloat(item.latitude));
              setLong(parseFloat(item.longitude));
              setDesc(item.description);
              setName(item?.name);
              setImage(item?.imageUrl);
              setVisible(true);
            }}
            style={{
              height: hp(7),
              width: wp(90),
              backgroundColor: 'white',
              borderRadius: wp(2),
              color: '#202020',
              fontFamily: 'Inter-Regular',
              paddingHorizontal: wp(3),
              paddingVertical: hp(0.5),
            }}
            placeholderStyle={{color: '#606060'}}
            selectedTextStyle={{color: '#606060'}}
            itemTextStyle={{color: '#606060'}}
          />

          <TouchableOpacity
            onPress={() => {
              EventRegister.emit('darkmode', !dark);
            }}
            style={{
              borderRadius: wp(2),
              paddingHorizontal: wp(2),
              backgroundColor: theme ? 'white' : '#606060',
              height: hp(5),
              width: wp(12),
              zindex: 2,
              borderRadius: wp(1),
              top: hp(1),
              alignItems: 'center',
            }}>
            <View>
              <Image
                source={require('./images/edit.png')}
                style={{height: hp(4), width: wp(8)}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <MapView
          //   userInterfaceStyle="dark"
          customMapStyle={dark ? DarkMapStyle : []}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{height: hp(100), width: wp(100)}}
          initialRegion={{
            longitude: 80.9218,
            latitude: 26.8413,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          region={
            lat !== null && long !== null
              ? {
                  longitude: parseFloat(long),
                  latitude: parseFloat(lat),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
              : {
                  longitude: 80.9218,
                  latitude: 26.8413,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
          }>
          {placesInLucknow?.map((item, ind) => {
            let img;
            if (ind === 0) {
              img = require('./images/place.png');
            } else if (ind === 1) {
              img = require('./images/ProfSeti1.png');
            } else if (ind === 2) {
              img = require('./images/ProfSeti2.png');
            } else if (ind === 3) {
              img = require('./images/ProfSeti3.png');
            } else if (ind === 4) {
              img = require('./images/place.png');
            }

            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('run');
                  setVisible(true);
                }}
                style={{zIndex: 12, backgroundColor: 'red'}}>
                <Marker
                  title={item?.name}
                  onPress={() => {
                    setVisible(true);
                    setlat(parseFloat(item.latitude));
                    setLong(parseFloat(item.longitude));
                    setDesc(item.description);
                    setName(item?.name);
                    setImage(item?.imageUrl);
                  }}
                  key={`key_${parseFloat(item?.latitude)}_${parseFloat(
                    item?.longitude,
                  )}`}
                  coordinate={{
                    latitude: parseFloat(item?.latitude),
                    longitude: parseFloat(item?.longitude),
                  }}>
                  <View>
                    <Image
                      source={img}
                      style={{
                        height: hp(4),
                        width: wp(8),
                        // position: 'absolute',
                        zIndex: 1,
                      }}
                    />
                    {/* <Text style={{color: 'black'}}>Aman</Text> */}
                  </View>
                </Marker>
              </TouchableOpacity>
            );
          })}
        </MapView>

        {visible && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: wp(90),
              alignSelf: 'center',
              bottom: hp(15),
              backgroundColor: 'white',
              height: hp(15),
              borderRadius: wp(2),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp(2),
              paddingVertical: hp(1.5),
              overflow: 'hidden',
            }}>
            <View style={{marginRight: wp(4)}}>
              <Image
                source={image}
                style={{
                  height: '90%',
                  width: wp(23),
                  // position: 'absolute',
                  zIndex: 1,
                  borderRadius: wp(2),
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2.5),
                }}>
                {name}
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: RFPercentage(2),
                }}
                numberOfLines={2}>
                {desc}
              </Text>
            </View>
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

export default Home;
