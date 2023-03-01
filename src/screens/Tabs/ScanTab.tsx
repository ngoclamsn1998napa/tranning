import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';

import MyScanScreen from '../MyScanScreen';
const SettingStack = createNativeStackNavigator();

const HeaderRight = () => (
  <View style={styles.headerRight}>
    <Image source={IcMenu} />
  </View>
);

const HeaderLeft = () => <Image source={Setting} />;

export default function ScanTab(props: any) {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: HeaderRight,
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
