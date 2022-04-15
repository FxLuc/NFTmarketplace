require('dotenv').config({ path: '../.env' })
const { Order } = require('../models')
const { OrderContractJSON, web3 } = require('./infura.controller')

const getPurchaseOrder = (req, res) => {
    Order
        .find({ purchaser: req.query._id })
        .sort('-createdAt')
        .limit(12)
        .populate('itemContract', '_id name picture price owner')
        .then(items => res.status(200).json(items))
        .catch(error => res.status(404).json(error))
}

const getSalesOrder = (req, res) => {
    Order
        .find({ seller: req.query._id })
        .sort('-createdAt')
        .limit(12)
        .populate('itemContract', '_id name picture price owner')
        .then(items => res.status(200).json(items))
}

const updateOrder = async (req, res) => {
    const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, req.body._id)
    const orderState = await OrderContract.methods.state().call()
    const orderDealine = await OrderContract.methods.getDeadline().call()
    Order
        .findByIdAndUpdate(req.body._id, {
            state: orderState,
            deadline: orderDealine
        })
        .exec((err, data) => {
            if (err) res.status(500).json(err)
            else res.status(201).json(data)
        })
}

const delivery = (req, res) => {
    Order
        .findById(req.body.id)
        .select('nowIn')
        .then(orderNowIn => {
            if (orderNowIn.nowIn === 'Nowhere') {
                Order
                    .findByIdAndUpdate(req.body.id, {
                        from: req.body.nowIn,
                        nowIn: req.body.nowIn
                    })
                    .exec(err =>
                        err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
                    )
            } else {
                Order
                    .findByIdAndUpdate(req.body.id, {
                        nowIn: req.body.nowIn,
                    })
                    .exec(err =>
                        err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
                    )
            }
        })
}

const setDeliveryTo = async (req, res) => {
    Order
        .findByIdAndUpdate(req.body.id, {
            to: req.body.to,
        })
        .exec(err =>
            err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
        )
}


module.exports = {
    getPurchaseOrder,
    getSalesOrder,
    updateOrder,
    delivery,
    setDeliveryTo
}