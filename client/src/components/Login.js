import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function Login(props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(0);
  return (
    <div className='text-center'>
      <img src="metamask_logo.png" style={{ height: '72px', marginBottom: '18px' }} alt='MetaMask logo' />
      {(isLoading >= 2) ?
        <>
          <h1 className='text-danger'><FontAwesomeIcon icon={faExclamationCircle} /> <strong className='text-uppercase'>No web3 instance injected</strong></h1>
          <h5>Failed to connect to your account on MetaMask</h5>
          <i>(Check console for more details)</i><br />
        </>
        : <>
          <h1 className='text-dark'> <strong className='text-uppercase'>CONNECT WITH METAMASK</strong></h1>
          <h5>Allow this site to:</h5>
          <i>See address, account balance, activity and suggest transactions to approve.</i><br />
        </>
      }{
        (isLoading === 0) ?
          <button onClick={() => {
            setIsLoading(1)
            props.login().then(result => {
              if (result === false) setIsLoading(2)
              else navigate(-1)
            })
          }}
            className='btn btn-primary my-3'>
            <strong> CONTINUE</strong>
          </button>
          : (isLoading === 1)
            ? <button
              className='btn btn-secondary my-3' disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> { } <strong> Pending...</strong>
            </button>
            : (isLoading === 2)
              ? <button
                className='btn btn-primary my-3'
                onClick={() => {
                  setIsLoading(3)
                  props.login().then(result => {
                    if (result === false) setIsLoading(2)
                    else navigate(-1)
                  })
                }}>
                <strong> TRY AGAIN</strong>
              </button>
              : <button
                className='btn btn-secondary my-3' disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> { } <strong> Pending...</strong>
              </button>
      }
      <div className='py-2'>
        {(isLoading >= 2)
          ? <p>Maybe this is your first time visiting our website. <br />
            This website is based on ethereum blockchain platform.<br />
            It's required your MetaMask account in the Goerli network for the site to working properly.<br />
            Please install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask extension</a> and read the docs { }
            <a href='https://medium.com/@ethvalidator/a-quick-guide-on-how-to-get-test-eth-in-the-goerli-network-7066dc915989'>How to connect Metamask to this website?</a>
          </p>
          : <p>
            Please install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask extension</a> and read the docs { }
            <a href='https://medium.com/@ethvalidator/a-quick-guide-on-how-to-get-test-eth-in-the-goerli-network-7066dc915989'>How to connect Metamask to Goerli testnet.</a>
          </p>
        }
      </div>
    </div>
  )
}

export default Login