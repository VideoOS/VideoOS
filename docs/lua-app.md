# 视频小程序
让我们从写一个“Hello word!”小程序开始，学习如何编写你自己的视频小程序应用。一个小程序由一个json配置文件加若干lua脚本文件组成

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
