# 说明

本工具仅为个人使用, 未有上架商店的计划, 仅供参考学习使用. 扩展理论支持`Chrome`和`Edge`浏览器

- `HDArea` 每日自动签到
- `M-Team` 每日自动访问网页

# 新网站加入方法

1. `background.js`文件中,在`defaultJobs`数组中新增一个对象, 创建一个函数名称与`name`相同`Promise`函数,其中编写对应网站的逻辑
2. `manifest.json`文件中,在`permissions`数组中新增对应网站的权限
3. `options.html`文件和`options.js`文件中,新增一个`checkbox`用于开关配置
4. `popup.html`文件和`popup.js`文件中新增任务状态显示

# 安装方法

1. `git clone`项目或者[点击下载](https://github.com/Curtion/pt-sign-in-browser/archive/refs/heads/main.zip)
2. 解压zip文件
3. 浏览器扩展设置中,打开`开发者模式`,点击`加载已解压的扩展程序`,选择项目文件夹