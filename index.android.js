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
  DeviceEventEmitter
} from 'react-native';
import GameLoginModule from './game-login';

var url = '';

// register all screens of the app (including internal ones)
class DeepLinkingTest extends Component {
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
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
        .then((res) => {response = res; return response.json()})
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
            'x-api-token': 'Bearer '+json.token
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

function onActivityCreated(params) {
  registerScreens();
  let screen = 'test2';
  if (params.scheme) {
    console.log(params.scheme);
    screen = 'test2';
  }
  console.log(screen);
  Navigation.startSingleScreenApp({
    screen:
      {
        screen: screen, // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}
      }
  });

}
function registerScreens() {
  Navigation.registerComponent('test', () => DeepLinkingTest );
  Navigation.registerComponent('test2', () => DeepLinkingTest2 );
}
DeviceEventEmitter.addListener("onActivityCreated", onActivityCreated);
