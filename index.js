/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/Screens/Login';
import {Provider} from 'react-redux';
import Chatscreen from './src/Screens/Chatscreen';
import Stacks from './src/Stacks';
import Categry from './src/Screens/Categry';
import Toast from 'react-native-toast-message';
import {store} from './src/Store/Store';

const Root = () => {
  return (
    <Provider store={store}>
      <Stacks />
      <Toast position="bottom" />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
