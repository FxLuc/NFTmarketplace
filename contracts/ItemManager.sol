// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {

    enum SupplyChainState{Added, Sale, Sold}
    struct S_Item {
        Item _item;
        uint _price;
        ItemManager.SupplyChainState _state;
    }
    mapping (uint => S_Item) public items;
    uint public itemIndex;

    event SupplyChainStep(uint itemIndex, address indexed item, uint8 step);

    modifier itemFound(uint _itemIndex) {
        require(address(items[_itemIndex]._item) != address(0), "ItemManager: item not found!");
        _;
    }

    modifier onlyItemOwner(uint _itemIndex) {
        require(items[_itemIndex]._item.owner() == msg.sender, "ItemManager: caller is not the Item owner");
        _;
    }
    
    function createItem(bytes32 _identifier, bytes32 _specifications,  bytes32 _rawDataUrl, bytes32 _rawDataHash) public {
        Item item = new Item(this, _identifier, _specifications, _rawDataUrl, _rawDataHash, itemIndex);
        S_Item storage s_item = items[itemIndex];
        s_item._item = item;
        s_item._state = SupplyChainState.Added;
        emit SupplyChainStep(itemIndex, address(item), uint8(s_item._state));
        itemIndex++;
    }

    function triggerSale(uint _itemIndex, uint _price) public itemFound(_itemIndex) onlyItemOwner(_itemIndex){
        S_Item storage s_item = items[_itemIndex];
        require(s_item._state == SupplyChainState.Added, "ItemManager: This item state must be \"Added\" to make for sale!");
        s_item._price = _price;
        s_item._state = SupplyChainState.Sale;
        emit SupplyChainStep(_itemIndex, address(s_item._item), uint8(s_item._state));
    }
    
    function triggerPayment(uint _itemIndex) public payable itemFound(_itemIndex) {
        S_Item memory s_item = items[_itemIndex];
        require(msg.sender == address(s_item._item),  "ItemManager: this function must be call from Item contract");
        require(s_item._state == SupplyChainState.Sale, "ItemManager: this item is not for sale!");
        require(s_item._price == msg.value, "ItemManager: only full payments accepted!");
        items[_itemIndex]._state = SupplyChainState.Sold;
        emit SupplyChainStep(_itemIndex, address(s_item._item), uint8(items[_itemIndex]._state));
    }
    
    function triggerDelivery(uint _itemIndex) public onlyOwner itemFound(_itemIndex){
        require(items[_itemIndex]._state == SupplyChainState.Sold, "ItemManager: Item is further in the chain!");
        emit SupplyChainStep(_itemIndex, address(items[_itemIndex]._item), uint8(items[_itemIndex]._state));
    }
}