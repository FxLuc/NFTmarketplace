import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ToastAutoHide from '../ToastAutoHide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum, } from '@fortawesome/free-brands-svg-icons'
import { faWallet, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner'
import HOST from  '../../env'

function ItemDetail(props) {
  let { itemAddress } = useParams()
  return (
    <>
      <Detail itemAddress={itemAddress} web3={props.web3} account={props.account} />
    </>
  )
}

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      loading: 0
    }
  }


  triggerBuy = async () => {
    // load ItemContract
    // const ItemContract = await new this.props.web3.eth.Contract(ItemContractJSON.abi, this.props.itemAddress)
    this.setState({ loading: 1 })
    this.props.web3.eth
      .sendTransaction({ from: this.props.account._id, to: this.state.item._id, value: this.state.item.price })
      .then(_ => this.setState({ loading: 2 }))
      .catch(_ => this.setState({ loading: 3 }))
  }

  componentDidMount() {
    // load item
    axios
      .get(`${HOST}:50667/item`, { params: { _id: this.props.itemAddress } })
      .then(res => this.setState({ item: res.data }))
      .catch(_ => window.location = `${HOST}:50666/error`)
  }
  render() {
    if (this.state.item !== null) {
      return (
        <>
          <div className='row'>

            <div className='col-12 col-md-6 col-lg-4 ps-0 pe-0 pe-md-3 mb-3'>
              <img
                src={this.state.item.picture}
                className="bg-light rounded-3 h-100"
                style={{ objectFit: 'contain', height: '400px', width: '100%' }}
                alt={this.state.item.name}
              />
            </div>
            <div className='col-12 col-md-6 col-lg-8 bg-light rounded-3 py-3 mb-3 p-4 h-100 text-center text-md-start'>
              Owned by: { }
              <span className='text-secondary'>
                <ToastAutoHide
                  message='Copy'
                  feedback='Copied!'
                  title={this.state.item.owner}
                  ontent={this.state.item.owner} />
              </span>
              <h3 className="pb-3 col-12 mt-2">{this.state.item.name}</h3>
              <p className='fs-1 fw-bold'>
                <FontAwesomeIcon icon={faEthereum} className='text-primary' /> { }
                {(Number(this.state.item.price) / 1000000000000000000).toFixed(2)} { }
                <span className='fs-5 fw-light'>(Wei: {this.state.item.price})</span>
              </p>
              <p>Shipping to: <i>Unavailable</i></p>
              {
                (this.state.loading !== 0)
                  ? <IsLoading isLoading={this.state.loading} />
                  : <button className='btn btn-primary px-5 fw-bold' onClick={this.triggerBuy}>
                    <FontAwesomeIcon icon={faWallet} /> { } Buy now
                  </button>
              }
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 ps-0 pe-0 pe-md-3 mb-3' >
              <div className='bg-light p-3 h-100' >
                <h5 className='text-center' >About</h5>
                <p className=' px-4 text-secondary' style={{ overflowY: 'scroll', height: '150px' }} >
                  <strong className='text-dark'>Item address:</strong>
                  <ToastAutoHide
                    message='Copy'
                    feedback='Copied!'
                    title={this.state.item._id}
                    content={this.state.item._id}
                  /><br />
                  <strong className='text-dark'>Create at: </strong> {(this.state.item.createdAt).substring(0, 10)}<br />
                  <strong className='text-dark'>External Link:</strong><br />
                  <a
                    className='overflow-hidden text-wrap text-break text-secondary'
                    href={this.state.item.externalLink}
                  >
                    {this.state.item.externalLink}
                  </a><br />

                  <strong className='text-dark'>Raw data url:</strong><br />
                  <a
                    className='overflow-hidden text-wrap text-break text-secondary'
                    href={'http://localhost:4000/raw/item/' + this.state.item._id}
                  >
                    http://localhost:4000/raw/item/{this.state.item._id}
                  </a>
                </p>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-8 bg-light rounded-3 py-3 mb-3'>
              <h5 className='text-center'>Description</h5>
              <div className=' px-4 text-wrap' style={{ textAlign: 'justify', overflowY: 'scroll', height: '150px' }}>
                {this.state.item.description}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 bg-light rounded-3 py-3 mb-3'>
              <h5 className='text-center'>Specifications</h5>
              <div className=' px-4 text-wrap' style={{ textAlign: 'justify' }}>
                {this.state.item.specifications}
              </div>
            </div>
          </div>
        </>
      )
    } else return null
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
            ? <button className='btn btn-primary fw-bold px-5' type='button'>
              <FontAwesomeIcon icon={faCheckCircle} /> { } Done!
            </button>
            : <button className='btn btn-danger fw-bold px-5' type='button'>
              <FontAwesomeIcon icon={faExclamationCircle} /> { } Rejected
            </button>
        }
      </>
    )
  }
}


export default ItemDetail