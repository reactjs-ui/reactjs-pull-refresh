# reactjs-pull-refresh

This is a react component for pull down refresh.

## Install

```
npm install reactjs-pull-refresh --save
```

## Example

```
npm install
gulp example
```

http://localhost:9090


## Online Example

http://reactjs-ui.github.io/reactjs-pull-refresh/

## Build Example
第一次需要先执行前两步操作，再执行第三步。以后修改例子后，只需要执行第三步即可

* 创建 gh-pages 分支，**在执行 git subtree add 命令之前，需确保 gh-pages 分支下至少存在一个文件**
```
git branch gh-pages
git checkout gh-pages
rm -rf *     //隐藏文件需要单独删除，结合命令 ls -a
git add -A
git commit -m "clear gh-page"
git push --set-upstream origin gh-pages
vim README.md
//输入一些内容
git add README.md
git commit -m "README.md"
git push
git checkout master
```

* 把分支 gh-pages 添加到本地 subtree 中，执行该命令前，请确保 examples-dist 文件夹不存在

```
git subtree add --prefix=examples-dist origin gh-pages --squash
```
  
* 生成在线 examples
```
gulp example:build
git add -A examples-dist
git commit -m "Update online examples"
git subtree push --prefix=examples-dist origin gh-pages --squash
git push
```

## Usage

```javascript
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PullRefresh from '../src/scripts/index';
import './sass/example.scss';

// 初始化 tapEvent 事件, 移动端
injectTapEventPlugin();

class PullRefreshSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 20,
      hasMore: true
    };
  }

  refreshCallback = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = false;
        if (Math.random() > 0.2) {
          result = true;
        }
        if (result) {
          this.setState({
            items: 20,
            hasMore: true
          }, () => {
            resolve();
          });
        } else {
          reject();
        }
      }, 1000);
    }).then(() => {
      console.info('刷新成功！');
    }, (error) => {
      console.info('刷新失败！');
      Promise.error(error);
    });
  };

  loadMoreCallback = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = false;
        if (Math.random() > 0.2) {
          result = true;
        }
        if (result) {
          this.setState({
            items: this.state.items + 10,
            hasMore: this.state.items <= 40
          }, () => {
            resolve();
          });
        } else {
          reject();
        }
      }, 1000);
    }).then(() => {
      console.info('加载更多成功！');
    }, (error) => {
      console.info('加载更多失败！');
      Promise.error(error);
    });
  };

  handleTouchTap = (e) => {
    console.info('测试下拉刷新插件是否与 Tap 事件冲突');
  };

  render() {
    let contents = [];
    const {items, hasMore} = this.state;

    for (let i = items; i > 0; i--) {
      if (i < 10) {
        contents.push(<li key={i}><a href="http://www.sina.com">这里放置真实显示的DOM内容</a> {i}</li>);
      } else {
        contents.push(<li key={i} onTouchTap={this.handleTouchTap}>这里放置真实显示的DOM内容 {i}</li>);
      }
    }

    const props = {
      maxAmplitude: 80,
      debounceTime: 30,
      throttleTime: 100,
      deceleration: 0.001,
      refreshCallback: this.refreshCallback,
      loadMoreCallback: this.loadMoreCallback,
      hasMore
    };

    return (
      <PullRefresh {...props}>
        <ol className="example-list">
          {contents.map((item) => {
            return item;
          })}
        </ol>
      </PullRefresh>
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
| className | PropTypes.string| 自定义 className|
| children | PropTypes.node| 待渲染的内容|
| refreshCallback | PropTypes.func| 上拉刷新回调函数，需要是 promise 函数|
| loadMoreCallback | PropTypes.func| 下拉加载更多回调函数，需要是 promise 函数|
| hasMore | PropTypes.bool.isRequired| 是否有更多数据|
| loadMoreThrottle | PropTypes.number| 设置加载更多，距离最底部临界值|
| scrollBar | PropTypes.bool| 是否显示滚动条|
| maxAmplitude | PropTypes.number| 设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素|
| debounceTime | PropTypes.number| 设置防抖时间|
| throttleTime | PropTypes.number| 设置滑动条移动频率，值越大，移动的越缓慢|
| deceleration | PropTypes.number| 设置弹性滑动持续时间，即滑动停止时，弹性持续的时间，值越大，持续时间越短|
| scrollSpeed   | PropTypes.number | 设置滚动加速度，值越大，滚动越快 |
| thresholdOffset | PropTypes.number | 设置上下移动临界值，移动超过该值，则向上或向下滑动 |
| durationSpeed | PropTypes.number | 滑动持续时间系数，系数越大，持续的时间短 |
| easing  | PropTypes.string | 设置加速方式，默认为匀速，详情查看 https://github.com/component/ease |
| refresh  | PropTypes.bool | 是否显示刷新 |
| loadMore  | PropTypes.bool | 是否加载更多 |

## Build

```
gulp build
```

## Publish

```
npm publish
```

## More React Component

* [reactjs-scroll](https://www.npmjs.com/package/reactjs-scroll) 

## Issue

https://github.com/reactjs-ui/reactjs-pull-refresh/issues

## CHANGELOG

Please view [here](./CHANGELOG.md)
