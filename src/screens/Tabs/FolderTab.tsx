import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DoneIcon from '../../../assets/done.png';
import FolderPlus from '../../assets/folderPlus.png';
import IcMenu from '../../assets/icMenu.png';
import Setting from '../../assets/settings.png';
import DetailsScreen from '../DetailsScreen';
import FolderScreen from '../FolderScreen';
import ViewPdf from '../ViewPdf';
const SettingStack = createNativeStackNavigator();

export default function FolderTab(props: any) {
  const [toggleCheckBox, setToggleCheckBox] = React.useState([]);
  const selectedFile = props?.route?.params?.selectedFile;
  const ids = props?.fileUpload?.map((value: any) => value?.id);

  const HeaderLeft = React.useCallback(() => {
    if (selectedFile) {
      return (
        <TouchableOpacity
          onPress={() => {
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
  }, [ids, selectedFile, toggleCheckBox?.length]);

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
        <Image source={FolderPlus} />
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
        component={ViewPdf}
        options={{
          title: '',
          headerRight: () => null,
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
