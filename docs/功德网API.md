# 功德网

> v1.0.0

Base URLs:

* <a href="http://127.0.0.1:5001">测试环境: http://127.0.0.1:5001</a>

# users

## POST 登陆

POST /api/users/login

> Body 请求参数

```json
{
  "account": "string",
  "password": "string",
  "verifycode": "string"
}
```

### 请求参数

| 名称           | 位置   | 类型     | 必选  | 说明   |
| ------------ | ---- | ------ | --- | ---- |
| body         | body | object | 否   | none |
| » account    | body | string | 是   | none |
| » password   | body | string | 是   | none |
| » verifycode | body | string | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {
    "username": "string",
    "uid": "string",
    "status": "string",
    "accesstoken": "string",
    "refreshtoken": "string",
    "exptime": {
      "access": 0,
      "refresh": 0
    }
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称              | 类型      | 必选   | 约束   | 中文名 | 说明   |
| --------------- | ------- | ---- | ---- | --- | ---- |
| » code          | integer | true | none |     | none |
| » status        | string  | true | none |     | none |
| » message       | string  | true | none |     | none |
| » data          | object  | true | none |     | none |
| »» username     | string  | true | none |     | none |
| »» uid          | string  | true | none |     | none |
| »» status       | string  | true | none |     | none |
| »» accesstoken  | string  | true | none |     | none |
| »» refreshtoken | string  | true | none |     | none |
| »» exptime      | object  | true | none |     | none |
| »»» access      | integer | true | none |     | none |
| »»» refresh     | integer | true | none |     | none |

## POST 注册

POST /api/users/register

> Body 请求参数

```json
{
  "useremail": "string",
  "userphone": "string",
  "password": "string"
}
```

### 请求参数

| 名称          | 位置   | 类型     | 必选  | 说明   |
| ----------- | ---- | ------ | --- | ---- |
| body        | body | object | 否   | none |
| » useremail | body | string | 是   | none |
| » userphone | body | string | 是   | none |
| » password  | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "data": {
    "uid": "string",
    "username": "string"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称          | 类型      | 必选   | 约束   | 中文名 | 说明   |
| ----------- | ------- | ---- | ---- | --- | ---- |
| » code      | integer | true | none |     | none |
| » status    | string  | true | none |     | none |
| » data      | object  | true | none |     | none |
| »» uid      | string  | true | none |     | none |
| »» username | string  | true | none |     | none |

## POST 忘记密码

POST /api/users/forget

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 刷新token

POST /api/users/refresh

> Body 请求参数

```json
{}
```

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 修改登陆密码

POST /api/users/changepassword

此接口需携带refreshtoken

> Body 请求参数

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |
| » oldPassword | body   | string | 是   | none |
| » newPassword | body   | string | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 退出登陆

POST /api/users/logout

> Body 请求参数

```json
{
  "token": [
    "string"
  ]
}
```

### 请求参数

| 名称            | 位置     | 类型       | 必选  | 说明   |
| ------------- | ------ | -------- | --- | ---- |
| Authorization | header | string   | 否   | none |
| body          | body   | object   | 否   | none |
| » token       | body   | [string] | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## GET 根据账号获取用户头像

GET /api/users/avatar/{id}

### 请求参数

| 名称  | 位置   | 类型     | 必选  | 说明   |
| --- | ---- | ------ | --- | ---- |
| id  | path | string | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

# users/核验

## GET 核验邮箱是否存在

GET /api/users/exist/email/xcf2370%40outlook.com

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称        | 类型      | 必选   | 约束   | 中文名 | 说明   |
| --------- | ------- | ---- | ---- | --- | ---- |
| » code    | integer | true | none |     | none |
| » status  | string  | true | none |     | none |
| » message | string  | true | none |     | none |
| » data    | object  | true | none |     | none |

## GET 核验手机号是否存在

GET /api/users/exist/phone/{phone}

### 请求参数

| 名称    | 位置   | 类型     | 必选  | 说明   |
| ----- | ---- | ------ | --- | ---- |
| phone | path | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称        | 类型      | 必选   | 约束   | 中文名 | 说明   |
| --------- | ------- | ---- | ---- | --- | ---- |
| » code    | integer | true | none |     | none |
| » status  | string  | true | none |     | none |
| » message | string  | true | none |     | none |
| » data    | object  | true | none |     | none |

## GET 核验用户名是否存在

GET /api/users/exist/name/{name}

### 请求参数

| 名称   | 位置   | 类型     | 必选  | 说明   |
| ---- | ---- | ------ | --- | ---- |
| name | path | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称        | 类型      | 必选   | 约束   | 中文名 | 说明   |
| --------- | ------- | ---- | ---- | --- | ---- |
| » code    | integer | true | none |     | none |
| » status  | string  | true | none |     | none |
| » message | string  | true | none |     | none |
| » data    | object  | true | none |     | none |

# users/information

## GET 获取用户基本信息

GET /api/users/information/

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {
    "username": "string",
    "useremail": "string",
    "userphone": "string",
    "avatar": "string",
    "qqnumber": "string",
    "realname": "string",
    "gender": "string",
    "birthday": "string",
    "age": 0,
    "province": "string",
    "city": "string"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称           | 类型      | 必选   | 约束   | 中文名 | 说明   |
| ------------ | ------- | ---- | ---- | --- | ---- |
| » code       | integer | true | none |     | none |
| » status     | string  | true | none |     | none |
| » message    | string  | true | none |     | none |
| » data       | object  | true | none |     | none |
| »» username  | string  | true | none |     | none |
| »» useremail | string  | true | none |     | none |
| »» userphone | string  | true | none |     | none |
| »» avatar    | string  | true | none |     | none |
| »» qqnumber  | string  | true | none |     | none |
| »» realname  | string  | true | none |     | none |
| »» gender    | string  | true | none |     | none |
| »» birthday  | string  | true | none |     | none |
| »» age       | integer | true | none |     | none |
| »» province  | string  | true | none |     | none |
| »» city      | string  | true | none |     | none |

## PUT 更新用户信息

PUT /api/users/information/

> Body 请求参数

```json
{
  "avatar": "string",
  "qqNumber": "string",
  "realName": "string",
  "gender": "string",
  "birthday": "string",
  "age": 0,
  "province": "string",
  "city": "string"
}
```

### 请求参数

| 名称            | 位置     | 类型      | 必选  | 说明   |
| ------------- | ------ | ------- | --- | ---- |
| Authorization | header | string  | 否   | none |
| body          | body   | object  | 否   | none |
| » avatar      | body   | string  | 否   | none |
| » qqNumber    | body   | string  | 否   | none |
| » realName    | body   | string  | 否   | none |
| » gender      | body   | string  | 否   | none |
| » birthday    | body   | string  | 否   | none |
| » age         | body   | integer | 否   | none |
| » province    | body   | string  | 否   | none |
| » city        | body   | string  | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {
    "affectNumber": [
      0
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称              | 类型        | 必选   | 约束   | 中文名 | 说明   |
| --------------- | --------- | ---- | ---- | --- | ---- |
| » code          | integer   | true | none |     | none |
| » status        | string    | true | none |     | none |
| » message       | string    | true | none |     | none |
| » data          | object    | true | none |     | none |
| »» affectNumber | [integer] | true | none |     | none |

## GET 获取用户头像

GET /api/users/information/avatar

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 设置QQ头像

POST /api/users/information/qqavatar

> Body 请求参数

```json
{
  "qqNumber": "string"
}
```

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |
| » qqNumber    | body   | string | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

# system

## GET 同步所有数据模型

GET /api/system/syncmodels

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

# Gongde/木鱼

## POST 敲木鱼

POST /api/gongde/woodfish/knock

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## GET 获取总功德值

GET /api/gongde/woodfish/score

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## GET 获取今日功德值

GET /api/gongde/woodfish/todayscore

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## GET 获取基本功德信息

GET /api/gongde/woodfish/basicinfo

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 敲木鱼(按分数)

POST /api/gongde/woodfish/knock2

> Body 请求参数

```json
{
  "score": 0,
  "secret": "string"
}
```

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |
| » score       | body   | number | 是   | none |
| » secret      | body   | string | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

# Gongde/排行榜

## GET 日榜

GET /api/gongde/ranking/daily

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## GET 总榜

GET /api/gongde/ranking/total

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

# Feedback

## POST 提交反馈

POST /api/feedback/issue

> Body 请求参数

```json
{
  "issue": "string",
  "telNumber": "string",
  "qqNumber": "string"
}
```

### 请求参数

| 名称            | 位置     | 类型     | 必选  | 说明   |
| ------------- | ------ | ------ | --- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |
| » issue       | body   | string | 是   | none |
| » telNumber   | body   | string | 是   | none |
| » qqNumber    | body   | string | 是   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

## POST 检查更新

POST /api/feedback/checkupdate

> Body 请求参数

```json
{
  "platform": "string",
  "version": "string"
}
```

### 请求参数

| 名称         | 位置   | 类型     | 必选  | 说明   |
| ---------- | ---- | ------ | --- | ---- |
| body       | body | object | 否   | none |
| » platform | body | string | 是   | none |
| » version  | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "status": "string",
  "message": "string",
  "data": {
    "update": true,
    "link": "string",
    "version": "string",
    "details": "string",
    "date": "string"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                                   | 说明  | 数据模型   |
| --- | ------------------------------------------------------- | --- | ------ |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功  | Inline |

### 返回数据结构

状态码 **200**

| 名称         | 类型      | 必选   | 约束   | 中文名 | 说明   |
| ---------- | ------- | ---- | ---- | --- | ---- |
| » code     | integer | true | none |     | none |
| » status   | string  | true | none |     | none |
| » message  | string  | true | none |     | none |
| » data     | object  | true | none |     | none |
| »» update  | boolean | true | none |     | none |
| »» link    | string  | true | none |     | none |
| »» version | string  | true | none |     | none |
| »» details | string  | true | none |     | none |
| »» date    | string  | true | none |     | none |

# 数据模型
