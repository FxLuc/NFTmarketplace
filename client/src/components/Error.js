import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

class Error extends React.Component {
  render() {
    return (
      <div className='Error text-center py-5'>
        <h1 className='text-danger'><FontAwesomeIcon icon={faExclamationTriangle} /> <strong>404 NOT FOUND</strong> <FontAwesomeIcon icon={faExclamationTriangle} /></h1>
        <div className='py-3'>
          <h5>Failed to load server... </h5>
          <div className='mb-5'>
            Dev: Check console for more details.
          </div>
          <p>Maybe this is your first time visiting our website. <br />
            This website is based on ethereum blockchain platform<br />
            It's required your MetaMask account in the Goerli network for the site to working properly.<br />
            Please install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask extension</a> and read the docs { }

            <a href='https://medium.com/@ethvalidator/a-quick-guide-on-how-to-get-test-eth-in-the-goerli-network-7066dc915989'>How to connect Metamask to this website?</a>
          </p>
        </div>
      </div>
    )
  }
}

export default Error