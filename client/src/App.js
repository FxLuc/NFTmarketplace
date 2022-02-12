import React from "react"
import { Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import CreateItem from "./components/CreateItem"
import Home from "./components/Home"

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import Error from './components/Error'

import getWeb3 from './getWeb3'
import ItemManagerContract from './contracts/ItemManager.json'
import ItemContract from './contracts/Item.json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      itemList: [],
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId()

      this.ItemManager = await new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[networkId] && ItemManagerContract.networks[networkId].address,
      )

      this.Item = await new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[networkId] && ItemContract.networks[networkId].address,
      )

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
        <NavigationBar />
        <div className="container mt-5 py-5 ">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  Item={this.Item}
                  ItemManager={this.ItemManager}
                  accounts={this.accounts}
                />
              }
            />
            <Route path="/create" element={<CreateItem />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App