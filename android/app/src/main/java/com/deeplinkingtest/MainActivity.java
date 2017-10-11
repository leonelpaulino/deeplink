package com.deeplinkingtest;
import android.os.Bundle;
import android.support.annotation.Nullable;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    public static MainActivity activity;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MainActivity.activity = this;
    }
}