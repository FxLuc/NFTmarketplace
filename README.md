# FINDEX

NFT Marketplace that you can mint, buy and sell NFTs.

Visit the website demo here: : http://103.170.246.112:50666/

## Requirements

Ethereum, Solidity, Metamask, NodeJS, ReactJS, Truffle,...

### Stack

- [Solidity](https://docs.soliditylang.org/) - Object-oriented, high-level language for implementing smart contracts.
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework for faster and easier web development.
- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) - Allows users to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [Truffle](https://www.trufflesuite.com/truffle) - Development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- [Ganache](https://www.trufflesuite.com/ganache) - Personal blockchain for Ethereum development used to deploy contracts, develop DApps, and run tests.

### Interact with the deployed DApp
- DApp requires [Metamask](https://metamask.io/) browser wallet extension to interact with.
- Connect metamask browser wallet to Goerli Test Network.
- Request and get test etheres for the metamask account from [Goerli Faucet](https://goerli-faucet.mudit.blog/) to make transactions.

## How to install

### 1. Client (./client)

Step 1: cd into `./client` and install npm dependencies

```bash
npm install
```

Step 2: Setting up environments

1.  You will find a file named `exanple.env` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `exanple.env` file to understand the constants.

### 2. Server (./server)

Step 1: cd into `./server` and install npm dependencies

```bash
npm install
```

Step 2: Setting up environments

1.  You will find a file named `exanple.env` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `exanple.env` file to understand the constants.

### 3. Add Metamask extension for Chrome

Add this `Goerli testnet` network to Metamask.

Get Ether from a faucet for the Goerli for free to carry out transactions on the site.

Remembering that the transaction confirmation takes a few minutes.

## How to run

### 1. Client (./client)

cd into `./client` and run ReactJS app

```bash
npm start
```

### 2. Server (./server)

cd into `./server` and run Express app

```bash
npm start
```

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.