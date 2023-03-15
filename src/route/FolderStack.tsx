import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DoneIcon from '../../assets/done.png';
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

  const {fileUpload} = useSelector((state: any) => state?.globalReducer);
  const dispatch = useDispatch();

  const ids = fileUpload?.map((value: any) => value?.id);

  const HeaderLeft = React.useCallback(() => {
    if (selectedFile) {
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: 'SET_SELECTED_FILE_STATE',
              payload: false,
            });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, selectedFile, toggleCheckBox?.length]);

  const HeaderRight = React.useCallback(() => {
    if (selectedFile) {
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: 'SET_HIDDEN_BOTTOM_TAB',
              payload: false,
            });
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
            props.navigation.navigate('ActionFolder', {
              actionFolder: 'create',
            })
          }>
          <Image source={FolderPlus} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch({
              type: 'SET_BOTTOM_SHEET',
              payload: true,
            })
          }>
          <Image source={IcMenu} />
        </TouchableOpacity>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.navigation, selectedFile]);

  React.useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_FILE_STATE',
      payload: selectedFile,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

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
