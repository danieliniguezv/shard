//SPDX-License-Identifier: BSD-Clause-3

pragma solidity ^0.8.25;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract BridgeNative is Ownable {
  bool public locked;
  bytes32 internal immutable network;

  mapping(address => uint256) public deposited;

  event ContractUnlocked(address _unlocker, bool _locked);
  event ContractLocked(address _locker, bool _locked);
  event FundsLocked(address indexed _sender, uint256 _amount);
  event FundsUnlocked(address indexed _receiver, uint256 _amount);

  error NoTokensSent();
  error InsufficientBalance();
  error UnableToUnlock();

  constructor(string memory _network) Ownable(msg.sender) {
    locked = true;
    network = keccak256(bytes(_network));
  }

  function getNetworkName() public view returns (string memory _network) {
    if (network == keccak256(bytes('Arbitrum'))) {
      return 'Arbitrum';
    }
    if (network == keccak256(bytes('Avalanche'))) {
      return 'Avalanche';
    }
    if (network == keccak256(bytes('Binance Smart Chain'))) {
      return 'Binance Smart Chain';
    }
    if (network == keccak256(bytes('Ethereum'))) {
      return 'Ethereum';
    }
    if (network == keccak256(bytes('Optimism'))) {
      return 'Optimism';
    }
    if (network == keccak256(bytes('Polygon'))) {
      return 'Polygon';
    }
  }

  function unlockContract() public onlyOwner {
    locked = false;
    emit ContractUnlocked(msg.sender, locked);
  }

  function lockContract() public onlyOwner {
    locked = true;
    emit ContractLocked(msg.sender, locked);
  }

  function lockFunds() public payable {
    if (msg.value == 0) revert NoTokensSent();
    deposited[msg.sender] += msg.value;
    emit FundsLocked(msg.sender, msg.value);
  }

  function unlockFunds(address payable _receiver, uint256 _amount, bytes memory _sentData) public {
    if (_amount > deposited[_receiver]) revert InsufficientBalance();
    if (locked == true) revert UnableToUnlock();
    deposited[_receiver] -= _amount;
    locked = true;
    (bool _sent, bytes memory _data) = _receiver.call{value: _amount}(_sentData);
    emit FundsUnlocked(_receiver, _amount);
  }
}
