const ItemManager = artifacts.require("./itemManager.sol")

contract("ItemManager", accounts => {
    it("...should be able to add an Item", async () => {
        const ItemManagerInstance = await ItemManager.deployed()
        const itemName = 'test_01'
        const itemPrice = 500

        const result = await ItemManagerInstance.createItem(itemName, itemPrice, {from: accounts[0]})
        console.log(result);
        
        assert.equal(result.logs[0].args._itemIndex, 0, "It's not the first item")
        const item = await ItemManagerInstance.items(0)
        assert.equal(item._identifier, itemName, "The identifier was different")
    })
})