/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
// **********************************************
// *** DON'T MISS: THE NEXT LINE IS IMPORTANT ***
// **********************************************
#import "RCCManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
@implementation AppDelegate

NSString *uri;
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  NSString *codeLocation = @"10.0.0.6:8081";//info[@"jsCodeLocation"];
  NSString *url = [NSString stringWithFormat:@"http://%@/index.ios.bundle?platform=ios&dev=true", codeLocation];
  jsCodeLocation = [NSURL URLWithString:url];
  // **********************************************
  // *** DON'T MISS: THIS IS HOW WE BOOTSTRAP *****
  // **********************************************
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
@end
