import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import Swipeout from 'react-native-swipeout';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as generateUUID} from 'uuid';
import CopyIcon from '../../assets/copy.png';
import DeleteIcon from '../../assets/delete.png';
import MoreIconWhite from '../../assets/more.png';
import ShareIcon from '../../assets/share.png';
import DeleteBlackIcon from '../../assets/trashBlack.png';
import UnCheckBox from '../assets/Checkbox.png';
import CheckedIcon from '../assets/Checked.png';
import fileSmall from '../assets/fileSmall.png';
import folderIcon from '../assets/folder.png';
import MoreIcon from '../assets/icMenu.png';
import Star from '../assets/star.png';
import BottomSheetWrap from '../components/BottomSheetWrap';

export default function FolderScreen(props: any) {
  const {navigation, route, toggleCheckBox, setToggleCheckBox} = props;
  const dispatch = useDispatch();

  const {fileUpload, showAs} = useSelector(
    (state: any) => state?.globalReducer,
  );

  const selectedFile = route?.params?.selectedFile;

  const [listFileState, setListFileState] = React.useState([]);

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
        dispatch({type: 'SET_FILE_UPLOAD', payload: data});
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
      onPress: () => {
        navigation.navigate('ActionFolder', {
          actionFolder: 'reName',
          reNameObj: user,
          from: 'folderScreen',
        });
      },
    },
  ];

  const onPressCopyFile = () => {
    if (toggleCheckBox?.length) {
      let copyFileData = listFileState.filter((el: any) =>
        toggleCheckBox.includes(el.id),
      );

      copyFileData = copyFileData.map((value: any) => ({
        ...value,
        id: generateUUID(),
        title: value.title + ' (copy)',
      }));
      dispatch({
        type: 'SET_FILE_UPLOAD',
        payload: [...listFileState, ...copyFileData],
      });
      setListFileState([...listFileState, ...copyFileData]);
    }
  };

  const onPressDeleteFile = () => {
    if (toggleCheckBox?.length) {
      let filterData = listFileState.filter(
        (el: any) => !toggleCheckBox.includes(el.id),
      );

      dispatch({type: 'SET_FILE_UPLOAD', payload: filterData});
      setListFileState(filterData);
    }
  };

  const generateCheckBox = value => {
    if (selectedFile) {
      return (
        <View style={{width: 24}}>
          <CheckBox
            isChecked={toggleCheckBox.includes(value?.id)}
            onClick={() => {
              if (!toggleCheckBox.includes(value?.id)) {
                setToggleCheckBox(prevState => [...prevState, value.id]);
              } else {
                setToggleCheckBox(
                  toggleCheckBox.filter(item => item !== value.id),
                );
              }
            }}
            checkedImage={<Image source={CheckedIcon} />}
            unCheckedImage={<Image source={UnCheckBox} />}
          />
        </View>
      );
    }
    return null;
  };

  const generateBottomSheet = () => {
    if (selectedFile) {
      return (
        <View style={styles.bottomSheet} elevation={5}>
          <TouchableOpacity onPress={() => onPressCopyFile()}>
            <View style={styles.centerIcon}>
              <Image source={CopyIcon} />
              <Text>Copy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressDeleteFile()}>
            <View style={styles.centerIcon}>
              <Image source={DeleteBlackIcon} />
              <Text>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const generateItemShowAs = (value: any, imageSrc: any) => {
    if (showAs === 'grid' || !selectedFile) {
      return <Image source={imageSrc} />;
    }
    return (
      <View style={styles.relative}>
        <View style={styles.checkStyle}>
          <CheckBox
            isChecked={toggleCheckBox.includes(value?.id)}
            onClick={() => {
              if (!toggleCheckBox.includes(value?.id)) {
                setToggleCheckBox(prevState => [...prevState, value.id]);
              } else {
                setToggleCheckBox(
                  toggleCheckBox.filter(item => item !== value.id),
                );
              }
            }}
            checkedImage={<Image source={CheckedIcon} />}
            unCheckedImage={<Image source={UnCheckBox} />}
          />
        </View>
        <Image source={imageSrc} />
      </View>
    );
  };

  React.useEffect(() => {
    if (fileUpload?.length) {
      setListFileState(fileUpload);
      dispatch({type: 'SET_ACTIVE_TAB', payload: 'folder'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUpload]);

  return (
    <GestureHandlerRootView>
      <BottomSheetWrap>
        <View style={styles.height100}>
          <ScrollView
            style={[
              styles.scrollView,
              +selectedFile ? styles.marginBottom100 : styles.marginBottom10,
            ]}>
            <View>
              <Text style={styles.headerTitle}>Library</Text>
              {(!+selectedFile && (
                <View style={styles.button}>
                  <View style={styles.starStyle}>
                    <Image source={Star} />
                  </View>
                  <Text style={styles.text}>
                    Upgrade to get the most out of Scan Studio
                  </Text>
                </View>
              )) ||
                null}
              <View
                style={[
                  styles.listFolders,
                  showAs === 'grid' ? styles.listFoldersColumn : null,
                ]}>
                {listFileState.map((value: any, index: number) => {
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
                            <View>
                              <Image
                                source={
                                  value.type === 'folder'
                                    ? folderIcon
                                    : fileSmall
                                }
                                style={[
                                  styles.fileSmallStyle,
                                  styles.paddingBottom15,
                                ]}
                              />
                            </View>
                            <View style={[styles.row, styles.paddingBottom15]}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (value.type === 'folder') {
                                    return navigation.navigate('Details');
                                  }
                                  navigation.navigate('ViewPdf');
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
                              <Image source={MoreIcon} />
                            </View>
                          </View>
                        </View>
                      </Swipeout>
                    );
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (value.type === 'folder') {
                          return navigation.navigate('Details');
                        }
                        if (!toggleCheckBox.includes(value?.id)) {
                          setToggleCheckBox((prevState: any) => [
                            ...prevState,
                            value.id,
                          ]);
                        } else {
                          setToggleCheckBox(
                            toggleCheckBox.filter(
                              (item: any) => item !== value.id,
                            ),
                          );
                        }
                      }}
                      style={styles.item}
                      key={index}>
                      <View style={styles.fileContent} key={index}>
                        {generateItemShowAs(value, value.src)}
                        <TouchableOpacity
                          onPress={() => {
                            value?.type !== 'folder' &&
                              navigation.navigate('ViewPdf');
                          }}>
                          <Text style={styles.textCenter}>{value?.title}</Text>
                          {value?.type !== 'folder' ? (
                            <Text style={styles.titleCenter}>
                              {value?.createdAt}
                            </Text>
                          ) : (
                            <Text style={styles.title}>3 items</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          {generateBottomSheet()}
        </View>
      </BottomSheetWrap>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SF-Pro-Display-Light',
    fontSize: 12,
  },
  titleCenter: {
    textAlign: 'center',
  },
  checkStyle: {
    position: 'absolute',
    zIndex: 1111,
    left: '50%',
    top: '40%',
    transform: [{translateX: -30}],
  },
  relative: {
    position: 'relative',
  },
  checkbox: {
    borderRadius: 500,
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
  descriptionText: {
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Light',
  },
  starStyle: {
    marginLeft: 16,
  },
  scrollView: {
    width: '95%',
    height: '100%',
  },
  marginBottom100: {
    marginBottom: 100,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  height100: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 12,
  },
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
    marginLeft: '5%',
    backgroundColor: '#33A9FF',
    borderRadius: 10,
    display: 'flex',
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
  fileSmallStyle: {
    width: 50,
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
  headerTitle: {
    fontSize: 30,
    marginLeft: '5%',
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#000000',
  },
  paddingBottom15: {
    paddingBottom: 15,
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
  titleText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Light',
  },
});
