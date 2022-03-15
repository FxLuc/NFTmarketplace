import React from 'react'
import axios from 'axios'


class DeliveryTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editDeliveryToElement: false,
            deliveryTo: this.props.deliveryTo,
            newDeliveryTo: this.props.deliveryTo
        }
    }

    handleDeliveryToSubmit = event => {
        event.preventDefault()
        axios
            .put(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/deliveryto`, {
                to: this.state.newDeliveryTo,
                id: this.props._id
            })
            .then(res => {
                this.setState({ deliveryTo: this.state.newDeliveryTo })
                this.hideEditDeliveryToElement()
            })
            .catch(error => console.log(error))
    }

    handleDeliveryToChange = event => {
        this.setState({ newDeliveryTo: event.target.value })
    }

    showEditDeliveryToElement = () => {
        this.setState({ editDeliveryToElement: true })
    }

    hideEditDeliveryToElement = () => {
        this.setState({ editDeliveryToElement: false })
    }

    render() {
        return (
            <>
                <label
                    className={this.state.editDeliveryToElement ? 'd-none' : 'd-block'}
                    htmlFor="deliveryTo"
                >
                    <span onClick={this.showEditDeliveryToElement}>
                        {this.state.deliveryTo}
                    </span>
                </label>
                {this.state.editDeliveryToElement ? (
                    <form className={this.state.editDeliveryToElement ? 'd-block' : 'd-none'} onSubmit={this.handleDeliveryToSubmit}>
                        <input
                            type='text'
                            className='form-control my-1'
                            name='deliveryTo'
                            id='deliveryTo'
                            onBlur={this.hideEditDeliveryToElement}
                            onChange={this.handleDeliveryToChange}
                            value={this.state.newDeliveryTo}
                            required
                        ></input>
                    </form>
                ) : null}
            </>
        )
    }
}

export default DeliveryTo