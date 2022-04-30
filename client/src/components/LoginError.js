import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class LoginError extends React.Component {
  render() {
    return (
      <div className='text-center'>
        <img src="metamask_logo.png" style={{ height: '72px', marginBottom: '18px' }} alt='MetaMask logo' />

        <h1 className='text-danger'><FontAwesomeIcon icon={faExclamationCircle} /> <strong className='text-uppercase'>No web3 instance injected</strong></h1>
        <h5>Failed to connect to your account on MetaMask</h5>
        <i>(Check console for more details)</i><br />

        <button
          className='btn btn-primary my-3'
          onClick={() => {
            this.props.login()
          }}>
        <strong> TRY AGAIN</strong>
        </button>

        <div className='py-2'>
          <p>Maybe this is your first time visiting our website. <br />
            This website is based on ethereum blockchain platform.<br />
            It's required your MetaMask account in the Goerli network for the site to working properly.<br />
            Please install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask extension</a> and read the docs { }
            <a href='https://medium.com/@ethvalidator/a-quick-guide-on-how-to-get-test-eth-in-the-goerli-network-7066dc915989'>How to connect Metamask to this website?</a>
          </p>
        </div>
      </div>
    )
  }
}

export default LoginError