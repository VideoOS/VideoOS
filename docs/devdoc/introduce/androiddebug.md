#Android开发者如何调试视频小程序
iOS的调试步骤[点击这里](./iosdebug.md)
##1. Android开发者APP简介
- 提供视频小工具/视频小程序的本地调试预览功能
- 提供线上程序预览功能
- 支持Android Studio 本地调试
- 支持动态刷新
- 完善的[LuaViewSDK文档](http://docs.videojj.com/docs/videoos-lua-app/zh_CN/latest/)

##2. 视频小程序调试

###2.1 视频小工具本地调试

####第一步: Clone [VideoOS-Android-SDK](https://github.com/VideoOS/VideoOS-Android-SDK) 到本地

####第二步: Android Studio打开videoos_demo工程
下图为videoos_demo工程的位置:
![videoos_demo](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/20191018103321.jpg)

####第三步: 在assets/alocal下创建视频小工具的调试文件
视频小工具需要两种格式的文件: lua文件及json文件。

lua文件放在 assets/alocal/lua下。

json文件放在 assets/alocal/下。

下图为视频小工具调试文件路径图:  
![20191018105652](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/20191018105652.jpg)


####第四步: 开发视频小工具
编写一个 Hello World 程序代码。
#####事例代码:
(1) os_test_hotspot.lua 的内容:
```lua
object = {}
function object:new(o)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    return o
end
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

local function createTitle()
    local title = Label()
    title:textColor(0xFF0000)
    title:textSize(16)
    title:frame(0, 0, 100, 30)
    title:align(Align.V_CENTER)
    title:align(Align.H_CENTER)
    return title
end


function show(args)
    if (helloworld.luaView ~= nil) then
        return
    end

    local paramDataString = Native:tableToJson(args)
    print("paramDataString:" .. paramDataString)

    helloworld.data = args.data
    local isPortrait = Native:isPortraitScreen()
    helloworld.luaView = createLuaView(isPortrait)
    helloworld.titleLabel = createTitle()
    helloworld.titleLabel:text(helloworld.data.creativeName)
    helloworld.luaView:addView(helloworld.titleLabel)
end

```
(2)local_test.json 的内容:
```json
{"creativeName":"Hello World"}
```
####第五步: 运行结果.
你会看到红色字体的 Hello World 出现在播放器中央
![Screenshot_20191018-133753_videoOS](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/Screenshot_20191018-133753_videoOS.jpg)

####第六步: 转屏处理.
横屏播放的时候红色字体的 Hello World 出现在播放器的左上角处。

如下图所示:  
![Screenshot_20191018-133842_videoOS](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/Screenshot_20191018-133842_videoOS.jpg)

需要在Lua小程序中加入转屏的处理:
```lua
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

-- 小程序的入口方法
function show(args)
    ...
    ...
    ...
    
    --    注册屏幕旋转监听
    helloworld.media = registerMedia()
end
```

###2.2 视频小工具在线调试
视频小工具在线调试只需要在调试视频小工具UI中填写CommitID、JsonUrl、VideoUrl即可。程序会自动从服务器拉取lua文件、Json文件,并加载显示。


##3. 视频小程序调试

###3.1 视频小程序本地调试
#### 第一步: Clone [VideoOS-Android-SDK](https://github.com/VideoOS/VideoOS-Android-SDK) 到本地

####第二步: Android Studio打开videoos_demo工程
下图为videoos_demo工程的位置:  
![videoos_demo](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/20191018103321.jpg)

####第三步: 在assets下创建视频小程序的Lua文件及配置文件
视频小程序需要两种格式的文件: lua文件、json文件。

lua文件放在 assets/blocal/ 下。

json文件放在 assets/blocal/ 下。

这里需要注意下json文件是配置文件,并不是lua运行时的数据文件;视频小程序lua运行时的数据文件,由在lua中请求服务器获取。

下图为视频小程序调试文件路径图:
![20191018160513](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/20191018160513.jpg)

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
![Screenshot_20191018-162034_videoOS](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/Android/Screenshot_20191018-162034_videoOS.jpg)


###3.2 视频小程序在线调试
视频小程序在线调试只需要在调试视频小程序UI中填写CommitID、VideoUrl即可。程序会自动从服务器拉取lua文件、Json配置文件,并加载显示。
