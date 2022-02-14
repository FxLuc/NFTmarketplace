import React from 'react'
import QRCode from 'react-qr-code'
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
        else if (step === 1) return 'Selling'
        else if (step === 2) return 'Sold'
        else if (step === 3) return 'Delivered'
        else return 'Delivered'
    }

    purchaserCheck(address) {
        if (address === '0x0000000000000000000000000000000000000000') return 'Not yet'
        else return (
            <QRCode
                // id='qrcode'
                value={address}
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
                    <img src={this.props.data.picture} className="product-image img-thumbnail" alt={this.props.data.name}></img>
                </td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.price}</td>
                <td className='text-center'>
                    <QRCode
                    title={'Item address'}
                        value={this.props.data._id}
                        level={'H'}
                        size={80}
                        onClick={() => alert('Address: ' + this.props.data._id)}
                    />
                </td>
                <td className='text-center'>
                    <QRCode
                        title={'Owner address'}
                        value={this.props.data.owner}
                        level={'H'}
                        size={80}
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