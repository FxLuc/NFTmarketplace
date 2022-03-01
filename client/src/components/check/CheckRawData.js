import React from 'react'
import ToastAutoHide from '../ToastAutoHide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

class CheckRawData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rawData: '',
            rawDataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            originalHash: '',
            verify: 0
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.originalHash) {
            if (this.state.originalHash ===  this.props.web3.utils.soliditySha3(this.state.rawData)){
                this.setState({
                    verify: 1
                })
            } else {
                this.setState({
                    verify: 2
                })
            }
        }
        this.setState({
            rawDataHash: this.props.web3.utils.soliditySha3(this.state.rawData)
        })
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='CheckRawData'>
                <form className='' onSubmit={this.handleSubmit}>
                    <h1>Check raw data hash</h1>
                    <div className='form-group my-3'>
                        <label htmlFor='originalHash' className='fw-bold'>Original hash (soliditySha3)</label>
                        <br />
                        <small className='text-muted'>Item rawDataHash in blockchain</small>
                        <input name='originalHash' id='originalHash' value={this.state.originalHash} onChange={this.handleInputChange} type='text' className='form-control' placeholder='0x08ad4fc28a304171effc0d6e6f6600e97262606149311cb02ab367ed9cddfb12' />
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='rawData' className='fw-bold'>Raw data<span className='text-danger'>*</span></label>
                        <br />
                        <small className='text-muted'>Get raw data at {process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/raw/item/itemAddress<br />({process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/raw/item/0x0000000000000000000000000000000000000000)</small>
                        <textarea
                            name='rawData'
                            id='rawData'
                            rows='5'
                            onChange={this.handleInputChange}
                            value={this.state.rawData}
                            className='form-control'
                            placeholder='Paste item raw data here
For example:
{"name":"RAM 4GB SDRAM DDR3 1333MHz","description":"Perfect for every computing environment.","specifications":"Brand: Samsung\r\nManufacturer: Samsung Electronics (SEC)\r\nCountry of manufacture: China\r\nBuild (year/week): 2011/13","externalLink":"https://semiconductor.samsung.com/dram/ddr/ddr3/","picture":"http://localhost:4000/pictures/items/1645356504510-19479624abstract-pastel-colorful-gradient-background-concept-for-your-graphic-colorful-design-vector.jpg"}'
                            required
                        ></textarea>
                    </div>
                    {(this.state.verify !== 0) ? <IsVerify verify={this.state.verify} /> : <button className='btn btn-primary fw-bold px-5 mt-3' type='submit'>Check hash</button>}
                </form>
                <h3 className='mt-3 text-muted'>Raw data hashed: </h3>
                <h4 className='text-secondary'>
                    <ToastAutoHide message='Copy' feedback='Copied!' title={this.state.rawDataHash || '0x0000000000000000000000000000000000000000000000000000000000000000'} content={this.state.rawDataHash} />
                </h4>
            </div>
        )
    }
}

class IsVerify extends React.Component {
    render() {
        return (
            <>
                {(this.props.verify === 1)
                        ? <button className='btn btn-success fw-bold px-5 mt-3' type='submit'>
                            <FontAwesomeIcon icon={faCheckCircle} /> { } Verified
                        </button>
                        : <button className='btn btn-danger fw-bold px-5 mt-3' type='submit'>
                            <FontAwesomeIcon icon={faExclamationCircle} /> { } Not verified
                        </button>
                }
            </>
        )
    }
}

export default CheckRawData