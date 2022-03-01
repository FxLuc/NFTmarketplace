import React from 'react'
import OrderRow from './OrderRow'
import axios from 'axios'

class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myOrderList: [],
            loaded: false
        }
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/order/paid`, { params: { _id: this.props.accountId } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    myOrderList: res.data,
                    loaded: true
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <div className='py-3 '>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Name</th>
                                    <th>Item</th>
                                    <th>Delivery</th>
                                    <th>State</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loaded
                                    ? this.state.myOrderList.map(order => <OrderRow
                                        order={order}
                                        web3={this.props.web3}
                                        accountId={this.props.accountId}
                                        key={order._id}
                                    />)
                                    : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default MyOrder