import React, { Component } from 'react'
import axios from 'axios'
import FormData from 'form-data'

import getWeb3 from '../getWeb3'
import ItemManagerContract from '../contracts/ItemManager.json'
import ItemContract from '../contracts/Item.json'
import ItemRow from './ItemRow'

class ItemManager extends Component {
  state = { loaded: false, price: 0, itemName: 'item_01', unit: 'Wei', itemList: [], image: undefined, description: '' }

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

      this.listenToSupplyChainStepEvent();

      // load items to table
      axios
        .get('http://localhost:4000/product')
        .then(res => {
          this.setState({ itemList: res.data })
        })
        .catch(console.log())

      this.itemIndex = await this.itemManager.methods.getItemIndex().call()

      this.setState({ loaded: true })

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  getFileInfo = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleSubmit = async () => {
    const { price, itemName, unit, image, description, itemList } = this.state
    let value = price
    if (unit === 'Ether') {
      value = this.web3.utils.toWei(price, 'ether')
    } else if (unit === 'Gwei') {
      value = this.web3.utils.toWei(price, 'gwei')
    }

    // add item to blockchain
    await this.itemManager.methods.createItem(itemName, value).send({ from: this.accounts[0] })
    const itemIndex = await this.itemManager.methods.getItemIndex().call()
    const newItem = await this.itemManager.methods.items(itemIndex-1).call()

    // add new item to server
    const formData = new FormData()
    formData.append('file', image, image.name)
    formData.append('_id', newItem._item)
    formData.append('name', itemName)
    formData.append('price', newItem._itemPrice)
    formData.append('state', newItem._state)
    formData.append('owner', this.accounts[0])
    formData.append('description', description)
    axios
      .post('http://localhost:4000/product/create', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(res => {
        this.setState({ price: 0, itemName: 'item_01', image: undefined, description: '' })
        // add new item to componets state
        itemList.unshift(res.data)
        this.setState({ itemList })
      })
      .catch(console.log())
  }

  handleBuy = async (itemAddress, itemPrice) => {
    const currentAccount = await this.web3.eth.getAccounts()
    this.web3.eth.sendTransaction({ from: currentAccount[0], to: itemAddress, value: itemPrice })
  }

  handleDelivery = async (itemAddress) => {
    const currentAccount = await this.web3.eth.getAccounts()
    const functionSignatureIndex = await this.web3.eth.abi.encodeFunctionSignature('index()')
    const itemIndex = await this.web3.eth.call({ from: this.accounts[0], to: itemAddress, data: functionSignatureIndex })
    await this.itemManager.methods.triggerDelivery(this.web3.utils.hexToNumber(itemIndex)).send({ from: currentAccount[0] })
  }

  listenToSupplyChainStepEvent = () => {
    this.itemManager.events.SupplyChainStep().on('data', async event => {
      const itemObject = await this.itemManager.methods.items(event.returnValues._itemIndex).call()
      const { itemList } = this.state
      const itemIndex = await itemList.indexOf(itemList.find(item => item._id === itemObject._item))
      const currentAccount = await this.web3.eth.getAccounts()

      if (itemObject._state !== '0') {
        axios
          .post('http://localhost:4000/product/update', {
            _id: itemObject._item,
            state: itemObject._state,
            purchaser: currentAccount[0]
          })
          .then(res => {
            itemList[itemIndex] = res.data
            this.setState({ itemList })
          })
          .catch(console.log())
      }
    })
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className='container'>
        <h1 className='py-3'><strong>SUPPLY CHAIN</strong></h1>

        <div className='ItemManager'>
          <h4>Create item</h4>

          <div className='form-group my-2'>
            <label htmlFor='itemName'>Name:</label>
            <input name='itemName' value={this.state.itemName} onChange={this.handleInputChange} type='text' className='form-control' />
          </div>

          <div className='row my-2'>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='price'>Price:</label>
                <input name='price' onChange={this.handleInputChange} type='number' className='form-control' value={this.state.price} min={0} />
              </div>
            </div>
            <div className='col-3'>
              <div className='form-group'>
                <label htmlFor='unit'>In:</label>
                <select className='form-control' onChange={this.handleInputChange} name='unit' defaultValue='Wei'>
                  <option>Wei</option>
                  <option>Gwei</option>
                  <option>Ether</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-group my-2'>
            <label>Picture:</label>
            <input type='file' name='img' className='form-control' onChange={this.getFileInfo}></input>
          </div>
          <div className='form-group my-2'>
            <label>Description:</label>
            <textarea
              name='description'
              rows='3'
              onChange={this.handleInputChange}
              value={this.state.description}
              className='form-control'
              placeholder='Item specifications...'
            ></textarea>
          </div>
          <button className='btn btn-primary my-2' type='button' onClick={this.handleSubmit}>Create item</button>
        </div>

        <div className='ItemTable py-5'>
          <h4>Item manager</h4>
          <div className='py-3 '>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Price (wei)</th>
                    <th>Item</th>
                    <th>Owner</th>
                    <th>Purchaser</th>
                    <th>State</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.itemList.map(item => <ItemRow data={item} key={item._id} buy={this.handleBuy} delivery={this.handleDelivery} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemManager