import React from 'react'
import axios from 'axios'
import QRCode from 'react-qr-code'
import { Link } from 'react-router-dom'

import ToastAutoHide from '../ToastAutoHide'
import OrderNextStep from './OrderNextStep'
import DeliveryTo from './DeliveryTo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'

import OrderContractJSON from '../../contracts/Order.json'

class OrderRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 0,
            isSeller: false,
            orderState: this.props.order.state,
            orderDeadline: this.props.order.deadline
        }
    }


    componentDidMount = async () => {
        if (this.props.order.seller === this.props.accountId) this.setState({ isSeller: true })
    }

    updateOrder = async () => {
        const body = {
            _id: this.props.order._id,
        }
        axios
            .put(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/order/update`, body)
            .then(res => this.setState({
                orderState: Number(res.data.state),
                orderDeadline: Number(res.data.deadline),
                loading: 0
            }))
    }

    triggerNext = async () => {
        const OrderContract = await new this.props.web3.eth.Contract(OrderContractJSON.abi, this.props.order._id)
        if (this.state.orderState === 0) {
            this.setState({ loading: 1 })
            OrderContract.methods.triggerConfirm().send({ from: this.props.accountId })
                .then(_ => this.updateOrder())
                .catch(_ => this.setState({ loading: 2 }))
        }
        else if (this.state.orderState === 1) {
            this.setState({ loading: 1 })
            OrderContract.methods.triggerShipping().send({ from: this.props.accountId })
                .then(_ => this.updateOrder())
                .catch(_ => this.setState({ loading: 2 }))
        }
        else if (this.state.orderState === 2) {
            this.setState({ loading: 1 })
            OrderContract.methods.triggerReceived().send({ from: this.props.accountId })
                .then(_ => this.updateOrder())
                .catch(_ => this.setState({ loading: 2 }))
        }
    }

    triggerCancel = async () => {
        this.setState({ loading: 1 })
        const OrderContract = await new this.props.web3.eth.Contract(OrderContractJSON.abi, this.props.order._id)
        OrderContract.methods.triggerCancel().send({ from: this.props.accountId })
            .then(_ => this.updateOrder())
            .catch(_ => this.setState({ loading: 2 }))
    }

    convertTimestamp(unix_timestamp) {
        if (unix_timestamp === 0) return "No deadline"
        var a = new Date(unix_timestamp * 1000)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var year = a.getFullYear()
        var month = months[a.getMonth()]
        var date = "0" + a.getDate()
        var hour = "0" + a.getHours()
        var min = "0" + a.getMinutes()
        var sec = "0" + a.getSeconds()
        var time = date.substr(-2) + '-' + month + '-' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2)
        return time
    }

    addressOverflow(address) {
        return `${address.substring(0, 5)}...${address.substring(39, 42)}`
    }

    addressQR(address) {
        return (
            <>
                <QRCode
                    value={address}
                    level={'H'}
                    size={100}
                />
                <p className='mt-1 mb-0'>
                    <ToastAutoHide
                        message='Copy'
                        feedback='Copied!'
                        title={this.addressOverflow(address)}
                        content={address}
                    />
                </p>
            </>
        )
    }

    render() {
        return (
            <tr>
                <td className='text-center'>
                    {this.addressQR(this.props.order._id)}
                </td>

                <td className=''>
                    <p style={{ height: '124px', overflowY: 'scroll', marginBottom: '0px' }} >
                        <Link
                            to={`/item/${this.props.order.itemContract._id}`}
                            className='text-reset text-decoration-none'
                        >
                            {this.props.order.itemContract.name}
                        </Link>
                    </p>
                </td>

                <td className='col-2 text-start'>
                    <p style={{ height: '124px', overflowY: 'scroll', marginBottom: '0px' }} >
                        <strong>Item:</strong> <br />
                        <ToastAutoHide
                            message='Copy'
                            feedback='Copied!'
                            title={this.addressOverflow(this.props.order.itemContract._id)}
                            content={this.props.order.itemContract._id}
                        /><br />
                        <strong>Seller:</strong> <br />
                        <ToastAutoHide
                            message='Copy'
                            feedback='Copied!'
                            title={this.addressOverflow(this.props.order.seller)}
                            content={this.props.order.seller}
                        /><br />
                        <strong>Purchaser:</strong> <br />
                        <ToastAutoHide
                            message='Copy'
                            feedback='Copied!'
                            title={this.addressOverflow(this.props.order.purchaser)}
                            content={this.props.order.purchaser}
                        /><br />
                        <strong>Order:</strong> <br />
                        <ToastAutoHide
                            message='Copy'
                            feedback='Copied!'
                            title={this.addressOverflow(this.props.order._id)}
                            content={this.props.order._id}
                        />

                    </p>
                </td>

                <td className='col-2 text-start'>
                    <div style={{ height: '124px', overflowY: 'scroll', marginBottom: '0px' }} >
                        <strong>From: </strong>
                        <br />{this.props.order.from}<br />
                        <strong>Now in:</strong>
                        <br />{this.props.order.nowIn}<br />
                        <strong>To:</strong>
                        {(this.state.isSeller)
                            ? <>{this.props.order.to}</>
                            : <DeliveryTo deliveryTo={this.props.order.to} _id={this.props.order._id} />
                        }
                    </div>
                </td>

                <td className='col-2 text-center'>
                    <p style={{ height: '124px', overflowY: 'scroll', marginBottom: '0px' }} >
                        <strong>Deadline: </strong><br />
                        {this.convertTimestamp(this.state.orderDeadline)}<br />
                        <strong>Paid: </strong><br />
                        <span className='text-nowrap'>
                            <FontAwesomeIcon icon={faEthereum} className='text-primary' /> { } {(Number(this.props.order.price) / 1000000000000000000).toFixed(9)} { } ETH
                        </span>
                    </p>
                </td>
                <OrderNextStep
                    state={this.state.orderState}
                    triggerNext={this.triggerNext}
                    triggerCancel={this.triggerCancel}
                    isSeller={this.state.isSeller}
                    loading={this.state.loading}
                />
            </tr >
        )
    }

}

export default OrderRow