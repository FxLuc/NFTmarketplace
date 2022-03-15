import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ToastAutoHide from '../ToastAutoHide'
import BuyButton from './BuyButton'

function ItemDetail(props) {
  const { itemAddress } = useParams()
  return (
    <Detail itemAddress={itemAddress} web3={props.web3} account={props.account} />
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

  componentDidMount() {
    // load item
    axios
      .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item`, { params: { _id: this.props.itemAddress } })
      .then(res => {
        if (res.data === null) {
          window.location = `${process.env.REACT_APP_HTTP_CLIENT_ENDPOINT}/error`
        }
        this.setState({ item: res.data })
      })
      .catch(_ => window.location = `${process.env.REACT_APP_HTTP_CLIENT_ENDPOINT}/error`)
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
                style={{ objectFit: 'contain', maxHeight: '350px', width: '100%' }}
                alt={this.state.item.name}
              />
            </div>
            <div 
            className='col-12 col-md-6 col-lg-8 bg-light rounded-3 py-3 mb-3 p-4 h-100 text-center text-md-start border border-2'
            style={{ minHeight: '350px' }}
            >
              Owned by: { }
              <span className='text-secondary'>
                <ToastAutoHide
                  message='Copy'
                  feedback='Copied!'
                  title={this.state.item.owner}
                  content={this.state.item.owner} />
              </span>
              <h3 className="pb-3 col-12 mt-2">{this.state.item.name}</h3>
              <BuyButton web3={this.props.web3} account={this.props.account} item={this.state.item} />
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 ps-0 pe-0 pe-md-3 mb-3 ' >
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
                    href={`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/raw/item/${this.state.item._id}`}
                  >
                    {`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/raw/item/${this.state.item._id}`}
                  </a><br />
                  <strong className='text-dark'>Raw data hash:</strong><br />
                  <span className='text-secondary'>
                    <ToastAutoHide
                      message='Copy'
                      feedback='Copied!'
                      title={this.state.item.rawDataHash}
                      content={this.state.item.rawDataHash} />
                  </span>
                </p>
              </div>
            </div>
            <div className='col-12 col-md-6 col-lg-8 bg-light rounded-3 py-3 mb-3'>
              <h5 className='text-center'>Description</h5>
              <div className='text-center px-4 text-wrap' style={{ overflowY: 'scroll', height: '150px' }}>
                {this.state.item.description.split('\n').map(str => <p key={str}>{str}</p>)}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 bg-light rounded-3 py-3 mb-3'>
              <h5 className='text-center'>Specifications</h5>
              <div className=' px-4 text-wrap' style={{ textAlign: 'justify' }}>
              {this.state.item.specifications.split('\n').map(str => <p key={str}>{str}</p>)}
              </div>
            </div>
          </div>
        </>
      )
    } else return null
  }
}

export default ItemDetail