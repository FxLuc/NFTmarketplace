import React from 'react'
import ToastAutoHide from '../ToastAutoHide'
import Avatar from './Avatar'
import Name from './Name'
import MyItem from './MyItem'
import MyOrder from './MyOrder'
import { Tabs, Tab } from 'react-bootstrap'

class Profile extends React.Component {
    render() {
        return (
            <div className='Profile'>
                <img
                    alt='background cover'
                    className="mt-5 w-100"
                    style={{
                        objectFit: 'cover',
                        height: '280px',
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        zIndex: -1
                    }}
                    src='background_cover.jpg'
                />
                <div className='row mb-4'>
                    <div className='col-12 text-center'>
                        <Avatar avatar={this.props.account.avatar} _id={this.props.account._id} />
                        <Name accountName={this.props.account.name} _id={this.props.account._id} />
                        <h4 className='text-muted'>
                            <ToastAutoHide
                                message='Copy'
                                feedback='Copied!'
                                title={this.props.account._id}
                                content={this.props.account._id}
                            />
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <Tabs
                        defaultActiveKey="items"
                        transition={true}
                        className="mb-3"
                    >
                        <Tab eventKey="items" title="Items">
                            <MyItem accountId={this.props.account._id} />
                        </Tab>
                        <Tab eventKey="sales" title="Sales order">
                            <MyOrder accountId={this.props.account._id} web3={this.props.web3} order='sales' />
                        </Tab>
                        <Tab eventKey="purchase" title="Purchase order">
                            <MyOrder accountId={this.props.account._id} web3={this.props.web3} order='purchase' />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}



export default Profile