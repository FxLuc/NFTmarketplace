import React from 'react'
import ToastAutoHide from '../ToastAutoHide'
import Avatar from './Avatar'
import Name from './Name'
import MyItem from './MyItem'
import MyOrder from './MyOrder'
import MySold from './MySold'
import axios from 'axios'
import HOST from '../../env'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.account.name,
            externaLink: '',
            myList: null,
            myOrderList: null,
            mySoldList: null,
            loaded: false
        }
    }

    componentDidMount() {
        axios
            .get(`${HOST}:50667/order/my`, { params: { _id: this.props.account._id } })
            .then(res => {this.setState({
                myList: res.data,
                myOrderList: (res.data).filter(order => order.purchaser === this.props.account._id),
                mySoldList: (res.data).filter(order => order.seller === this.props.account._id),
                loaded: true
            })
            console.log(res.data)
        
        })
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
                    <MyItem accountId={this.props.account._id} />
                    <MySold title='Sold' accountId={this.props.account._id} web3={this.props.web3} mySoldList={this.state.mySoldList} loaded={this.state.loaded} />
                    <MyOrder title='Paid' accountId={this.props.account._id} web3={this.props.web3} myOrderList={this.state.myOrderList} loaded={this.state.loaded} />
                </div>
            </div>
        )
    }
}



export default Profile