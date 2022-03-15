import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner'

class CreateButton extends React.Component {
    render() {
        return (
            <>
                {(this.props.isLoading === 1)
                    ?
                    <button className='btn btn-secondary fw-bold px-5' type='submit' disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> { } Pending...
                    </button>

                    : (this.props.isLoading === 3)
                        ? <button className='btn btn-primary fw-bold px-5' type='submit'>
                            <FontAwesomeIcon icon={faCheckCircle} /> { } Done
                        </button>
                        : <button className='btn btn-danger fw-bold px-5' type='submit'>
                            <FontAwesomeIcon icon={faExclamationCircle} /> { } Rejected
                        </button>
                }
            </>
        )
    }
}

export default CreateButton