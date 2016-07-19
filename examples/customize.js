import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import PullRefresh from '../src/scripts/index';
import './sass/customize.scss';

class PullRefreshCustomize extends Component {
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
      alert('刷新成功！');
    });
  }

  render() {
    const icon = (
      <div>
        <div className="pull">
          <i className="refresh-icon"></i>下拉刷新
        </div>
        <div className="release">
          <i className="refresh-icon"></i>松开刷新
        </div>
      </div>);

    const loading = (
      <div>
        <i className="refresh-loading"></i> 加载中，请稍后...
      </div>
    );
    return (
      <div>
        <PullRefresh loadingFunction={this.loadingFunction}
                     distanceToRefresh={40}
                     icon={icon}
                     loading={loading}>
          Pull down to refresh!
        </PullRefresh>
      </div>
    );
  }
}

render(
  <PullRefreshCustomize />, document.getElementById('layout')
);
