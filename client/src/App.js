import React from "react"
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import HOST from  './env'

import CreateItem from "./components/create/CreateItem"
import CheckRawData from "./components/check/CheckRawData"
import ItemDetail from './components/home/ItemDetail'

import Home from "./components/home/Home"
import Profile from "./components/profile/Profile"

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import Error from './components/Error'

import detectEthereumProvider from '@metamask/detect-provider'
import getWeb3 from './getWeb3'
import ItemManagerContractJSON from './contracts/ItemManager.json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      account: { _id: '0x0000000000000000000000000000000000000000' },
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      const provider = await detectEthereumProvider()

      // Use web3 to get the user's accounts.
      axios
        .post(`${HOST}:50667/account`, { _id: (await provider.request({ method: 'eth_requestAccounts' }))[0].toLowerCase() })
        .then(res => this.setState({ account: res.data }))
        .catch(console.log())

      provider.on('accountsChanged', accounts => {
        axios
          .post(`${HOST}:50667/account`, { _id: accounts[0].toLowerCase() })
          .then(res => this.setState({ account: res.data }))
          .catch(console.log())
      })

      const ItemManagerContract = await new web3.eth.Contract(
        ItemManagerContractJSON.abi,
        '0xFAb77aD73c64f0365eE87Bcc063f562Bda0A3Da7'
      )

      this.setState({ loaded: true, web3: web3, ItemManagerContract: ItemManagerContract })
    } catch (error) {
      window.location = `${HOST}:50666/error`
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App">
        <NavigationBar account={this.state.account} />
        <div className="container mt-5 py-5 " style={{ minHeight: '90vh' }}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  account={this.state.account}
                  web3={this.state.web3}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateItem
                  account={this.state.account}
                  ItemManagerContract={this.state.ItemManagerContract}
                  web3={this.state.web3}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  account={this.state.account}
                  web3={this.state.web3}
                />
              }
            />
            <Route
              path="/checkrawdata"
              element={
                <CheckRawData web3={this.state.web3} />
              }
            />
            <Route
              path="/item/:itemAddress"
              element={
                <ItemDetail
                  web3={this.state.web3}
                  account={this.state.account}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer contractAddress={this.state.ItemManagerContract ? this.state.ItemManagerContract._address : null} />
      </div>
    )
  }
}


export default App