import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as generateUUID} from 'uuid';
import FolderIcon from '../../assets/folder.png';
import CreateFolder from '../../assets/pana.png';
import ReNameFolder from '../../assets/Rename.png';
const formatDate = () => {
  var d = new Date(),
    dformat =
      [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
  return dformat;
};

const FolderAction = ({navigation, actionFolder, reNameObj, from}: any) => {
  const {fileUpload} = useSelector((state: any) => state?.globalReducer);
  const dispatch = useDispatch();
  const [inputNameValue, setInputValue] = useState('');

  const reNameItem = (data: any) => {
    return data.map((value: any) => {
      if (value.id === reNameObj.id) {
        return {
          ...value,
          updatedAt: formatDate(),
          title: inputNameValue,
        };
      }
      return value;
    });
  };

  const actionFolderClick = () => {
    if (!inputNameValue) {
      return;
    }
    if (actionFolder === 'create') {
      const createFolder = {
        id: generateUUID(),
        title: inputNameValue,
        uri: '',
        src: FolderIcon,
        description: '',
        createdAt: formatDate(),
        updatedAt: formatDate(),
        type: 'folder',
      };
      dispatch({
        type: 'SET_FILE_UPLOAD',
        payload: [...fileUpload, createFolder],
      });
      navigation.navigate('FolderScreen');
      return;
    }
    dispatch({
      type: 'SET_FILE_UPLOAD',
      payload: reNameItem(fileUpload),
    });
    if (from === 'myScan') {
      navigation.navigate('FolderScreen');
      return;
    }
    navigation.goBack();
  };

  React.useEffect(() => {
    dispatch({
      type: 'SET_HIDDEN_BOTTOM_TAB',
      payload: true,
    });
    return () => {
      dispatch({
        type: 'SET_HIDDEN_BOTTOM_TAB',
        payload: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_TAB',
      payload: 'action-folder',
    });
    return () => {
      dispatch({
        type: 'SET_ACTIVE_TAB',
        payload: 'FolderScreen',
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (reNameObj?.title) {
      setInputValue(reNameObj.title);
    }
  }, [reNameObj]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textColor}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>
          {actionFolder === 'create' ? 'Create Folder' : 'Rename'}
        </Text>
        <TouchableOpacity onPress={() => actionFolderClick()}>
          <Text style={styles.textColor}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.nameFolder}>
          <Image
            source={actionFolder === 'create' ? CreateFolder : ReNameFolder}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setInputValue}
            value={inputNameValue}
          />
          <Text style={styles.colorError}>
            {!inputNameValue && 'Tên folder không được để trống'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {backgroundColor: '#F2F2F2', height: '100%'},
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  textTitle: {
    color: '#292D36',
    fontSize: 17,
    fontWeight: '500',
  },
  content: {
    display: 'flex',
    margin: 16,
    height: '80%',
    justifyContent: 'center',
  },
  nameFolder: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Light',
    fontSize: 17,
  },
  colorError: {
    color: 'red',
  },
  textColor: {
    color: '#3377FF',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 17,
  },
});

export default FolderAction;
