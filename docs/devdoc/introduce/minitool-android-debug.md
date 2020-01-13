# android开发者如何调试视频小工具
![](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/cloud.png)

###一 开发者后台部分
#####1.1登陆[VideoOS开发者后台](https://os.videojj.com/developer?from=devdoc) 注册并登陆账号
#####1.2开发者资料填写认证
- 基本信息
- 个人信息

#####1.3视频小工具/创建小工具
- 基础信息
- 综合信息
完成信息填写后提交

#####1.4提交新版
- 上传json文件
- 上传lua文件
完成后提交审核

下面为我们新增的[json schema](http://docs.videojj.com/docs/videoos-lua-app/zh_CN/latest/) 如果对json schema 不了解可以进入🔗查看
```json
//FileName: myCloud.json
{
  "key": "yuntu",
  "type": "object",
  "required": ["creativeName", "imageUrl"],
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30
    },
    "imageUrl": {
      "type": "string",
      "title": "图片"
    },
    "isShowAds": {
      "type": "boolean",
      "title": "广告标识是否可见",
      "default": true
    },
    "isShowClose": {
      "type": "boolean",
      "title": "关闭按钮是否可见",
      "default": true
    },
    "linkData": {
      "type": "string",
      "title": "跳转外链链接"
    }
  }
}
```
下面为上传的lua文件,文件名为 my_cloud_hotspot.lua
```lua
--FileName: my_cloud_hotspot.lua
function show(args)
    print("cloud  show")
    local paramDataString = Native:tableToJson(args)
    -- 打印启动参数
    print(paramDataString)

    --TODO ： 云图编码...
end
```

#####1.5调试视频小工具
- 粘贴对应小工具的Jsonschema代码到输入框
- 生成素材页面
- 配置素材
![](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/hotEditScreenShot.png)
- 生成json 复制链接并下载文件
```json
{
    "isShowAds": true, 
    "isShowClose": true, 
    "readonly": false, 
    "creativeName": "我的云图", 
    "errorSchema": { }, 
    "imageUrl": "http://os-saas-share.videojj.com/dev/app_info/848/9b66d498-e531-4781-ba9c-b2a1ef33e784.png", 
    "creativeIdList": [
        7
    ], 
    "_imageUrl": {
        "resCode": "00", 
        "resMsg": "处理成功", 
        "attachInfo": null, 
        "fileUrl": "http://os-saas-share.videojj.com/dev/app_info/848/9b66d498-e531-4781-ba9c-b2a1ef33e784.png", 
        "creativeFileId": 7, 
        "width": 400, 
        "height": 150, 
        "duration": null
    }, 
    "linkData": {
        "linkUrl": "https://baike.baidu.com/item/%25E6%259E%2597%25E4%25B9%25A6%25E8%25B1%25AA/6363050?fr=aladdin", 
        "deepLink": "", 
        "selfLink": ""
    }
}
```
- 把生成的json 填充到data 中
```json
{
  "creativeId":686,
  "data":{
  },
  "deviceType":3,
  "duration":30000,
  "hotspotOrder":0,
  "id":"8dc95f91-7c98-477b-a8fa-9586999ff228",
  "launchPlanId":"34520",
  "miniAppInfo":{
    "miniAppId":""
  },
  "sumHotspot":1,
  "template":"",
  "videoEndTime":35000,
  "videoStartTime":5000
}
```
填充之后的结果如下:
```json
{
  "creativeId":686,
  "data":{
    "isShowAds": true,
    "isShowClose": true,
    "readonly": false,
    "creativeName": "我的云图",
    "errorSchema": { },
    "imageUrl": "http://os-saas-share.videojj.com/dev/app_info/848/9b66d498-e531-4781-ba9c-b2a1ef33e784.png",
    "creativeIdList": [
      7
    ],
    "_imageUrl": {
      "resCode": "00",
      "resMsg": "处理成功",
      "attachInfo": null,
      "fileUrl": "http://os-saas-share.videojj.com/dev/app_info/848/9b66d498-e531-4781-ba9c-b2a1ef33e784.png",
      "creativeFileId": 7,
      "width": 400,
      "height": 150,
      "duration": null
    },
    "linkData": {
      "linkUrl": "https://baike.baidu.com/item/%25E6%259E%2597%25E4%25B9%25A6%25E8%25B1%25AA/6363050?fr=aladdin",
      "deepLink": "",
      "selfLink": ""
    }
  },
  "deviceType":3,
  "duration":30000,
  "hotspotOrder":0,
  "id":"8dc95f91-7c98-477b-a8fa-9586999ff228",
  "launchPlanId":"34520",
  "miniAppInfo":{
    "miniAppId":""
  },
  "sumHotspot":1,
  "template":"",
  "videoEndTime":35000,
  "videoStartTime":5000
}
```


###二 使用开发者App开发云图
#####2.1准备工作
- 第一步: Clone [VideoOS-Android-SDK](https://github.com/VideoOS/VideoOS-Android-SDK) 到本地
- 第二步: Android Studio打开工程，选择videoos_dev_app项目
- 第三步: 把上面填充之后的json拷贝到Assert/alocal/local_test.json中
- 第四部: 把上面上传的my_cloud_hotspot.lua文件内容拷贝到Assert/alocal/lua/os_test_hotspot.lua中


###三 开始编码
- 打开Assert/alocal/lua/os_test_hotspot.lua 目录
#####3.1 创建Parentview
```lua
local function createParent(isPortrait)
    local luaView
    if System.android() then
        luaView = View()
    else
        luaView = ThroughView()
    end
    setLuaViewSize(luaView, isPortrait)
    return luaView
end

local function setLuaViewSize(luaview, isPortrait) --设置当前容器大小
    if (luaview == nil) then
        return
    end
    local screenWidth, screenHeight = Native:getVideoSize(2)
    if (isPortrait) then
        local videoWidth, videoHight, y = Native:getVideoSize(0)
        if System.android() then
            y = 0.0
        end
        luaview:frame(0, y, math.min(screenWidth, screenHeight), videoHight)
    else
        luaview:frame(0, 0, math.max(screenWidth, screenHeight), math.min(screenWidth, screenHeight))
    end
end
```
#####3.2 创建关闭按钮
```lua
local function createCloseButton(data, isPortrait)
    local closeView = View()
    closeView:size(19 * scale, 19 * scale)
    closeView:cornerRadius(19 * scale / 2)
    closeView:backgroundColor(0x7D000000)
    local closeImage = Image(Native)
    closeImage:size(7 * scale, 7 * scale)
    closeImage:align(Align.CENTER)
    closeImage:image(Data(OS_ICON_WEDGE_CLOSE))
    closeView:addView(closeImage)
    closeView:hide()
    return closeView, closeImage
end
```
#####3.3 创建广告标识按钮
```lua
local function createCloudAdsButton(data, isPortrait) --创建底部'广告'标识
    local adsLabel = Label()
    adsLabel:size(44 * scale, 19 * scale)
    adsLabel:textSize(15)
    adsLabel:textAlign(TextAlign.CENTER)
    adsLabel:textColor(0x9B9B9B)
    adsLabel:backgroundColor(0x7D000000)
    adsLabel:text("广告")
    adsLabel:hide()
    return adsLabel
end
```

#####3.3 创建云图图片
```lua
local function createCloudImage(data, isPortrait) --创建云图控件
    local imageView = Image(Native)
    imageView:scaleType(ScaleType.FIT_XY)
    setCloudImageSize(data, imageView, isPortrait)
    local imageUrl = getTagImage(data)
    if (imageUrl ~= nil) then
        imageView:image(imageUrl, function(status)
        end)
    end
    return imageView
end

local function setCloudImageSize(data, cloudImage, isPortrait)
    if (cloudImage == nil) then
        return
    end
    if (data == nil) then
        return
    end
    local x, y, w, h = getLocation(data, isPortrait)
    cloudImage:frame(x, y, w, h)
end
```

#####3.4 横竖屏兼容代码
```lua
local function registerMedia()
    local media = Media()
    -- body
    -- 注册window callback通知
    local callbackTable = {
        --0: 竖屏小屏幕，1 竖屏全凭，2 横屏全屏
        onPlayerSize = function(type)
            if (type == 0) then
                rotationScreen(true)
            elseif (type == 1) then
                rotationScreen(true)
            elseif (type == 2) then
                rotationScreen(false)
            end
        end,
        onMediaPause = function()
            cloud.luaView:hide()
        end,
        onMediaPlay = function()
            cloud.luaView:show()
        end
    }
    media:mediaCallback(callbackTable)
    return media
end

local function rotationScreen(isPortrait)
    local screenWidth, screenHeight = Native:getVideoSize(2)
    local tempWidthSide, tempHeightSide
    if (isPortrait) then
        if (not cloud.needShowOnPortrait) then
            cloud.luaView:hide()
        end
    else
        if (cloud.luaView:isShow()) then
            cloud.luaView:show()
        end
    end
    setLuaViewSize(cloud.luaView, isPortrait)
    setCloudImageSize(cloud.data, cloud.cloudImage, isPortrait)
    rotationScreenAdsButton(cloud.data, isPortrait)
    rotationScreenCloseButton(cloud.data, isPortrait)
end

local function rotationScreenAdsButton(data, isPortrait)
    if (data == nil or cloud.adsBtn == nil) then
        return
    end
    local x, y, w, h = getLocation(data, isPortrait)
    --    local width = w * 0.23
    --    local height = width * 0.43
    --    cloud.adsBtn:frame(x + width, y + h + 5 * scale, 44 * scale, 19 * scale)
    --    cloud.adsBtn:adjustFontSize()
    if isPortrait then
        cloud.adsBtn:frame(x, y + h + 5 * scale, 24.2 * scale, 12.5 * scale)
        cloud.adsBtn:textSize(8.33 * scale)
    else
        cloud.adsBtn:frame(x, y + h + 5 * scale, 29 * scale, 15 * scale)
        cloud.adsBtn:textSize(10 * scale)
    end
end

local function rotationScreenCloseButton(data, isPortrait)
    if (data == nil or cloud.closeView == nil) then
        return
    end
    local x, y, w, h = getLocation(data, isPortrait)
    if isPortrait then
        cloud.closeView:frame(x + w, y - 15.8 * scale, 15.8 * scale, 15.8 * scale)
        cloud.closeView:cornerRadius(15.8 * scale / 2)
    else
        cloud.closeView:frame(x + w, y - 19 * scale, 19 * scale, 19 * scale)
        cloud.closeView:cornerRadius(19 * scale / 2)
    end
end
```

#####3.5 处理点击事件
```lua
local function closeView()
    if Native:getCacheData(cloud.id) == tostring(eventTypeShow) then
        widgetEvent(eventTypeClose, cloud.id, adTypeName, actionTypeNone, "")
        Native:deleteBatchCacheData({ cloud.id })
    end
    Native:destroyView()
end

    cloud.closeView:onClick(function()
        closeView()
    end)
--云图点击事件
    cloud.cloudImage:onClick(function()
        local linkUrl = getLinkUrl(data)
        if (linkUrl == nil) then
            return
        end
        local linkData = data.data.linkData;
        widgetEvent(eventTypeClick, cloud.id, adTypeName, actionTypeOpenUrl, linkData.linkUrl,linkData.deepLink,linkData.selfLink)
        --lua不打开连接，通知native操作
        closeView()
    end)
```
#####3.6 完整代码[🔗链接](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/my_cloud_hotspot.lua)

#####3.7 视频小工具本地调试运行,就会出现下图的效果:
![](https://videojj-mobile.oss-cn-beijing.aliyuncs.com/develop_doc/deverAppDocuments/ios%20/cloud.png)

###四 开发者平台提交代码
- 开发者后台/视频小工具/提交新版本
- 填写信息 将修改完成的os_test_hotspot.lua 文件名修改为之前的 my_cloud_hotspot.lua上传










