import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

class CreateItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Samsung RAM 4GB SDRAM DDR3 1333MHz (4GB, 2RX8, PC3-10600S-09-10-F2, M471B5273CH0-CH9)',
            specifications: 'Brand: Samsung\nManufacturer: Samsung Electronics (SEC)\nCountry of manufacture: China\nBuild (year/week): 2011/13\nType: DDR3 SDRAM\nBus Speed: 10600S (1333MHz)\nTotal Capacity: 4GB\nMemory Timing: CL=9, tRCD=9, tRP=9\nFeatures: 204pin, SODIMM, Unbuffer Non-ECC DDR3 SDRAM\nProduction process technology: 40nm\nData bits: x64\nInternal Module banks: 8\nRanks: 2\nData chip composition: 256M x 8 * 16 pcs\nComponent revision: 2Gb, C-die\nPackage: 78 ball FBGA\nVDD voltage: 1.5V\nHeight: 30mm\nItem Weight: 45.359 grams\nOperating Case Temperature Range: 0°C ~ 85°C',
            description: 'Perfect for every computing environment\nDeveloped in 2005, Samsung\'s industry-first DDR3 is the most used system solution, from PCs and home appliances, to automotive and medical devices.',
            externalLink: 'https://semiconductor.samsung.com/dram/ddr/ddr3/',
            picture: undefined,
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value })
    }

    getFileInfo = event => {
        this.setState({ picture: event.target.files[0] })
        console.log(event.target.files[0]);
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { picture, name, specifications, description, externalLink } = this.state

        // add new item to server
        const formData = new FormData()
        formData.append('file', picture, picture.name)
        formData.append('name', name)
        formData.append('owner', this.props.account._id)
        formData.append('specifications', specifications)
        formData.append('externalLink', externalLink)
        formData.append('description', description)

        axios
            .post('http://localhost:4000/item/create', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(res => {
                console.log(res)
                // add item to blockchain
                this.props.ItemManagerContract.methods
                    .createItem(name, specifications, 'http://localhost:4000/raw/item/', res.data, '0')
                    .send({ from: this.props.account._id })
                    .then(console.log)
                    .catch(console.log)
                // window.location = 'http://localhost:65535/'
            })
            .catch(error => console.log(error))

        // this.props.ItemManagerContract.methods.currentItemIndex().call().then(data => console.log(data))
    }

    render() {
        return (
            <div className='CreateItem'>
                <form>
                    <h1 className='fw-bold text-uppercase'>Create new item</h1>

                    <div className='text-muted'><span className='text-danger'>*</span> Required fields</div>

                    <div className='form-group my-3'>
                        <label htmlFor='picture' className='fw-bold'>Picture <span className='text-danger'>*</span></label>
                        <br />
                        <small className='text-muted'>File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</small>
                        <input type='file' name='picture' id='picture' className='form-control' onChange={this.getFileInfo} accept="image/*"></input>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='name' className='fw-bold'>Name <span className='text-danger'>*</span></label>
                        <br />
                        <small className='text-muted'>Everyone can find your item by this name.</small>
                        <input name='name' id='name' value={this.state.name} onChange={this.handleInputChange} type='text' className='form-control' placeholder='Item name' />
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='specifications' className='fw-bold'>Specifications <span className='text-danger'>*</span></label>
                        <br />
                        <small className='text-muted'>All specifications of your item.</small>
                        <textarea
                            name='specifications'
                            id='specifications'
                            rows='5'
                            onChange={this.handleInputChange}
                            value={this.state.specifications}
                            className='form-control'
                            placeholder='Specifications of your item.'
                        ></textarea>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='description' className='fw-bold'>Description:</label>
                        <br />
                        <small className='text-muted'>The description will be included on the item's detail page underneath its image. </small>
                        <textarea
                            name='description'
                            id='description'
                            rows='3'
                            onChange={this.handleInputChange}
                            value={this.state.description}
                            className='form-control'
                            placeholder='Provide a detailed description of your item.'
                        ></textarea>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='externalLink' className='fw-bold'>External Link</label>
                        <br />
                        <small className='text-muted'>Include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</small>
                        <input name='externalLink' id='externalLink' value={this.state.externalLink} onChange={this.handleInputChange} type='text' className='form-control' placeholder='https://yoursite.io/item/123' />
                    </div>

                    <div className='my-3 fw-bold fst-italic text-danger'><FontAwesomeIcon icon={faExclamationTriangle} /> Freeze metadata: <span className='fw-normal text-dark'>Your metadata will permanently lock and store all of this item's content in decentralized file storage.</span></div>

                    <button className='btn btn-primary fw-bold px-5' type='submit' onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        )
    }
}

export default CreateItem