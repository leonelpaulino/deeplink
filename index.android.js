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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
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
      // GameLoginModule.sendResult(false, "");
    });
  }
  getAccess(json) {
    const params = {
      game_id: 1
    };
    const _config  = {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Token': 'Bearer ' + json.token
      },
      method: 'POST',
    }
    fetch("https://greenstreak.staging.gbh.com.do/api/v1/play")
      .then((res) => res.json())
      .then((_json) => {

      })
  }
  onNavigatorEvent(event) {
    // handle a deep link
    if (event.type == 'DeepLink') {
      const parts = event.link.split('/'); // Link parts
      const payload = event.payload; // (optional) The payload
      alert(parts)
      if (parts[0] == 'tab2') {
        // handle the link somehow, usually run a this.props.navigator command
      }
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
      game_id: 1,
      testing: 1
    };
    const _config = {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    }
    let response = null;
    fetch("https://greenstreak.staging.gbh.com.do/api/v1/auth/game", _config)
    .then((res) => {response = res; return response.json()})
    .then((json) => {
      if (response.status == 200) {
       GameLoginModule.sendResult(true, json.access_token);
      } else {
        GameLoginModule.sendResult(false, "");
      }
    }).catch((error) => {
      GameLoginModule.sendResult(false, "");
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
  let screen = 'test';
  if (params.scheme) {
    console.log(params.scheme);
    screen = 'test2';
  }
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
