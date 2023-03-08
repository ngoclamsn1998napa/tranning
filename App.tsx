import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createContext, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import MainContainer from './src/screens/MainContainer';

export const ThemeContext = createContext<any>({});

function App() {
  const [isBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [showAs, setShowAs] = useState('icon');
  const [sortBy, setSortBy] = useState('name');

  const [fileUpload, setFileUpload] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [hiddenBottomTab, setHiddenBottomTab] = useState(false);
  const [selectedFileState, setSelectedFileState] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        isBottomSheet,
        setIsOpenBottomSheet: (data: any) => setIsOpenBottomSheet(data),
        showAs,
        setShowAs: (data: any) => setShowAs(data),
        sortBy,
        setSortBy: (data: any) => setSortBy(data),
        fileUpload,
        setFileUpload: (data: any) => setFileUpload(data),
        activeTab,
        setActiveTab: (data: any) => setActiveTab(data),
        selectedFileState,
        setSelectedFileState: (data: any) => setSelectedFileState(data),
        hiddenBottomTab,
        setHiddenBottomTab: (data: any) => setHiddenBottomTab(data),
      }}>
      <NavigationContainer
        theme={{colors: {secondaryContainer: 'transparent'}}}
        onReady={async () => {
          BootSplash.hide();
        }}>
        <MainContainer />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

export default App;
