#详细了解视频小工具文件结构
本文以"云图"小程序为例，讲解互动小程序的文件结构，以及每种文件类型在小程序中的作用。
云图是最常见的视频小程序，通常也叫做贴片广告，可供视频APP流量主投放广告进行变现。


1. 在定义云图jsonSchema数据结构时，首先你应该要知道的是你需要的数据是一个对象，这时你要用type属性定义数据类型为object.
```json
{
  "type": "object"
}
```

2. 之后在"properties"属性下面定义你需要的数据结构，并定义你需要数据中每个字段的数据类型与名称
```json
{
  "type": "object",
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

3. 这时一个jsonSchema数据就大体完成了，我们还可以加已优化，通过"required"规定哪些数据是必填数据。
```json
{
  "type": "object",
  "required": ["creativeName", "imageUrl"],
  "properties": {
  }
}
```

4. 这时一个类似云图的jsonSchema就完成了，当然如果你想直接使用我们官方云图就需要定义数据的"key": "yuntu"