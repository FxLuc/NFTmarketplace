import React from 'react'

function Footer() {
    return (
        <div 
            className="d-flex flex-column bg-primary text-light"
            // style={{ minHeight: '90vh' }}
        >
            <div className='container'>
                <div className='row py-1'>
                    <div className='col-12 col-sm text-center'>
                        <p className='fw-bold fs-5 mb-0'>FINDEX</p>
                        <p className='mb-1'>Freedom marketplace to buy, sell, and discover items.</p>
                    </div>
                </div>
                <hr className='m-0' />
                <div className='row pt-1 pb-2'>
                    <div className='col-12 col-sm text-center text-sm-start'>
                        © 2021-2022 <span className='fw-bold'>F</span> Organization
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