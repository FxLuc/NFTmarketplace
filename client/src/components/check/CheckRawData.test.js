import React from 'react';
import ReactDOM from 'react-dom';
import CheckRawData from './CheckRawData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CheckRawData />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
