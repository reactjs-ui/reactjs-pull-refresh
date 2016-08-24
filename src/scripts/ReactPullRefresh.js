import React, {PropTypes, Component} from 'react';
import Scroll from 'reactjs-scroll';
import PullRefresh from './PullRefresh';
import '../sass/pull-refresh.scss';

class ReactPullRefresh extends Component {
  //可能需要传入的参数
  static propTypes = {
    className: PropTypes.string, // 自定义 className
    children: PropTypes.node, //待渲染的内容
    refreshCallback: PropTypes.func, //上拉刷新回调函数，需要是 promise 函数
    loadMoreCallback: PropTypes.func, // 下拉加载更多回调函数，需要是 promise 函数
    hasMore: PropTypes.bool.isRequired, //是否有更多数据
    loadMoreThrottle: PropTypes.number, //设置加载更多，距离最底部临界值，
    // Reactjs Scroll 组件属性
    scrollBar: PropTypes.bool, // 是否显示滚动条
    maxAmplitude: PropTypes.number, // 设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
    debounceTime: PropTypes.number, // 设置防抖时间
    throttleTime: PropTypes.number, // 设置滑动条移动频率，值越大，移动的越缓慢
    deceleration: PropTypes.number, // 设置弹性滑动持续时间，即滑动停止时，弹性持续的时间，值越大，持续时间越短
    scrollSpeed: PropTypes.number, // 设置滚动加速度，值越大，滚动越快
    thresholdOffset: PropTypes.number, //设置上下移动临界值，移动超过该值，则向上或向下滑动
    durationSpeed: PropTypes.number, //滑动持续时间系数，系数越大，持续的时间短
    easing: PropTypes.string, //设置加速方式，默认为匀速，详情查看 https://github.com/component/ease
    refresh: PropTypes.bool, //是否显示刷新
    loadMore: PropTypes.bool, //是否加载更多
  };

  static defaultProps = {
    className: '',
    refresh: true,
    loadMore: true
  };

  componentDidMount() {
    //初始化 Scroll 实例
    const {container, ptrEl, scrollComponent, moreEl} = this.refs;
    const {
      refreshCallback, loadMoreCallback, hasMore,
      maxAmplitude, loadMoreThrottle, refresh, loadMore
    } = this.props;
    this.pullRefresh = new PullRefresh({
      container,
      ptrEl,
      moreEl,
      hasMore,
      scrollComponent,
      refreshCallback,
      loadMoreCallback,
      maxAmplitude,
      loadMoreThrottle,
      refresh,
      loadMore
    });
  }

  componentDidUpdate() {
    const {hasMore} = this.props;
    this.pullRefresh.setMoreStatus(hasMore);
  }

  componentWillUnmount() {
    this.pullRefresh.unmount(true);
  }

  render() {
    const {
      className, children, scrollBar, maxAmplitude, debounceTime, throttleTime, deceleration,
      scrollSpeed, thresholdOffset, durationSpeed, easing, refresh, loadMore
    } = this.props;

    const scrollProp = {
      scrollBar,
      maxAmplitude,
      debounceTime,
      throttleTime,
      deceleration,
      scrollSpeed,
      thresholdOffset,
      durationSpeed,
      easing
    };
    return (
      <div className={`rc-pull-refresh ${className}`} ref="container">
        {refresh ? (<div ref="ptrEl" className="rc-ptr-box">
          <div className="rc-ptr-container">
            <div className="rc-ptr-image"></div>
          </div>
        </div>) : null}

        <Scroll ref="scrollComponent" {...scrollProp}>
          {children}
        </Scroll>
        {
          loadMore ? (
            <div className="rc-load-more" ref="moreEl"></div>
          ) : null
        }
      </div>
    );
  }
}

export default ReactPullRefresh;
