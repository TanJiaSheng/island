## 业务

### 业务逻辑

- 在API接口编写

- Model 分层（推荐）

MVC Model

### 业务分层 Model, Service

- Thinkphp Model Service Logic

- spring Model DTO

## 微信登录

- 获取openid

- 获取方法

根据微信提供的获取接口，使用开发者的appid和appsecret，拼接成获取openID路径"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"