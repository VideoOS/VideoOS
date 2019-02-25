# VideoOS 老版本
该版本支持 PC Web、iOS、Android 3端，如果你的产品形态是产品形态只有PC Web，可以使用该版本；如果你的产品形态是移动端APP，请使用[新版本](index.md)

## 老版本控制台
[http://videojj.com/account/login/?next=http://cytron.videojj.com/console/](http://videojj.com/account/login/?next=http://cytron.videojj.com/console/)

## 效果预览
<p class="codepen" data-height="520" data-theme-id="0" data-default-tab="result" data-user="hzzhujf" data-slug-hash="eXOKEe" style="height: 520px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="eXOKEe">
  <span>See the Pen <a href="https://codepen.io/hzzhujf/pen/eXOKEe/">
  eXOKEe</a> by Zhu Jiefeng (<a href="https://codepen.io/hzzhujf">@hzzhujf</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 接入流程

### 引入JS SDK
```html
<script type="text/javascript" src="http://cytroncdn.videojj.com/latest/Iva.js"></script>
```

### 新建播放器容器
新建一个div作为视频播放的窗口，建议div的宽高在640px*480px以上：
```html
<div id="parent" style="width:748px;height:421px;"></div>
```

### 创建互动层实例
在网页合适位置写入如下代码，并对参数进行相应的设置，即可创建互动视频实例：
```javascript
var ivaInstance = new Iva(
  '父容器',//新建一个div作为视频播放的窗口，建议div的宽高在640px*480px以上；
  {
    appkey: '应用标识',//必填，请在控制台查看应用标识
    video: '视频地址url',//必填，播放地址（例如：http://v.youku.com/v_show/id_XMTY5NDg2MzY5Ng==.html）
    title: '小视频',//选填，建议填写方便后台数据统计
    cover: '视频封面url',//选填，视频封面url
    vnewsEnable: false,//是否开启新闻推送功能，默认为true
    playerUrl: '', //选填，第三方播放器与Video++互动层的桥接文件，由Video++官方定制提供，默认为空
    videoStartPrefixSeconds: 0,//选填，跳过片头，默认为0
    videoEndPrefixSeconds: 0,//选填，跳过片尾，默认为0
    /* 以下参数可以在“控制台->项目看板->应用管理->播放器设置” >进行全局设置，前端设置可以覆盖全局设置 */
    skinSelect: 0,//选填，播放器皮肤，可选0、1、2，默认为0，
    autoplay: false,//选填，是否自动播放，默认为false
    rightHand: true,//选填，是否开启右键菜单，默认为false
    autoFormat: false,//选填，是否自动选择最高清晰度，默>认为false
    bubble: true,//选填，是否开启云泡功能，默认为true
    jumpStep: 10,//选填，左右方向键快退快进的时间
    tagTrack: false,//选填，云链是否跟踪，默认为false
    tagShow: false,//选填，云链是否显示，默认为false
    tagDuration: 5,//选填，云链显示时间，默认为5秒
    tagFontSize: 16,//选填，云链文字大小，默认为16像素
    editorEnable: true, // 选填，当用户登录之后，是否允许加载编辑器，默认为true
    vorEnable: true, // 选填，是否允许加载灵悟，默认为true
    vorStartGuideEnable: true //选填， 是否启用灵悟新人引导，默认为true
  }
);
```

### 销毁互动层实例
如果要销毁实例，可以调用实例的`destroy`方法`ivaInstance.destroy()`;
