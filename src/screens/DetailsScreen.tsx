import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fileLock from '../assets/fileLock.png';
import pdfFile from '../assets/pdfFile.png';

const files = [
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '10:43',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: fileLock,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: 'Scan 2021-06-01 10:43:50',
    createdAt: '01/06/2021',
    type: 'file',
  },
];

export default function DetailsScreen() {
  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.listFolders}>
          {files.map((value, index) => (
            <TouchableOpacity style={styles.item} key={index}>
              <View style={styles.fileContent} key={index}>
                <Image source={value.src} />
                <View style={styles.description}>
                  <Text style={styles.title}>{value?.description}</Text>
                  <Text style={styles.createdAt}>{value?.createdAt}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  createdAt: {
    fontSize: 12,
    color: '#5C6068',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Light',
  },
  title: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  scrollView: {width: '90%', marginLeft: '5%'},
  description: {
    display: 'flex',
    flexDirection: 'column',
  },
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
