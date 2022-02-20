const ItemManager = artifacts.require("./ItemManager.sol")
const Item = artifacts.require("./Item.sol")

contract("ItemManager", accounts => {
    it("...should be able to add an Item", async () => {
        const ItemManagerInstance = await ItemManager.deployed()
        const itemName = 'SAMSUNG 4GB 2Rx8 PC3-12800S-11-11-F3 Laptop RAM Memory'
        const itemSpecifications = 'Brand\: Samsung\nMPN\: PC312800S1111F3\nForm Factor\: SO-DIMM\nType\: DDR3 SDRAM\nBus Speed\: 12800 (1600MHz)\nTotal Capacity\: 4GB'
        const itemRawDataHash = '0x3031303230333034000000000000000000000000000000000000000000000000'
        const itemPrice = 1000000
        const result = await ItemManagerInstance.createItem(itemName, itemSpecifications, itemRawDataHash, itemPrice, {from: accounts[0]})
        console.log(result);
        
        assert.equal(result.logs[0].args.itemIndex, 0, "It's not the first item")
        const s_item = await ItemManagerInstance.items(0)
        const ItemInstance = await Item.at(s_item._item)
        const ItemInstanceName = await ItemInstance.name()
        assert.equal(ItemInstanceName, itemName, "Item name was different")
    })
})