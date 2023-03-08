import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {ThemeContext} from '../../App';

const ViewPdf = (props: any) => {
  const {setIsOpenBottomSheet} = React.useContext(ThemeContext);

  useEffect(() => {
    setIsOpenBottomSheet(true);
    return () => setIsOpenBottomSheet(false);
  }, [setIsOpenBottomSheet]);
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{
          uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
          cache: true,
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default ViewPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
