# reactjs-pull-refresh

This is a react component for pull down refresh.

## Install

```
npm install reactjs-pull-refresh --save
```

## Usage

首先需要定制下拉样式，可参考例子中的实现。
主要需要设置 rc-pull-ptr-icon 和 rc-pull-ptr-loading 的样式

```javascript
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import PullRefresh from '../src/scripts/index';
import './sass/simple.scss';

class PullRefreshSimple extends Component {
  constructor(props, context) {
    super(props, context);
    this.loadingFunction.bind(this);
  }

  loadingFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = true;
        if (result) {
          resolve();
        } else {
          reject();
        }
      }, 500);
    }).then(() => {
      console.info('刷新成功！');
    });
  }

  render() {
    return (
      <div>
        <PullRefresh loadingFunction={this.loadingFunction}
                     distanceToRefresh={40}>
          <p>Pull down to refresh!</p>
        </PullRefresh>
      </div>
    );
  }
}

render(
  <PullRefreshSimple />, document.getElementById('layout')
);

```

## Options

| 选项        | 类型   |  功能  |
| --------   | ----- | ---- |
| loadingFunction |  PropTypes.func.isRequired | 加载完回调函数，需要 a promise |
| icon |  PropTypes.element |  设置下滑时展示的内容 |
| prefixCls |  PropTypes.string | 样式前缀 |
| loading |  PropTypes.element |  设置加载时展示的内容或样式 |
| disabled |  PropTypes.bool |  是否禁止向下滑动 |
| className |  PropTypes.string | 自定义class样式 |
| style |  PropTypes.object |  自定义 style 样式 |
| contentClassName |  PropTypes.string |  内容自定义 class 样式 |
| contentStyle |  PropTypes.object |  内容自定义 style 样式 |
| distanceToRefresh |  PropTypes.number |  设置刷新所需的滑动距离，单位为像素 |
| resistance |  PropTypes.number |  拖拽阻力系数，设置大于1表示实际拖拽效果变得缓慢，设置小于1，则加速拖拽效果 |
| children |  PropTypes.any |  呈现的子元素 |
| hammerOptions |  PropTypes.object |  hammer 组件选项 |
| lockInTime |  PropTypes.number |  设置刷新完一次，等待的事件，默认为1秒 |
| containerEl |  PropTypes.element |  渲染组件容器，可设为 document.body 等 |
  
## Example

```
npm install
gulp example
```

http://localhost:9090

## Build

```
gulp build
```

## References

 * https://github.com/JedWatson/react-hammerjs
 * http://hammerjs.github.io/
 * https://github.com/apeatling/web-pull-to-refresh
 * https://github.com/react-component/m-pull-to-refresh


## Issue

https://github.com/reactjs-ui/reactjs-pull-refresh/issues

## Version

Please view [here](./VERSION.md)
