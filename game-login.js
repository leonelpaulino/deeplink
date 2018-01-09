import { NativeModules, Platform, Linking } from 'react-native';
var GameLoginModule = NativeModules.GameLoginModule;
function sendResult(success, result) {
    if (Platform.OS === 'ios') {
        if (success) {
            Linking.openURL("koala://auth/token="+result+'&'+'success=1');
        } else {
            Linking.openURL("koala://auth/message="+result+'&'+'success=0');
        }
    } else {
        GameLoginModule.sendResult(success, result);
    }
}

module.exports = {
    sendResult
};
