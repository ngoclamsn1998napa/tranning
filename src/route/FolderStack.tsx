import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DoneIcon from '../../../assets/done.png';
import {ThemeContext} from '../../App';
import FolderPlus from '../../assets/folderPlus.png';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';
import DetailsScreen from '../screens/DetailsScreen';
import FolderAction from '../screens/FolderAction';
import FolderScreen from '../screens/FolderScreen';
import ViewPdf from '../screens/ViewPdf';
const SettingStack = createNativeStackNavigator();

export default function FolderTab(props: any) {
  const [toggleCheckBox, setToggleCheckBox] = React.useState([]);
  const selectedFile = props?.route?.params?.selectedFile;
  const {
    setSelectedFileState,
    setIsOpenBottomSheet,
    setHiddenBottomTab,
    fileUpload,
  } = React.useContext(ThemeContext);
  const ids = fileUpload?.map((value: any) => value?.id);

  const HeaderLeft = React.useCallback(() => {
    if (selectedFile) {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedFileState(false);
            if (ids?.length === toggleCheckBox?.length) {
              setToggleCheckBox([]);
            } else {
              setToggleCheckBox(ids);
            }
          }}>
          <View style={styles.selectedAll}>
            <Image source={DoneIcon} />
            <Text style={styles.selectedText}>Select all</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return <Image source={Setting} />;
  }, [ids, selectedFile, setSelectedFileState, toggleCheckBox?.length]);

  const HeaderRight = React.useCallback(() => {
    if (selectedFile) {
      return (
        <TouchableOpacity
          onPress={() => {
            setHiddenBottomTab(false);
            props.navigation.navigate('Folder', {selectedFile: false});
          }}>
          <View>
            <Text style={styles.doneText}>Done</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ActionFolder', {actionFolder: 'create'})
          }>
          <Image source={FolderPlus} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsOpenBottomSheet(true)}>
          <Image source={IcMenu} />
        </TouchableOpacity>
      </View>
    );
  }, [
    props.navigation,
    selectedFile,
    setHiddenBottomTab,
    setIsOpenBottomSheet,
  ]);

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: HeaderRight,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
      }}>
      <SettingStack.Screen
        name="FolderScreen"
        options={{
          title: '',
          headerLeft: HeaderLeft,
          headerRight: HeaderRight,
        }}
        children={propChildren => (
          <FolderScreen
            {...propChildren}
            {...props}
            toggleCheckBox={toggleCheckBox}
            setToggleCheckBox={setToggleCheckBox}
          />
        )}
      />
      <SettingStack.Screen
        name="Details"
        options={{headerTitleAlign: 'center', title: 'Homework Documents'}}
        component={DetailsScreen}
      />
      <SettingStack.Screen
        name="ViewPdf"
        children={propChildren => <ViewPdf {...propChildren} {...props} />}
        options={{
          title: '',
          headerRight: () => null,
        }}
      />
      <SettingStack.Screen
        name="ActionFolder"
        options={{
          title: '',
          header: () => null,
          presentation: 'modal',
          headerShown: true,
        }}
        children={propChildren => {
          const {
            actionFolder = '',
            reNameObj = '',
            from = '',
          } = (propChildren?.route?.params || {}) as any;
          return (
            <FolderAction
              {...propChildren}
              {...props}
              actionFolder={actionFolder}
              reNameObj={reNameObj}
              from={from}
            />
          );
        }}
      />
    </SettingStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },
  selectedAll: {
    display: 'flex',
    columnGap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    color: '#3377FF',
    fontFamily: 'SF-Pro-Display-Light',
    fontSize: 17,
  },
  doneText: {
    color: '#3377FF',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 17,
  },
});
