(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("reactjs-scroll"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "reactjs-scroll"], factory);
	else if(typeof exports === 'object')
		exports["reactPullRefresh"] = factory(require("react"), require("reactjs-scroll"));
	else
		root["reactPullRefresh"] = factory(root["react"], root["reactjs-scroll"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactPullRefresh = __webpack_require__(2);

var _ReactPullRefresh2 = _interopRequireDefault(_ReactPullRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReactPullRefresh2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Pull Refresh 核心实现
var PullRefresh = function () {
  function PullRefresh(options) {
    _classCallCheck(this, PullRefresh);

    var _options = _extends({}, options);
    Object.keys(_options).forEach(function (item) {
      if (_options[item] === undefined) {
        delete _options[item];
      }
    });

    this.options = _extends({}, PullRefresh.defaultOptions, _options);
    var container = _options.container;
    var ptrEl = _options.ptrEl;
    var moreEl = _options.moreEl;
    var scrollComponent = _options.scrollComponent;
    var hasMore = _options.hasMore;

    this.container = container;
    this.ptrEl = ptrEl;
    this.moreEl = moreEl;
    if (ptrEl) {
      this.imgEl = ptrEl.querySelector('.rc-ptr-image');
    }
    this.scroll = scrollComponent.scroll;
    this.hasMore = hasMore;

    this.loading = false;
    this.ontouchmove = this.ontouchmove.bind(this);
    this.ontouchend = this.ontouchend.bind(this);

    this.resetPtr = this.resetPtr.bind(this);
    this.resetMore = this.resetMore.bind(this);
    this.initEvents();
  }

  //初始化事件

  //默认属性


  _createClass(PullRefresh, [{
    key: 'initEvents',
    value: function initEvents() {
      this.container.addEventListener('touchmove', this.ontouchmove, false);
      this.container.addEventListener('touchend', this.ontouchend, true);
    }
  }, {
    key: 'ontouchmove',
    value: function ontouchmove() {
      if (this.loading) {
        return;
      }
      var scroll = this.scroll;
      var top = -scroll.getScrollTop();
      var maxAmplitude = this.options.maxAmplitude;
      var refresh = this.options.refresh;
      var loadMore = this.options.loadMore;
      if (refresh) {
        var style = this.ptrEl.style;
        if (top < 0 && top >= -maxAmplitude) {
          style.webkitTransform = 'translate3d(0, ' + -top + 'px, 0)';
          style.transform = 'translate3d(0, ' + -top + 'px, 0)';
        } else {
          style.webkitTransform = 'translate3d(0, 0, 0)';
          style.transform = 'translate3d(0, 0, 0)';
        }
        if (top < -maxAmplitude / 2) {
          //开启刷新
          this.enableLoading = true;
          this.imgEl.classList.add('rc-ptr-rotate');
        } else {
          this.enableLoading = false;
          this.imgEl.classList.remove('rc-ptr-rotate');
        }
      }

      //加载更多
      if (loadMore) {
        var height = scroll.getScrollHeight();
        var veiwHeight = scroll.getScrollViewHeight();
        var loadMoreThrottle = this.options.loadMoreThrottle;
        if (veiwHeight + top - height > loadMoreThrottle) {
          this.enableMore = true;
        } else {
          this.enableMore = false;
        }
      }
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      var top = this.scroll.getScrollTop();
      var refresh = this.options.refresh;
      var loadMore = this.options.loadMore;
      if (refresh) {
        if (top > 0) {
          //向上滑动，刷新
          this.refresh(e);
        } else {
          this.resetPtr(false);
        }
      }

      //向下滑动，并且有更多数据则加载更多
      if (loadMore && top < 0 && this.hasMore) {
        this.loadMore(e);
      }
    }
  }, {
    key: 'refresh',
    value: function refresh(e) {
      var _this = this;

      if (!this.enableLoading) {
        this.resetPtr();
        return;
      }
      if (e) {
        e.stopImmediatePropagation();
      }

      if (this.loading) {
        return;
      }
      this.loading = true;

      var maxAmplitude = this.options.maxAmplitude;
      var style = this.ptrEl.style;
      style.transition = 'transform .2s linear';
      style.webkitTransition = '-webkit-transform .2s linear';
      style.webkitTransform = 'translate3d(0, ' + maxAmplitude / 2 + 'px, 0)';
      style.transform = 'translate3d(0, ' + maxAmplitude / 2 + 'px, 0)';
      this.imgEl.classList.add('rc-ptr-loading');

      var options = this.options;
      var lockInTime = options.lockInTime;
      var refreshCallback = options.refreshCallback;

      if (refreshCallback && typeof refreshCallback === 'function') {
        if (lockInTime > 0) {
          clearTimeout(this.refreshTimoutId);
          this.refreshTimoutId = setTimeout(function () {
            refreshCallback().then(_this.resetPtr, _this.resetPtr);
          }, lockInTime);
        } else {
          refreshCallback().then(this.resetPtr, this.resetPtr);
        }
      }
    }
  }, {
    key: 'resetPtr',
    value: function resetPtr() {
      var refresh = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      this.enableLoading = false;
      this.loading = false;
      this.imgEl.className = 'rc-ptr-image';
      var style = this.ptrEl.style;
      style.transition = '';
      style.webkitTransition = '';
      style.webkitTransform = 'translate3d(0, 0, 0)';
      style.transform = 'translate3d(0, 0, 0)';

      if (refresh) {
        this.scroll.refresh();
      }
    }

    // 加载更多

  }, {
    key: 'loadMore',
    value: function loadMore(e) {
      var _this2 = this;

      if (!this.enableMore) {
        return;
      }
      if (this.loading) {
        return;
      }

      if (e) {
        e.stopImmediatePropagation();
      }

      var scroll = this.scroll;
      var height = scroll.getScrollHeight();
      var top = -scroll.getScrollTop();
      var veiwHeight = scroll.getScrollViewHeight();
      var maxAmplitude = this.options.maxAmplitude;
      var maxTop = height - veiwHeight + maxAmplitude;

      if (maxTop > top) {
        scroll.scrollTo(-maxTop, 20, 'linear').then(function () {
          _this2.doLoadMore();
        });
      } else {
        this.doLoadMore();
      }
    }
  }, {
    key: 'doLoadMore',
    value: function doLoadMore() {
      var _this3 = this;

      this.moreEl.style.visibility = 'visible';
      this.loading = true;

      var options = this.options;
      var lockInTime = options.lockInTime;
      var loadMoreCallback = options.loadMoreCallback;

      if (loadMoreCallback && typeof loadMoreCallback === 'function') {
        if (lockInTime > 0) {
          setTimeout(function () {
            loadMoreCallback().then(_this3.resetMore, _this3.resetMore);
          }, lockInTime);
        } else {
          loadMoreCallback().then(this.resetMore, this.resetMore);
        }
      }
    }
  }, {
    key: 'resetMore',
    value: function resetMore() {
      this.moreEl.style.visibility = 'hidden';
      this.loading = false;
      this.scroll.refresh();

      //打印日志，测试用
      /*setTimeout(() => {
       const scroll = this.scroll;
       const height = scroll.getScrollHeight();
       const top = scroll.getScrollTop();
       const veiwHeight = scroll.getScrollViewHeight();
       console.info(height);
       console.info(top);
       console.info(veiwHeight);
       }, 200);*/
    }

    //设置是否有更多

  }, {
    key: 'setMoreStatus',
    value: function setMoreStatus(hasMore) {
      this.hasMore = hasMore;
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this.container.removeEventListener('touchmove', this.ontouchmove, false);
      this.container.removeEventListener('touchend', this.ontouchend, true);
    }
  }]);

  return PullRefresh;
}();

PullRefresh.defaultOptions = {
  lockInTime: 0, //延迟刷新或加载
  maxAmplitude: 80, //设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
  loadMoreThrottle: 5 };
exports.default = PullRefresh;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactjsScroll = __webpack_require__(8);

var _reactjsScroll2 = _interopRequireDefault(_reactjsScroll);

var _PullRefresh = __webpack_require__(1);

var _PullRefresh2 = _interopRequireDefault(_PullRefresh);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPullRefresh = function (_Component) {
  _inherits(ReactPullRefresh, _Component);

  function ReactPullRefresh() {
    _classCallCheck(this, ReactPullRefresh);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactPullRefresh).apply(this, arguments));
  }

  _createClass(ReactPullRefresh, [{
    key: 'componentDidMount',

    //可能需要传入的参数
    value: function componentDidMount() {
      //初始化 Scroll 实例
      var _refs = this.refs;
      var container = _refs.container;
      var ptrEl = _refs.ptrEl;
      var scrollComponent = _refs.scrollComponent;
      var moreEl = _refs.moreEl;
      var _props = this.props;
      var refreshCallback = _props.refreshCallback;
      var loadMoreCallback = _props.loadMoreCallback;
      var hasMore = _props.hasMore;
      var maxAmplitude = _props.maxAmplitude;
      var loadMoreThrottle = _props.loadMoreThrottle;
      var refresh = _props.refresh;
      var loadMore = _props.loadMore;

      this.pullRefresh = new _PullRefresh2.default({
        container: container,
        ptrEl: ptrEl,
        moreEl: moreEl,
        hasMore: hasMore,
        scrollComponent: scrollComponent,
        refreshCallback: refreshCallback,
        loadMoreCallback: loadMoreCallback,
        maxAmplitude: maxAmplitude,
        loadMoreThrottle: loadMoreThrottle,
        refresh: refresh,
        loadMore: loadMore
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var hasMore = this.props.hasMore;

      this.pullRefresh.setMoreStatus(hasMore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.pullRefresh.unmount(true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var className = _props2.className;
      var children = _props2.children;
      var scrollBar = _props2.scrollBar;
      var maxAmplitude = _props2.maxAmplitude;
      var debounceTime = _props2.debounceTime;
      var throttleTime = _props2.throttleTime;
      var deceleration = _props2.deceleration;
      var scrollSpeed = _props2.scrollSpeed;
      var thresholdOffset = _props2.thresholdOffset;
      var durationSpeed = _props2.durationSpeed;
      var easing = _props2.easing;
      var refresh = _props2.refresh;
      var loadMore = _props2.loadMore;


      var scrollProp = {
        scrollBar: scrollBar,
        maxAmplitude: maxAmplitude,
        debounceTime: debounceTime,
        throttleTime: throttleTime,
        deceleration: deceleration,
        scrollSpeed: scrollSpeed,
        thresholdOffset: thresholdOffset,
        durationSpeed: durationSpeed,
        easing: easing
      };
      return _react2.default.createElement(
        'div',
        { className: 'rc-pull-refresh ' + className, ref: 'container' },
        refresh ? _react2.default.createElement(
          'div',
          { ref: 'ptrEl', className: 'rc-ptr-box' },
          _react2.default.createElement(
            'div',
            { className: 'rc-ptr-container' },
            _react2.default.createElement('div', { className: 'rc-ptr-image' })
          )
        ) : null,
        _react2.default.createElement(
          _reactjsScroll2.default,
          _extends({ ref: 'scrollComponent' }, scrollProp),
          children
        ),
        loadMore ? _react2.default.createElement('div', { className: 'rc-load-more', ref: 'moreEl' }) : null
      );
    }
  }]);

  return ReactPullRefresh;
}(_react.Component);

ReactPullRefresh.propTypes = {
  className: _react.PropTypes.string, // 自定义 className
  children: _react.PropTypes.node, //待渲染的内容
  refreshCallback: _react.PropTypes.func, //上拉刷新回调函数，需要是 promise 函数
  loadMoreCallback: _react.PropTypes.func, // 下拉加载更多回调函数，需要是 promise 函数
  hasMore: _react.PropTypes.bool.isRequired, //是否有更多数据
  loadMoreThrottle: _react.PropTypes.number, //设置加载更多，距离最底部临界值，
  // Reactjs Scroll 组件属性
  scrollBar: _react.PropTypes.bool, // 是否显示滚动条
  maxAmplitude: _react.PropTypes.number, // 设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
  debounceTime: _react.PropTypes.number, // 设置防抖时间
  throttleTime: _react.PropTypes.number, // 设置滑动条移动频率，值越大，移动的越缓慢
  deceleration: _react.PropTypes.number, // 设置弹性滑动持续时间，即滑动停止时，弹性持续的时间，值越大，持续时间越短
  scrollSpeed: _react.PropTypes.number, // 设置滚动加速度，值越大，滚动越快
  thresholdOffset: _react.PropTypes.number, //设置上下移动临界值，移动超过该值，则向上或向下滑动
  durationSpeed: _react.PropTypes.number, //滑动持续时间系数，系数越大，持续的时间短
  easing: _react.PropTypes.string, //设置加速方式，默认为匀速，详情查看 https://github.com/component/ease
  refresh: _react.PropTypes.bool, //是否显示刷新
  loadMore: _react.PropTypes.bool };
ReactPullRefresh.defaultProps = {
  className: '',
  refresh: true,
  loadMore: true
};
exports.default = ReactPullRefresh;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".rc-ptr-box {\n  position: absolute;\n  top: -40px;\n  display: block;\n  height: 40px;\n  left: 0;\n  right: 0;\n  overflow: hidden;\n}\n\n.rc-ptr-box .rc-ptr-container {\n  position: relative;\n  width: 40px;\n  margin: auto;\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n\n.rc-ptr-box .rc-ptr-image {\n  position: absolute;\n  top: 0;\n  left: 12px;\n  height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  -webkit-transition: -webkit-transform .2s linear;\n  transition: -webkit-transform .2s linear;\n  transition: transform .2s linear;\n  transition: transform .2s linear, -webkit-transform .2s linear;\n  line-height: 40px;\n  width: 14px;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNOS44NTQgMTkuMzU0bDYtNmEuNS41IDAgMCAwLS43MDctLjcwN0wxMCAxNy43OTNWMS41YS41LjUgMCAwIDAtMSAwdjE2LjI5M2wtNS4xNDUtNS4xNDZhLjUuNSAwIDAgMC0uNzA3LjcwOGw2IDZhLjUuNSAwIDAgMCAuNzA3IDB6Ii8+PC9zdmc+);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-rotate {\n  -webkit-transform: translate3d(0, 0, 0) rotate(180deg);\n          transform: translate3d(0, 0, 0) rotate(180deg);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-loading {\n  -webkit-animation: ptr-spin 0.8s infinite linear;\n          animation: ptr-spin 0.8s infinite linear;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MzIiIGhlaWdodD0iOTMyIiB2aWV3Qm94PSIwIDAgOTMyIDkzMiI+PHBhdGggZD0iTTQ2NiA5MzJjLTEyNC40NzMgMC0yNDEuNDk1LTQ4LjQ3My0zMjkuNTEzLTEzNi40ODdDNDguNDczIDcwNy40OTUgMCA1OTAuNDczIDAgNDY2YzAtODguMTM4IDI0Ljc0LTE3My45NjIgNzEuNTQ0LTI0OC4xOTIgNDUuNTA4LTcyLjE3MiAxMDkuODIzLTEzMC40OSAxODUuOTk2LTE2OC42NTJsMzkuMTM3IDc4LjEyQzIzNC43NTIgMTU4LjMgMTgyLjQ2IDIwNS43MiAxNDUuNDU1IDI2NC40MSAxMDcuNDYgMzI0LjY3IDg3LjM3NSAzOTQuMzc4IDg3LjM3NSA0NjZjMCAyMDguNzc0IDE2OS44NTMgMzc4LjYyNiAzNzguNjI2IDM3OC42MjZTODQ0LjYyNyA2NzQuNzc0IDg0NC42MjcgNDY2YzAtNzEuNjItMjAuMDg0LTE0MS4zMy01OC4wNzctMjAxLjU5LTM3LjAwOC01OC42OS04OS4zLTEwNi4xMS0xNTEuMjIzLTEzNy4xMzNsMzkuMTM3LTc4LjEyYzc2LjE3MyAzOC4xNiAxNDAuNDkgOTYuNDggMTg1Ljk5NiAxNjguNjVDOTA3LjI2MiAyOTIuMDQgOTMyLjAwMiAzNzcuODY0IDkzMi4wMDIgNDY2YzAgMTI0LjQ3My00OC40NzMgMjQxLjQ5NS0xMzYuNDg3IDMyOS41MTNDNzA3LjQ5NyA4ODMuNTI3IDU5MC40NzUgOTMyIDQ2Ni4wMDIgOTMyeiIvPjwvc3ZnPg==);\n}\n\n@-webkit-keyframes ptr-spin {\n  from {\n    -webkit-transform: translate3d(0, 0, 0) rotate(0deg);\n            transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0) rotate(360deg);\n            transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n\n@keyframes ptr-spin {\n  from {\n    -webkit-transform: translate3d(0, 0, 0) rotate(0deg);\n            transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0) rotate(360deg);\n            transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n\n.rc-load-more {\n  position: absolute;\n  bottom: 20px;\n  visibility: hidden;\n  height: 20px;\n  width: 100%;\n}\n\n.rc-load-more:after {\n  position: absolute;\n  height: 2rem;\n  width: 2rem;\n  margin: 0 auto;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: transparent url(\"data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(60 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(90 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(120 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(150 60,60)'/><use xlink:href='%23l' opacity='.37' transform='rotate(180 60,60)'/><use xlink:href='%23l' opacity='.46' transform='rotate(210 60,60)'/><use xlink:href='%23l' opacity='.56' transform='rotate(240 60,60)'/><use xlink:href='%23l' opacity='.66' transform='rotate(270 60,60)'/><use xlink:href='%23l' opacity='.75' transform='rotate(300 60,60)'/><use xlink:href='%23l' opacity='.85' transform='rotate(330 60,60)'/></g></svg>\") center no-repeat;\n  background-size: 2rem 2rem;\n  content: '';\n  text-align: center;\n  text-indent: 2rem;\n  line-height: 4rem;\n  color: #999;\n  -webkit-animation: rc-load-more 1s step-end infinite;\n          animation: rc-load-more 1s step-end infinite;\n}\n\n@-webkit-keyframes rc-load-more {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  8.33333333% {\n    -webkit-transform: rotate(30deg);\n            transform: rotate(30deg);\n  }\n  16.66666667% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n  }\n  25% {\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n  33.33333333% {\n    -webkit-transform: rotate(120deg);\n            transform: rotate(120deg);\n  }\n  41.66666667% {\n    -webkit-transform: rotate(150deg);\n            transform: rotate(150deg);\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n  }\n  58.33333333% {\n    -webkit-transform: rotate(210deg);\n            transform: rotate(210deg);\n  }\n  66.66666667% {\n    -webkit-transform: rotate(240deg);\n            transform: rotate(240deg);\n  }\n  75% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  83.33333333% {\n    -webkit-transform: rotate(300deg);\n            transform: rotate(300deg);\n  }\n  91.66666667% {\n    -webkit-transform: rotate(330deg);\n            transform: rotate(330deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes rc-load-more {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  8.33333333% {\n    -webkit-transform: rotate(30deg);\n            transform: rotate(30deg);\n  }\n  16.66666667% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n  }\n  25% {\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n  33.33333333% {\n    -webkit-transform: rotate(120deg);\n            transform: rotate(120deg);\n  }\n  41.66666667% {\n    -webkit-transform: rotate(150deg);\n            transform: rotate(150deg);\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n  }\n  58.33333333% {\n    -webkit-transform: rotate(210deg);\n            transform: rotate(210deg);\n  }\n  66.66666667% {\n    -webkit-transform: rotate(240deg);\n            transform: rotate(240deg);\n  }\n  75% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  83.33333333% {\n    -webkit-transform: rotate(300deg);\n            transform: rotate(300deg);\n  }\n  91.66666667% {\n    -webkit-transform: rotate(330deg);\n            transform: rotate(330deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 5 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js?pack=cleaner!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./pull-refresh.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js?pack=cleaner!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./pull-refresh.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }
/******/ ])
});
;