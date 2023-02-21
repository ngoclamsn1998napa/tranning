import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
// Screens
import Files from '../assets/Files.png';
import FolderIcon from '../assets/folderIcon.png';
import Pen from '../assets/pen.png';
import Search from '../assets/search.png';
import MidIcon from '../assets/tabMid.png';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
const Tab = createBottomTabNavigator();

const HomeComponent = () => <Text>HomeComponent</Text>;
const ScanComponent = () => <Text>ScanComponent</Text>;
const ToolComponent = () => <Text>ToolComponent</Text>;
const SearchComponent = () => <Text>SearchComponent</Text>;

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        unmountOnBlur: true,
        header: () => null,
        tabBarStyle: {
          height: 70,
          width: '100%',
          borderTopColor: '#FFFFFF',
          backgroundColor: '#ffffff',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'My scans',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Files}
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#33A9FF' : '#748c94',
                }}
              />
            </View>
          ),
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        component={HomeComponent}
      />
      <Tab.Screen
        name="Folder"
        options={{
          tabBarLabel: 'Library',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={FolderIcon}
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#33A9FF' : '#748c94',
                }}
              />
            </View>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Mid"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 60,
                position: 'absolute',
                zIndex: 100,
                top: -10,
              }}>
              <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              >
                <Image source={MidIcon} />
              </TouchableOpacity>
            </View>
          ),
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        component={ScanComponent}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'Search',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Search}
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#33A9FF' : '#748c94',
                }}
              />
            </View>
          ),
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        component={SearchComponent}
      />
      <Tab.Screen
        name="Tool"
        options={{
          tabBarLabel: 'Tool',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Pen}
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#33A9FF' : '#748c94',
                }}
              />
            </View>
          ),
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        component={ToolComponent}
      />
    </Tab.Navigator>
  );
}

export default MainContainer;
