package com.deeplinkingtest;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactPackage;
import java.util.Arrays;
import java.util.List;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;


public class MainApplication extends NavigationApplication {

  @Override
  public void onCreate() {
    super.onCreate();

  }

  @Override
  public void onReactInitialized(ReactContext reactContext) {
    super.onReactInitialized(reactContext);
    Intent splashIntent = MainActivity.activity.getIntent();
    WritableMap params = Arguments.createMap();
    if ( splashIntent != null && splashIntent.getAction() == Intent.ACTION_GET_CONTENT) {
        String extra = splashIntent.getStringExtra("gameAuthToken");
        params.putString("scheme", splashIntent.getScheme());
    }
    NavigationApplication.instance.getReactGateway().getReactEventEmitter()
        .sendEvent("onActivityCreated", params);
  }

  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new DeepLinkingPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
