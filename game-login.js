import { NativeModules } from 'react-native';
var GameLoginModule = NativeModules.GameLoginModule;
function sendResult(success, result) {
    console.log(GameLoginModule);
    GameLoginModule.sendResult(success, result);
}

module.exports = {
    sendResult
};
