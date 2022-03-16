import React from 'react'
import axios from 'axios'


class Name extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editNameElement: false,
            accountName: this.props.accountName,
            newName: this.props.accountName
        }
    }

    handleNameSubmit = event => {
        event.preventDefault()
        axios
            .post(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/account/update/name`, {
                name: this.state.newName,
                _id: this.props._id
            })
            .then(res => {
                console.log(res);
                this.setState({ accountName: this.state.newName })
                this.hideEditNameElement()
            })
    }

    handleNameChange = event => {
        this.setState({ newName: event.target.value })
    }

    showEditNameElement = () => {
        this.setState({ editNameElement: true })
    }

    hideEditNameElement = () => {
        this.setState({ editNameElement: false })
    }

    render() {
        return (
            <>
                <label
                    className={this.state.editNameElement ? 'd-none' : 'd-block'}
                    htmlFor="accountName">
                    <h2 onClick={this.showEditNameElement}>
                        {this.state.accountName}
                    </h2>
                </label>
                {this.state.editNameElement ? (
                    <form className={this.state.editNameElement ? 'd-block' : 'd-none'} onSubmit={this.handleNameSubmit}>
                        <input
                            type='text'
                            className='form-control my-1'
                            name='accountName'
                            id='accountName'
                            onBlur={this.hideEditNameElement}
                            onChange={this.handleNameChange}
                            value={this.state.newName}
                            required
                        ></input>
                    </form>
                ) : null}
            </>
        )
    }
}

export default Name