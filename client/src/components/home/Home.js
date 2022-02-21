import React, { Component } from 'react'
import axios from 'axios'
import ItemCard from './ItemCard'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
    }
  }
  componentDidMount = async() => {
    // load items to table
    axios
      .get('http://localhost:4000/item/newest')
      .then(res => this.setState({ itemList: res.data }))
      .catch(_=> window.location = 'http://localhost:65535/error')
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