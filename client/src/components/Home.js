import React, { Component } from 'react'

import ItemManagerContract from '../contracts/ItemManager.json'
import ItemContract from '../contracts/Item.json'
// import ItemRow from './ItemRow'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
    }
  }

  render() {
    return (
      <div className='Home'>
        <div className=''>
          <h4>Newest</h4>
          <div className='py-3 '>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {this.state.itemList.map(item => <ItemRow data={item} key={item._id} buy={this.handleBuy} delivery={this.handleDelivery} />)} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home