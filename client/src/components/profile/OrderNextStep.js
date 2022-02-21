import React from "react"
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum, } from '@fortawesome/free-brands-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class OrderNextStep extends React.Component {
  triggerNext = () => {
    this.props.triggerNext()
  }

  triggerCancel = () => {
    this.props.triggerCancel()
  }

  covertOrderNextStep(data) {
    if (data === '0') {
      if (this.props.isOwner) {
        return (
          <button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Confirm &#x276F;&#x276F;</button>
        )
      } else {
        return (<button className="btn btn-secondary py-4" type="button" onClick={this.triggerCancel}>Call cancel</button>)
      }
    }
    else if (data === '1') {
      if (this.props.isOwner) {
        return (
          <button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Shipping &#x276F;&#x276F;</button>
        )
      } else {
        return (<button className="btn btn-secondary py-4" type="button" disabled>Not available &#x276F;&#x276F;</button>)
      }
    }
    else if (data === '2') {
      if (this.props.isOwner) {
        return (
          <button className="btn btn-secondary py-4" type="button" disabled>Not available</button>
        )
      } else {
        return (<button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Delivered &#x276F;&#x276F;</button>)
      }
    }
    else if (data === '3') return (<button className="btn btn-secondary py-4" type="button" disabled>Not available</button>)
    else return (<button className="btn btn-secondary py-4" type="button" disabled>Canceled</button>)
  }

  render() {
    return (
      <td className="d-flex justify-content-between">
        {(this.props.loading === 0)
          ? (this.covertOrderNextStep(this.props.state))
          : (this.props.loading === 1)
            ? <button className="btn btn-secondary py-4" type="button" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> { } Pending...
            </button>
            : <button className="btn btn-secondary py-4" type="button" disabled>
              <FontAwesomeIcon icon={faExclamationCircle} /> { } Rejected
            </button>}
      </td>
    )
  }
}

export default OrderNextStep