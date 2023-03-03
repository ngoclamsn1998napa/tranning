import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DoneIcon from '../../../assets/done.png';
import FolderPlus from '../../assets/folderPlus.png';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';
import DetailsScreen from '../DetailsScreen';
import FolderAction from '../FolderAction';
import FolderScreen from '../FolderScreen';
import ViewPdf from '../ViewPdf';
const SettingStack = createNativeStackNavigator();

export default function FolderTab(props: any) {
  const [toggleCheckBox, setToggleCheckBox] = React.useState([]);
  const selectedFile = props?.route?.params?.selectedFile;
  const ids = props?.fileUpload?.map((value: any) => value?.id);
  const {setSelectedFileState} = props;

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
            <Text style={styles.selectedText}>Selected all</Text>
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
            props.navigation.navigate('Folder', {selectedFile: false});
          }}>
          <View>
            <Text style={styles.selectedText}>Done</Text>
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
        <Image source={IcMenu} />
      </View>
    );
  }, [props.navigation, selectedFile]);

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBackTitle: '',
        headerRight: HeaderRight,
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
          return (
            <FolderAction
              {...propChildren}
              {...props}
              actionFolder={propChildren?.route?.params?.actionFolder}
              reNameObj={propChildren?.route?.params?.reNameObj}
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
  },
});
