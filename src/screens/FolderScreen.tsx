import CheckBox from '@react-native-community/checkbox';
import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import DeleteIcon from '../../assets/delete.png';
import MoreIconWhite from '../../assets/more.png';
import ShareIcon from '../../assets/share.png';
// import fileLock from '../assets/fileLock.png';
// import folder from '../assets/folder.png';
import MoreIcon from '../assets/icMenu.png';
// import pdfFile from '../assets/pdfFile.png';
import Star from '../assets/star.png';
// const files = [
// {
//   id: 1,
//   title: 'Homework Documents',
//   src: folder,
//   description: '3 items',
//   createdAt: '',
//   type: 'folder',
// },
// {
//   id: 2,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: pdfFile,
//   description: '',
//   createdAt: '10:43',
//   type: 'file',
// },
// {
//   id: 3,
//   title: 'Invoices Folder',
//   src: folder,
//   description: '5 items',
//   createdAt: '',
//   type: 'folder',
// },
// {
//   id: 4,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: fileLock,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// {
//   id: 5,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: fileLock,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// {
//   id: 6,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: fileLock,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// {
//   id: 7,
//   title: 'Homework Documents',
//   src: folder,
//   description: '3 items',
//   createdAt: '',
//   type: 'folder',
// },
// {
//   id: 8,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: folder,
//   description: '',
//   createdAt: '10:43',
//   type: 'folder',
// },
// {
//   id: 9,
//   title: 'Invoices Folder',
//   src: folder,
//   description: '5 items',
//   createdAt: '',
//   type: 'folder',
// },
// {
//   id: 10,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: fileLock,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// {
//   id: 11,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: pdfFile,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// {
//   id: 12,
//   title: 'Scan 2021-06-01 10:43:50',
//   src: pdfFile,
//   description: '',
//   createdAt: '01/06/2021',
//   type: 'file',
// },
// ];

export default function FolderScreen(props: any) {
  const {
    showAs,
    navigation,
    fileUpload,
    setFileUpload,
    route,
    toggleCheckBox,
    setToggleCheckBox,
    setActiveTab,
  } = props;

  const selectedFile = route?.params?.selectedFile;

  const [listFileState, setListFileState] = React.useState(fileUpload);

  const swipeoutBtns = (user: any) => [
    {
      backgroundColor: '#56627A',
      component: (
        <View style={styles.centerIcon}>
          <Image source={MoreIconWhite} />
          <Text style={styles.textColorWhite}>More</Text>
        </View>
      ),
      onPress: () => {},
    },
    {
      backgroundColor: '#E94242',
      component: (
        <View style={styles.centerIcon}>
          <Image source={DeleteIcon} />
          <Text style={styles.textColorWhite}>Delete</Text>
        </View>
      ),
      onPress: () => {
        const data = listFileState.filter((value: any) => value.id !== user.id);
        setFileUpload(data);
        setListFileState(data);
      },
    },
    {
      backgroundColor: '#3377FF',
      component: (
        <View style={styles.centerIcon}>
          <Image source={ShareIcon} />
          <Text style={styles.textColorWhite}>ReName</Text>
        </View>
      ),
      onPress: () => {},
    },
  ];

  const generateCheckBox = value => {
    if (selectedFile) {
      return (
        <CheckBox
          disabled={false}
          value={toggleCheckBox.includes(value?.id)}
          onValueChange={() => {
            if (!toggleCheckBox.includes(value?.id)) {
              setToggleCheckBox(prevState => [...prevState, value.id]);
            } else {
              setToggleCheckBox(
                toggleCheckBox.filter(item => item !== value.id),
              );
            }
          }}
        />
      );
    }
    return null;
  };

  React.useEffect(() => {
    setActiveTab('folder');
  }, [setActiveTab]);

  return (
    <GestureHandlerRootView>
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
          <View
            style={[
              styles.listFolders,
              showAs === 'grid' ? styles.listFoldersColumn : null,
            ]}>
            {listFileState
              .filter((value: any) => {
                if (showAs === 'icon') {
                  return value;
                }
                return value.type === 'file';
              })
              .map((value: any, index: number) => {
                if (showAs === 'grid') {
                  return (
                    <Swipeout
                      rowIndex={index}
                      sectionId={0}
                      autoClose={true}
                      right={swipeoutBtns(value)}
                      style={styles.swipeoutStyle}>
                      <View style={styles.fileContentRow} key={index}>
                        <View style={styles.fileDetail}>
                          {generateCheckBox(value)}
                          <Image source={value.src} />
                          <View style={styles.row}>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('ViewPdf')}>
                              <View style={styles.column}>
                                <Text>
                                  {value?.description
                                    ? value?.description
                                    : value?.title}
                                </Text>
                                <Text>{value?.createdAt}</Text>
                                <Text>PDF</Text>
                              </View>
                            </TouchableOpacity>
                            <Image source={MoreIcon} />
                          </View>
                        </View>
                      </View>
                    </Swipeout>
                  );
                }
                return (
                  <TouchableOpacity
                    onPress={() =>
                      value.type === 'folder' && navigation.navigate('Details')
                    }
                    style={styles.item}
                    key={index}>
                    <View style={styles.fileContent} key={index}>
                      <Image source={value.src} />
                      <Text>
                        {value?.description
                          ? value?.description
                          : value?.createdAt}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
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
  fileContentRow: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  fileDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  listFolders: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 20,
  },
  listFoldersColumn: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 40,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 5,
  },
  rightAction: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    columnGap: 10,
  },
  moreIcon: {
    height: '100%',
    width: 80,
    backgroundColor: '#56627A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeoutStyle: {
    backgroundColor: 'white',
  },
  centerIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textColorWhite: {
    color: '#ffffff',
  },
});
