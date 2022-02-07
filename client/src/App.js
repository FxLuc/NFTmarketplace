import React from "react"
import CreateItem from "./components/CreateItem"
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import "bootstrap/dist/css/bootstrap.min.css"

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
      this.networkId = await this.web3.eth.net.getId()

      this.itemManager = await new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] && ItemManagerContract.networks[this.networkId].address,
      )

      this.Item = await new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] && ItemContract.networks[this.networkId].address,
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
        <NavigationBar/>
        <CreateItem/>
        <Footer/>
      </div>
    )
  }
}

export default App