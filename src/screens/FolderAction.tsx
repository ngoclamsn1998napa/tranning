import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FilePlusIcon from '../assets/file-plus.png';
import GridShowAs from '../assets/grid.png';
import ImageIcon from '../assets/image.png';
import ListShowAs from '../assets/list.png';
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

const FolderAction = ({
  sortBy,
  setSortBy,
  showAs,
  setShowAs,
  setFileUpload,
  navigation,
}: any) => {
  const [index, setIndex] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['85%'], []);

  const formatDate = () => {
    var d = new Date(),
      dformat =
        [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
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
    <View>
      <Text>aa</Text>
    </View>
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

export default FolderAction;
