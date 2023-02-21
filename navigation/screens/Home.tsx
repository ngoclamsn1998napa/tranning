import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, View} from 'react-native';
import FolderPlus from '../../assets/folderPlus.png';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';

import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
const SettingStack = createNativeStackNavigator();
export default function Home() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{display: 'flex', flexDirection: 'row', columnGap: 10}}>
            <Image source={FolderPlus} />
            <Image source={IcMenu} />
          </View>
        ),
      }}>
      <SettingStack.Screen
        name="HomeScreen"
        options={{
          title: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <Image source={Setting} />,
        }}
        component={HomeScreen}
      />
      <SettingStack.Screen
        name="Details"
        options={{headerTitleAlign: 'center', title: 'Homework Documents'}}
        component={DetailsScreen}
      />
    </SettingStack.Navigator>
  );
}
