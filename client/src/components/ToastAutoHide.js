import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

class ToastAutoHide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            message: props.message
        }
    }

    copyToClipboard = () => {
        navigator.clipboard.writeText(this.props.content)
        this.setState({ message: this.props.feedback })
    }

    showTooltip = () => {
        this.setState({ show: true })
    }

    hideTooltip = () => {
        this.setState({ show: false })
        setTimeout(() => this.setState({ message: this.props.message }), 3000)
    }

    render() {
        return (
            <OverlayTrigger
                trigger={["hover", "focus"]}
                delay={{ hide: 250, show: 0 }}
                show={this.state.show}
                overlay={(props) => (
                    <Tooltip {...props}>
                        {this.state.message}
                    </Tooltip>
                )}
                placement="bottom"
            >
                <p
                    onClick={this.copyToClipboard}
                    onMouseEnter={this.showTooltip}
                    onMouseLeave={this.hideTooltip}
                    className='text-nowrap overflow-hidden'
                    style={{ textOverflow: 'ellipsis' }}
                >
                    <FontAwesomeIcon icon={faCopy} /> { }
                    {this.props.title}
                </p>
            </OverlayTrigger>
        )
    }
}

export default ToastAutoHide
