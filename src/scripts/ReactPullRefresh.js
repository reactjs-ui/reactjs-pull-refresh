/**!
 * 向下滑动 react 组件
 * 参考文档
 * https://github.com/JedWatson/react-hammerjs
 * http://hammerjs.github.io/
 * https://github.com/apeatling/web-pull-to-refresh
 * https://github.com/react-component/m-pull-to-refresh
 */

import React, {PropTypes, Component} from 'react';
import Hammer from 'react-hammerjs';
import WebPullToRefresh from './WebPullToRefresh';
import '../sass/pull-refresh.scss';

const emptyEvents = {
  onPanStart: undefined,
  onPan: undefined,
  onPanEnd: undefined,
};

class PullToRefresh extends Component {
  //可能需要传入的参数
  static propTypes = {
    loadingFunction: PropTypes.func.isRequired, //加载完回调函数，需要 a promise
    icon: PropTypes.element, // 设置下滑时展示的内容
    prefixCls: PropTypes.string, //样式前缀
    loading: PropTypes.element, // 设置加载时展示的内容或样式
    disabled: PropTypes.bool, // 是否禁止向下滑动
    className: PropTypes.string, //自定义class样式
    style: PropTypes.object, // 自定义 style 样式
    contentClassName: PropTypes.string, // 内容自定义 class 样式
    contentStyle: PropTypes.object, // 内容自定义 style 样式
    distanceToRefresh: PropTypes.number, // 设置刷新所需的滑动距离，单位为像素
    resistance: PropTypes.number, // 拖拽阻力系数，设置大于1表示实际拖拽效果变得缓慢，设置小于1，则加速拖拽效果
    children: PropTypes.any, // 呈现的子元素
    hammerOptions: PropTypes.object, // hammer 组件选项
    lockInTime: PropTypes.number, // 设置刷新完一次，等待的事件，默认为1秒
    containerEl: PropTypes.element, // 渲染组件容器，可设为 document.body 等
    onPanStart: PropTypes.func, // 自定义 panStart 函数，如果返回 false，则禁止滑动
    onPanEnd: PropTypes.func, // 自定义 panEnd 函数
  };

  static defaultProps = {
    prefixCls: 'rc-pull',
    className: '',
    contentClassName: '',
    hammerOptions: {touchAction: 'auto'},
  };

  componentWillMount() {
    this.webPullToRefresh = WebPullToRefresh();
  }

  componentDidMount() {
    const {
      prefixCls, distanceToRefresh, loadingFunction,
      resistance, lockInTime, containerEl, onPanStart, onPanEnd
    } = this.props;
    const {contentEl, ptrEl, container} = this.refs;
    //初始化 web pull to Refresh
    this.webPullToRefresh.init({
      containerEl: containerEl || container,
      contentEl,
      ptrEl,
      prefixCls,
      distanceToRefresh,
      loadingFunction,
      resistance,
      lockInTime,
      onPanStart,
      onPanEnd
    });
  }

  render() {
    const {
      prefixCls, children, icon, loading, className, disabled,
      style, contentStyle, contentClassName, hammerOptions
    } = this.props;

    const events = disabled ? emptyEvents : this.webPullToRefresh.events;

    return (
      <div className={`${className} ${prefixCls}-container`} style={style} ref="container">
        <div ref="ptrEl" className={`${prefixCls}-ptr`}>
          <div className={`${prefixCls}-ptr-icon`}>{icon}</div>
          <div className={`${prefixCls}-ptr-loading`}>{loading}</div>
        </div>

        <Hammer direction="DIRECTION_ALL" {...events} options={hammerOptions}>
          <div
            ref="contentEl"
            className={`${prefixCls}-content ${contentClassName}`}
            style={contentStyle}
          >
            {children}
          </div>
        </Hammer>
      </div>
    );
  }
}

export default PullToRefresh;
