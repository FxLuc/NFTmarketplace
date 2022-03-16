import React from 'react'
import axios from 'axios'
import ItemCard from '../home/ItemCard'


class MyItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myItemList: null,
            loaded: false
        }
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/my`, { params: { _id: this.props.accountId } })
            .then(res => this.setState({
                myItemList: res.data,
                loaded: true
            }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accountId !== this.props.accountId) {
            axios
                .get(`${process.env.REACT_APP_HTTP_SERVER_ENDPOINT}/item/my`, { params: { _id: this.props.accountId } })
                .then(res => this.setState({
                    myItemList: res.data,
                }))
        }
    }

    render() {
        return (
            <>
                <div className='py-3 row'>
                    {this.state.loaded ? this.state.myItemList.map(item => <ItemCard item={item} key={item._id} />) : null}
                </div>
            </>
        )
    }
}

export default MyItem