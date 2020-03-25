# iOS开发者如何调试视频小程序
Android的调试步骤[点击这里](./miniprogram-android-debug.md)
## 1. 开发者APP 简介
- 提供视频小工具/视频小程序的调试预览功能
- 提供线上程序预览功能
- 支持Xcode / Android Studio 本地调试
- 支持动态刷新
- 完善的[JSON Schema文档](../../jsonschema.md)
- 完善的[OS Lua文档](http://op-plat.videojj.com/os-saas/os-lua/index.html)
- <font color=#FF0000 >以上文档请务必了解</font>

## 2.调试开始前的准备工作
#### 第一步: Clone [VideoOS-iOS-SDK](https://github.com/VideoOS/VideoOS-iOS-SDK) 到本地

#### 第二步: Xcode打开VPInterfaceControllerDemo工程，选择targets VideoOSDevAPP项目运行，这里面配置好的本地程序可以直接预览
![](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/ios_1.1.png)  
<img style="width: 240px" src="https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/ios_1.2.png"/>

## 3.视频小程序调试
#### 3.1 视频小工具本地调试-Hello World 
1.编写第一个 Hello World 程序代码 并copy 到VideoOSDevAPP/DevAppResource.bundel/interactionLua文件夹下如下是示列代码。  
<img style="width: 340px" src="../introduce/image/location.png
"/>

```lua
--FileName: HelloWorld.lua
require "os_config"
require "os_string"
require "os_constant"
require "os_util"
require "os_track"
helloworld = object:new()


local function setLuaViewSize(luaView, isPortrait)
    --设置当前容器大小
    if (luaView == nil) then
        return
    end
    local screenWidth, screenHeight = Native:getVideoSize(2)
    if (isPortrait) then
        local videoWidth, videoHight, y = Native:getVideoSize(0)
        if System.android() then
            y = 0.0
        end
        luaView:frame(0, y, math.min(screenWidth, screenHeight), videoHight)
    else
        luaView:frame(0, 0, math.max(screenWidth, screenHeight), math.min(screenWidth, screenHeight))
    end
end
--全局父控件
local function createLuaView(isPortrait)
    local luaView
    if System.android() then
        luaView = View()
    else
        luaView = ThroughView()
    end
    setLuaViewSize(luaView, isPortrait)
    return luaView
end

local function createTitle(data)
    local title = Label()
    title:textColor(0xFF0000)
    title:textSize(16)
    title:text(data.data.creativeName)
    title:frame(0, 0, 100, 30)
    title:align(Align.V_CENTER)
    title:align(Align.H_CENTER)
    return title
end

local function rotationScreen(isPortrait)
    setLuaViewSize(helloworld.luaView, isPortrait)
    helloworld.titleLabel:align(Align.V_CENTER)
    helloworld.titleLabel:align(Align.H_CENTER)
end

local function registerMedia()
    local media = Media()
    -- body
    -- 注册window callback通知
    local callbackTable = {
        --0: 竖屏小屏幕，1 竖屏全屏，2 横屏全屏
        onPlayerSize = function(type)
            print("屏幕旋转通知")
            if (type == 0) then
                rotationScreen(true)
            elseif (type == 1) then
                rotationScreen(true)
            elseif (type == 2) then
                rotationScreen(false)
            end
        end,
        onMediaPause = function()
            helloworld.luaView:hide()
        end,
        onMediaPlay = function()
            helloworld.luaView:show()
        end
    }
    media:mediaCallback(callbackTable)
    return media
end

function show(args)
    if (args == nil or args.data == nil or helloworld.luaView ~= nil) then
        return
    end
    helloworld.data = args.data
    -- onCreate(args.data)
    local isPortrait = Native:isPortraitScreen()
    helloworld.luaView = createLuaView(isPortrait)
    helloworld.titleLabel = createTitle(helloworld.data)
    helloworld.luaView:addView(helloworld.titleLabel)
    print('creativeName data'..helloworld.data.data.creativeName)
    helloworld.media = registerMedia()
end
}
```
3.修改DevAppResource.bundel 下的devApp_json.json 文件中的 template 以及 creativeName 。devApp_json 是对应小程序的素材数据，其中template为启动文件名，creativeName为小程序名称

```json
"creativeName":"Hello world",
"template":"helloworld.lua",
```
4.运行修改后的程序 这样一个hello world 程序就完成了。

5.进入[开发者后台](http://os.videojj.com/developer)的调试视频小工具页面，然后填充相应的jsonschema数据，然后填充相应数据。

#### 3.2 视频小工具在线调试
视频小工具在线调试只需要在调试视频小工具UI中填写CommitID、JsonUrl、VideoUrl即可。程序会自动从服务器拉取lua文件、Json文件,并加载显示。

## 4.视频小程序调试

### 4.1 视频小程序本地调试
#### 第三步: 在assets下创建视频小程序的Lua文件及配置文件
视频小程序需要两种格式的文件: lua文件、json文件。

lua文件放在 VideoOSDevAPP/DevAppResource.bundel/ 下。

json文件为 VideoOSDevAPP/DevAppResource.bundel/config.json。

这里需要注意下json文件是配置文件,并不是lua运行时的数据文件;视频小程序lua运行时的数据文件,由在lua中请求服务器获取。

下图为视频小程序调试文件路径图:
<img style="width: 340px" src="../introduce/image/location.png
"/>

(1) **os_video_test_hotspot.lua**

```lua
object = {}
function object:new(o)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    return o
end
helloworld = object:new()


local function setLuaViewSize(luaView)
    --设置当前容器大小
    if (luaView == nil) then
        return
    end
    local containerWidth, containerHeight = Applet:appletSize()
    luaView:frame(0, 0, math.min(containerWidth, containerHeight), math.max(containerWidth, containerHeight))
end
--全局父控件
local function createLuaView()
    local luaView
    if System.android() then
        luaView = View()
    else
        luaView = ThroughView()
    end
    setLuaViewSize(luaView)
    return luaView
end

local function createTitle()
    local titleLabel = Label()
    titleLabel:textColor(0xFF0000)
    titleLabel:textSize(16)
    titleLabel:text("HelloWorld")
    titleLabel:frame(0, 0, 100, 30)
    titleLabel:align(Align.V_CENTER)
    titleLabel:align(Align.H_CENTER)
    return titleLabel
end

-- 小程序的入口方法
function show(args)
    local isPortrait = Native:isPortraitScreen()
    if isPortrait then
        return
    end
    helloworld.luaView = createLuaView()
    helloworld.titleLabel = createTitle()
    helloworld.luaView:addView(helloworld.titleLabel)
end

```

(2) **dev_config.json**

```json
{
  "miniAppId":"123456",
  "display":{
    "navTitle":"开发模式测试"
  },
  "h5Url":"",
  "luaList":[
    {
      "url":"os_video_test_hotspot.lua"
    }
  ],
  "template":"os_video_test_hotspot.lua"
}
```

miniAppId:表示视频小程序的ID;

navTitle:表示视频小程序导航栏的title;

luaList:表示视频小程序的lua文件列表;

template:表示视频小程序的入口lua文件;

####第四步: 运行结果
横屏播放的时候视频小程序运行在容器里,红色字体 Hello World 出现在容器的中央。

如下图所示:
![Screenshot_20191018-162034_videoOS](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/42974f2aff5e8f44e299eac3b12dd721.jpeg)


### 4.2 视频小程序在线调试
视频小程序在线调试只需要在调试视频小程序UI中填写CommitID、VideoUrl即可。程序会自动从服务器拉取lua文件、Json配置文件,并加载显示。

## 5. 使用动态刷新
现在我们的hello world app 已经运行起来的，我们可以看到屏幕中间有红色的 hello world ，这是我们想把他变成黑色的，我们只需更具控制台输出的OS 文件夹路径，找到我们在沙盒重的hellowworld.lua文件，并修改，这时我们只要返回当前播放页面，在重新进入，UI就更新了，如此方便好用，快去试试吧。

```lua
2019-10-16 17:55:12.604987+0800 VideoOSDevApp[20995:4274266] /Users/videopls/Library/Developer/CoreSimulator/Devices/E9187124-453E-44FD-AA3F-5EFF7CCE107E/data/Containers/Data/Application/4A82A278-1E1E-4D8C-888E-39E87FD5811C/Library/Caches/videopls/lua/os
```  

```lua
local function createTitle(data)
    local title = Label()
    --修改颜色
    title:textColor(0xFF0000)
    title:textSize(16)
    title:text(data.data.creativeName)
    title:frame(0, 0, 100, 30)
    title:align(Align.V_CENTER)
    title:align(Align.H_CENTER)
    return title
end
```


