// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "./Context.sol";
import "./Timers.sol";
import "./Item.sol";
import "./ItemManager.sol";

contract Order is Context {
    using Timers for Timers.Timestamp;

    Timers.Timestamp private _timer;
    // address public shipper;
    address public purchaser;
    address public seller;
    Item public itemContract;
    Order.OrderState public state;

    enum OrderState {
        Placed,
        Confirmed,
        Shipping,
        Received,
        Cancelled
    }

    event OrderStateChanged(address sender, uint8 state, uint64 deadline);

    constructor(
        address _purchaser,
        address _seller,
        Item _itemContract
    ) payable {
        // 24 hours equal to 86400 seconds
        uint64 deadline = uint64(block.timestamp + 86400);
        _timer.setDeadline(deadline);
        purchaser = _purchaser;
        seller = _seller;
        itemContract = _itemContract;
        state = OrderState.Placed;
        emit OrderStateChanged(_msgSender(), uint8(state), deadline);
    }

    modifier onlySeller() {
        require(seller == _msgSender(), "Order: caller is not the seller");
        _;
    }

    modifier onlyPurchaser() {
        require(
            purchaser == _msgSender(),
            "Order: caller is not the purchaser"
        );
        _;
    }

    // modifier onlyShipper() {
    //     require(shipper == _msgSender(), "Order: caller is not the purchaser");
    //     _;
    // }

    modifier isPending() {
        require(_timer.isPending(), "Order: transaction is expired");
        _;
    }

    function triggerConfirm() public onlySeller isPending {
        require(
            state == OrderState.Placed,
            'Order: state must be "Placed" to trigger confirm'
        );
        // 48 hours equal to 172800 seconds
        uint64 deadline = uint64(block.timestamp + 172800);
        _timer.setDeadline(deadline);
        state = OrderState.Confirmed;
        emit OrderStateChanged(_msgSender(), uint8(state), deadline);
    }

    function triggerShipping()
        public
        // onlyShipper
        onlySeller
        isPending
    {
        require(
            state == OrderState.Confirmed,
            'Order: state must be "Confirmed" to trigger shipping'
        );
        // 7 days equal to 604800 seconds
        uint64 deadline = uint64(block.timestamp + 604800);
        _timer.setDeadline(deadline);
        state = OrderState.Shipping;
        emit OrderStateChanged(_msgSender(), uint8(state), deadline);
    }

    function triggerReceived() public onlyPurchaser isPending {
        require(
            state == OrderState.Shipping,
            'Order: state must be "Shipping" to Received'
        );
        _timer.reset();

        itemContract.parentContract().triggerDelivered(itemContract.indexInParentContract());
        payable(seller).transfer(address(this).balance);
        state = OrderState.Received;
        emit OrderStateChanged(_msgSender(), uint8(state), 0);
    }

    function triggerCancel() public onlyPurchaser {
        require(
            state == OrderState.Placed || _timer.isExpired(),
            "Order: transaction is pending or delivered, can not cancel now"
        );
        _timer.reset();
        state = OrderState.Cancelled;
        itemContract.parentContract().triggerCancel(itemContract.indexInParentContract());
        payable(purchaser).transfer(address(this).balance);
        emit OrderStateChanged(_msgSender(), uint8(state), 0);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getDeadline() public view returns (uint64) {
        return _timer.getDeadline();
    }
}
