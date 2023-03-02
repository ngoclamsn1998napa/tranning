import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FilePlusIcon from '../assets/file-plus.png';
import GridShowAs from '../assets/grid.png';
import ImageIcon from '../assets/image.png';
import ListShowAs from '../assets/list.png';
import pdfFile from '../assets/pdfFile.png';
import ScanBackGround from '../assets/scan-background.png';
import SearchIcon from '../assets/search.png';
import SelectedFileIcon from '../assets/Selected.png';

const sortByList = [
  {title: 'Name', key: 'name'},
  {title: 'Updated', key: 'updated'},
  {title: 'Created', key: 'created'},
];

const showAsList = [
  {title: 'Icons', key: 'icon', src: GridShowAs},
  {title: 'Grid', key: 'grid', src: ListShowAs},
];

const fileAction = [
  {title: 'Select Files', key: 'select_file', src: SelectedFileIcon},
  {title: 'Import Photos', key: 'import_photo', src: ImageIcon},
  {title: 'Import Files', key: 'import_file', src: FilePlusIcon},
];

const generateUUID = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const MyScanScreen = ({
  sortBy,
  setSortBy,
  showAs,
  setShowAs,
  setFileUpload,
  navigation,
}: any) => {
  const [index, setIndex] = useState(2);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['5%', '25%', '48%', '75%'], []);

  const formatDate = () => {
    var d = new Date(),
      dformat =
        [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  };

  const selectFile = async (type: string) => {
    const typesFile = type === 'import_photo' ? [types.images] : [types.pdf];
    // const typeName = type === 'import_photo' ? 'image' : 'file';
    try {
      const doc = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: typesFile,
        allowMultiSelection: true,
      });
      const fileItem = doc.map(value => ({
        id: generateUUID(),
        title: value.name,
        uri: value.uri,
        src: pdfFile,
        description: '',
        createdAt: formatDate(),
        type: 'file',
      }));
      ToastAndroid.showWithGravityAndOffset(
        'Select file is success!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        50,
      );
      setFileUpload((prevState: any) => [...prevState, ...fileItem]);
    } catch (error) {}
  };

  const generationSortByButton = () => {
    return sortByList.map((value, i) => (
      <TouchableOpacity
        style={[
          styles.btnSortBy,
          sortBy === value.key ? styles.activeSortBy : null,
        ]}
        onPress={() => setSortBy(value.key)}
        key={i}>
        <Text>{value.title}</Text>
      </TouchableOpacity>
    ));
  };

  const generationShowAsButton = () => {
    return showAsList.map((value, i) => (
      <TouchableOpacity
        style={[
          styles.btnSortBy,
          showAs === value.key ? styles.activeSortBy : null,
        ]}
        onPress={() => setShowAs(value.key)}
        key={i}>
        <Image source={value.src} />
        <Text>{value.title}</Text>
      </TouchableOpacity>
    ));
  };

  const actionFilesEvent = (key: string) => {
    if (key === 'select_file') {
      navigation.navigate('Folder', {selectedFile: true});
      return;
    }
    selectFile(key);
  };

  const generationActionFiles = () => {
    return fileAction.map((value, i) => (
      <TouchableOpacity
        style={[
          styles.btnActionFile,
          i === fileAction.length - 1 ? styles.borderNone : null,
        ]}
        key={i}
        onPress={() => actionFilesEvent(value?.key)}>
        <Image source={value.src} />
        <Text>{value.title}</Text>
      </TouchableOpacity>
    ));
  };

  const handleSheetChanges = useCallback((i: number) => {
    setIndex(() => i);
    bottomSheetModalRef?.current?.snapToIndex(i);
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View
          style={[
            styles.container,
            index !== -1 ? styles.bottomSheetActive : null,
          ]}>
          <View style={styles.scanStyle}>
            <Text style={styles.headerTitle}>My Scan</Text>
            <View style={styles.searchInput}>
              <Image style={styles.searchIconStyle} source={SearchIcon} />
              <TextInput style={styles.input} placeholder="Search files" />
            </View>
            <View style={styles.scanBackGround}>
              <Image source={ScanBackGround} />
            </View>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            enableOverDrag
            index={index}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.sheetModal}>
              <View>
                <View>
                  <Text>Sort By</Text>
                  <View style={styles.sortBy}>{generationSortByButton()}</View>
                </View>
              </View>
              <View>
                <View>
                  <Text>Show As</Text>
                  <View style={styles.sortBy}>{generationShowAsButton()}</View>
                </View>
              </View>
              <View style={styles.actionFile}>{generationActionFiles()}</View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scanStyle: {
    height: '100%',
    opacity: 0.7,
  },
  scanBackGround: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 20,
  },
  searchIconStyle: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: 10,
  },
  container: {
    height: '100%',
  },
  bottomSheetActive: {
    backgroundColor: '#949494',
  },
  sheetModal: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    display: 'flex',
    rowGap: 20,
    backgroundColor: '#F5F5F5',
    height: '100%',
  },
  sortBy: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#dedede',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    padding: 2,
  },
  activeSortBy: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 22,
  },
  btnSortBy: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
  },
  actionFile: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  btnActionFile: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    padding: 16,
  },
  borderNone: {
    borderBottomWidth: 0,
  },
  searchInput: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black',
    paddingLeft: 50,
  },
});

export default MyScanScreen;
