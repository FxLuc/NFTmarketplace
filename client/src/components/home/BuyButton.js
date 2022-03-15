import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum, } from '@fortawesome/free-brands-svg-icons'
import { faWallet, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner'
import ItemContractJSON from '../../contracts/Item.json'

class BuyButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 0,
            price: this.props.item.price,
            realPrice: this.props.item.price,
            unit: 'Wei',
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    }

    triggerBuy = async () => {
        this.setState({ loading: 1 })
        this.props.web3.eth
            .sendTransaction({ from: this.props.account._id, to: this.props.item._id, value: this.state.realPrice })
            .then(_ => this.setState({ loading: 2 }))
            .catch(_ => this.setState({ loading: 3 }))
    }

    handleChangePrice = async event => {
        event.preventDefault()
        // load ItemContract
        this.setState({ loading: 1 })
        const { price, unit } = this.state
        let value = price
        if (value !== 0) {
            if (unit === 'Ether') {
                value = this.props.web3.utils.toWei(price, 'ether')
            } else if (unit === 'Gwei') {
                value = this.props.web3.utils.toWei(price, 'gwei')
            }
        }
        const ItemContract = await new this.props.web3.eth.Contract(ItemContractJSON.abi, this.props.item._id)
        ItemContract.methods.changePrice(value).send({ from: this.props.account._id })
            .then(_ => {
                axios
                    .post(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/changeprice`, {
                        _id: this.props.item._id
                    })
                    .then(res => {
                        this.setState({ loading: 2, realPrice: res.data, price: res.data })
                    })
                    .catch(error => console.log(error))
            })
            .catch(_ => this.setState({ loading: 3 }))
    }

    render() {
        return (
            <>
                <p className='fs-1 fw-bold'>
                    <FontAwesomeIcon icon={faEthereum} className='text-primary' /> { }
                    {(Number(this.state.realPrice) / 1000000000000000000).toFixed(5)} ETH { }
                    <span className='fs-5 fw-light'>({this.state.realPrice} wei)</span>
                </p>
                {
                    (this.props.account._id === '0x0000000000000000000000000000000000000000') ?
                        <Link className='btn btn-primary px-5 fw-bold' to='/login'>Log in to buy</Link>
                        : (this.state.loading !== 0)
                            ? <IsLoading isLoading={this.state.loading} />
                            : (this.props.account._id !== this.props.item.owner)
                                ? (this.props.item.state === 0)
                                    ? <button className='btn btn-primary px-5 fw-bold' onClick={this.triggerBuy}>
                                    <FontAwesomeIcon icon={faWallet} /> { } Buy now
                                    </button>
                                    : <button className='btn btn-primary px-5 fw-bold' disabled>
                                    Sold out
                                    </button>
                                : <form className='form-group' onSubmit={this.handleChangePrice}>
                                    <div className='row my-3'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='price' className='fw-bold'>Price:</label>
                                                <br />
                                                <small className='text-muted'>You can change item price anytime.</small>
                                                <input
                                                    name='price'
                                                    id='price'
                                                    onChange={this.handleInputChange}
                                                    type='number'
                                                    className='form-control'
                                                    value={this.state.price}
                                                    min={0}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='form-group'>
                                                <label htmlFor='unit' className='fw-bold'>Unit:</label>
                                                <br />
                                                <small className='text-muted'>Price in </small>
                                                <select className='form-control' onChange={this.handleInputChange} name='unit' id='unit'>
                                                    <option>Wei</option>
                                                    <option>Gwei</option>
                                                    <option>Ether</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-primary fw-bold px-5' type='submit'>Change price</button>
                                </form>
                }
            </>
        )
    }
}

class IsLoading extends React.Component {
    render() {
        return (
            <>
                {(this.props.isLoading === 1)
                    ?
                    <button className='btn btn-secondary fw-bold px-5' type='button' disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> { } Pending...
                    </button>

                    : (this.props.isLoading === 2)
                        ? <button className='btn btn-primary fw-bold px-5' type='button' disabled>
                            <FontAwesomeIcon icon={faCheckCircle} /> { } Done!
                        </button>
                        : <button className='btn btn-danger fw-bold px-5' type='button' disabled>
                            <FontAwesomeIcon icon={faExclamationCircle} /> { } Rejected
                        </button>
                }
            </>
        )
    }
}


export default BuyButton