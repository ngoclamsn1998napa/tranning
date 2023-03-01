import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Files from '../assets/Files.png';
import FolderIcon from '../assets/folderIcon.png';
import Pen from '../assets/pen.png';
import Search from '../assets/search.png';
import MidIcon from '../assets/tabMid.png';
import FolderTab from './Tabs/FolderTab';

const Tab = createBottomTabNavigator();

import TabBarIcon from '../components/TabBarIcon';
import TabBarScanQrIcon from '../components/TabBarScanQrIcon';
import ScanScreen from './ScanScreen';
import SearchScreen from './SearchScreen';
import ScanTab from './Tabs/ScanTab';
import ToolScreen from './ToolScreen';
function MainContainer(props: any) {
  const [sortBy, setSortBy] = useState('name');
  const [showAs, setShowAs] = useState('icon');
  const [fileUpload, setFileUpload] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  const screenOptions = useMemo(() => {
    const newStyles = {
      ...styles.tabBarStyle,
      display: activeTab === 'home' ? 'none' : 'flex',
    };
    return {
      tabBarShowLabel: false,
      unmountOnBlur: true,
      tabBarStyle: newStyles,
      header: () => null,
      title: '',
    };
  }, [activeTab]);

  const scanProps = {
    sortBy,
    setSortBy,
    showAs,
    setShowAs,
    fileUpload,
    setFileUpload,
    setActiveTab,
  };

  useEffect(() => {
    let dataAfterSort: any = [];
    if (sortBy === 'name') {
      dataAfterSort = fileUpload.sort();
    }
    if (sortBy === 'updated' || sortBy === 'created') {
      dataAfterSort = fileUpload.sort(function (a: any, b: any) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    setFileUpload(dataAfterSort);
  }, [fileUpload, sortBy]);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, Files),
        }}
        children={() => <ScanTab {...scanProps} />}
        listeners={() => ({
          tabPress: () => {
            setActiveTab('home');
          },
        })}
      />
      <Tab.Screen
        name="Folder"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, FolderIcon),
        }}
        children={propsChildren => (
          <FolderTab {...propsChildren} {...scanProps} />
        )}
        listeners={() => ({
          tabPress: () => {
            setActiveTab('folder');
          },
        })}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarIcon: () => TabBarScanQrIcon(MidIcon),
        }}
        component={ScanScreen}
        listeners={() => ({
          tabPress: () => {
            setActiveTab('scan');
          },
        })}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, Search),
        }}
        component={SearchScreen}
        listeners={() => ({
          tabPress: () => {
            setActiveTab('search');
          },
        })}
      />
      <Tab.Screen
        name="Tool"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, Pen),
        }}
        component={ToolScreen}
        listeners={() => ({
          tabPress: () => {
            setActiveTab('tool');
          },
        })}
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
