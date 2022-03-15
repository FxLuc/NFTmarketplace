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
  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/newest`)
      .then(res => this.setState({ itemList: res.data }))
  }

  render() {
    return (
      <>
        <h4>Newest</h4>
        <div className='py-3 row '>
          {this.state.itemList.map(item => <ItemCard item={item} key={item._id} />)}
        </div>
      </>
    )
  }
}

export default Home