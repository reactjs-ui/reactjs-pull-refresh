(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["reactPullRefresh"] = factory(require("react"));
	else
		root["reactPullRefresh"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactPullRefresh = __webpack_require__(3);

var _ReactPullRefresh2 = _interopRequireDefault(_ReactPullRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReactPullRefresh2.default;

/***/ },
/* 2 */
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
    this.imgEl = ptrEl.querySelector('.rc-ptr-image');
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
      var style = this.ptrEl.style;
      var maxAmplitude = this.options.maxAmplitude;
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

      //加载更多
      var height = scroll.getScrollHeight();
      var veiwHeight = scroll.getScrollViewHeight();
      var loadMoreThrottle = this.options.loadMoreThrottle;
      if (veiwHeight + top - height > loadMoreThrottle) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      var top = this.scroll.getScrollTop();
      if (top > 0) {
        //向上滑动，刷新
        this.refresh(e);
      } else {
        this.resetPtr(false);
      }

      //向下滑动，并且有更多数据则加载更多
      if (top < 0 && this.hasMore) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactjsScroll = __webpack_require__(6);

var _reactjsScroll2 = _interopRequireDefault(_reactjsScroll);

var _PullRefresh = __webpack_require__(2);

var _PullRefresh2 = _interopRequireDefault(_PullRefresh);

__webpack_require__(8);

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

      this.pullRefresh = new _PullRefresh2.default({
        container: container,
        ptrEl: ptrEl,
        moreEl: moreEl,
        hasMore: hasMore,
        scrollComponent: scrollComponent,
        refreshCallback: refreshCallback,
        loadMoreCallback: loadMoreCallback,
        maxAmplitude: maxAmplitude,
        loadMoreThrottle: loadMoreThrottle
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


      var scrollProp = { scrollBar: scrollBar, maxAmplitude: maxAmplitude, debounceTime: debounceTime, throttleTime: throttleTime, deceleration: deceleration };
      return _react2.default.createElement(
        'div',
        { className: 'rc-pull-refresh ' + className, ref: 'container' },
        _react2.default.createElement(
          'div',
          { ref: 'ptrEl', className: 'rc-ptr-box' },
          _react2.default.createElement(
            'div',
            { className: 'rc-ptr-container' },
            _react2.default.createElement('div', { className: 'rc-ptr-image' })
          )
        ),
        _react2.default.createElement(
          _reactjsScroll2.default,
          _extends({ ref: 'scrollComponent' }, scrollProp),
          children
        ),
        _react2.default.createElement('div', { className: 'rc-load-more', ref: 'moreEl' })
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
  deceleration: _react.PropTypes.number };
ReactPullRefresh.defaultProps = {
  className: ''
};
exports.default = ReactPullRefresh;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".rc-ptr-box {\n  position: absolute;\n  top: -40px;\n  display: block;\n  height: 40px;\n  left: 0;\n  right: 0;\n  overflow: hidden;\n}\n\n.rc-ptr-box .rc-ptr-container {\n  position: relative;\n  width: 40px;\n  margin: auto;\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n\n.rc-ptr-box .rc-ptr-image {\n  position: absolute;\n  top: 0;\n  left: 12px;\n  height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  -webkit-transition: -webkit-transform .2s linear;\n  transition: -webkit-transform .2s linear;\n  transition: transform .2s linear;\n  transition: transform .2s linear, -webkit-transform .2s linear;\n  line-height: 40px;\n  width: 14px;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNOS44NTQgMTkuMzU0bDYtNmEuNS41IDAgMCAwLS43MDctLjcwN0wxMCAxNy43OTNWMS41YS41LjUgMCAwIDAtMSAwdjE2LjI5M2wtNS4xNDUtNS4xNDZhLjUuNSAwIDAgMC0uNzA3LjcwOGw2IDZhLjUuNSAwIDAgMCAuNzA3IDB6Ii8+PC9zdmc+);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-rotate {\n  -webkit-transform: translate3d(0, 0, 0) rotate(180deg);\n          transform: translate3d(0, 0, 0) rotate(180deg);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-loading {\n  -webkit-animation: ptr-spin 0.8s infinite linear;\n          animation: ptr-spin 0.8s infinite linear;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MzIiIGhlaWdodD0iOTMyIiB2aWV3Qm94PSIwIDAgOTMyIDkzMiI+PHBhdGggZD0iTTQ2NiA5MzJjLTEyNC40NzMgMC0yNDEuNDk1LTQ4LjQ3My0zMjkuNTEzLTEzNi40ODdDNDguNDczIDcwNy40OTUgMCA1OTAuNDczIDAgNDY2YzAtODguMTM4IDI0Ljc0LTE3My45NjIgNzEuNTQ0LTI0OC4xOTIgNDUuNTA4LTcyLjE3MiAxMDkuODIzLTEzMC40OSAxODUuOTk2LTE2OC42NTJsMzkuMTM3IDc4LjEyQzIzNC43NTIgMTU4LjMgMTgyLjQ2IDIwNS43MiAxNDUuNDU1IDI2NC40MSAxMDcuNDYgMzI0LjY3IDg3LjM3NSAzOTQuMzc4IDg3LjM3NSA0NjZjMCAyMDguNzc0IDE2OS44NTMgMzc4LjYyNiAzNzguNjI2IDM3OC42MjZTODQ0LjYyNyA2NzQuNzc0IDg0NC42MjcgNDY2YzAtNzEuNjItMjAuMDg0LTE0MS4zMy01OC4wNzctMjAxLjU5LTM3LjAwOC01OC42OS04OS4zLTEwNi4xMS0xNTEuMjIzLTEzNy4xMzNsMzkuMTM3LTc4LjEyYzc2LjE3MyAzOC4xNiAxNDAuNDkgOTYuNDggMTg1Ljk5NiAxNjguNjVDOTA3LjI2MiAyOTIuMDQgOTMyLjAwMiAzNzcuODY0IDkzMi4wMDIgNDY2YzAgMTI0LjQ3My00OC40NzMgMjQxLjQ5NS0xMzYuNDg3IDMyOS41MTNDNzA3LjQ5NyA4ODMuNTI3IDU5MC40NzUgOTMyIDQ2Ni4wMDIgOTMyeiIvPjwvc3ZnPg==);\n}\n\n@-webkit-keyframes ptr-spin {\n  from {\n    -webkit-transform: translate3d(0, 0, 0) rotate(0deg);\n            transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0) rotate(360deg);\n            transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n\n@keyframes ptr-spin {\n  from {\n    -webkit-transform: translate3d(0, 0, 0) rotate(0deg);\n            transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0) rotate(360deg);\n            transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n\n.rc-load-more {\n  position: absolute;\n  bottom: 20px;\n  visibility: hidden;\n  height: 20px;\n  width: 100%;\n}\n\n.rc-load-more:after {\n  position: absolute;\n  height: 2rem;\n  width: 2rem;\n  margin: 0 auto;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: transparent url(\"data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(60 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(90 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(120 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(150 60,60)'/><use xlink:href='%23l' opacity='.37' transform='rotate(180 60,60)'/><use xlink:href='%23l' opacity='.46' transform='rotate(210 60,60)'/><use xlink:href='%23l' opacity='.56' transform='rotate(240 60,60)'/><use xlink:href='%23l' opacity='.66' transform='rotate(270 60,60)'/><use xlink:href='%23l' opacity='.75' transform='rotate(300 60,60)'/><use xlink:href='%23l' opacity='.85' transform='rotate(330 60,60)'/></g></svg>\") center no-repeat;\n  background-size: 2rem 2rem;\n  content: '';\n  text-align: center;\n  text-indent: 2rem;\n  line-height: 4rem;\n  color: #999;\n  -webkit-animation: rc-load-more 1s step-end infinite;\n          animation: rc-load-more 1s step-end infinite;\n}\n\n@-webkit-keyframes rc-load-more {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  8.33333333% {\n    -webkit-transform: rotate(30deg);\n            transform: rotate(30deg);\n  }\n  16.66666667% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n  }\n  25% {\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n  33.33333333% {\n    -webkit-transform: rotate(120deg);\n            transform: rotate(120deg);\n  }\n  41.66666667% {\n    -webkit-transform: rotate(150deg);\n            transform: rotate(150deg);\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n  }\n  58.33333333% {\n    -webkit-transform: rotate(210deg);\n            transform: rotate(210deg);\n  }\n  66.66666667% {\n    -webkit-transform: rotate(240deg);\n            transform: rotate(240deg);\n  }\n  75% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  83.33333333% {\n    -webkit-transform: rotate(300deg);\n            transform: rotate(300deg);\n  }\n  91.66666667% {\n    -webkit-transform: rotate(330deg);\n            transform: rotate(330deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes rc-load-more {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  8.33333333% {\n    -webkit-transform: rotate(30deg);\n            transform: rotate(30deg);\n  }\n  16.66666667% {\n    -webkit-transform: rotate(60deg);\n            transform: rotate(60deg);\n  }\n  25% {\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n  33.33333333% {\n    -webkit-transform: rotate(120deg);\n            transform: rotate(120deg);\n  }\n  41.66666667% {\n    -webkit-transform: rotate(150deg);\n            transform: rotate(150deg);\n  }\n  50% {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n  }\n  58.33333333% {\n    -webkit-transform: rotate(210deg);\n            transform: rotate(210deg);\n  }\n  66.66666667% {\n    -webkit-transform: rotate(240deg);\n            transform: rotate(240deg);\n  }\n  75% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  83.33333333% {\n    -webkit-transform: rotate(300deg);\n            transform: rotate(300deg);\n  }\n  91.66666667% {\n    -webkit-transform: rotate(330deg);\n            transform: rotate(330deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(0));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["reactScroll"] = factory(require("react"));
	else
		root["reactScroll"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_48__) {
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

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var getLength = __webpack_require__(33),
    isFunction = __webpack_require__(40),
    isLength = __webpack_require__(8);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ },
/* 1 */
/***/ function(module, exports) {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var eq = __webpack_require__(6);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;


/***/ },
/* 3 */
/***/ function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ },
/* 4 */
/***/ function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ },
/* 5 */
/***/ function(module, exports) {

/**
 * Creates a function that invokes `func` with its first argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ },
/* 6 */
/***/ function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },
/* 7 */
/***/ function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },
/* 8 */
/***/ function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ },
/* 9 */
/***/ function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },
/* 10 */
/***/ function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactScroll = __webpack_require__(12);

var _ReactScroll2 = _interopRequireDefault(_ReactScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReactScroll2.default;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(48);

var _react2 = _interopRequireDefault(_react);

var _Scroll = __webpack_require__(13);

var _Scroll2 = _interopRequireDefault(_Scroll);

__webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Scroll 组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 参考
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/chemzqm/iscroll
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactScroll = function (_Component) {
  _inherits(ReactScroll, _Component);

  function ReactScroll() {
    _classCallCheck(this, ReactScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactScroll).apply(this, arguments));
  }

  _createClass(ReactScroll, [{
    key: 'componentDidMount',

    //可能需要传入的参数
    value: function componentDidMount() {
      //初始化 Scroll 实例
      var _props = this.props;
      var scrollBar = _props.scrollBar;
      var maxAmplitude = _props.maxAmplitude;
      var debounceTime = _props.debounceTime;
      var throttleTime = _props.throttleTime;
      var deceleration = _props.deceleration;
      var wrapper = this.refs.wrapper;

      this.scroll = new _Scroll2.default({
        wrapper: wrapper,
        scrollBar: scrollBar,
        maxAmplitude: maxAmplitude,
        debounceTime: debounceTime,
        throttleTime: throttleTime,
        deceleration: deceleration
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.scroll.unmount(true);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'div',
        { className: 'rc-scroll-wrapper', ref: 'wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'rc-scroll' },
          children
        )
      );
    }
  }]);

  return ReactScroll;
}(_react.Component);

ReactScroll.propTypes = {
  children: _react.PropTypes.node, //待渲染的内容
  scrollBar: _react.PropTypes.bool, // 是否显示滚动条
  maxAmplitude: _react.PropTypes.number, // 设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
  debounceTime: _react.PropTypes.number, // 设置防抖时间
  throttleTime: _react.PropTypes.number, // 设置滑动条移动频率，值越大，移动的越缓慢
  deceleration: _react.PropTypes.number };
ReactScroll.defaultProps = {};
exports.default = ReactScroll;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _componentTween = __webpack_require__(18);

var _componentTween2 = _interopRequireDefault(_componentTween);

var _componentRaf = __webpack_require__(17);

var _componentRaf2 = _interopRequireDefault(_componentRaf);

var _throttleit = __webpack_require__(47);

var _throttleit2 = _interopRequireDefault(_throttleit);

var _debounce = __webpack_require__(23);

var _debounce2 = _interopRequireDefault(_debounce);

var _assign = __webpack_require__(37);

var _assign2 = _interopRequireDefault(_assign);

var _mouseWheelEvent = __webpack_require__(43);

var _mouseWheelEvent2 = _interopRequireDefault(_mouseWheelEvent);

var _style = __webpack_require__(44);

var _ScrollBar = __webpack_require__(14);

var _ScrollBar2 = _interopRequireDefault(_ScrollBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 函数
var max = Math.max;
var min = Math.min;
var now = Date.now || function () {
  return new Date().getTime();
};

/**
 * Init Scroll with el and optional options
 * options.scrollBar show scrollBar if is true
 *
 * @param {Object} options
 */

var Scroll = function () {
  function Scroll(options) {
    _classCallCheck(this, Scroll);

    var _options = (0, _assign2.default)(options);
    Object.keys(_options).forEach(function (item) {
      if (_options[item] === undefined) {
        delete _options[item];
      }
    });

    _options = (0, _assign2.default)({}, Scroll.defaultOptions, _options);
    this.options = _options;

    // 初始化y 坐标
    this.y = 0;
    this.maxAmplitude = _options.maxAmplitude;
    var wrapper = _options.wrapper;
    var scroller = wrapper.children[0];
    // 包裹区域元素
    this.wrapper = wrapper;
    // 内层元素
    this.scroller = scroller;
    this.scrollerMargin = parseInt((0, _style.getStyles)(this.scroller, 'marginBottom'), 10) + parseInt((0, _style.getStyles)(this.scroller, 'marginTop'), 10);

    this.handleEvent = this.handleEvent.bind(this);
    this._initEvent();

    this.refresh(true);

    if (options.scrollBar !== false) {
      this.scrollBar = new _ScrollBar2.default(wrapper, options.barClass);
    }
    this.onScrollEnd = (0, _debounce2.default)(this.onScrollEnd, _options.debounceTime);
    this.transformScrollBar = (0, _throttleit2.default)(this.transformScrollBar, _options.throttleTime);
  }

  // 事件句柄

  //默认属性


  _createClass(Scroll, [{
    key: 'handleEvent',
    value: function handleEvent(e) {
      /*eslint-disable indent*/
      switch (e.type) {
        case 'touchstart':
          this.ontouchstart(e);
          break;
        case 'touchmove':
          this.ontouchmove(e);
          break;
        case 'touchcancel':
        case 'touchend':
        case 'touchleave':
          this.ontouchend(e);
          break;
        default:
          break;
      }
    }

    /**
     * Unbind all event listeners, and remove scrollBar if necessary
     */

  }, {
    key: 'unmount',
    value: function unmount() {
      this._initEvent(true);
      if (this.scrollBar) {
        this.scrollBar.unmount();
      }
      this._wheelUnbind();
    }

    /**
     * 初始化或卸载事件
     * @param detach 设为 true 表示卸载
     */

  }, {
    key: '_initEvent',
    value: function _initEvent(detach) {
      var action = detach ? 'removeEventListener' : 'addEventListener';

      this.wrapper[action]('touchstart', this.handleEvent);
      this.wrapper[action]('touchmove', this.handleEvent);
      this.wrapper[action]('touchleave', this.handleEvent, true);
      this.wrapper[action]('touchend', this.handleEvent, true);
      this.wrapper[action]('touchcancel', this.handleEvent, true);

      //添加鼠标滚动事件，在pc 端也可以操作
      this._wheelUnbind = (0, _mouseWheelEvent2.default)(this.wrapper, this.onwheel.bind(this), true);
    }

    /**
     * Recalculate the height
     * @param noScroll 如果还没有滚动时，直接返回，即初始化的时候
     */

  }, {
    key: 'refresh',
    value: function refresh(noScroll) {
      var sh = this.viewHeight = this.wrapper.getBoundingClientRect().height;
      var ch = this.height = this.scroller.getBoundingClientRect().height + this.scrollerMargin;
      //计算最小高度
      this.minY = min(0, sh - ch);
      if (noScroll === true) {
        return;
      }
      if (this.y < this.minY) {
        this.scrollTo(this.minY, 300);
      } else if (this.y > 0) {
        this.scrollTo(0, 300);
      }
    }

    /**
     * touchstart event handler
     *
     * @param  {Event}  e
     */

  }, {
    key: 'ontouchstart',
    value: function ontouchstart(e) {
      this.speed = null;
      if (this.tween) {
        this.tween.stop();
      }
      this.refresh(true);
      var start = this.y;
      if (e.target === this.wrapper) {
        start = min(start, 0);
        start = max(start, this.minY);
        // fix the invalid start position
        if (start !== this.y) {
          return this.scrollTo(start, 200);
        }
        return;
      }

      var touch = this.getTouch(e);
      var sx = touch.clientX;
      var sy = touch.clientY;
      var at = now();

      this.onstart = function (x, y) {
        // no moved up and down, so don't know
        if (sy === y) {
          return;
        }
        //更新完重置为 null
        this.onstart = null;
        var dx = Math.abs(x - sx);
        var dy = Math.abs(y - sy);
        // move left and right
        if (dx > dy) return;
        this.clientY = touch.clientY;
        this.dy = 0;
        this.ts = now();
        this.down = {
          x: sx,
          y: sy,
          start: start,
          at: at
        };
        if (this.scrollBar) {
          this.resizeScrollBar();
        }
        return true;
      };
    }

    /**
     * touchmove event handler
     *
     * @param  {Event}  e
     */

  }, {
    key: 'ontouchmove',
    value: function ontouchmove(e) {
      e.preventDefault();
      if (!this.down && !this.onstart) {
        return;
      }
      var touch = this.getTouch(e);
      var x = touch.clientX;
      var y = touch.clientY;
      if (this.onstart) {
        var started = this.onstart(x, y);
        if (started !== true) {
          return;
        }
      }
      var down = this.down;
      var dy = this.dy = y - down.y;

      //calculate speed every 100 milisecond
      this.calcuteSpeed(touch.clientY, down.at);
      var start = this.down.start;
      var dest = start + dy;
      dest = min(dest, this.maxAmplitude);
      dest = max(dest, this.minY - this.maxAmplitude);
      this.translate(dest);
    }

    /**
     * Calcute speed by clientY
     *
     * @param {Number} y
     */

  }, {
    key: 'calcuteSpeed',
    value: function calcuteSpeed(y, start) {
      var ts = now();
      var dt = ts - this.ts;
      if (ts - start < 100) {
        this.distance = y - this.clientY;
        this.speed = Math.abs(this.distance / dt);
      } else if (dt > 100) {
        this.distance = y - this.clientY;
        this.speed = Math.abs(this.distance / dt);
        this.ts = ts;
        this.clientY = y;
      }
    }

    /**
     * Event handler for touchend
     *
     * @param  {Event}  e
     */

  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      if (!this.down) return;
      var at = this.down.at;
      this.down = null;
      var touch = this.getTouch(e);
      this.calcuteSpeed(touch.clientY, at);
      var m = this.momentum();
      this.scrollTo(m.dest, m.duration, m.ease);
    }
  }, {
    key: 'onwheel',
    value: function onwheel(dx, dy) {
      if (Math.abs(dx) > Math.abs(dy)) {
        return;
      }
      if (this.scrollBar) {
        this.resizeScrollBar();
      }
      var y = this.y - dy;
      if (y > 0) y = 0;
      if (y < this.minY) y = this.minY;
      if (y === this.y) {
        return;
      }
      this.scrollTo(y, 20, 'linear');
    }

    /**
     * Calculate the animate props for moveon
     *
     * @return {Object}
     */

  }, {
    key: 'momentum',
    value: function momentum() {
      var deceleration = this.options.deceleration;
      var speed = this.speed;
      speed = min(speed, 2);
      var y = this.y;
      var rate = (4 - Math.PI) / 2;
      var destination = y + rate * (speed * speed) / (2 * deceleration) * (this.distance < 0 ? -1 : 1);
      var duration = speed / deceleration;
      var ease = void 0;
      var minY = this.minY;
      if (y > 0 || y < minY) {
        duration = 500;
        ease = 'out-circ';
        destination = y > 0 ? 0 : minY;
      } else if (destination > 0) {
        destination = 0;
        ease = 'out-back';
      } else if (destination < minY) {
        destination = minY;
        ease = 'out-back';
      }
      return {
        dest: destination,
        duration: duration,
        ease: ease
      };
    }

    /**
     * Scroll to potions y with optional duration and ease function
     *
     * @param {Number} y
     * @param {Number} duration
     * @param {String} easing
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo(y, duration, easing) {
      var _this = this;

      if (this.tween) this.tween.stop();
      var transition = duration > 0 && y !== this.y;
      if (!transition) {
        this.direction = 0;
        this.translate(y);
        return this.onScrollEnd();
      }

      this.direction = y > this.y ? -1 : 1;

      easing = easing || 'out-circ';
      var tween = this.tween = (0, _componentTween2.default)({
        y: this.y
      }).ease(easing).to({
        y: y
      }).duration(duration);

      tween.update(function (o) {
        _this.translate(o.y);
      });

      var _animate = function animate() {
        (0, _componentRaf2.default)(_animate);
        tween.update();
      };

      var promise = new Promise(function (resolve) {
        tween.on('end', function () {
          resolve();
          _this.animating = false;
          _animate = function _animate() {};
          if (!tween.stopped) {
            // no emit scrollend if tween stopped
            _this.onScrollEnd();
          }
        });
      });

      _animate();
      this.animating = true;
      return promise;
    }

    /**
     * Gets the appropriate "touch" object for the `e` event. The event may be from
     * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
     *
     */

  }, {
    key: 'getTouch',
    value: function getTouch(e) {
      var touch = e;
      if (e.changedTouches && e.changedTouches.length > 0) {
        touch = e.changedTouches[0];
      }
      return touch;
    }

    /**
     * Translate to `x`.
     *
     */

  }, {
    key: 'translate',
    value: function translate(y) {
      var style = this.scroller.style;
      if (isNaN(y)) return;
      y = Math.floor(y);
      //reach the end
      if (this.y !== y) {
        this.y = y;
        if (this.scrollBar) {
          this.transformScrollBar();
        }
      }
      style.webkitTransform = 'translate3d(0, ' + y + 'px, 0)';
      style.transform = 'translate3d(0, ' + y + 'px, 0)';
    }

    /**
     * show the scrollBar and size it
     */

  }, {
    key: 'resizeScrollBar',
    value: function resizeScrollBar() {
      var vh = this.viewHeight;
      var h = vh * vh / this.height;
      this.scrollBar.resize(h);
    }

    /**
     * Hide scrollBar
     */

  }, {
    key: 'hideScrollBar',
    value: function hideScrollBar() {
      if (this.scrollBar) {
        this.scrollBar.hide();
      }
    }

    /**
     * Scrollend
     *
     */

  }, {
    key: 'onScrollEnd',
    value: function onScrollEnd() {
      if (this.animating) return;
      this.hideScrollBar();
      var y = this.y;
    }

    /**
     * Transform scrollBar
     */

  }, {
    key: 'transformScrollBar',
    value: function transformScrollBar() {
      var vh = this.viewHeight;
      var h = this.height;
      var y = Math.round(-(vh - vh * vh / h) * this.y / (h - vh));
      this.scrollBar.translateY(y);
    }

    /**
     *
     * @returns {number|*}
     */

  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.y;
    }
  }, {
    key: 'getScrollHeight',
    value: function getScrollHeight() {
      return this.height;
    }
  }, {
    key: 'getScrollViewHeight',
    value: function getScrollViewHeight() {
      return this.viewHeight;
    }
  }]);

  return Scroll;
}();

Scroll.defaultOptions = {
  scrollBar: true,
  maxAmplitude: 80, //设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
  debounceTime: 30, //防抖时间
  throttleTime: 100, //滑动条移动频率，值越大，移动的越缓慢
  deceleration: 0.001 //设置弹性滑动持续时间，即滑动停止时，弹性持续的时间
};
exports.default = Scroll;

/***/ },
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ScrollBar contructor
 *
 * @param {Element} scrollPanel
 * @contructor
 */
var ScrollBar = function () {
  function ScrollBar(scrollPanel, className) {
    _classCallCheck(this, ScrollBar);

    var scrollBar = document.createElement('div');
    scrollBar.className = className || 'rc-scrollbar';
    scrollPanel.appendChild(scrollBar);
    this.scrollPanel = scrollPanel;
    this.scrollBar = scrollBar;
  }

  /**
   * Show the scrollBar and resize it
   *
   * @param {Number} height
   */


  _createClass(ScrollBar, [{
    key: 'resize',
    value: function resize(height) {
      var style = this.scrollBar.style;
      style.height = height + 'px';
      style.backgroundColor = 'rgba(0,0,0,0.4)';
    }

    /**
     * Hide this scrollBar
     */

  }, {
    key: 'hide',
    value: function hide() {
      this.scrollBar.style.backgroundColor = 'transparent';
    }

    /**
     * Move scrollBar by translateY
     * @param {Number} y
     */

  }, {
    key: 'translateY',
    value: function translateY(y) {
      var style = this.scrollBar.style;
      style.webkitTransform = 'translate3d(0, ' + y + 'px, 0)';
      style.transform = 'translate3d(0, ' + y + 'px, 0)';
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this.scrollPanel.removeChild(this.scrollBar);
    }
  }]);

  return ScrollBar;
}();

exports.default = ScrollBar;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var type;
try {
  type = __webpack_require__(1);
} catch (_) {
  type = __webpack_require__(1);
}

/**
 * Module exports.
 */

module.exports = clone;

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key]);
        }
      }
      return copy;

    case 'array':
      var copy = new Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}


/***/ },
/* 16 */
/***/ function(module, exports) {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ },
/* 17 */
/***/ function(module, exports) {

/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(19);
var clone = __webpack_require__(15);
var type = __webpack_require__(1);
var ease = __webpack_require__(24);

/**
 * Expose `Tween`.
 */

module.exports = Tween;

/**
 * Initialize a new `Tween` with `obj`.
 *
 * @param {Object|Array} obj
 * @api public
 */

function Tween(obj) {
  if (!(this instanceof Tween)) return new Tween(obj);
  this._from = obj;
  this.ease('linear');
  this.duration(500);
}

/**
 * Mixin emitter.
 */

Emitter(Tween.prototype);

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this.isArray = 'array' === type(this._from);
  this._curr = clone(this._from);
  this._done = false;
  this._start = Date.now();
  return this;
};

/**
 * Tween to `obj` and reset internal state.
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {Tween} self
 * @api public
 */

Tween.prototype.to = function(obj){
  this.reset();
  this._to = obj;
  return this;
};

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {Tween} self
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms;
  return this;
};

/**
 * Set easing function to `fn`.
 *
 *    tween.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {Tween}
 * @api public
 */

Tween.prototype.ease = function(fn){
  fn = 'function' == typeof fn ? fn : ease[fn];
  if (!fn) throw new TypeError('invalid easing function');
  this._ease = fn;
  return this;
};

/**
 * Stop the tween and immediately emit "stop" and "end".
 *
 * @return {Tween}
 * @api public
 */

Tween.prototype.stop = function(){
  this.stopped = true;
  this._done = true;
  this.emit('stop');
  this.emit('end');
  return this;
};

/**
 * Perform a step.
 *
 * @return {Tween} self
 * @api private
 */

Tween.prototype.step = function(){
  if (this._done) return;

  // duration
  var duration = this._duration;
  var now = Date.now();
  var delta = now - this._start;
  var done = delta >= duration;

  // complete
  if (done) {
    this._from = this._to;
    this._update(this._to);
    this._done = true;
    this.emit('end');
    return this;
  }

  // tween
  var from = this._from;
  var to = this._to;
  var curr = this._curr;
  var fn = this._ease;
  var p = (now - this._start) / duration;
  var n = fn(p);

  // array
  if (this.isArray) {
    for (var i = 0; i < from.length; ++i) {
      curr[i] = from[i] + (to[i] - from[i]) * n;
    }

    this._update(curr);
    return this;
  }

  // objech
  for (var k in from) {
    curr[k] = from[k] + (to[k] - from[k]) * n;
  }

  this._update(curr);
  return this;
};

/**
 * Set update function to `fn` or
 * when no argument is given this performs
 * a "step".
 *
 * @param {Function} fn
 * @return {Tween} self
 * @api public
 */

Tween.prototype.update = function(fn){
  if (0 == arguments.length) return this.step();
  this._update = fn;
  return this;
};

/***/ },
/* 19 */
/***/ function(module, exports) {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, ".rc-scroll-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.rc-scroll {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  -ms-touch-action: none;\n      touch-action: none;\n}\n\n.rc-scrollbar {\n  position: absolute;\n  right: 1px;\n  top: 0;\n  -webkit-transition: background-color 0.2s ease-out, width 0.1s ease-out, height 0.1s ease-out, -webkit-transform 0.1s ease-out;\n  transition: background-color 0.2s ease-out, width 0.1s ease-out, height 0.1s ease-out, -webkit-transform 0.1s ease-out;\n  transition: background-color 0.2s ease-out, transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out;\n  transition: background-color 0.2s ease-out, transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out, -webkit-transform 0.1s ease-out;\n  width: 2px;\n  border-radius: 1px;\n  background-color: transparent;\n  z-index: 9999;\n  height: 0;\n}\n", ""]);

// exports


/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports) {

module.exports = Date.now || now

function now() {
    return new Date().getTime()
}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var now = __webpack_require__(22);

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};


/***/ },
/* 24 */
/***/ function(module, exports) {


// easing functions from "Tween.js"

exports.linear = function(n){
  return n;
};

exports.inQuad = function(n){
  return n * n;
};

exports.outQuad = function(n){
  return n * (2 - n);
};

exports.inOutQuad = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) - 1);
};

exports.inCube = function(n){
  return n * n * n;
};

exports.outCube = function(n){
  return --n * n * n + 1;
};

exports.inOutCube = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n;
  return 0.5 * ((n -= 2 ) * n * n + 2);
};

exports.inQuart = function(n){
  return n * n * n * n;
};

exports.outQuart = function(n){
  return 1 - (--n * n * n * n);
};

exports.inOutQuart = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};

exports.inQuint = function(n){
  return n * n * n * n * n;
}

exports.outQuint = function(n){
  return --n * n * n * n * n + 1;
}

exports.inOutQuint = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

exports.inSine = function(n){
  return 1 - Math.cos(n * Math.PI / 2 );
};

exports.outSine = function(n){
  return Math.sin(n * Math.PI / 2);
};

exports.inOutSine = function(n){
  return .5 * (1 - Math.cos(Math.PI * n));
};

exports.inExpo = function(n){
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};

exports.outExpo = function(n){
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};

exports.inOutExpo = function(n){
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

exports.inCirc = function(n){
  return 1 - Math.sqrt(1 - n * n);
};

exports.outCirc = function(n){
  return Math.sqrt(1 - (--n * n));
};

exports.inOutCirc = function(n){
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};

exports.inBack = function(n){
  var s = 1.70158;
  return n * n * (( s + 1 ) * n - s);
};

exports.outBack = function(n){
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};

exports.inOutBack = function(n){
  var s = 1.70158 * 1.525;
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
};

exports.inBounce = function(n){
  return 1 - exports.outBounce(1 - n);
};

exports.outBounce = function(n){
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n;
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
  }
};

exports.inOutBounce = function(n){
  if (n < .5) return exports.inBounce(n * 2) * .5;
  return exports.outBounce(n * 2 - 1) * .5 + .5;
};

// aliases

exports['in-quad'] = exports.inQuad;
exports['out-quad'] = exports.outQuad;
exports['in-out-quad'] = exports.inOutQuad;
exports['in-cube'] = exports.inCube;
exports['out-cube'] = exports.outCube;
exports['in-out-cube'] = exports.inOutCube;
exports['in-quart'] = exports.inQuart;
exports['out-quart'] = exports.outQuart;
exports['in-out-quart'] = exports.inOutQuart;
exports['in-quint'] = exports.inQuint;
exports['out-quint'] = exports.outQuint;
exports['in-out-quint'] = exports.inOutQuint;
exports['in-sine'] = exports.inSine;
exports['out-sine'] = exports.outSine;
exports['in-out-sine'] = exports.inOutSine;
exports['in-expo'] = exports.inExpo;
exports['out-expo'] = exports.outExpo;
exports['in-out-expo'] = exports.inOutExpo;
exports['in-circ'] = exports.inCirc;
exports['out-circ'] = exports.outCirc;
exports['in-out-circ'] = exports.inOutCirc;
exports['in-back'] = exports.inBack;
exports['out-back'] = exports.outBack;
exports['in-out-back'] = exports.inOutBack;
exports['in-bounce'] = exports.inBounce;
exports['out-bounce'] = exports.outBounce;
exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 25 */
/***/ function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var getPrototype = __webpack_require__(34);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return object != null &&
    (hasOwnProperty.call(object, key) ||
      (typeof object == 'object' && key in object && getPrototype(object) === null));
}

module.exports = baseHas;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(5);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
var baseKeys = overArg(nativeKeys, Object);

module.exports = baseKeys;


/***/ },
/* 28 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var apply = __webpack_require__(25);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = baseRest;


/***/ },
/* 30 */
/***/ function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(2);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

module.exports = copyObject;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(29),
    isIterateeCall = __webpack_require__(36);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(28);

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(5);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
var getPrototype = overArg(nativeGetPrototype, Object);

module.exports = getPrototype;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(30),
    isArguments = __webpack_require__(38),
    isArray = __webpack_require__(7),
    isLength = __webpack_require__(8),
    isString = __webpack_require__(41);

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

var eq = __webpack_require__(6),
    isArrayLike = __webpack_require__(0),
    isIndex = __webpack_require__(3),
    isObject = __webpack_require__(9);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(2),
    copyObject = __webpack_require__(31),
    createAssigner = __webpack_require__(32),
    isArrayLike = __webpack_require__(0),
    isPrototype = __webpack_require__(4),
    keys = __webpack_require__(42);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(39);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(0),
    isObjectLike = __webpack_require__(10);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(7),
    isObjectLike = __webpack_require__(10);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(26),
    baseKeys = __webpack_require__(27),
    indexKeys = __webpack_require__(35),
    isArrayLike = __webpack_require__(0),
    isIndex = __webpack_require__(3),
    isPrototype = __webpack_require__(4);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict'
var event = __webpack_require__(16)

// detect available wheel event
var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll'

module.exports = function( elem, callback, useCapture ) {
  // handle MozMousePixelScroll in older Firefox
  if( support == 'DOMMouseScroll' ) {
    return _addWheelListener( elem, 'MozMousePixelScroll', callback, useCapture )
  } else {
    return _addWheelListener( elem, support, callback, useCapture )
  }
}

function _addWheelListener( elem, eventName, callback, noscroll ) {
  var lineHeight = getLineHeight(elem)
  function cb(e) {
    if (noscroll) e.preventDefault ?  e.preventDefault() : e.returnValue = false
    if (support == 'wheel') return callback(e.deltaX, e.deltaY, e.deltaZ, e)
    !e && ( e = window.event )
    var dx = e.deltaX || 0
    var dy = e.deltaY || 0
    var dz = e.deltaZ || 0

    var mode = e.deltaMode
    var scale = 1
    switch(mode) {
      case 1:
        scale = lineHeight
      break
      case 2:
        scale = window.innerHeight
      break
    }
    dx *= scale
    dy *= scale
    dz *= scale

    // calculate deltaY (and deltaX) according to the event
    if ( support == 'mousewheel' ) {
        dy = - 1/40 * e.wheelDelta
        // Webkit also support wheelDeltaX
        dx && ( e.deltaX = - 1/40 * e.wheelDeltaX )
    } else if (dy === 0) {
        dy = e.detail
    }

    // it's time to fire the callback
    return callback(dx, dy, dz, e)
  }
  event.bind(elem, eventName, cb, false)
  return function () {
    event.unbind(elem, eventName, cb, false)
  }
}

function getLineHeight(element){
  if (element.parentNode == null) return 18
  var temp = document.createElement(element.nodeName)
  temp.setAttribute('style', 'margin:0px;padding:0px;font-size:' + element.style.fontSize)
  temp.innerHTML = 't'
  temp = element.parentNode.appendChild(temp)
  var h = temp.clientHeight
  temp.parentNode.removeChild(temp)
  return h
}


/***/ },
/* 44 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = getStyles;
/**
 * getStyles
 * @param {type} element
 * @param {type} property
 * @returns {styles}
 */
function getStyles(element, property) {
  var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
  if (property) {
    return styles.getPropertyValue(property) || styles[property];
  }
  return styles;
}

/***/ },
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(45)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js?pack=cleaner!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./scroll.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js?pack=cleaner!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./scroll.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 47 */
/***/ function(module, exports) {

module.exports = throttle;

/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

function throttle (func, wait) {
  var ctx, args, rtn, timeoutID; // caching
  var last = 0;

  return function throttled () {
    ctx = this;
    args = arguments;
    var delta = new Date() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };

  function call () {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }
}


/***/ },
/* 48 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }
/******/ ])
});
;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }
/******/ ])
});
;