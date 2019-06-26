# json schema
**jsonschema**是描述你的JSON数据格式；JSON模式（应用程序/模式+ JSON）有多种用途，其中之一就是实例验证。验证过程可以是交互式或非交互式的。例如，应用程序可以使用JSON模式来构建用户界面,使互动的内容生成用户输入检查或验证各种来源获取的数据。

#### 基础数据结构
```json
{
  "type": "object",
  "description": "A product from video++",
  "required": ["creativeName", "interactionTemplateId"],
  "uiSchema": {},
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
    

| 参数  |  描述 |类型|
|--|:--:|--:|
| title |  标题，用来描述结构 |String|
| type |  类型  |String|
| description |  描述 |String|
| required |  必需属性 |Array|
| properties    |  定义属性 |Object|
| uiSchema  |  定义属性的渲染方式 |Object|

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
    },
    "linkUrl": {
      "type": "string",
      "title": "跳转外链链接",
      "format": "uri"
    }
  }
}
```

| 参数  |  描述 |类型|
|--|:--:|--:|
| title  |  标题，用来描述结构 |String|
| type    |  类型  |String|
| description   |  描述 |String|
| default    |  默认值 |String,Boolean |
| format    |  格式 |String|
| enum     |  enumName中的属性 |String|
| enumNames |  下拉列表 |String|

##### format属性
| 参数  |  描述 |类型|
|--|:--:|--:|
| email  |  使用一个input[type=email]元素 |String|
| uri    |  使用一个input[type=url]元素  |String|
| data-url   |  默认情况下，使用一个input[type=file]元素; 如果字符串是数组的一部分，将自动处理多个文件 |String|
| date    |  默认情况下，使用一个input[type=date]元素; |String |
| date-time    |  默认情况下，使用input[type=datetime-local]元素。 |String|

#### type:Json schema 类型
##### Object
```json
{
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

| 参数  |  描述 |类型|
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

| 参数  |  描述 |类型|
|--|:--:|--:|
| maxLength   |	定义字符串的最大长度，>=0 |Number|
| minLength     |  定义字符串的最小长度，>=0  |Number|
| pattern    |  用正则表达式约束字符串 |String|

#### integer , number 
|参数|描述|类型|
|--|:--:|--:|
|minimum |最小值 |Number|
|exclusiveMinimum |如果存在 "exclusiveMinimum" 并且具有布尔值 true，如果它严格意义上大于 "minimum" 的值则实例有效。|Boolean|
|maximum |约束属性，最大值|Number|
|multipleOf  |是某数的倍数，必须大于0的整数|Number|

#### boolean 
true or false

### 上传图片与视频
在json中新添加uiSchema处理规则，使用uiSchema替换的ui组件达到上传视频与图片的目的。
当在数组对象中设置图片时需设置对象的层级，如下示例中的'encyImage','answerList'字段将对象属性中的"ui:widget"值设为"imgBtn"即可达到上传视频的目的，如需要上传视频则将值设为"videoBtn"。
```json
{
  "type": "object",
  "description": "信息百科",
  "title": "信息百科",
  "required": ["creativeName"],
  "uiSchema": {
    "creativeName": {
      "ui:placeholder": "请输入素材名称"
    },
    "hotEdit": {
      "hotImage": {
        "ui:widget": "imgBtn",
        "ui:help": "图片尺寸为宽100PX，高135PX"
      }
    },
    "inforEdit": {
      "encyImage": {
        "items": {"ui:widget": "imgBtn"},
        "ui:help": "图片尺寸为宽100PX，高135PX，支持JPG、PNG等图片格式，最多添加5张图片"
      }
    }
  },
  "properties": {
    "creativeName": {
      "title": "素材名称",
      "type": "string",
      "maxLength": 30
    },
    "hotEdit": {
      "type": "object",
      "title": "热点编辑",
      "properties":{
        "hotImage": {
          "title": "热点图片",
          "type": "string"
        }
      }
      
    },
    "inforEdit": {
      "type": "object",
      "title": "信息层编辑",
      "properties": {
        "encyImage": {
          "title": "百科图片",
          "type": "array",
          "minItems": 1,
          "maxItems": 5,
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```
### 进阶
#### $ref
$ref 用来引用其它schema

```json
{
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

### uiSchema对象
**uiSchema**提供这个对象是为了告诉表单如何去渲染表单信息，uiSchema遵循jsonschema表单字段的层次结构，并定义如何呈现每个属性。

### "ui:widget"
uiSchema “ui:widget”属性告诉表单应该使用哪个UI小部件来呈现字段。
```json
{
  "type": "object",
  "properties": {
    "foo": {
      "type": "object",
      "properties": {
        "bar": {"type": "string"}
      }
    },
    "baz": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string"
          }
        }
      }
    }
  },
  "uiSchema": {
    "foo": {
      "bar": {
        "ui:widget": "textarea"
      },
    },
    "baz": {
      "items": {
        "description": {
          "ui:widget": "textarea"
        }
      }
    }
  }
}
```

##替代小部件
| 值  |  描述 |类型|
|--|:--:|--:|
| radio |	带有true和false作为可选值的单选按钮组 |String|
| select |  带有true和false作为选项的选择框  |String|
| textarea |  使用一个textarea元素 |String|
| password |  使用一个input[type=password]元素 |String|
| color |  使用一个input[type=color]元素 |String|
| imgBtn | 上传图片组件 |String|
| videoBtn |  上传视频组件 |String|

内置字符串字段还支持JSONSchema format属性，并且默认情况下会为以下字符串格式呈现适当的小部件：

| 值  |  描述 |类型|
|--|:--:|--:|
| email  |  使用一个input[type=email]元素 |String|
| uri    |  使用一个input[type=url]元素  |String|
| data-url   |  默认情况下，使用一个input[type=file]元素; 如果字符串是数组的一部分，将自动处理多个文件 |String|
| date    |  默认情况下，使用一个input[type=date]元素; |String |
| date-time    |  默认情况下，使用input[type=datetime-local]元素。 |String|

###"ui:disabled"
此"ui:disabled"指令将禁用指定属性下的所有子控件

###"ui:readonly"
此"ui:readonly"指令将指定属性下的所有子控件设为只读

###"ui:order"
```json
{
  "type": "object",
  "properties": {
    "foo": {"type": "string"},
    "bar": {"type": "string"}
  },
  "uiSchema": {
    "ui:order": ["bar", "foo"]
  }
}
```
此属性允许你指定jsonschema对象的呈现顺序

###"ui:help"
此属性可以在字段旁边添加文本以指导用户填写表单

###"ui:placeholder"
此属性可以设置输入框中的空选文本


### 参考文档
* <a href="https://json-schema.org/understanding-json-schema/reference/object.html" target="_blank">json-schema</a>
* <a href="https://www.npmjs.com/package/pensee-react-jsonschema-form#for-boolean-fields" target="_blank">react-jsonschema</a>
* <a href="https://mozilla-services.github.io/react-jsonschema-form/" target="_blank">react-jsonschema-form</a>
* <a href="https://react-jsonschema-form.readthedocs.io/en/latest/" target="_blank">react-jsonschema-form文档</a>

