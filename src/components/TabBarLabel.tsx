import {StyleSheet, Text, View} from 'react-native';

const TabBarLabel = (focused: any, text: any) => (
  <View style={styles.paddingBottom}>
    <Text style={styles.textColor(focused)}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  textColor: (focused: boolean): any => ({
    color: focused ? '#33A9FF' : '#748c94',
    fontSize: 10,
  }),
  paddingBottom: {
    paddingBottom: 10,
  },
});

export default TabBarLabel;
