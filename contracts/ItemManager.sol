// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Ownable.sol";
import "./Item.sol";
import "./Order.sol";
import "./Counters.sol";

contract ItemManager is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private itemIndex;
    enum ItemState {
        Created,
        Selling,
        Sold,
        Delivered
    }
    struct S_Item {
        Item _item;
        Order _order;
        ItemManager.ItemState _state;
    }
    mapping(uint256 => S_Item) public items;

    event ItemStateChanged(uint256 indexed itemIndex, uint8 state);

    modifier itemFound(uint256 _itemIndex) {
        require(
            _itemIndex < itemIndex.current() ,
            "ItemManager: item not found!"
        );
        _;
    }

    modifier onlyItemOwner(uint256 _itemIndex) {
        require(
            items[_itemIndex]._item.owner() == _msgSender(),
            "ItemManager: caller is not the Item owner"
        );
        _;
    }

    // 0x3031303230333034000000000000000000000000000000000000000000000000
    function createItem(
        string memory _name,
        string memory _specifications,
        string memory _rawDataUrl,
        bytes32 _rawDataHash
    ) public {
        Item item = new Item(
            this,
            _msgSender(),
            _name,
            _specifications,
            _rawDataUrl,
            _rawDataHash,
            itemIndex.current()
        );
        S_Item storage s_item = items[itemIndex.current()];
        s_item._item = item;
        s_item._state = ItemState.Created;
        emit ItemStateChanged(itemIndex.current(), uint8(s_item._state));
        itemIndex.increment();
    }

    function triggerDeliverd(uint256 _itemIndex)
        public
        itemFound(_itemIndex)
    {
        require(
            items[_itemIndex]._state == ItemState.Sold,
            "ItemManager: this item has not been purchased"
        );
        require(
            address(items[_itemIndex]._order) == _msgSender(),
            "ItemManager: this function must be call from Order contract"
        );
        items[_itemIndex]._state == ItemState.Delivered;
        emit ItemStateChanged(_itemIndex, uint8(items[_itemIndex]._state));
    }

    function triggerPayment(
        uint256 _itemIndex,
        address _purchaser,
        address _owner
    ) public payable itemFound(_itemIndex) {
        S_Item storage s_item = items[_itemIndex];
        require(
            _msgSender() == address(s_item._item),
            "ItemManager: this function must be call from Item contract"
        );
        require(
            s_item._state == ItemState.Selling,
            "ItemManager: this item is not for sale!"
        );
        Order order = new Order{value: msg.value}(
            _purchaser,
            _owner,
            s_item._item
        );
        s_item._order = order;
        s_item._state = ItemState.Sold;
        emit ItemStateChanged(_itemIndex, uint8(s_item._state));
    }

    function triggerSelling(uint256 _itemIndex, uint256 _price)
        public
        itemFound(_itemIndex)
        onlyItemOwner(_itemIndex)
    {
        S_Item storage s_item = items[_itemIndex];
        require(
            s_item._state == ItemState.Created,
            'ItemManager: This item state must be "Created" to make for sale!'
        );
        s_item._item.changePrice(_price);
        s_item._state = ItemState.Selling;
        emit ItemStateChanged(_itemIndex, uint8(s_item._state));
    }

    function currentItemIndex() public view returns (uint256) {
        return itemIndex.current();
    }

    receive() external payable { }

    fallback() external payable {}
}
