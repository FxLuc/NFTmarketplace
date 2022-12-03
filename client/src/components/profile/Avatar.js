import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'


class Avatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editAvatarElement: false,
            avatar: null
        }
    }

    getFileInfo = event => {
        if (event.target.files[0]
            && (event.target.files[0].type === 'image/jpeg'
                || event.target.files[0].type === 'image/jpg'
                || event.target.files[0].type === 'image/png')
        ) {
            const picture = event.target.files[0]
            const formData = new FormData()
            formData.append('file', picture, picture.name)
            formData.append('_id', this.props._id)

            axios
                .post(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/account/update/avatar`, formData, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                .then(res => {
                    this.setState({ avatar: `${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/pictures/avatars/${res.data}` })
                })
                .catch(_ => window.location = `${process.env.REACT_APP_HTTP_CLIENT_ENDPOINT}/error`)
        } else {
            document.getElementById('picture').value = null
            window.scroll(0, document.getElementById('picture'))
        }
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
                <img
                    src={this.state.avatar ? this.state.avatar : this.props.avatar}
                    onMouseEnter={this.showEditAvatarElement}
                    className="rounded-circle"
                    style={{
                        objectFit: 'cover',
                        height: '75px',
                        width: '75px',
                        zIndex: 1,
                        gridColumn: '1 / 1',
                        gridRow: '1 / 1'
                    }} alt='avatar'
                />
                {this.state.editAvatarElement
                    ? <div
                        className="rounded-circle"
                        onMouseLeave={this.hideEditAvatarElement}
                        style={{
                            height: '75px',
                            width: '75px',
                            zIndex: 2,
                            gridColumn: '1 / 1',
                            gridRow: '1 / 1',
                            backgroundColor: '#00000055'
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faImage}
                            className='text-light'
                            style={{
                                height: '32px',
                                width: '32px',
                                position: 'relative',
                                top: '20px',
                                zIndex: 2,
                                gridColumn: '1 / 1',
                                gridRow: '1 / 1'
                            }}
                        />
                        <label
                            htmlFor="picture"
                            className="rounded-circle"
                            style={{
                                position: 'relative',
                                top: '-45px',
                                height: '75px',
                                width: '75px',
                                zIndex: 3,
                                gridColumn: '1 / 1',
                                gridRow: '1 / 1'
                            }}
                        >
                        </label>
                        <input
                            type='file'
                            name='picture'
                            id='picture'
                            onChange={this.getFileInfo}
                            hidden
                            accept='image/png, image/jpg, image/jpeg'
                        />
                    </div>
                    : null
                }

            </div>
        )
    }
}

export default Avatar