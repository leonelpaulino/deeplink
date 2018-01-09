/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Navigation } from 'react-native-navigation';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Linking,
  View,
  AppState,
  DeviceEventEmitter,
  NativeAppEventEmitter,
} from 'react-native';
import GameLoginModule from './game-login';
var url = '';
// register all screens of the app (including internal ones)
class DeepLinkingTest extends Component {
  constructor(props) {
    super(props);
    Linking.addEventListener('url', this.onUrl);
  }

  componentDidMount() {
    this.handleIntialUrl();
  }
  handleIntialUrl = () => {
    Linking.getInitialURL().then((url) => {
      this.handelUrl(url);
    });
  }

  onUrl = (obj) => {
    this.handelUrl(obj.url);
  }
  getUrlParams = (url) => {
    let urlSplit = url.replace('deeplink://','').split('/');
    const urlParams = urlSplit[urlSplit.length - 1].split('&') || urlSplit[urlSplit.length - 1];
    let params = {};
    for(index in urlParams) {
      let param = urlParams[index];
      let keyValue = param.split('=');
      params[keyValue[0]] = keyValue[1];
    }
    return params;
  }


  handelUrl = (url) => {
    if (url) {
      let params = this.getUrlParams(url);
      this.props.navigator.resetTo({
        screen: 'test2', // unique ID registered with Navigation.registerScreen
        title: 'GameLogin', // navigation bar title of the pushed screen (optional)

        passProps: {
          url,
          ...params
        }, // Object that will be passed as props to the pushed screen (optional)
        animated: true, // does the push have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}
// register all screens of the app (including internal ones)
class DeepLinkingTest2 extends Component {

  componentDidMount() {
    this.loginGame();
  }
  loginGame = () => {
    const params = {
      identifier: 'gbh_user',
      password: '1234',
    };

    const _config = {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    }
    let response = null;
    fetch("https://greenstreak.staging.gbh.com.do/api/v1/auth/login", _config)
      .then((res) => { response = res; return response.json() })
      .then(this.getAccess).catch((error) => {
        alert(error);
        GameLoginModule.sendResult(false, "");
      });
  }

  getAccess(json) {
    const params = {
      game_id: '1'
    };
    const _config = {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': 'Bearer ' + json.token
      },
      method: 'POST',
    }
    fetch("https://greenstreak.staging.gbh.com.do/api/v1/play", _config)
      .then((res) => { response = res; return response.json() })
      .then((json) => {
        if (json.code) {
          GameLoginModule.sendResult(true, json.code);
        }
      })
      .catch((error) => {
        GameLoginModule.sendResult(false, error);
        alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Game Login!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function registerScreens() {
  Navigation.registerComponent('test', () => DeepLinkingTest );
  Navigation.registerComponent('test2', () => DeepLinkingTest2 );
}
registerScreens();
Navigation.startSingleScreenApp({
  screen:
    {
      screen: 'test', // unique ID registered with Navigation.registerScreen
      title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {}
    }
});
