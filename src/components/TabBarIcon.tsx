import {Image, StyleSheet, View} from 'react-native';

const TabBarIcon = (focused: any, image: any) => (
  <View style={styles.center}>
    <Image
      source={image}
      resizeMode="contain"
      style={styles.tabBarIcon(focused)}
    />
  </View>
);

const styles = StyleSheet.create({
  tabBarIcon: (focused: boolean): any => ({
    width: 25,
    height: 25,
    tintColor: focused ? '#33A9FF' : '#748c94',
  }),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBarIcon;
