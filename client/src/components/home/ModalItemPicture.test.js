import React from 'react';
import ReactDOM from 'react-dom';
import ModalItemPicture from './ModalItemPicture';

const mockModalItemPicture = {
  show: true,
  onHide: () => {},
  src: 'https://',
  alt: 'mock picture'
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ModalItemPicture {...mockModalItemPicture} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
