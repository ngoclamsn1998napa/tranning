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
import CopyIcon from '../../assets/copy.png';
import DeleteIcon from '../../assets/delete.png';
import MoreIconWhite from '../../assets/more.png';
import ShareIcon from '../../assets/share.png';
import DeleteBlackIcon from '../../assets/trashBlack.png';
import MoreIcon from '../assets/icMenu.png';
import Star from '../assets/star.png';

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
      setFileUpload([...listFileState, ...copyFileData]);
      setListFileState([...listFileState, ...copyFileData]);
    }
  };

  const onPressDeleteFile = () => {
    if (toggleCheckBox?.length) {
      let filterData = listFileState.filter(
        (el: any) => !toggleCheckBox.includes(el.id),
      );

      setFileUpload(filterData);
      setListFileState(filterData);
    }
  };

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
      <View style={{position: 'relative'}}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1111,
            left: '50%',
            top: '40%',
            transform: [{translateX: -30}],
          }}>
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
        </View>
        <Image source={imageSrc} />
      </View>
    );
  };

  React.useEffect(() => {
    setActiveTab('folder');
  }, [setActiveTab]);

  return (
    <GestureHandlerRootView>
      <View style={styles.height100}>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.headerTitle}>Library</Text>
            {(!+selectedFile && (
              <View style={styles.button}>
                <Image source={Star} />
                <TouchableOpacity onPress={() => navigation.navigate('MyScan')}>
                  <Text style={styles.text}>
                    Upgrade to get the most out of Scan Studio
                  </Text>
                </TouchableOpacity>
              </View>
            )) ||
              null}
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
                          onPress={() => navigation.navigate('ViewPdf')}>
                          <Text>{value?.title}</Text>
                          <Text>
                            {value?.description
                              ? value?.description
                              : value?.createdAt}
                          </Text>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollView: {width: '90%', marginLeft: '5%', height: '100%'},
  height100: {
    height: '100%',
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
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
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
    width: '90%',
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
