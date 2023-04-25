/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Home from './Home';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {EventRegister} from 'react-native-event-listeners';

import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import Tab1 from './Tab1';
const MyTheme = {
  dark: true,
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#1D1E22',
    text: '#ffffff',
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#0077C2',
        tabBarInactiveTintColor: '#909090',
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'tab3') {
            iconName = require('./images/profile1.png');
          } else if (route.name === 'tab2') {
            iconName = require('./images/profile2.png');
          } else if (route.name === 'Home') {
            iconName = require('./images/add.png');
          } else if (route.name === 'tab4') {
            iconName = require('./images/profile5.png');
          } else if (route.name === 'tab1') {
            iconName = require('./images/profile4.png');
          }

          // You can return any component that you like here!
          //return <FontAwesome5 name={iconName} size={24} color={color} />;
          return iconName == require('./images/add.png') ? (
            <TouchableOpacity
              onPress={() => {
                console.log('home');
                navigation.reset({index: 0, routes: [{name: 'roothome'}]});
              }}>
              <Image
                source={iconName}
                style={{
                  height: route.name === 'Home' ? hp(8) : hp(4),
                  width: route.name === 'Home' ? wp(18) : wp(8),
                }}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={iconName}
              style={{
                height: route.name === 'Home' ? hp(8) : hp(4),
                width: route.name === 'Home' ? wp(18) : wp(8),
              }}
            />
          );
        },
        tabBarStyle: {
          // backgroundColor: 'red',
          height: hp(7.5),
          position: 'relative',
          paddingTop: hp(1.5),
        },
        tabBarLabelStyle: {
          fontSize: RFPercentage(0),
          paddingBottom: hp(1),
          marginTop: hp(0.9),
        },
      })}>
      <Tab.Screen name="tab2" component={Tab2} options={{headerShown: false}} />
      <Tab.Screen name="tab3" component={Tab3} options={{headerShown: false}} />
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="tab4" component={Tab4} options={{headerShown: false}} />
      <Tab.Screen name="tab1" component={Tab1} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [darkApp, setdarkApp] = useState(isDarkMode);
  const appTheme = darkApp ? MyTheme : DefaultTheme;

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('darkmode', data => {
      setdarkApp(data);
    });

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="roothome"
          component={RootHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

// <SafeAreaView style={backgroundStyle}>
//   <StatusBar
//     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//     backgroundColor={backgroundStyle.backgroundColor}
//   />
//   <ScrollView
//     contentInsetAdjustmentBehavior="automatic"
//     style={backgroundStyle}>
//     <View
//       style={{
//         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//       }}></View>
//   </ScrollView>
// </SafeAreaView>
