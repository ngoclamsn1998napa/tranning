import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FilePlusIcon from '../assets/file-plus.png';
import GridShowAs from '../assets/grid.png';
import ImageIcon from '../assets/image.png';
import ListShowAs from '../assets/list.png';
import ScanBackGround from '../assets/scan-background.png';
import SearchIcon from '../assets/search.png';
import SelectedFileIcon from '../assets/Selected.png';

const sortByList = [
  {title: 'Name', key: 'name'},
  {title: 'Updated', key: 'updated'},
  {title: 'Created', key: 'created'},
];

const showAsList = [
  {title: 'Icon', key: 'icon', src: ListShowAs},
  {title: 'Grid', key: 'grid', src: GridShowAs},
];

const fileAction = [
  {title: 'Select Files', key: 'select_file', src: SelectedFileIcon},
  {title: 'Import Photos', key: 'import_photo', src: ImageIcon},
  {title: 'Import Files', key: 'import_file', src: FilePlusIcon},
];

const MyScanScreen = ({sortBy, setSortBy, showAs, setShowAs}: any) => {
  const [index, setIndex] = useState(1);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '48%', '75%'], []);

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

  const generationActionFiles = () => {
    return fileAction.map((value, i) => (
      <TouchableOpacity
        style={[
          styles.btnActionFile,
          i === fileAction.length - 1 ? styles.borderNone : null,
        ]}
        key={i}>
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
