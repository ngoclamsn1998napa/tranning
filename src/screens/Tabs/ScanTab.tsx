import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../../../App';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';
import FolderAction from '../FolderAction';

import MyScanScreen from '../MyScanScreen';
const SettingStack = createNativeStackNavigator();

const HeaderRight = (setIsOpenBottomSheet: any) => (
  <View style={styles.headerRight}>
    <TouchableOpacity onPress={() => setIsOpenBottomSheet(true)}>
      <Image source={IcMenu} />
    </TouchableOpacity>
  </View>
);

const HeaderLeft = () => <Image source={Setting} />;

export default function ScanTab(props: any) {
  const {setIsOpenBottomSheet} = React.useContext(ThemeContext);
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: () => HeaderRight(setIsOpenBottomSheet),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
      }}>
      <SettingStack.Screen
        name="MyScan"
        options={{
          title: '',
          headerLeft: HeaderLeft,
        }}
        children={propsChildren => (
          <MyScanScreen {...propsChildren} {...props} />
        )}
      />
      <SettingStack.Screen
        name="ActionFolder"
        options={{
          title: '',
          header: () => null,
          presentation: 'modal',
          headerShown: true,
        }}
        children={propChildren => {
          const {actionFolder = '', reNameObj = ''} = (propChildren?.route
            ?.params || {}) as any;
          return (
            <FolderAction
              {...propChildren}
              {...props}
              actionFolder={actionFolder}
              reNameObj={reNameObj}
            />
          );
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
