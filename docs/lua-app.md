# 视频小程序
“小程序”这个是由微信最早提出的，国内的其他互联网巨头也相继推出了自己的小程序。小程序是一种新的开放能力，开发者可以快速地开发一个小程序，它可以被便捷地获取和传播，同时具有出色的用户体验。
“视频小程序”也继承了上述小程序的优势，但是不局限于特定的APP，它运行在客户自己的APP视频播放器之上。目前我们已经适配了市面上占有率较高的几款播放器：阿里云播放器、七牛云播放器、ijkplayer等。
视频小程序是基于<a href="http://docs.videojj.com/docs/videoos-lua-app" target="_blank">OS Lua</a>方案，一个简单的小程序，由一个几百行的lua脚本加一个几十行的 json 配置文件组成。

## 有哪些特性
### 开源
VideoOS open 选择 GPL v3 作为开源协议，限制较少，用户可以进行本地化部署用于商业用途，并根据自身业务做二次开发。

### 轻量级
VideoOS open 的动态化解决方案基于阿里开源的 LuaViewSDK。Lua 是一个高效灵活的语言，它可以非常方便地绑定各类底层库，在 iOS 上单个 Lua 虚拟机仅占用200K到300K。集成 VideoOS open 的移动端 SDK 后，APP 包体增加控制在2.5M以内。

### 热更新
开发者完成 Lua 脚本开发后，只需要在控制台上传，并进行投放，新应用即可触达用户。开发，测试，上线完整的流程可以缩短到1周时间。

## 官方小程序
官方目前已经开发了气泡对话、卡牌收集、中插广告、投票、云图等小程序，用户也可以对这些应用的 Lua 脚本稍作修改，针对各自的行业做定制化开发。
官方小程序代码已经在github开源：<a href="(https://github.com/VideoOS/VideoOS-lua-app" target="_blank">VideoOS-lua-app</a>

# Hello world
让我们从写一个“Hello world!”小程序开始，学习如何编写你自己的视频小程序应用。一个小程序由一个json配置文件加若干lua脚本文件组成

## 登录控制台
注册/登录<a href="https://os-saas.videojj.com/" target="_blank">VideoOS open的控制台</a>

## 新增类型
点击左侧导航“开发配置”=>“类型管理”=>“新增类型”，在弹出的对话框中设置“类型名称”和“类型导入”，“类型导入”需要上传一个json配置文件，这个json配置文件会决定之后该小程序的素材配置的内容，我们会在配置素材的时候上传这个素材的图片或音视频资源，点击的跳转外链等等  
下面是“Hello word!”的类型json文件：  
```json
{
  "key": "helloworld",
  "type": "object",
  "required": ["creativeName", "name"],
  "properties": {
    "creativeName": {
      "title": "名称",
      "type": "string",
      "maxLength": 30
    },
    "name": {
      "title": "内容",
      "type": "string",
      "maxLength": 30
    }
  }
}
```
json配置文件规范详情参考：[json schema](jsonschema.md)  

## 新增主题
点击左侧导航“开发配置”=>“主题管理”=>“新增主题”，在弹出的对话框中设置“所属类型”“主题名称”和“文件上传”，“文件上传”需要上传一个ZIP的压缩包，压缩包须有一个文件名以hotspot.lua结尾，lua脚本文件负责小程序的具体前端展示和业务逻辑。
  如有多个lua文件，请平铺，不要嵌套文件夹  

```lua
-- 程序入口文件 helloworld_hotspot.lua

-- 每一个lua脚本的入口——show函数。相当于java的main函数
function show(args)
    if (args == nil or args.data == nil) then
        print("data is nil")
        return
    end
    local rootView = View()
    rootView:frame(0, 0, 200, 200)
    rootView:backgroundColor(0xE3614D, 0.5)


    local helloLabel = Label()
    helloLabel:textColor(0xffffff)
    helloLabel:textSize(20)
    helloLabel:text(args.data.data.name)
    helloLabel:alignCenter()
    -- iOS平台需要设置frame才能显示，Android不需要
    helloLabel:frame(0,0,100,100)
    rootView:addView(helloLabel)

end

```

lua脚本编写完成，请打zip压缩包上传。  
macOS系统下的默认zip图形化工具打包时会创建`__MACOSX`文件夹，上传时因为有文件夹会报错，建议使用zip命令行工具可以避免这个问题：
```shell
zip -r helloworld.zip helloworld_hotspot.lua
```
SDK对接文档请参考：  

* <a href="http://docs.videojj.com/docs/videoos-ios-sdk" target="_blank">VideoOS iOS SDK</a>
* <a href="http://docs.videojj.com/docs/videoos-android-sdk" target="_blank">VideoOS Android SDK</a>

OS Lua 的API请参考：  

* <a href="http://docs.videojj.com/docs/videoos-lua-app" target="_blank">OS Lua</a>  

## 创建小程序
点击左侧导航“小程序管理”=>“我的小程序”=>“创建小程序”，在弹出的对话框中设置“小程序名称”“选择行业”“选择主题”“封面图”  
 
* 选择类型：这里的下拉框选项就是上面创建的类型
* 选择主题：这里的下拉框选项就是上面创建的主题

## 创建投放素材
点击左侧导航“投放管理”=>“投放素材管理”=>“新增素材”，选择上面创建的小程序，进入“创建素材”设置页面，素材配置由第三步上传的json配置文件决定

* 名称：这里填`代码示例`
* 内容：这里填`Hello world!`

## 创建投放计划
点击左侧导航“投放管理”=>“投放计划管理”=>“新增投放计划”，选择需要投放的小程序，进入“新增投放计划”设置页面

## 下载DEMO
下载[DEMO](demo.md)，打开DEMO App，点开右上角设置，填写对应的`AppKey`和`AppSecret`，然后根据上一步进行投放，就可以在对应视频中看到效果啦  
![横屏效果](https://static.videojj.com/dev/Image/appdemo-landscape.png "landscape")
![竖屏效果](https://static.videojj.com/dev/Image/appdemo-portrait.png "portrait")

## 下一步
到这里，相信你对如果创建一个自定义视频小程序有一个初步的认知了，深入学习请移步<a href="http://docs.videojj.com/docs/videoos-lua-app" target="_blank">OS Lua</a>  
