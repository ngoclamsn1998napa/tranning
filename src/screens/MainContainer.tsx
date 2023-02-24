import * as React from 'react';
import {StyleSheet} from 'react-native';

import Files from '../assets/Files.png';
import FolderIcon from '../assets/folderIcon.png';
import Pen from '../assets/pen.png';
import Search from '../assets/search.png';
import MidIcon from '../assets/tabMid.png';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FolderTab from './Tabs/FolderTab';
const Tab = createBottomTabNavigator();

import TabBarIcon from '../components/TabBarIcon';
import TabBarScanQrIcon from '../components/TabBarScanQrIcon';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import SearchScreen from './SearchScreen';
import ToolScreen from './ToolScreen';

function MainContainer() {
  const screenOptions = {
    tabBarShowLabel: false,
    unmountOnBlur: true,
    header: () => null,
    tabBarStyle: styles.tabBarStyle,
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'My scans',
          tabBarIcon: ({focused}) => TabBarIcon(focused, Files),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Folder"
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({focused}) => TabBarIcon(focused, FolderIcon),
        }}
        component={FolderTab}
      />
      <Tab.Screen
        name="Mid"
        options={{
          tabBarIcon: () => TabBarScanQrIcon(MidIcon),
        }}
        component={ScanScreen}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => TabBarIcon(focused, Search),
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Tool"
        options={{
          tabBarLabel: 'Tool',
          tabBarIcon: ({focused}) => TabBarIcon(focused, Pen),
        }}
        component={ToolScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    width: '100%',
    borderTopColor: '#FFFFFF',
    backgroundColor: '#ffffff',
  },
  tabBarIcon: (focused: boolean): any => ({
    width: 25,
    height: 25,
    tintColor: focused ? '#33A9FF' : '#748c94',
  }),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScanQr: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    zIndex: 100,
    top: -10,
  },
});

export default MainContainer;
