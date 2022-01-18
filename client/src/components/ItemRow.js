import React from 'react'
import QRCode from 'qrcode.react'
import NextStep from './NextStep'
import '../App.css'
class ItemRow extends React.Component {

    handleBuy = () => {
        this.props.buy(this.props.data._id, this.props.data.price)
    }

    handleDelivery = () => {
        this.props.delivery(this.props.data._id)
    }

    covertStep(step) {
        if (step === 0) return 'Created'
        else if (step === 1) return 'Paid'
        else return 'Delivered'
    }

    purchaserCheck(address) {
        if (address === '0x0000000000000000000000000000000000000000') return 'Not yet'
        else return (
            <QRCode
                id='qrcode'
                value={address}
                size={100}
                level={'H'}
                includeMargin={true}
                onClick={() => alert('Address: ' + address)}
            />
        )
    }

    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.data.img} className="product-image img-thumbnail" alt={this.props.data.name}></img>
                </td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.price}</td>
                <td className='text-center'>
                    <QRCode
                        id='qrcode'
                        value={this.props.data._id}
                        size={100}
                        level={'H'}
                        includeMargin={true}
                        onClick={() => alert('Address: ' + this.props.data._id)}
                    />
                </td>
                <td className='text-center'>
                    <QRCode
                        id='qrcode'
                        value={this.props.data.owner}
                        size={100}
                        level={'H'}
                        includeMargin={true}
                        onClick={() => alert('Address: ' + this.props.data.owner)}
                    />
                </td>
                <td className='text-center'>
                    {this.purchaserCheck(this.props.data.purchaser)}
                </td>
                <td className='text-center'>{this.covertStep(this.props.data.state)}</td>
                <NextStep step={this.props.data.state} buy={this.handleBuy} delivery={this.handleDelivery} />
            </tr>
        )
    }

}

export default ItemRow;