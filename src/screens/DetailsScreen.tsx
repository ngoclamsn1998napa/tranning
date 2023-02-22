import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fileLock from '../../assets/fileLock.png';
import pdfFile from '../../assets/pdfFile.png';

const files = [
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: '',
    createdAt: '10:43',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: '',
    createdAt: '01/06/2021',
    type: 'file',
  },
];

export default function DetailsScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.listFolders}>
        {files.map((value, index) => (
          <TouchableOpacity style={styles.item} key={index}>
            <View style={styles.fileContent} key={index}>
              <Image source={value.src} />
              <Text>
                {value?.description ? value?.description : value?.createdAt}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {width: '90%', marginLeft: '5%'},
  button: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    backgroundColor: '#33A9FF',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    height: 44,
  },
  text: {
    color: '#FFFFFF',
  },
  fileContent: {
    flexDirection: 'column',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listFolders: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 20,
  },
  item: {
    flexBasis: '33.3%',
  },
});
