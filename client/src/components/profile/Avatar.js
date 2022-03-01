import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


class Avatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editAvatarElement: false,
            avatar: null
        }
    }

    getFileInfo = event => {
        const picture = event.target.files[0]
        const formData = new FormData()
        formData.append('file', picture, picture.name)
        formData.append('_id', this.props._id)

        axios
            .post(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/account/update/avatar`, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(res => {
                this.setState({ avatar: res.data})
            })
            .catch(_ => window.location = `${process.env.REACT_APP_HTTP_CLIENT_ENDPOINT}/error`)
    }

    showEditAvatarElement = () => {
        this.setState({ editAvatarElement: true })
    }

    hideEditAvatarElement = () => {
        this.setState({ editAvatarElement: false })
    }

    render() {
        return (
            <div className='mb-2' style={{ display: 'grid', gridTemplate: '1fr / 1fr', placeItems: 'center' }}>
                <img src={this.state.avatar ? this.state.avatar : this.props.avatar} onMouseEnter={this.showEditAvatarElement} className="rounded-circle" style={{ objectFit: 'cover', height: '75px', width: '75px', zIndex: 1, gridColumn: '1 / 1', gridRow: '1 / 1' }} alt='avatar' />
                {this.state.editAvatarElement ? (
                    <div className="rounded-circle" onMouseLeave={this.hideEditAvatarElement} style={{ height: '75px', width: '75px', zIndex: 2, gridColumn: '1 / 1', gridRow: '1 / 1', backgroundColor: '#00000055'}} >
                        <FontAwesomeIcon icon={faPencilAlt} className='text-secondary' style={{ height: '40px', width: '40px', position: 'relative', top: '17px', zIndex: 2, gridColumn: '1 / 1', gridRow: '1 / 1' }} />
                        <label htmlFor="picture" className="rounded-circle" style={{  position: 'relative', top: '-45px', height: '75px', width: '75px', zIndex: 3, gridColumn: '1 / 1', gridRow: '1 / 1'}}></label>
                        <input type='file' name='picture' id='picture' onChange={this.getFileInfo} hidden accept="image/*" ></input>
                    </div>
                ) : null}

            </div>
        )
    }
}

export default Avatar