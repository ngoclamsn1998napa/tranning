import {Image, StyleSheet, View} from 'react-native';

const TabBarScanQrIcon = (image: any) => (
  <View style={styles.ScanQr}>
    <Image source={image} />
  </View>
);

const styles = StyleSheet.create({
  ScanQr: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    zIndex: 100,
    top: -10,
  },
});

export default TabBarScanQrIcon;
