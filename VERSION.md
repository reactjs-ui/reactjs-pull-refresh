# React Pull Refresh 更新日志

## version 0.4.1  (2016-8-23)

* 增加参数 easing refresh 和 loadMore 来分别设置加速度，是否显示刷新和显示加载更多

## version 0.3.3  (2016-8-9)

* 引入 reactjs-scroll 最新版本
* reactjs-scroll 作为 externals 引入，打包时不再编译 reactjs-scroll

## version 0.3.2  调整代码结构(2016-8-9)

* 引入 reactjs-scroll 最新版本
* reactjs-scroll 作为 externals 引入，打包时不再编译 reactjs-scroll

## version 0.3.0  重新实现下拉刷新 react 组件(2016-8-3)

* 下拉刷新基于 [reactjs-scroll](https://github.com/reactjs-ui/reactjs-scroll) 实现
* 把下拉刷新和加载更多统一到一起实现
* 增加了可配置参数选项
* 完善文档和例子

## version 0.2.0  升级改进(2016-7-19)

* 引入了 [react-hammerjs](https://github.com/JedWatson/react-hammerjs) 来更好的处理事件，以及组件 unmount 时卸载 hammer 实例
* 样式 rc-pull-ptr-icon 和 rc-pull-ptr-loading 改为使用时根据实际再定义
* 优化例子
* 增加了可自定义向下滑动刷新效果例子
* 修复部分 bug
* 完善文档

## version 0.1.0  开启 React Pull Refresh 之旅(2016-7-17)

* React Pull Refresh 0.1.0 发布
* 实现向下滑动重新刷新页面
* 给出基本实现例子
* 完善相关文档

