import React from 'react';
import ReactDOM from 'react-dom';
import CreateItem from './CreateItem';

const mockAccount = { account: { _id: '0xbaBD46b079B233255784c6dFA8a86E04422512Ce' }, isLogin: 'true' }

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CreateItem account={mockAccount} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
