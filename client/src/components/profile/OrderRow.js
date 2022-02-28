import React from 'react'
import axios from 'axios'
import QRCode from 'react-qr-code'
import ToastAutoHide from '../ToastAutoHide'
import OrderNextStep from './OrderNextStep'

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
        const OrderContract = await new this.props.web3.eth.Contract(OrderContractJSON.abi, this.props.order._id)
        OrderContract.methods.triggerCancel().send({ from: this.props.accountId })
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

    covertStep(step) {
        if (step === 0) return 'Placed'
        else if (step === 1) return 'Comfirmed'
        else if (step === 2) return 'Shipping'
        else if (step === 3) return 'Delivered'
        else return 'Canceled'
    }

    addressOverflow(address) {
        return `${address.substring(0, 3)}...${address.substring(39, 42)}`
    }

    addressQR(address) {
        if (address === '0x0000000000000000000000000000000000000000') return 'Not yet'
        else return (
            <>
                <QRCode
                    value={address}
                    level={'H'}
                    size={85}
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
                <td>
                    <p style={{ height: '105px', overflowY: 'scroll', marginBottom: '0px' }} >{this.props.order.itemContract.name}
                    </p>
                </td>
                <td><p className='text-nowrap'>
                    <FontAwesomeIcon icon={faEthereum} className='text-primary' /> { } {(Number(this.props.order.price) / 1000000000000000000).toFixed(5)} { }
                </p></td>
                <td className='text-center'>
                    {this.addressQR(this.props.order.itemContract._id)}
                </td>
                <td className='text-center'>
                    {this.addressQR(this.props.order._id)}
                </td>
                <td className='text-center'>
                    {this.addressQR(this.props.order.seller)}
                </td>
                <td className='text-center'>
                    {this.addressQR(this.props.order.purchaser)}
                </td>
                <td className='text-center'>{this.covertStep(this.state.orderState)}</td>
                <td className='text-center'>{this.convertTimestamp(this.state.orderDeadline)}</td>
                <OrderNextStep
                    state={this.state.orderState}
                    triggerNext={this.triggerNext}
                    triggerCancel={this.triggerCancel}
                    isSeller={this.state.isSeller}
                    loading={this.state.loading}
                />
            </tr>
        )
    }

}

export default OrderRow