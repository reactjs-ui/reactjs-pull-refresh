// Pull Refresh 核心实现
class PullRefresh {
  //默认属性
  static defaultOptions = {
    lockInTime: 0, //延迟刷新或加载
    maxAmplitude: 80, //设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
    loadMoreThrottle: 5, //加载更多，距离最底部临界值，
  };

  constructor(options) {
    let _options = {...options};
    Object.keys(_options).forEach((item) => {
      if (_options[item] === undefined) {
        delete _options[item];
      }
    });

    this.options = {...PullRefresh.defaultOptions, ..._options};
    const {container, ptrEl, moreEl, scrollComponent, hasMore} = _options;
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
  initEvents() {
    this.container.addEventListener('touchmove', this.ontouchmove, false);
    this.container.addEventListener('touchend', this.ontouchend, true);
  }

  ontouchmove() {
    if (this.loading) {
      return;
    }
    const scroll = this.scroll;
    let top = -scroll.getScrollTop();
    const maxAmplitude = this.options.maxAmplitude;
    const refresh = this.options.refresh;
    const loadMore = this.options.loadMore;
    if (refresh) {
      const style = this.ptrEl.style;
      if (top < 0 && top >= -maxAmplitude) {
        style.webkitTransform = `translate3d(0, ${-top}px, 0)`;
        style.transform = `translate3d(0, ${-top}px, 0)`;
      } else {
        style.webkitTransform = 'translate3d(0, 0, 0)';
        style.transform = 'translate3d(0, 0, 0)';
      }
      if (top < -maxAmplitude / 2) {//开启刷新
        this.enableLoading = true;
        this.imgEl.classList.add('rc-ptr-rotate');
      } else {
        this.enableLoading = false;
        this.imgEl.classList.remove('rc-ptr-rotate')
      }
    }

    //加载更多
    if (loadMore) {
      const height = scroll.getScrollHeight();
      const veiwHeight = scroll.getScrollViewHeight();
      const loadMoreThrottle = this.options.loadMoreThrottle;
      if (veiwHeight + top - height > loadMoreThrottle) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }
    }
  }

  ontouchend(e) {
    const top = this.scroll.getScrollTop();
    const refresh = this.options.refresh;
    const loadMore = this.options.loadMore;
    if (refresh) {
      if (top > 0) { //向上滑动，刷新
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

  refresh(e) {
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

    const maxAmplitude = this.options.maxAmplitude;
    const style = this.ptrEl.style;
    style.transition = 'transform .2s linear';
    style.webkitTransition = '-webkit-transform .2s linear';
    style.webkitTransform = `translate3d(0, ${maxAmplitude / 2}px, 0)`;
    style.transform = `translate3d(0, ${maxAmplitude / 2}px, 0)`;
    this.imgEl.classList.add('rc-ptr-loading');

    const options = this.options;
    const {lockInTime, refreshCallback} = options;
    if (refreshCallback && typeof refreshCallback === 'function') {
      if (lockInTime > 0) {
        clearTimeout(this.refreshTimoutId);
        this.refreshTimoutId = setTimeout(() => {
          refreshCallback().then(this.resetPtr, this.resetPtr);
        }, lockInTime);
      } else {
        refreshCallback().then(this.resetPtr, this.resetPtr);
      }
    }
  }

  resetPtr(refresh = true) {
    this.enableLoading = false;
    this.loading = false;
    this.imgEl.className = 'rc-ptr-image';
    const style = this.ptrEl.style;
    style.transition = '';
    style.webkitTransition = '';
    style.webkitTransform = 'translate3d(0, 0, 0)';
    style.transform = 'translate3d(0, 0, 0)';

    if (refresh) {
      this.scroll.refresh();
    }
  }

  // 加载更多
  loadMore(e) {
    if (!this.enableMore) {
      return;
    }
    if (this.loading) {
      return;
    }

    if (e) {
      e.stopImmediatePropagation();
    }

    const scroll = this.scroll;
    const height = scroll.getScrollHeight();
    const top = -scroll.getScrollTop();
    const veiwHeight = scroll.getScrollViewHeight();
    const maxAmplitude = this.options.maxAmplitude;
    const maxTop = height - veiwHeight + maxAmplitude;

    if (maxTop > top) {
      scroll.scrollTo(-maxTop, 20, 'linear').then(() => {
        this.doLoadMore();
      });
    } else {
      this.doLoadMore();
    }
  }

  doLoadMore() {
    this.moreEl.style.visibility = 'visible';
    this.loading = true;

    const options = this.options;
    const {lockInTime, loadMoreCallback} = options;
    if (loadMoreCallback && typeof loadMoreCallback === 'function') {
      if (lockInTime > 0) {
        setTimeout(() => {
          loadMoreCallback().then(this.resetMore, this.resetMore);
        }, lockInTime);
      } else {
        loadMoreCallback().then(this.resetMore, this.resetMore);
      }
    }
  }

  resetMore() {
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
  setMoreStatus(hasMore) {
    this.hasMore = hasMore;
  }

  unmount() {
    this.container.removeEventListener('touchmove', this.ontouchmove, false);
    this.container.removeEventListener('touchend', this.ontouchend, true);
  }
}

export default PullRefresh;
