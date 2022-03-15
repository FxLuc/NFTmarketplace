import React from "react"
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class OrderNextStep extends React.Component {
  triggerNext = () => {
    this.props.triggerNext()
  }

  triggerCancel = () => {
    this.props.triggerCancel()
  }

  covertStep(step) {
    if (step === 0) return 'Placed'
    else if (step === 1) return 'Comfirmed'
    else if (step === 2) return 'Shipping'
    else if (step === 3) return 'Delivered'
    else return 'Canceled'
  }

  covertOrderNextStep(state) {
    if (state === 0) {
      if (this.props.isSeller) {
        return (
          <button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Confirm &#x276F;&#x276F;</button>
        )
      } else {
        return (<button className="btn btn-secondary py-4" type="button" onClick={this.triggerCancel}>Call cancel</button>)
      }
    }
    else if (state === 1) {
      if (this.props.isSeller) {
        return (
          <button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Shipped &#x276F;&#x276F;</button>
        )
      } else {
        return (<button className="btn btn-secondary py-4" type="button" disabled>Not available &#x276F;&#x276F;</button>)
      }
    }
    else if (state === 2) {
      if (this.props.isSeller) {
        return (
          <button className="btn btn-secondary py-4" type="button" disabled>Not available</button>
        )
      } else {
        return (<button className="btn btn-warning py-4" type="button" onClick={this.triggerNext}>Received &#x276F;&#x276F;</button>)
      }
    }
    else if (state === 3) return (<button className="btn btn-secondary py-4" type="button" disabled>Not available</button>)
    else return (<button className="btn btn-secondary py-4" type="button" disabled>Not available</button>)
  }

  render() {
    return (
      <td className="col-1 text-center">
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
        <strong>{this.covertStep(this.props.state)}</strong>
      </td>
    )
  }
}

export default OrderNextStep