import React from 'react'
import ToastAutoHide from './ToastAutoHide'
import Avatar from './Avatar'
import Name from './Name'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.account.name,
            externaLink: '',
        }
    }

    render() {
        return (
            <div className='Profile'>
                <img alt='background cover' className="mt-5 w-100" style={{ objectFit: 'cover', height: '250px', position: 'absolute', left: '0px', top: '0px', zIndex: -1 }} src='background_cover.jpg' />
                <div className='row mb-5'>
                    <div className='col-12 text-center'>
                        <Avatar avatar={this.props.account.avatar} _id={this.props.account._id} />
                        <Name accountName={this.props.account.name} _id={this.props.account._id} />
                        <div className='text-muted'>
                            <ToastAutoHide message='Copy' feedback='Copied!' content={this.props.account._id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Profile