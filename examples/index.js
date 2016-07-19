import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import './sass/example.scss';

class Index extends Component {
  render() {
    return (
      <div className="example">
        <h3>React Pull Refresh 例子</h3>
        <ol className="example-list">
          <li>
            <a href="./simple.html" target="_blank">基本用法</a>
          </li>
          <li>
            <a href="./customize.html" target="_blank">定制化加载效果</a>
          </li>
        </ol>
      </div>
    );
  }
}

render(<Index/>, document.getElementById('layout'));
