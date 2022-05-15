import React, { Component } from 'react'
import axios from 'axios'
import ItemCard from '../home/ItemCard'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keywords !== this.props.keywords) {
      axios
        .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/search`, { params: { keywords: this.props.keywords } })
        .then(res => {
          this.setState({ itemList: res.data })
        })
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/search`, { params: { keywords: this.props.keywords } })
      .then(res => {
        this.setState({ itemList: res.data })
      })
  }

  render() {
    return (this.state.itemList.length === 0)
      ? <h4>Not founds</h4>
      : <>
          <h4>Results</h4>
          <div className='py-3 row'>
            {this.state.itemList.map(item => <ItemCard item={item} key={item._id} />)}
          </div>
        </>
  }
}

export default Search