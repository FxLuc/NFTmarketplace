import React, { Component } from 'react'
import axios from 'axios'
import ItemCard from './ItemCard'
import HOST from  '../../env'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
    }
  }
  componentDidMount = () => {
    // load items to table
    axios
      .get(`${HOST}:50667/item/newest`)
      .then(res => this.setState({ itemList: res.data }))
      .catch(_=> window.location = `${HOST}:50666/error`)
  }

  render() {
    return (
      <div className='Home'>
        <div className=''>
          <h4>Newest</h4>
          <div className='py-3 row'>
            {this.state.itemList.map(item => <ItemCard item={item} key={item._id}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Home