import React from 'react'
import OrderRow from './OrderRow'
import axios from 'axios'

class MyOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myOrderList: [],
            loaded: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accountId !== this.props.accountId) {
            axios
                .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/order/${this.props.order}`, { params: { _id: this.props.accountId } })
                .then(res => {
                    this.setState({
                        myOrderList: res.data,
                    })
                })
        }
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/order/${this.props.order}`, { params: { _id: this.props.accountId } })
            .then(res => {
                this.setState({
                    myOrderList: res.data,
                    loaded: true
                })
            })
    }

    render() {
        return (
            <div className='table-responsive py-3'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Delivery</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded
                            ? this.state.myOrderList.map(order =>
                                <OrderRow
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
        )
    }
}

export default MyOrder