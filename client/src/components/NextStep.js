import React from "react"

class NextStep extends React.Component {
  handleBuy = () => {
    this.props.buy()
  }

  handleDelivery = () => {
    this.props.delivery()
  }

  covertStep(step) {
    if (step === '0') return 'Created'
    else if (step === '1') return 'Paid'
    else return 'Delivered'
  }

  covertNextStep(data) {
    if (data === '0') return (
      <button className="btn btn-success py-0" type="button" onClick={this.handleBuy}>Buy &#x276F;&#x276F;</button>
    )
    else if (data === '1') return (<button className="btn btn-warning py-0" type="button" onClick={this.handleDelivery}>Delivery &#x276F;&#x276F;</button>)
    else return (<button className="btn btn-secondary py-0" type="button" disabled>Not available</button>)
  }

  render() {
    return (
      <td className="NextStep d-flex justify-content-between">
        {this.covertStep(this.props.step)}
        {this.covertNextStep(this.props.step)}
      </td>
    )
  }
}

export default NextStep;