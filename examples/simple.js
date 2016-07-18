import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import PullRefresh from '../src/scripts/index';
import './sass/example.scss';

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
    });
  }

  refresh() {
    alert('刷新成功！');
    return true;
  }

  render() {
    const hammerOptions = {
      /*touchAction: 'auto',
      recognizers: {
        pan: {
          threshold: 10
        }
      }*/
    };

    return (
      <div>
        <PullRefresh loadingFunction={this.loadingFunction}
                     distanceToRefresh={40}
                     hammerOptions={hammerOptions}>
          Pull down to refresh!
        </PullRefresh>
      </div>
    );
  }
}

render(
  <PullRefreshSimple />, document.getElementById('layout')
);
