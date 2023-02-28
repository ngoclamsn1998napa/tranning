import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import FolderPlus from '../../assets/folderPlus.png';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';

import DetailsScreen from '../DetailsScreen';
import FolderScreen from '../FolderScreen';
import ViewPdf from '../ViewPdf';
const SettingStack = createNativeStackNavigator();

const HeaderRight = () => (
  <View style={styles.headerRight}>
    <Image source={FolderPlus} />
    <Image source={IcMenu} />
  </View>
);

const HeaderLeft = () => <Image source={Setting} />;

export default function FolderTab(props: any) {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: HeaderRight,
      }}>
      <SettingStack.Screen
        name="FolderScreen"
        options={{
          title: '',
          headerLeft: HeaderLeft,
        }}
        children={propChildren => <FolderScreen {...propChildren} {...props} />}
      />
      <SettingStack.Screen
        name="Details"
        options={{headerTitleAlign: 'center', title: 'Homework Documents'}}
        component={DetailsScreen}
      />
      <SettingStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{
          title: '',
          headerRight: () => null,
        }}
      />
    </SettingStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },
});
