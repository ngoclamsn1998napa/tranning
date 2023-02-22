import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import BootSplash from 'react-native-bootsplash';
import MainContainer from './src/screens/MainContainer';

function App() {
  return (
    <NavigationContainer
      theme={{colors: {secondaryContainer: 'transparent'}}}
      onReady={async () => {
        BootSplash.hide();
      }}>
      <MainContainer />
    </NavigationContainer>
  );
}

export default App;
