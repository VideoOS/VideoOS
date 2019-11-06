#视频小程序事件讲解
为了方便开发者开发，及平台对接方便，小程序对一些通用的事件的值，做了统一的定义。

##小程序触发的事件
小程序会触发各种各样的事件，为了方便平台对视频小程序接，对小程序触发的事件的值进行了统一定义，现在支持显示，点击，关闭，页面返回等事件。

```lua
eventTypeShow = 2
eventTypeClick = 3
eventTypeClose = 4
eventTypeBack = 5
```

##小程序需要平台支持事件
小程序由于功能需要，有时需要平台响应某些事件，如打开链接，暂停视频，播放视频等操作，先统一定义这些事件的值如下。

```lua
--平台处理类型
actionTypeNone = 0
actionTypeOpenUrl = 1
actionTypePauseVideo = 2
actionTypePlayVideo = 3
actionTypeGetItem = 4
```