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
      .then(res => console.log(this.state.itemList))
      .catch(console.log())
  }

  getAccount = () => {
    console.log(this.props.account)
  }

  render() {
    return (
      <div className='Home'>
        <div className=''>
          <h4>Newest</h4>
          <div className='btn btn-danger' onClick={this.getAccount}> Show account</div>
          <div className='py-3 row'>
            {/* <div className='table-responsive'>
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
                  {this.state.itemList.map(item => <ItemCard data={item} key={item._id}/>)}
                </tbody>
              </table>
            </div> */}
            {this.state.itemList.map(item => <ItemCard data={item} key={item._id}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Home