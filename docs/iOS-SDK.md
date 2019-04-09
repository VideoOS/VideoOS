# VideoOS iOS SDK

## SDK集成

### 使用CocosPods

[CocoaPods](http://cocoapods.org/) 是 Objective-C 的依赖管理工具, 利用它可以让在项目中使用第三方库的过程变成简单和自动化。具体请参考 [Get Started](http://cocoapods.org/#get_started)。

##### Podfile
```
platform :ios, '8.0'
pod 'VideoOS-iOS-SDK', '~> 1.0'
```
如果你使用的是swift开发，请确保添加 `use_frameworks!` 
```
platform :ios, '8.0'
use_frameworks!
```
	  
## 互动层对接	

### SDK初始化
在 `AppDelegate.m` 文件中导入 `<VideoPlsInterfaceControllerSDK/VPIConfigSDK.h>` ，并在 `application:didFinishLaunchingWithOptions:` 方法中初始化SDK。

使用saas版本，参考[控制台操作手册](manual.md)  
saas版本示例代码：

```objective-c
#import <VideoPlsInterfaceControllerSDK/VPIConfigSDK.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{ 
    //other code
    [VPIConfigSDK setAppKey:@"550ec7d2-6cb0-4f46-b2df-2a1505ec82d8" appSecret:@"d0bf7873f7fa42a6"]; //appKey, appSecret 请去控制台查看
    [VPIConfigSDK initSDK];
    //other code
}
```
开源版本示例代码：
```objective-c
#import <VideoPlsInterfaceControllerSDK/VPIConfigSDK.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{ 
    //other code
    [VPIConfigSDK initSDK];
    //other code
}
```

### 对接`VPInterfaceController`
	
1. 根据需要接入的`SDK`创建`VPInterfaceControllerConfig`，将`SDK`需要的信息配置在`config`中。
	
	* identifier 为点播视频url或直播房间号
	* types 为视频类型（点播or直播），默认为点播，默认是地那波（注：`VPInterfaceControllerTypeVideoOS` 表示点播，`VPInterfaceControllerTypeLiveOS` 表示直播）

2. 利用生成的`config`初始化`InterfaceController`， `interfaceController.view`就是生成的互动层，将这个`view`添加到播放器层之上就可以了。根据接入的`SDK`的需求可能有一些特殊的接口，放在相应的文件中，如需要调用，将对应文件`import`就可以调用了,详细作用请看注释。

```objective-c
    //配置信息
    VPInterfaceControllerConfig *config = [[VPInterfaceControllerConfig alloc] init];
    config.identifier = videoUrl; //or roomId
    config.types = VPInterfaceControllerTypeVideoOS; //or VPInterfaceControllerTypeLiveOS
    //扩展信息
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithCapacity:0];
    [dict setObject:@"lol" forKey:@"category"];
    config.extendDict = dict;
    
    //播放器size
    CGSize screenSize = [UIScreen mainScreen].bounds.size;
    VPIVideoPlayerSize *videoPlayerSize = [[VPIVideoPlayerSize alloc] init];
    videoPlayerSize.portraitFullScreenWidth = screenSize.width < screenSize.height ? screenSize.width : screenSize.height;
    videoPlayerSize.portraitFullScreenHeight = screenSize.width < screenSize.height ? screenSize.height : screenSize.width;
    videoPlayerSize.portraitSmallScreenHeight = videoPlayerSize.portraitFullScreenWidth * 9.0/16.0;
    videoPlayerSize.portraitSmallScreenOriginY = 0.0;
    
    VPInterfaceController  *interfaceController = [[VPInterfaceController alloc] initWithFrame:self.view.bounds config:config videoPlayerSize:videoPlayerSize];
    
    interfaceController.delegate = self;
    interfaceController.userDelegate = self;
    interfaceController.videoPlayerDelegate = self;
    
    [self.view addSubview:interfaceController.view];
```
 
3. 接着，设置当前互动层显示区域，代码如下所示

```objective-c
    [interfaceController notifyVideoScreenChanged:type];
```
互动层加载完成、视频加载完成，建议调用更新方法，旋转横竖屏之后必须调用更新方法
  
4. 全部完成之后调用`start`，开启互动层。
5. 获取互动层状态信息需要遵守`VPInterfaceStatusNotifyDelegate`协议，详见注释
6. 如需深度对接账号系统需要遵守`VPUPUserLoginInterface`协议，详见注释
7. 如退出播放页面或直播间，调用`stop`方法

#### 用户对接相关
1. VPIUserLoginInterface 和 VPIUserInfo, VPIUserInfo用来组装用户实例, VPIUserLoginInterface 用来获取关于用户数据的回调; 
	* ```- (VPIUserInfo *)vp_getUserInfo``` 通过平台方得到你们的userInfo
 	* ```- (void)vp_userLogined:(VPIUserInfo *) userInfo``` 通过sdk的webView登陆后会给你们对应的用户信息
 	* ```- (void)vp_notifyScreenChange:(NSString *)url``` 当需要切成竖屏时会发出这个通知,传入的url需要打开 ```VPIPubWebView``` 并调用`loadUrl`

#### 获取互动层状态信息
VPInterfaceStatusNotifyDelegate ```- (void)vp_interfaceActionNotify```, 会回传互动层状态和需要的操作

* adID 为广告的唯一标识
* adName 为广告名
* eventType 为广告触发的事件，包括展示、点击、关闭等
* actionType 为对接方需要做的操作，包括打开外链，暂停视频，播放视频
* url 为外链地址

#### 注意事项

1. VPInterfaceControllerConfig identifier参数为视频的标识(原url),可以用url作为参数 或 使用拼接 ID的方式来识别。
2. 文档中的代码仅供参考，实际参数请根据项目自行配置。
3. 互动层会向下层 view 发放点击手势，不用担心控制器界面会被阻挡手势。
4. 请将互动层置于合适位置以防阻挡手势。
5. 最佳位置为加载控制栏的下方,并且于手势层的上方,请不要将 cytronView 放 入包含手势操作的 View 中。
6. `SDK`目前支持系统为 ios8 以上。
7. 存在bundle包时请将bundle包放入资源文件中,使SDK能正常调用。
