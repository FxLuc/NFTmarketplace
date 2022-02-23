import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class Error extends React.Component {
  render() {
    return (
      <div className='Error text-center py-5'>
        <h1 className='text-danger'><FontAwesomeIcon icon={faExclamationCircle}/> <strong>SOMETHING WENT WRONG</strong></h1>
        <div className='py-3'>
          <h5>Failed to load web3, accounts, contract, server...</h5>
          <div className=''>
            Check console for more details.
          </div>
        </div>
      </div>
    )
  }
}

export default Error