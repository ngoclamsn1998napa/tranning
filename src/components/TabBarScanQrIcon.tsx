import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const TabBarScanQrIcon = (image: any) => (
  <View style={styles.ScanQr}>
    <TouchableOpacity>
      <Image source={image} />
    </TouchableOpacity>
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
