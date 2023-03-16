import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '../../assets/delete.png';
import MoreIconWhite from '../../assets/more.png';
import ShareIcon from '../../assets/share.png';
import fileSmall from '../assets/fileSmall.png';
import MoreIcon from '../assets/icMenu.png';
import ScanBackGround from '../assets/scan-background.png';
import SearchIcon from '../assets/search.png';
import BottomSheetWrap from '../components/BottomSheetWrap';
const MyScanScreen = () => {
  const fileUpload = useSelector(
    (state: any) => state?.globalReducer?.fileUpload,
  );
  const dispatch = useDispatch();

  const [textSearch, setTextSearch] = useState<any>('');
  const [fileData, setFileData] = useState<any>([]);
  const navigation = useNavigation();

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
        const data = fileUpload.filter((value: any) => value.id !== user.id);
        dispatch({type: 'SET_FILE_UPLOAD', payload: data});
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
      onPress: () => {
        navigation.navigate('ActionFolder', {
          actionFolder: 'reName',
          reNameObj: user,
          from: 'myScan',
        });
      },
    },
  ];

  const generateFile = () => {
    const files = fileData?.filter((value: any) => value.type !== 'folder');
    if (!files?.length) {
      return (
        <View style={styles.scanBackGround}>
          <Image source={ScanBackGround} />
        </View>
      );
    }
    return (
      <View style={styles.height100}>
        <ScrollView style={[styles.scrollView]}>
          <View>
            <View style={[styles.listFolders]}>
              {files?.map((value: any, index: number) => {
                return (
                  <Swipeout
                    rowIndex={index}
                    sectionId={0}
                    autoClose={true}
                    right={swipeoutBtns(value)}
                    style={styles.swipeoutStyle}
                    key={index}>
                    <View style={styles.fileContentRow}>
                      <View style={styles.fileDetail}>
                        <View style={styles.paddingBottom15}>
                          <Image
                            source={fileSmall}
                            style={styles.fileSmallStyle}
                          />
                        </View>
                        <View style={[styles.column]}>
                          <View style={[styles.row, styles.paddingBottom15]}>
                            <TouchableOpacity
                              onPress={() => {
                                // if (value.type === 'folder') {
                                //   return navigation.navigate('Details');
                                // }
                                // navigation.navigate('ViewPdf');
                              }}>
                              <View style={styles.column}>
                                <Text style={styles.titleText}>
                                  {value?.description
                                    ? value?.description
                                    : value?.title}
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {value?.createdAt}
                                </Text>
                                {value.format === 'pdf' ? (
                                  <View style={styles.badeg}>
                                    <Text style={styles.badegText}>PDF</Text>
                                  </View>
                                ) : (
                                  <Text style={styles.descriptionText}>
                                    Image
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>
                            <Image
                              source={MoreIcon}
                              style={styles.moreIconStyle}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Swipeout>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  const handleFilterNameFile = () => {
    const data = fileUpload.filter(
      (value: any) =>
        value.type !== 'folder' && value.title.includes(textSearch),
    );
    setFileData(data);
  };

  useEffect(() => {
    setFileData(fileUpload);
  }, [fileUpload]);

  return (
    <BottomSheetWrap>
      <View style={styles.scanStyle}>
        <Text style={styles.headerTitle}>My Scans</Text>
        <View style={styles.searchInput}>
          <Image style={styles.searchIconStyle} source={SearchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search files"
            onSubmitEditing={handleFilterNameFile}
            onChangeText={setTextSearch}
          />
        </View>
        {generateFile()}
      </View>
    </BottomSheetWrap>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Light',
  },
  fileSmallStyle: {
    width: 50,
  },
  paddingBottom15: {
    paddingBottom: 15,
  },
  descriptionText: {
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Light',
  },
  badeg: {
    width: 32,
    height: 16,
    backgroundColor: '#EB5757',
    borderRadius: 4,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  badegText: {
    fontSize: 9,
    color: '#ffffff',
  },
  moreIconStyle: {
    width: 22,
    marginRight: 5,
  },
  scanStyle: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  scanBackGround: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: '70%',
  },
  headerTitle: {
    fontSize: 30,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#000000',
  },
  searchIconStyle: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: 15,
    zIndex: 111,
  },
  searchInput: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingLeft: 50,
    backgroundColor: '#F8F8F8',
    color: '#5C6068',
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 22,
    paddingTop: 0,
    paddingBottom: 0,
  },
  scrollView: {
    width: '95%',
    height: '100%',
    marginBottom: 120,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  height100: {
    height: '100%',
    width: '100%',
  },
  textCenter: {textAlign: 'center'},
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: 85,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
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
  fileContentRow: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
  },
  fileDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
  },
  listFolders: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 20,
  },
  listFoldersColumn: {
    flexDirection: 'column',
  },
  item: {
    flexBasis: '33.3%',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#292D36',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
    backgroundColor: 'transparent',
    width: '100%',
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

export default MyScanScreen;
