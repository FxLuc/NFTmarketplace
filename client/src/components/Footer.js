import React from 'react'

function Footer() {
    return (
        <div
            className="d-flex flex-column bg-primary text-light"
        // style={{ minHeight: '90vh' }}
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
                        <p className='mb-1'>Freedom marketplace to buy, sell, and discover items.</p>
                    </div>
                    <div className='d-none d-sm-block col-sm text-end'>
                    </div>
                </div>
                <hr className='m-0' />
                <div className='row pt-1 pb-2'>
                    <div className='col-12 col-sm text-center text-sm-start'>
                        © 2021-2022 <a href='https://fb.me/f127.admin' className='text-light'>F Organization</a>
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


export default Footer;