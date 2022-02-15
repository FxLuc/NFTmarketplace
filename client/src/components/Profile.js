import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ToastAutoHide from './ToastAutoHide'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.account.name,
            externaLink: '',
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

    updateAvatar= async (event) => {
        event.preventDefault()
        const picture = this.state.picture
        const formData = new FormData()
        formData.append('file', picture, picture.name)
        formData.append('_id', this.props.account._id)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ':\n' + pair[1]); 
        // }

        axios
            .post('http://localhost:4000/account/update/avatar', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error))
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        const { picture, name, externaLink } = this.state

        // add item to blockchain
        // await this.itemManager.methods.createItem(name, specifications, externaLink).send({ from: this.accounts[0] })

        // add new item to server
        const formData = new FormData()
        formData.append('file', picture, picture.name)
        formData.append('name', name)
        formData.append('_id', this.props.account._id)
        formData.append('externaLink', externaLink)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ':\n' + pair[1]); 
        // }

        axios
            .post('http://localhost:4000/account/update', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className='Profile'>
                <img alt='background cover' className="mt-5 w-100" style={{ objectFit: 'cover', height: '250px', position: 'absolute', left: '0px', top: '0px', zIndex: -1 }} src='background_cover.jpg' />
                <div className='row mb-5'>
                    <div className='col-12 text-center'>
                        <img src={this.props.account.avatar} className="rounded-circle" style={{ objectFit: 'cover', height: '75px', width: '75px' }} alt='avatar' />
                        <h2 className='mt-2 fw-bold'>{this.props.account.name}</h2>
                        <div className='text-muted'>
                            <ToastAutoHide message='Copy' feedback='Copied!' content={this.props.account._id} />
                        </div>
                    </div>
                </div>
                <form>
                    <div className='form-group my-3'>
                        <label htmlFor='picture' className='fw-bold'>Picture <span className='text-danger'>*</span></label>
                        <br />
                        <small className='text-muted'>File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</small>
                        <input type='file' name='picture' id='picture' className='form-control' onChange={this.getFileInfo}></input>
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
                        <label htmlFor='externaLink' className='fw-bold'>External Link</label>
                        <br />
                        <small className='text-muted'>Include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</small>
                        <input name='externaLink' id='externaLink' value={this.state.externaLink} onChange={this.handleInputChange} type='text' className='form-control' placeholder='https://yoursite.io/item/123' />
                    </div>

                    <div className='my-3 fw-bold fst-italic text-danger'>Freeze metadata: <span className='fw-normal text-dark'>Your metadata will permanently lock and store all of this item's content in decentralized file storage.</span></div>

                    <button className='btn btn-primary fw-bold px-5' type='submit' onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        )
    }
}

export default Profile