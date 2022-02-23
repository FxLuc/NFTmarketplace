import React from 'react'
import ToastAutoHide from '../ToastAutoHide'
import Avatar from './Avatar'
import Name from './Name'
import MyItem from './MyItem'
import MyOrder from './MyOrder'
import MySold from './MySold'

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
                        <h4 className='text-muted'>
                            <ToastAutoHide message='Copy' feedback='Copied!' title={this.props.account._id} content={this.props.account._id} />
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    {(this.props.account._id === '0x0000000000000000000000000000000000000000') ? null : <MyItem accountId={this.props.account._id} />}
                    {(this.props.account._id === '0x0000000000000000000000000000000000000000') ? null : <MyOrder title='My orders' accountId={this.props.account._id} web3={this.props.web3} />}
                    {(this.props.account._id === '0x0000000000000000000000000000000000000000') ? null : <MySold title='Sold' accountId={this.props.account._id} web3={this.props.web3} />}
                </div>
            </div>
        )
    }
}



export default Profile