import React from "react"
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

import CreateItem from "./components/create/CreateItem"
import Home from "./components/home/Home"
import Profile from "./components/profile/Profile"

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import Error from './components/Error'

import detectEthereumProvider from '@metamask/detect-provider'
// import ItemManagerContract from './contracts/ItemManager.json'
// import ItemContract from './contracts/Item.json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      itemList: [],
      account: { _id: '0x0000000000000000000000000000000000000000' },
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const provider = await detectEthereumProvider()
      // Use web3 to get the user's accounts.
      axios
        .post('http://localhost:4000/account', { _id: (await provider.request({ method: 'eth_requestAccounts' }))[0].toLowerCase() })
        .then(res => this.setState({ account: res.data }))
        .catch(console.log())

        provider.on('accountsChanged', accounts => {
        axios
          .post('http://localhost:4000/account', { _id: accounts[0].toLowerCase() })
          .then(res => this.setState({ account: res.data }))
          .catch(console.log())
      })

      this.setState({ loaded: true })

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
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
                  Item={this.Item}
                  ItemManager={this.ItemManager}
                  account={this.state.account}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateItem
                  account={this.state.account}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  account={this.state.account}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App