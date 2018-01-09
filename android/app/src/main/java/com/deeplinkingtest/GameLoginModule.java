package com.deeplinkingtest;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.app.Activity.RESULT_CANCELED;
import static android.app.Activity.RESULT_OK;
import static com.deeplinkingtest.MainActivity.activity;

/**
 * Created by LeonelPaulino on 10/10/2017.
 */

public class GameLoginModule extends ReactContextBaseJavaModule {



    @Override
    public String getName() {
        return "GameLoginModule";
    }

    public GameLoginModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void sendResult(boolean success, String item) {
        Log.d("unity", "sending: "+item);
        item = item == null ? "" : item; // prevent game from crashing.
        Intent newIntent = new Intent();
        newIntent.putExtra("authToken", item);
        newIntent.putExtra("success", success);
        MainActivity.activity.setResult(RESULT_OK, newIntent);
        getCurrentActivity().setResult(RESULT_OK, newIntent);
        MainActivity.activity.finish();
        getCurrentActivity().finish();
    }

}
