import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import 'react-native-get-random-values';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as generateUUID} from 'uuid';
import FilePlusIcon from '../assets/file-plus.png';
import GridShowAs from '../assets/grid.png';
import ImageIcon from '../assets/image.png';
import ListShowAs from '../assets/list.png';
import pdfFile from '../assets/pdfFile.png';
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

export default function BottomSheetWrap({children}: any) {
  const {isBottomSheet, sortBy, showAs, fileUpload} = useSelector(
    (state: any) => state?.globalReducer,
  );
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const refRBSheet = useRef();

  const formatDate = () => {
    let d = new Date(),
      dformat =
        [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  };

  const selectFile = async (type: string) => {
    const typesFile = type === 'import_photo' ? [types.images] : [types.pdf];
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
        format: type === 'import_photo' ? 'image' : 'pdf',
      }));
      ToastAndroid.showWithGravityAndOffset(
        'Select file is success!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        50,
      );

      dispatch({
        type: 'SET_FILE_UPLOAD',
        payload: [...fileUpload, ...fileItem],
      });
    } catch (error) {}
  };

  const generationSortByButton = () => {
    return sortByList.map((value, i) => (
      <TouchableOpacity
        style={[
          styles.btnSortBy,
          sortBy === value.key ? styles.activeSortBy : null,
        ]}
        onPress={() => {
          dispatch({
            type: 'SET_SORT_BY',
            payload: value.key,
          });
        }}
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
        onPress={() => {
          dispatch({
            type: 'SET_SHOW_AS',
            payload: value.key,
          });
        }}
        key={i}>
        <Image source={value.src} />
        <Text>{value.title}</Text>
      </TouchableOpacity>
    ));
  };

  const actionFilesEvent = (key: string) => {
    if (key === 'select_file') {
      dispatch({
        type: 'SET_HIDDEN_BOTTOM_TAB',
        payload: true,
      });
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
        onPress={() => {
          dispatch({
            type: 'SET_HIDDEN_BOTTOM_TAB',
            payload: false,
          });
          actionFilesEvent(value?.key);
        }}>
        <Image source={value.src} />
        <Text>{value.title}</Text>
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    if (isBottomSheet) {
      refRBSheet?.current.open();
    } else {
      refRBSheet?.current.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomSheet]);

  return (
    <View>
      {children}
      <RBSheet
        height={392}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        onClose={() =>
          dispatch({
            type: 'SET_BOTTOM_SHEET',
            payload: false,
          })
        }>
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
      </RBSheet>
    </View>
  );
}

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
    height: 28,
    alignItems: 'center',
    padding: 2,
    marginTop: 13,
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
