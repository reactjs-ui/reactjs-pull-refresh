(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("reactjs-scroll"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "reactjs-scroll"], factory);
	else if(typeof exports === 'object')
		exports["reactPullRefresh"] = factory(require("react"), require("prop-types"), require("reactjs-scroll"));
	else
		root["reactPullRefresh"] = factory(root["react"], root["prop-types"], root["reactjs-scroll"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactPullRefresh = __webpack_require__(2);

var _ReactPullRefresh2 = _interopRequireDefault(_ReactPullRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReactPullRefresh2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactjsScroll = __webpack_require__(5);

var _reactjsScroll2 = _interopRequireDefault(_reactjsScroll);

var _PullRefresh = __webpack_require__(6);

var _PullRefresh2 = _interopRequireDefault(_PullRefresh);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPullRefresh = function (_Component) {
  _inherits(ReactPullRefresh, _Component);

  function ReactPullRefresh() {
    _classCallCheck(this, ReactPullRefresh);

    return _possibleConstructorReturn(this, (ReactPullRefresh.__proto__ || Object.getPrototypeOf(ReactPullRefresh)).apply(this, arguments));
  }

  _createClass(ReactPullRefresh, [{
    key: 'componentDidMount',

    //可能需要传入的参数
    value: function componentDidMount() {
      //初始化 Scroll 实例
      var _refs = this.refs,
          container = _refs.container,
          ptrEl = _refs.ptrEl,
          scrollComponent = _refs.scrollComponent,
          moreEl = _refs.moreEl;
      var _props = this.props,
          refreshCallback = _props.refreshCallback,
          loadMoreCallback = _props.loadMoreCallback,
          hasMore = _props.hasMore,
          maxAmplitude = _props.maxAmplitude,
          loadMoreThrottle = _props.loadMoreThrottle,
          refresh = _props.refresh,
          loadMore = _props.loadMore;

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
      var _props2 = this.props,
          className = _props2.className,
          children = _props2.children,
          scrollBar = _props2.scrollBar,
          maxAmplitude = _props2.maxAmplitude,
          debounceTime = _props2.debounceTime,
          throttleTime = _props2.throttleTime,
          deceleration = _props2.deceleration,
          scrollSpeed = _props2.scrollSpeed,
          thresholdOffset = _props2.thresholdOffset,
          durationSpeed = _props2.durationSpeed,
          easing = _props2.easing,
          refresh = _props2.refresh,
          loadMore = _props2.loadMore;


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
  className: _propTypes2.default.string, // 自定义 className
  children: _propTypes2.default.node, //待渲染的内容
  refreshCallback: _propTypes2.default.func, //上拉刷新回调函数，需要是 promise 函数
  loadMoreCallback: _propTypes2.default.func, // 下拉加载更多回调函数，需要是 promise 函数
  hasMore: _propTypes2.default.bool.isRequired, //是否有更多数据
  loadMoreThrottle: _propTypes2.default.number, //设置加载更多，距离最底部临界值，
  // Reactjs Scroll 组件属性
  scrollBar: _propTypes2.default.bool, // 是否显示滚动条
  maxAmplitude: _propTypes2.default.number, // 设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
  debounceTime: _propTypes2.default.number, // 设置防抖时间
  throttleTime: _propTypes2.default.number, // 设置滑动条移动频率，值越大，移动的越缓慢
  deceleration: _propTypes2.default.number, // 设置弹性滑动持续时间，即滑动停止时，弹性持续的时间，值越大，持续时间越短
  scrollSpeed: _propTypes2.default.number, // 设置滚动加速度，值越大，滚动越快
  thresholdOffset: _propTypes2.default.number, //设置上下移动临界值，移动超过该值，则向上或向下滑动
  durationSpeed: _propTypes2.default.number, //滑动持续时间系数，系数越大，持续的时间短
  easing: _propTypes2.default.string, //设置加速方式，默认为匀速，详情查看 https://github.com/component/ease
  refresh: _propTypes2.default.bool, //是否显示刷新
  loadMore: _propTypes2.default.bool //是否加载更多
};
ReactPullRefresh.defaultProps = {
  className: '',
  refresh: true,
  loadMore: true
};
exports.default = ReactPullRefresh;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    var container = _options.container,
        ptrEl = _options.ptrEl,
        moreEl = _options.moreEl,
        scrollComponent = _options.scrollComponent,
        hasMore = _options.hasMore;

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
      var _options2 = this.options,
          maxAmplitude = _options2.maxAmplitude,
          refresh = _options2.refresh,
          loadMore = _options2.loadMore;

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
          // 开启刷新
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
      var _options3 = this.options,
          refresh = _options3.refresh,
          loadMore = _options3.loadMore;

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
      var lockInTime = options.lockInTime,
          refreshCallback = options.refreshCallback;

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
      var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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
      var lockInTime = options.lockInTime,
          loadMoreCallback = options.loadMoreCallback;

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
      this.enableMore = false;
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
  loadMoreThrottle: 5 //加载更多，距离最底部临界值，
};
exports.default = PullRefresh;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js?pack=cleaner!../../node_modules/sass-loader/lib/loader.js?outputStyle=expanded!./pull-refresh.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js?pack=cleaner!../../node_modules/sass-loader/lib/loader.js?outputStyle=expanded!./pull-refresh.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, ".rc-ptr-box {\n  position: absolute;\n  top: -40px;\n  display: block;\n  height: 40px;\n  left: 0;\n  right: 0;\n  overflow: hidden;\n}\n\n.rc-ptr-box .rc-ptr-container {\n  position: relative;\n  width: 40px;\n  margin: auto;\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n}\n\n.rc-ptr-box .rc-ptr-image {\n  position: absolute;\n  top: 0;\n  left: 12px;\n  height: 100%;\n  transform: translate3d(0, 0, 0);\n  transform-origin: center center;\n  transition: transform .2s linear;\n  line-height: 40px;\n  width: 14px;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNOS44NTQgMTkuMzU0bDYtNmEuNS41IDAgMCAwLS43MDctLjcwN0wxMCAxNy43OTNWMS41YS41LjUgMCAwIDAtMSAwdjE2LjI5M2wtNS4xNDUtNS4xNDZhLjUuNSAwIDAgMC0uNzA3LjcwOGw2IDZhLjUuNSAwIDAgMCAuNzA3IDB6Ii8+PC9zdmc+);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-rotate {\n  transform: translate3d(0, 0, 0) rotate(180deg);\n}\n\n.rc-ptr-box .rc-ptr-image.rc-ptr-loading {\n  animation: ptr-spin 0.8s infinite linear;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MzIiIGhlaWdodD0iOTMyIiB2aWV3Qm94PSIwIDAgOTMyIDkzMiI+PHBhdGggZD0iTTQ2NiA5MzJjLTEyNC40NzMgMC0yNDEuNDk1LTQ4LjQ3My0zMjkuNTEzLTEzNi40ODdDNDguNDczIDcwNy40OTUgMCA1OTAuNDczIDAgNDY2YzAtODguMTM4IDI0Ljc0LTE3My45NjIgNzEuNTQ0LTI0OC4xOTIgNDUuNTA4LTcyLjE3MiAxMDkuODIzLTEzMC40OSAxODUuOTk2LTE2OC42NTJsMzkuMTM3IDc4LjEyQzIzNC43NTIgMTU4LjMgMTgyLjQ2IDIwNS43MiAxNDUuNDU1IDI2NC40MSAxMDcuNDYgMzI0LjY3IDg3LjM3NSAzOTQuMzc4IDg3LjM3NSA0NjZjMCAyMDguNzc0IDE2OS44NTMgMzc4LjYyNiAzNzguNjI2IDM3OC42MjZTODQ0LjYyNyA2NzQuNzc0IDg0NC42MjcgNDY2YzAtNzEuNjItMjAuMDg0LTE0MS4zMy01OC4wNzctMjAxLjU5LTM3LjAwOC01OC42OS04OS4zLTEwNi4xMS0xNTEuMjIzLTEzNy4xMzNsMzkuMTM3LTc4LjEyYzc2LjE3MyAzOC4xNiAxNDAuNDkgOTYuNDggMTg1Ljk5NiAxNjguNjVDOTA3LjI2MiAyOTIuMDQgOTMyLjAwMiAzNzcuODY0IDkzMi4wMDIgNDY2YzAgMTI0LjQ3My00OC40NzMgMjQxLjQ5NS0xMzYuNDg3IDMyOS41MTNDNzA3LjQ5NyA4ODMuNTI3IDU5MC40NzUgOTMyIDQ2Ni4wMDIgOTMyeiIvPjwvc3ZnPg==);\n}\n\n@keyframes ptr-spin {\n  from {\n    transform: translate3d(0, 0, 0) rotate(0deg);\n  }\n  to {\n    transform: translate3d(0, 0, 0) rotate(360deg);\n  }\n}\n\n.rc-load-more {\n  position: absolute;\n  bottom: 20px;\n  visibility: hidden;\n  height: 20px;\n  width: 100%;\n}\n\n.rc-load-more:after {\n  position: absolute;\n  height: 2rem;\n  width: 2rem;\n  margin: 0 auto;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: transparent url(\"data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(60 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(90 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(120 60,60)'/><use xlink:href='%23l' opacity='.27' transform='rotate(150 60,60)'/><use xlink:href='%23l' opacity='.37' transform='rotate(180 60,60)'/><use xlink:href='%23l' opacity='.46' transform='rotate(210 60,60)'/><use xlink:href='%23l' opacity='.56' transform='rotate(240 60,60)'/><use xlink:href='%23l' opacity='.66' transform='rotate(270 60,60)'/><use xlink:href='%23l' opacity='.75' transform='rotate(300 60,60)'/><use xlink:href='%23l' opacity='.85' transform='rotate(330 60,60)'/></g></svg>\") center no-repeat;\n  background-size: 2rem 2rem;\n  content: '';\n  text-align: center;\n  text-indent: 2rem;\n  line-height: 4rem;\n  color: #999;\n  animation: rc-load-more 1s step-end infinite;\n}\n\n@keyframes rc-load-more {\n  0% {\n    transform: rotate(0deg);\n  }\n  8.33333333% {\n    transform: rotate(30deg);\n  }\n  16.66666667% {\n    transform: rotate(60deg);\n  }\n  25% {\n    transform: rotate(90deg);\n  }\n  33.33333333% {\n    transform: rotate(120deg);\n  }\n  41.66666667% {\n    transform: rotate(150deg);\n  }\n  50% {\n    transform: rotate(180deg);\n  }\n  58.33333333% {\n    transform: rotate(210deg);\n  }\n  66.66666667% {\n    transform: rotate(240deg);\n  }\n  75% {\n    transform: rotate(270deg);\n  }\n  83.33333333% {\n    transform: rotate(300deg);\n  }\n  91.66666667% {\n    transform: rotate(330deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});