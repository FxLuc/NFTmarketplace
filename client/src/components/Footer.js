import React from 'react'
import ToastAutoHide from './ToastAutoHide'

class Footer extends React.Component {
    render() {
        return (
            <div
                className="d-flex flex-column bg-primary text-light"
            >
                <div className='container'>
                    <div className='row py-1'>
                        <div className='col-12 col-sm text-center text-sm-start'>
                            <img
                                src="/logo_F_white.png"
                                alt="findex_logo"
                                width="42"
                                height="42"
                                className="d-inline-block align-top mt-2"
                            />
                            <p className='fw-bold fs-5 mb-0'>FINDEX</p>
                            <p>Freedom marketplace to buy, sell, and discover items.</p>
                            <ToastAutoHide message='Copy this contract address' feedback='Copied to clipboard!' title={this.props.contractAddress} content={this.props.contractAddress} />

                        </div>
                        <div className='d-none d-sm-block col-sm text-end'>
                        </div>
                    </div>
                    <hr className='m-0' />
                    <div className='row pt-1 pb-2'>
                        <div className='col-12 col-sm text-center text-sm-start'>
                            © 2021-2022 <a href='https://fb.me/fil.often127' className='text-light'>FIL Organization</a>
                        </div>
                        <div className='col-12 col-sm text-center text-sm-end'>
                            <a href='#privacy-policy' className='text-light me-3'>Privacy Policy</a>
                            <a href='#privacy-policy' className='text-light'>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Footer;