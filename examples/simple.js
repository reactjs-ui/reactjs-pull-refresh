import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import PullRefresh from '../src/scripts/index';
import './sass/simple.scss';

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
    }).then(() => {
      console.info('刷新成功！');
    });
  }

  render() {
    const hammerOptions = {
      touchAction: 'auto',
      recognizers: {
        pan: {
          threshold: 50
        }
      }
    };

    return (
      <PullRefresh loadingFunction={this.loadingFunction}
                   distanceToRefresh={40}
                   hammerOptions={hammerOptions}>
        <p>Pull down to refresh! You need pull over 50px to refresh.</p>
        <p>The details you see hammerOptions.</p>

        <h3>Content</h3>
        <p>
          It’s easy to use, just include the library and create a new instance.

By default it adds a set of tap, doubletap, press, horizontal pan and swipe, and the multi-touch pinch and rotate recognizers.
The pinch and rotate recognizers are disabled by default because they would make the element blocking, but you can enable them by calling:

Enabling vertical or all directions for the pan and swipe recognizers:
Also the viewport meta tag is recommended, it gives more control back to the webpage by disabling the doubletap/pinch zoom.
More recent browsers that support the touch-action property don’t require this.

            More control
            You can setup your own set of recognizers for your instance.
            This requires a bit more code, but it gives you more control about the gestures that are being recognized.

The example above creates an instance containing a pan and a quadrupletap gesture.
The recognizer instances you create are being executed in the order they are added, and only one can be recognized at the time.

See the pages about the recognizeWith and requireFailure for more details.

Notes
Built by Jorik Tangelder. It’s recommended to listen to this loop while using hammer.js.
Follow @jorikdelaporik for some tweets about this library.
        </p>
      </PullRefresh>
    );
  }
}

render(
  <PullRefreshSimple />, document.getElementById('layout')
);
