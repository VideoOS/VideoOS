# json schema
**jsonschema**是描述你的JSON数据格式；JSON模式（应用程序/模式+ JSON）有多种用途，其中之一就是实例验证。验证过程可以是交互式或非交互式的。例如，应用程序可以使用JSON模式来构建用户界面,使互动的内容生成用户输入检查或验证各种来源获取的数据。

#### 基础数据结构
```json
{
  "key": "yuntu",
  "type": "object",
  "description": "A product from video++",
  "required": ["creativeName", "interactionTemplateId"],
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30
    },
    "interactionTemplateId": {
      "title": "素材主题",
      "type": "integer",
      "enum": [],
      "enumNames": []
    }
  }
}
```
    

| 关键字  |  描述 |类型|
|--|:--:|--:|
| title  |  标题，用来描述结构 |String|
| type    |  类型  |String|
| description   |  描述 |String|
| required   |  必需属性 |Array|
| properties    |  定义属性 |Object|

上面只是一个简单的例子，从上面可以看出Json schema 本身是一个JSON字符串，由通过key-value的形式进行标示。
type 和 properties 用来定义json 属性的类型。required 是对properties字段中属性的必需性进行约束,在其中creativeName为本项目小程序素材名称为必填项。
#### properties
properties定义每个属性的名字和类型

```json
{
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30,
    "default": "A new task"
    },
    "interactionTemplateId": {
      "title": "素材主题",
      "type": "integer",
      "enum": [],
      "enumNames": []
    }
  }
}
```

| 关键字  |  描述 |类型|
|--|:--:|--:|
| title  |  标题，用来描述结构 |String|
| type    |  类型  |String|
| description   |  描述 |String|
| default    |  默认值 |String,Boolean |
| format    |  格式 |String|
| enum     |  enumName中的属性 |String|
| enumNames |  下拉列表 |String|

#### type:Json schema 类型
##### Object
```json
{
  "key": "yuntu",
  "type": "object",
  "description": "A product from video++",
  "required": ["creativeName", "interactionTemplateId"],
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30
    }
  }
}
```
    

object类型有三个关键字:type（限定类型）,properties(定义object的各个字段),required（限定必需字段）
##### array 

```json
{
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "array",
  "items": {
    "type": "string"
  },
  "minItems": 1,
  "uniqueItems": true
}
```
    
array有三个单独的属性:items,minItems,uniqueItems:

| 关键字  |  描述 |类型|
|--|:--:|--:|
| items   |  array 每个元素的类型 |Object|
| minItems     |  约束属性，数组最小的元素个数  |Number|
| maxItems    |  约束属性，数组最大的元素个数 |Number|
| uniqueItems    |  约束属性，每个元素都不相同 |Boolean |
| additionalProperties    |  约束items的类型，不建议使用 |String|
| dependencies     |  属性依赖 |Object|

#### string 
```json
{
  "creativeName": {
    "title": "素材名称",
    "type": "string",
    "maxLength": 30
  }
}
```

| 关键字  |  描述 |类型|
|--|:--:|--:|
| maxLength   |	定义字符串的最大长度，>=0 |Number|
| minLength     |  定义字符串的最小长度，>=0  |Number|
| pattern    |  用正则表达式约束字符串 |String|

#### integer , number 
|关键字|描述|类型|
|--|:--:|--:|
|minimum |最小值 |Number|
|exclusiveMinimum |如果存在 "exclusiveMinimum" 并且具有布尔值 true，如果它严格意义上大于 "minimum" 的值则实例有效。|Boolean|
|maximum |约束属性，最大值|Number|
|multipleOf  |是某数的倍数，必须大于0的整数|Number|

#### boolean 
true or false
### 进阶
#### $ref
$ref 用来引用其它schema

```json
{
  "key": "kapai",
  "definitions": {
    "Item": {
      "type": "object",
      "properties": {
        "imageUrl": {
          "type": "string",
          "title": "热点图片"
        },
        "title": {
          "type": "string",
          "title": "热点标题",
          "maxLength": 10
        }
      },
      "required": ["imageUrl", "title"]
    }
  },
  "title": "",
  "type": "object",
  "required": ["creativeName", "interactionTemplateId", "hotspotArray"],
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30
    },
    "hotspotArray": {
      "type": "array",
      "minItems": 2,
      "maxItems": 3,
      "title": "2.配置卡牌",
      "items": {
        "$ref": "#/definitions/Item"
      }
    }
  }
}
```
    
当一个schema写的很大的时候，可能需要definitions创建内部结构体，再使用$ref进行引用
### 参考文档
* <a href="https://json-schema.org/understanding-json-schema/reference/object.html" target="_blank">json-schema</a>
* <a href="https://www.npmjs.com/package/pensee-react-jsonschema-form#for-boolean-fields" target="_blank">react-jsonschema</a>
