import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Files from '../assets/Files.png';
import FolderIcon from '../assets/folderIcon.png';
import Pen from '../assets/pen.png';
import Search from '../assets/search.png';
import MidIcon from '../assets/tabMid.png';
import FolderTab from './FolderStack';
const Tab = createBottomTabNavigator();

import {ThemeContext} from '../../App';
import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';
import TabBarScanQrIcon from '../components/TabBarScanQrIcon';
import ScanScreen from '../screens/ScanScreen';
import SearchScreen from '../screens/SearchScreen';
import ToolScreen from '../screens/ToolScreen';
import ScanTab from './ScanStack';

function MainContainer() {
  const {
    sortBy,
    fileUpload,
    setFileUpload,
    setSelectedFileState,
    hiddenBottomTab,
  } = React.useContext(ThemeContext);

  const screenOptions = useMemo(() => {
    const newStyles = {
      ...styles.tabBarStyle,
      display: hiddenBottomTab ? 'none' : 'flex',
    };

    return {
      unmountOnBlur: true,
      tabBarStyle: newStyles,
      header: () => null,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      title: '',
    };
  }, [hiddenBottomTab]);

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
          tabBarLabel: ({focused}) => TabBarLabel(focused, 'My Scans'),
        }}
        children={() => <ScanTab />}
      />
      <Tab.Screen
        name="Folder"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, FolderIcon),
          tabBarLabel: ({focused}) => TabBarLabel(focused, 'Library'),
        }}
        children={propsChildren => {
          const selectedFileParams =
            propsChildren?.route?.params?.selectedFile || false;
          setSelectedFileState(selectedFileParams);
          return <FolderTab {...propsChildren} />;
        }}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarIcon: () => TabBarScanQrIcon(MidIcon),
        }}
        component={ScanScreen}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, Search),
          tabBarLabel: ({focused}) => TabBarLabel(focused, 'Search'),
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Tool"
        options={{
          tabBarIcon: ({focused}) => TabBarIcon(focused, Pen),
          tabBarLabel: ({focused}) => TabBarLabel(focused, 'Tools'),
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
