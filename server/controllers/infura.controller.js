const ItemManagerContractJSON = require('../contracts/ItemManager.json')
const OrderContractJSON = require('../contracts/Order.json')
const ItemContractJSON = require('../contracts/Item.json')

const Web3 = require('web3')
const ethers  = require("ethers")

var provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_WS_ENDPOINT)
setInterval( () => provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_WS_ENDPOINT), 3600000)

var web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WS_ENDPOINT))
// reconnect web socket
setInterval( () => web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WS_ENDPOINT)), 3600000)

console.log(`Listening Infura Websocket provider: ${process.env.INFURA_WS_ENDPOINT}`)
var ItemManagerContract

// listenning Item manager contract event
(async () => {
    ItemManagerContract = await new web3.eth.Contract(
        ItemManagerContractJSON.abi,
        process.env.ITEM_MANAGER_ADDRESS
    )
    console.log(`Item manager Smart contract address: ${process.env.ITEM_MANAGER_ADDRESS}`)
    
    // call every 20 minutes to keep web socket alive
    setInterval( () => ItemManagerContract.methods.currentItemIndex().call(), 1200000)

    ItemManagerContract.events.ItemStateChanged().on('data', async event => {
        const lastItemIndex = await ItemManagerContract.methods.currentItemIndex().call()
        //  Item created
        console.log(event.returnValues.state)
        if (event.returnValues.state == '0' && event.returnValues.itemIndex == (lastItemIndex - 1)) {
            // wait for node fully synced
            await new Promise(resolve => setTimeout(resolve, 5000))

            ItemManagerContract.methods.items(event.returnValues.itemIndex).call()
                .then(sItemStruct => new web3.eth.Contract(ItemContractJSON.abi, sItemStruct._item))
                .then(ItemContractInstance => ItemContractInstance.methods.rawDataHash().call()
                    .then(rawDataHash => {
                        //  add item to database include raw data hash
                        Item.findOne({ rawDataHash: rawDataHash }).then(itemhiden => {
                            const newItem = new Item({
                                _id: ItemContractInstance._address,
                                name: itemhiden.name,
                                price: itemhiden.price,
                                owner: itemhiden.owner.toLowerCase(),
                                description: itemhiden.description,
                                specifications: itemhiden.specifications,
                                externalLink: itemhiden.externalLink,
                                rawDataHash: rawDataHash,
                                picture: itemhiden.picture,
                                state: 0
                            })
                            newItem.save()
                            console.log("New Item: " + ItemContractInstance._address)
                        }).then(() => {
                            // delete old item data
                            Item.findOneAndDelete({ rawDataHash: rawDataHash })
                                .exec(error => {
                                    if (error) {
                                        console.log(error)
                                    }
                                })
                        })
                    })
                ).catch(error => console.log(error))
        }

        // listen Item sold event
        else if (event.returnValues.state == '1') {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call().then(sItemStruct => {
                // change item state and hide item
                Item.findByIdAndUpdate(sItemStruct._item, {
                    order: sItemStruct._order,
                    state: 1
                }).exec(error => {
                    if (error) {
                        console.log(error)
                    } else {
                        (async () => {
                            // wait for node fully synced
                            await new Promise(resolve => setTimeout(resolve, 5000))
                            // save order object in the database
                            const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, sItemStruct._order)
                            const newOrder = new Order({
                                _id: OrderContract._address,
                                price: await OrderContract.methods.getBalance().call(),
                                seller: (await OrderContract.methods.seller().call()).toLowerCase(),
                                deadline: await OrderContract.methods.getDeadline().call(),
                                itemContract: await OrderContract.methods.itemContract().call(),
                                purchaser: (await OrderContract.methods.purchaser().call()).toLowerCase(),
                            })
                            newOrder.save().catch(err => console.log(err))
                            console.log("Order: " + OrderContract._address)
                        })()
                    }
                })
            })
        }

        // listen Item delivered event
        else if (event.returnValues.state == '2') {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call().then(sItemStruct => {
                (async () => {
                    // wait for node fully synced
                    await new Promise(resolve => setTimeout(resolve, 5000))
                    // change ownership and show item
                    console.log("Delivered item: " + sItemStruct._item)
                    const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, sItemStruct._order)
                    Item.findByIdAndUpdate(await OrderContract.methods.itemContract().call(), {
                        owner: (await OrderContract.methods.purchaser().call()).toLowerCase(),
                        state: 2
                    }).exec(error => {
                        if (error) console.log(error)
                    })
                })()
            })
        }

        // listen Item cancel event
        else if (event.returnValues.state == '3') {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call().then(sItemStruct => {
                (async () => {
                    Item.findByIdAndUpdate(sItemStruct._item, {
                        state: 3
                    }).exec(error => {
                        if (error) console.log(error)
                    })
                })()
            })
        }
    })
})()

module.exports = {
    ItemContractJSON,
    OrderContractJSON, 
    ItemManagerContract,
    web3,
    ethers,
    provider
}