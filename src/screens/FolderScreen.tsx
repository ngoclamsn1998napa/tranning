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
import folder from '../assets/folder.png';
import pdfFile from '../assets/pdfFile.png';
import Star from '../assets/star.png';

const files = [
  {
    title: 'Homework Documents',
    src: folder,
    description: '3 items',
    createdAt: '',
    type: 'folder',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: pdfFile,
    description: '',
    createdAt: '10:43',
    type: 'file',
  },
  {
    title: 'Invoices Folder',
    src: folder,
    description: '5 items',
    createdAt: '',
    type: 'folder',
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
    title: 'Homework Documents',
    src: folder,
    description: '3 items',
    createdAt: '',
    type: 'folder',
  },
  {
    title: 'Scan 2021-06-01 10:43:50',
    src: folder,
    description: '',
    createdAt: '10:43',
    type: 'folder',
  },
  {
    title: 'Invoices Folder',
    src: folder,
    description: '5 items',
    createdAt: '',
    type: 'folder',
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

export default function FolderScreen({navigation}: any) {
  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.headerTitle}>Library</Text>
        <View style={styles.button}>
          <Image source={Star} />
          <TouchableOpacity onPress={() => navigation.navigate('MyScan')}>
            <Text style={styles.text}>
              Upgrade to get the most out of Scan Studio
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listFolders}>
          {files.map((value, index) => (
            <TouchableOpacity
              onPress={() =>
                value.type === 'folder' && navigation.navigate('Details')
              }
              style={styles.item}
              key={index}>
              <View style={styles.fileContent} key={index}>
                <Image source={value.src} />
                <Text>
                  {value?.description ? value?.description : value?.createdAt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: '5%',
    marginTop: 20,
  },
});
