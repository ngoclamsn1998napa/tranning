import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';
import FolderAction from '../screens/FolderAction';

import MyScanScreen from '../screens/MyScanScreen';
const SettingStack = createNativeStackNavigator();

const HeaderRight = (dispatch: any) => (
  <View style={styles.headerRight}>
    <TouchableOpacity
      onPress={() =>
        dispatch({
          type: 'SET_BOTTOM_SHEET',
          payload: true,
        })
      }>
      <Image source={IcMenu} />
    </TouchableOpacity>
  </View>
);

const HeaderLeft = () => <Image source={Setting} />;

export default function ScanTab(props: any) {
  const dispatch = useDispatch();
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: () => HeaderRight(dispatch),
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
