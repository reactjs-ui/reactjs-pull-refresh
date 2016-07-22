/**!
 * 向下滑动加载功能类
 * 参考
 * https://github.com/apeatling/web-pull-to-refresh
 * https://github.com/react-component/m-pull-to-refresh
 *
 */

export default function WebPullToRefresh() {
  /**
   * 默认选项
   * Hold all of the default parameters for the module
   * @type {object}
   */
  const defaults = {
    // Number of pixels of panning until refresh
    // 设置刷新所需的滑动距离，单位为像素
    gi: 40,

    // Pointer to function that does the loading and returns a promise
    // 设置重新加载回调函数，这里可以处理加载数据等
    loadingFunction: false,

    // Dragging resistance level
    resistance: 2.5,

    // 设置刷新完一次，等待的事件，默认为1秒
    lockInTime: 1000,

    //默认样式前缀
    prefixCls: 'rc-pull'
  };

  /**
   * Hold all of the merged parameter and default module options
   * 实例参数选项，包括以下参数
   * @param containerEl 渲染组件容器，可设为 document.body 等
   * @param contentEl 滑动内容容器
   * @param ptrEl 下拉显示效果区域
   * @param distanceToRefresh 设置刷新所需的滑动距离，单位为像素
   * @param loadingFunction 设置重新加载回调函数，这里可以处理加载数据等
   * @param resistance 拖拽阻力系数，设置大于1表示实际拖拽效果变得缓慢，设置小于1，则加速拖拽效果
   * @param lockInTime 设置刷新完一次，等待的事件，默认为1秒
   * @param prefixCls 默认样式前缀
   * @param onPanStart 自定义 panStart 函数，如果返回 false，则禁止滑动
   * @param onPanEnd 自定义 panEnd 函数
   * @type {object}
   */
  let options = {};

  /**
   * Pan event parameters
   * 滑动过程，pan event 对应的参数值
   * @type {object}
   */
  const pan = {
    enabled: false,
    distance: 0,
    startingPositionY: 0
  };

  /**
   * 定义全局变量，减少代码长度
   */
  let containerEl;
  let containerClass;
  let prefixCls;

  /**
   * Initialize pull to refresh, hammer, and bind pan events.
   * 初始化入口函数
   * @param {object=} params - Setup parameters for pull to refresh
   */
  const init = function (params = {}) {
    options = {
      ...params,
      distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
      loadingFunction: params.loadingFunction || defaults.loadingFunction,
      resistance: params.resistance || defaults.resistance,
      lockInTime: params.lockInTime || defaults.lockInTime,
      prefixCls: params.prefixCls || defaults.prefixCls,
    };

    if (!options.containerEl || !options.contentEl || !options.ptrEl) {
      return false;
    }

    // 初始化全局变量
    containerEl = options.containerEl;
    containerClass = containerEl.classList;
    prefixCls = options.prefixCls;

  };

  /**
   * Determine whether pan events should apply based on scroll position on panstart
   *
   * @param {object} e - Event object
   */
  function onPanStart(e) {
    //如果正在加载，则返回
    if (containerClass.contains(`${prefixCls}-loading`)) {
      pan.enabled = false;
      return;
    }
    if (options.onPanStart && typeof (options.onPanStart) === 'function') {
      if (options.onPanStart() === false) {//如果回调函数返回 false 则禁止滑动
        return;
      }
    }

    pan.startingPositionY = containerEl.scrollTop;
    if (pan.startingPositionY === 0) {
      pan.enabled = true;
    }
  }

  /**
   * Handle element on screen movement when the pandown events is firing.
   *
   * @param {object} e - Event object
   */
  function onPanDown(e) {
    if (!pan.enabled) {
      return;
    }

    e.preventDefault();
    pan.distance = e.distance / options.resistance;

    _setContentPan();
    _setBodyClass();
  }

  /**
   * Handle element on screen movement when the pandown events is firing.
   *
   * @param {object} e - Event object
   */
  function onPanUp(e) {
    if (!pan.enabled || pan.distance === 0) {
      return;
    }

    e.preventDefault();

    if (pan.distance < e.distance / options.resistance) {
      pan.distance = 0;
    } else {
      pan.distance = e.distance / options.resistance;
    }

    _setContentPan();
    _setBodyClass();
  }

  /**
   * Set the CSS transform on the content element to move it on the screen.
   * 移动时，设置其 css 样式
   */
  function _setContentPan() {
    // Use transforms to smoothly animate elements on desktop and mobile devices
    options.contentEl.style.transform = options.contentEl.style.webkitTransform = `translate3d( 0, ${pan.distance}px, 0 )`;
    options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = `translate3d( 0, ${pan.distance}px, 0 )`;
  }

  /**
   * Set/remove the loading body class to show or hide the loading indicator after pull down.
   */
  function _setBodyClass() {
    if (pan.distance > options.distanceToRefresh) {
      containerClass.add(`${prefixCls}-refresh`);
    } else {
      containerClass.remove(`${prefixCls}-refresh`);
    }
  }

  /**
   * Determine how to animate and position elements when the panend event fires.
   *
   * @param {object} e - Event object
   */
  function onPanEnd(e) {
    if (!pan.enabled || pan.distance === 0) {
      return;
    }

    e.preventDefault();

    if (options.onPanEnd && typeof (options.onPanEnd) === 'function') {
      options.onPanEnd();
    }

    options.contentEl.style.transform = options.contentEl.style.webkitTransform = '';
    options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = '';

    if (containerClass.contains(`${prefixCls}-refresh`)) {
      _doLoading();
    } else {
      _doReset();
    }

    pan.distance = 0;
    pan.enabled = false;
  }

  /**
   * Position content and refresh elements to show that loading is taking place.
   * 加载事件
   */
  function _doLoading() {
    containerClass.add(`${prefixCls}-loading`);

    // If no valid loading function exists, just reset elements
    if (!options.loadingFunction) {
      return _doReset();
    }

    // The loading function should return a promise
    const loadingPromise = options.loadingFunction();

    // For UX continuity, make sure we show loading for at least one second before resetting
    // 默认延迟 1秒恢复现场
    setTimeout(() => {
      // Once actual loading is complete, reset pull to refresh
      loadingPromise.then(_doReset, _doReset);
    }, options.lockInTime);
  }


  /**
   * Reset all elements to their starting positions before any paning took place.
   * 重置滑动容器相关事件和样式
   */
  function _doReset() {
    containerClass.remove(`${prefixCls}-loading`);
    containerClass.remove(`${prefixCls}-refresh`);
    containerClass.add(`${prefixCls}-reset`);

    //删除滑动容器样式和事件
    const bodyClassRemove = () => {
      containerClass.remove(`${prefixCls}-reset`);
      containerEl.removeEventListener('transitionend', bodyClassRemove, false);
    };
    containerEl.addEventListener('transitionend', bodyClassRemove, false);
  }

  function onPan(e) {
    if (e.additionalEvent === 'pandown') {
      onPanDown(e);
    }
    if (e.additionalEvent === 'panup') {
      onPanUp(e);
    }
  }

  return {
    init,
    events: {
      onPanStart,
      onPan,
      onPanEnd,
    },
  };
}
