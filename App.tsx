import * as React from 'react';
import {Provider} from 'react-redux';
import Route from './src/route/Index';
import store from './src/Store';
function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
