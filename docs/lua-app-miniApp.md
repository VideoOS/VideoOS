## 视联网小程序lua容器通用方法
### 使用方法
使用关键词Applet  
lua使用```Applet:xxx()```即可  

-----------------------
目录  
[1.容器大小](#1)  
[2.显示重试页面](#2)  
[3.显示错误页面](#3)  
[4.lua容器通用事件通知](#4)  
[5.获取是否能够返回上一页](#5)  
[6.返回上一页](#6)  
[7.关闭当前容器](#7)  
[8.存储本地数据](#8)  
[9.获取本地存储数据](#9)  
[10.打开新的小程序](#10)  
[11.打开广告](#11)  
[12.小程序深度统计](#12)    

-----------------------
#### <span id="1">1.容器大小</span>
function name:```appletSize```

return:
width, height

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- |
| 1 | 宽 | / | luaNumber |   |
| 2 | 高 | / | luaNumber | 不含导航栏高度 |

示例:  
```
local width, height = Applet:appletSize()
``` 

---
#### <span id="2">2.显示重试页面</span>
场景: 在lua内部网络请求失败时，没有可展示页面可以调用该方法来展示一个默认的重试页  
function name: ```showRetryPage```

parameters:

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 重试描述 | / | N | luaString | 会修改重试页面提示信息 |
| 2 | 重试数据 | / | N | luaTable | 会通过event方法(容器通用事件通知)返回 |

点击充实按钮会调用```event```方法(详见[4.lua容器通用事件通知](#4))


示例:

```
local dataTable = {}
dataTable["method"] = "actionRetry"
dataTable["data"] = "test"
Applet:showRetryPage("信号不好，请重试", dataTable)
```

---
#### <span id="3">3.显示错误页面</span>
场景: 在lua内部网络请求发生异常或者没有数据(非网络链接问题)，也没有能继续相应的页面展示时可以调用该方法来展示默认的错误页面  
注意: 调用此方法表示该页面无法继续展示，如果是子页面可以通过返回键来回退到上个页面，不然只能关闭  
function name: ```showErrorPage```

parameters:

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 重试描述 | / | N | luaString | 会修改重试页面提示信息 |


示例:

```
Applet:showErrorPage("小程序发生异常，请稍后再试")
```

---
#### <span id="4">4.lua容器通用事件通知</span>
lua function name: ```event```  
数据格式: luaTable

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- |
| 1 | 事件类型 | eventType | luaNumber | 0: none(空事件，无需处理), 2:小程序相关事件 |
| 2 | 小程序通知类型 | appletActionType | luaNumber | 0: none(空事件，无需处理), 1: retry(网络重试点击后返回), 2: refresh(刷新当前lua页面) |
| 3 | 数据 | data | luaTable(Any) | 会返回调用showRetryPage时塞入的数据,如果是refresh刷新页面则会将新数据填入 |

注: data默认是luaTable，但不排除调用```showRetryPage```时填入的类型并非luaTable，此时会原样返回(安卓对高精度浮点数可能会四舍五入，建议使用字符串)  

示例:

```
function event(data)
	local eventType = tostring(data.eventType)
	if eventType == "2" then
		if tostring(data.appletActionType) == "1" then
			-- 对失败的网络接口进行重新请求
			httpRequest()
		end

		if tostring(data.appletActionType) =="2" then
			-- 使用新的数据刷新页面
			refresh(data.data)
		end
	end
end
```

---
#### <span id="5">5.获取是否能够返回上一页</span>
场景: 在一个小程序有多个页面之间会进行跳转时，通过此方法能够获得是否仍有上一页。(在导航栏隐藏式)能够让开发者通过此方法判断是否需要添加返回按钮  
function name:```canGoBack```

return:
luaBoolean

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- |
| 1 | 是否能够返回 | / | luaNumber |  |

示例:

```
local canGoBack = Applet:canGoBack()
if canGoBack then
	-- 显示返回按钮
	showBackButton()
else
	-- 隐藏返回按钮
	hideBackButton()
end
```

---
#### <span id="6">6.返回上一页</span>
场景: (在导航栏隐藏式)能够让开发者通过此方法让当前小程序返回上一页  
function name:```goBack```

示例:

```
Applet:goBack()
```

---
#### <span id="7">7.关闭当前容器</span>
场景: (在导航栏隐藏式)能够让开发者通过此方法让当前小程序关闭  
function name: ```closeView```

示例:

```
Applet:closeView()
```

---
#### <span id="8">8.存储本地数据</span>
function name: ```setStorageData```  
注: 存储key，value都为string，文件名不填则默认以开发者ID来保存，同一个开发者共享一个存储文件，也可以自己填写文件名  

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 存储关键词 | / | Y | luaString |  |
| 2 | 存储数据 | / | N | luaString | 格式为String,可以任意组装成json，value为空时则删除该字段的存储数据 |
| 3 | 文件名称 | / | N | luaString | 如果需要额外存储路径，需要添加第三个字段 |

示例: 

```
Applet:setStorageData("user", "123456")
Applet:setStorageData("cartId", nil, "cart")
```

---
#### <span id="9">9.获取本地存储数据</span>
function name: ```getStorageData```  

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 存储关键词 | / | Y | luaString |  |
| 3 | 文件名称 | / | N | luaString | 如存在额外存储路径，需要添加 |

return:
返回数据为String

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- |
| 1 | 存储数据值 | / | luaString | 当key不存在时返回nil |

示例:

```
local value = Applet:getStorageData("user")
```

---
#### <span id="10">10.打开新的小程序</span>
场景: 在多个小程序之间需要跳转时调用  
function name: ```openApplet```

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 小程序数据 | / | Y | luaTable | 组装见DataParameters |

DataParameters

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1 | 小程序id | appletId | Y | luaString | 需要打开的小程序id |
| 2 | 小程序屏幕方向 | screenType | Y | luaNumber(Int) | 1: 横屏，2: 竖屏 |
| 3 | 小程序类型 | appType | Y | luaNumber(Int) | 1: 视频小程序lua，2: 视频小程序H5，3: 视频小工具 |
| 4 | 初始数据 | data | N | luaTable(Any) | 新的小程序使用的初始数据 |
| 5 | 层级位置 | level | N | luaNumber(Int) | 0-5, 0-2为普通小工具， 3为小程序，4为桌面气泡，5为高层小工具 |

注:小程序默认层级为3无法更改，小工具可以通过level设置位置0-2或5

示例:

```
local appletTable = {}
appletTable["appletId"] = "50000059"
appletTable["screenType"] = 1
appletTable["appType"] = 1

Applet:openApplet(appletTable)
```

---
#### <span id="11">11.打开广告</span>
场景: 打开程序化广告时调用  
function name: ```openAds```

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 广告数据 | / | Y | luaTable | 组装见DataParameters |

DataParameters

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1 | 小程序id | appletId | Y | luaString | 需要打开的小程序id |
| 2 | 广告持续时间 | duration | Y | luaNumber(long) | 单位ms |
| 3 | 广告素材url | resUrl | Y | luaString |
| 4 | 广告link地址 | linkData | Y | LinkData | 包含广告落地页url和deeplink地址,见LinkData |
| 5 | 素材类型 | materialType | Y | luaNumber(Int) | 1图片 2视频 |
| 6 | 交互类型 | targetType | Y | luaNumber(Int) | 1落地页 2 deeplink 3 下载 |
| 7 | 热点监控链接信息 | hotspotTrackLink | Y | List\<MonitorLinkDTO> | 热点监控|
| 8 | 信息层监控链接 | infoTrackLink | N | List\<MonitorLinkDTO> | 暂时没用 |
| 9 | Asmp 广告id | adsId | Y | luaString |
| 10 | 广告标题 | slogan | Y | luaString |
| 11 | 广告描述 | desc | N | luaString | 
| 12 | 下载监控链接 | downloadTrackLink | Y(targetType=3) | DownloadMonitorLinkDTO | 第三方下载监控链接 |
| 13 | 广告资源宽度 | width | Y | luaNumber(Int) |
| 14 | 广告资源高度 | height | Y | luaNumber(Int) |
| 15 | 投放计划id | launchPlanId | Y | luaString | 这个字段在LaunchInfo中 |
| 16 | Android下载apk地址 | downloadApkUrl | Y(targetType=3) | luaString | targetType等于3时，先请求linkData.linkUrl，获取下载地址及clickid，并替换下载监控链接中```__CLICK_ID__``` |

LinkData

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | ----- | ----- | ----- | ----- |
| 1 | 广告落地页url | linkUrl | luaString | targetType=3时,linkUrl为下载Url |
| 2 | deepLink链接 | deepLink | luaString | 跳转其他app |
| 3 | 自定义链接 | selfLink | luaString | |

MonitorLinkDTO

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | ----- | ----- | ----- | ----- |
| 1 | 曝光链接 | exposureTrackLink | luaString | |
| 2 | 点击链接 | clickTrackLink | luaString | |


DownloadMonitorLinkDTO

| 参数序号 | 描述 | 字段名 | 字段类型 | 字段说明 |
| ----- | ----- | ----- | ----- | ----- |
| 1 | app开始下载链接列表 | dsTrackLinks | List\<luaString> | |
| 2 | app下载完成链接列表 | dfTrackLinks | List\<luaString> | |
| 3 | app开始安装链接列表 | isTrackLinks | List\<luaString> | |
| 4 | app安装完成链接列表 | instTrackLinks | List\<luaString> | |

注: lua没有数组的概念，List实则为没有key的table

示例:

```
-- 网络请求得到广告数据
local adsData = xxx
Applet:openAds(adsData)

```

---
#### <span id="12">12.小程序深度统计</span>
场景: 一个小程序有多个页面，使用该方法能统计深度，帮助开发者优化访问率不高的页面  
注: 使用```Native```作为调用类
function name: ```commonTrack```

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1(lua_top(2)) | 数据统计类型 | / | Y | Int | 8为小程序页面深度统计 |
| 2 | 统计数据 | / | Y | luaTable | 组装见DataParameters |

DataParameters

| 参数序号 | 描述 | 字段名 | 是否必填 | 字段类型 | 字段说明 |
| ----- | --------- | ----- | ----- | ----- | ----- |
| 1 | 小程序id | appletId | Y | luaString | 该小程序ID |
| 2 | 页面名称 | pageNmae | Y | luaString | 打开页面名称 |

示例:

```
local pageData = {}
pageData["appletId"] = "50000059"
pageData["pageName"] = "List"

Native:commonTrack(8, pageData)
```
