// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Context.sol";
import "./ItemManager.sol";

contract Item is Context {
    ItemManager public parentContract;
    address public owner;
    bytes32 public rawDataHash;
    string public name;
    string public specifications;
    uint256 public indexInParentContract;
    uint256 public price;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner,
        address recipt
    );

    constructor(
        ItemManager _parentContract,
        address _owner,
        string memory _name,
        string memory _specifications,
        bytes32 _rawDataHash,
        uint256 _price,
        uint256 _indexInParentContract
    ) {
        parentContract = _parentContract;
        owner = _owner;
        name = _name;
        specifications = _specifications;
        rawDataHash = _rawDataHash;
        price = _price;
        indexInParentContract = _indexInParentContract;
    }

    function changePrice(uint256 _newPrice) public {
        require(
            owner == _msgSender() || address(parentContract) == _msgSender(),
            "Item: caller is not the owner or parent contract"
        );
        price = _newPrice;
    }

    function giveOwnershipTo(address _newOwner) public {
        require(_newOwner != address(0), "Ownable: new owner is the zero address");
        require(price == 0, "Item: this Item is for sale");
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner, address(0));
    }

    function transferOwnership(address _newOwner, address _recipt) public {
        require(
            address(parentContract) == _msgSender(),
            "Item: caller is not the owner or parent contract"
        );
        address oldOwner = owner;
        owner = _newOwner;
        price = 0;
        emit OwnershipTransferred(oldOwner, _newOwner, _recipt);
    }

    receive() external payable {
        require(price > 0, "Item: this Item is not for sale");
        require(price == msg.value, "Item: only full payments accepted");
        parentContract.triggerPayment{value: msg.value}(
            indexInParentContract,
            _msgSender(),
            owner
        );
    }

    fallback() external payable {}
}
