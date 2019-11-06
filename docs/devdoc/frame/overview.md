# 视频小程序框架
视频小程序是在[LuaView](https://github.com/alibaba/LuaViewSDK)开源项目基础上，开发的一套视频小程序框架，其初衷是为了提升视频的观看体验，给视频赋能。点击了解常见的[视频小程序事件](./event.md)。

#视频小程序分层结构
视频小程序的框架接口如下图：

<img src="https://m.videojj.com/develop_doc/framework.png" style="max-width: 600px;width: 100%;"/>

视联网小程序分为两类，视频小程序和视频小工具，分别运行在不同的容器中。小程序的功能由Lua Engine及相关的lib支持。

##视频小程序基础
小程序采用Lua语音开发，开发视频小程序需要熟悉Lua语言，Lua语言入门可以学习[菜鸟教程](https://www.runoob.com/lua/lua-tutorial.html)。

视频小程序框架是在[LuaView](https://github.com/alibaba/LuaViewSDK)开源项目基础上做的二次开发，所以一些常用UI控件的使用可以参考[LuaView Demo](https://github.com/alibaba/LuaViewSDK/tree/master/IOS/Demo/Demo/lua)

###小程序入口方法
小程序所有的lua文件运行时，都从show方法开始执行。

```lua
function show(args)
    print("first load")
end
```

###lua文件打开其他lua文件
lua文件可以通过`Native:sendAction`方法打开其他lua文件

```lua
Native:sendAction(Native:base64Encode("LuaView://defaultLuaView?template=" .. "os_card_car_window.lua" .. "&id=" .. "os_card_car_window" .. tostring(card.id) .. tostring(card.hotspotOrder) .. "&priority=" .. tostring(osInfoViewPriority)), data)
```

注：os_card_car_window.lua是打开的lua文件，"os_card_car_window" .. tostring(card.id)是这个文件的一标识，priority是lua加载的层级，priority值越大，新加载的View在父View的越上层, data是传给lua文件的数据

###视频小工具打开视频小程序

视频小工具可以通过`Native:sendAction`方法打开视频小程序

```lua
Native:sendAction(Native:base64Encode("LuaView://applets?appletId=" .. miniAppId .. "&type=" .. miniAppScreenType .. "&appType=" .. appType), data)
```

注：miniAppId是打开的视频小程序的Id，miniAppScreenType是小程序支持的屏幕方向，appType是视频小程序的类型，1为lua小程序，2为h5小程序, data是传给视频小程序的数据，可以为空
 
##注意事项
1. 语言自带的方法用`.`或`:`调用都可以，自定义的方法用`:`调用
2. 创建的对象需要被其他对象持有，不然在内存紧张时，lua会调用`gc`方法，释放未被持有的对象
3. 可以用`.`的方式，检查某个对象是否支持此方法

```lua
if (ruleView.movementMethod) then
    ruleView:movementMethod()
end
```