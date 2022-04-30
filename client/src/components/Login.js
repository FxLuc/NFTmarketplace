import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const navigate = useNavigate()
  return (
    <div className='text-center'>
      <img src="metamask_logo.png" style={{ height: '72px', marginBottom: '18px' }} alt='MetaMask logo' />

      <h1 className='text-dark'> <strong className='text-uppercase'>CONNECT WITH METAMASK</strong></h1>
      <h5>Allow this site to:</h5>
      <i>See address, account balance, activity and suggest transactions to approve.</i><br />

      <button
        className='btn btn-primary my-3'
        onClick={async () => {
          const error = await props.login()
          if (error) {
            navigate('/login_error')
          }
        }}
      >
        <strong> CONTINUE</strong>
      </button>

      <div className='py-2 mt-5'>
        <p>
          Please install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask extension</a> and read the docs { }
          <a href='https://medium.com/@ethvalidator/a-quick-guide-on-how-to-get-test-eth-in-the-goerli-network-7066dc915989'>How to connect Metamask to Goerli testnet.</a>
        </p>
      </div>
    </div>
  )
}

export default Login