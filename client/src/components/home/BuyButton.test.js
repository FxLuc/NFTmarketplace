import React from 'react';
import ReactDOM from 'react-dom';
import BuyButton from './BuyButton';
import { web3 } from "web3";

const mockAccount = { account: { _id: '0xbaBD46b079B233255784c6dFA8a86E04422512Ce' }, isLogin: 'true' }
const mockItem = {
  "_id": "0x19d17Fd646843d2355529f605469Ae076535aC1E",
  "name": "Ferrari J50",
  "price": 17000000000000000000,
  "owner": "0xbabd46b079b233255784c6dfa8a86e03422512ce",
  "order": "0x0000000000000000000000000000000000000000",
  "description": "",
  "specifications": "Turbocharged V 8 90-degree\r\nDisplacement :\t3900 cc | 238.0 cu in. | 3.9 L.\r\nPower :\t601 HP (442.174 KW) @ 7500 RPM\r\nTorque :\t560 Ft-Lbs (760 NM) @ 3000 RPM\r\nBore :\t86.5 mm | 3.406 in.\r\nStroke :\t82.0 mm | 3.228 in.\r\nCompression :\t9.4:1\r\nValvetrain :\t32 DOHC (4 valves per cylinder)\r\nConstruction :\tAluminum block and head",
  "externalLink": "",
  "picture": "1670563853965-169085450.jpg",
  "rawDataHash": "0xf28ea2f7d93e7954b34e7b14ce7fd0d119ccb954f2f0ecdbe8ca562c58a045ca",
  "state": 0,
  "createdAt": "2022-12-09T05:31:09.764Z",
  "updatedAt": "2022-12-09T05:31:09.764Z",
  "__v": 0
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BuyButton account={mockAccount} web3={web3} item={mockItem}/>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
