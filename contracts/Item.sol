// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Context.sol";
import "./ItemManager.sol";

contract Item is Context{
    address public owner;
    ItemManager public parentContract;
    bytes32 public identifier;
    bytes32 public specifications;
    bytes32 public rawDataUrl;
    bytes32 public rawDataHash;
    uint public indexInParentContract;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor(ItemManager _parentContract, bytes32 _identifier, bytes32 _specifications, bytes32 _rawDataUrl, bytes32 _rawDataHash, uint _indexInParentContract) {
        owner = tx.origin;
        identifier = _identifier;
        specifications = _specifications;
        rawDataUrl = _rawDataUrl;
        rawDataHash = _rawDataHash;
        indexInParentContract = _indexInParentContract;
        parentContract = _parentContract;
    }

    function transferOwnership(address _newOwner) public {
        require(owner == msg.sender, "Item: caller is not the Item owner");
        require(_newOwner != address(0), "Item: new owner is the zero address");
        _transferOwnership(_newOwner);
    }

    function _transferOwnership(address _newOwner) internal {
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }
    
    receive() external payable {
        // (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", indexInParentContract));
        // require(success, "Item: the transaction wasn't successfull, cancelling...");
        parentContract.triggerPayment{value: msg.value}(indexInParentContract);
        _transferOwnership(_msgSender());
    }
    
    fallback() external {}
}