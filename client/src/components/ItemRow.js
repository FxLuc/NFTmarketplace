import React from "react"
import NextStep from "./NextStep"

class ItemRow extends React.Component {

    handleBuy = () => {
        this.props.buy(this.props.data._item, this.props.data._itemPrice)
    }

    handleDelivery = () => {
        this.props.delivery(this.props.data._item)
    }

    render() {
        return (
            <tr>
                <td>{this.props.data._item}</td>
                <td>{this.props.data._identifier}</td>
                <td>{this.props.data._itemPrice}</td>
                <NextStep step={this.props.data._state}  buy={this.handleBuy} delivery={this.handleDelivery}/>
            </tr>
        )
    }

}

export default ItemRow;