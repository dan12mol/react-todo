import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';

import App from './components/App';
import NotFound from './components/NotFound';
import TodoPicker from './components/TodoPicker';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={TodoPicker} />
        <Match pattern="/todo/:todoId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

TodoPicker.contextTypes = {
  router: React.PropTypes.object
}

render(<Root/>, document.querySelector('#main'));
