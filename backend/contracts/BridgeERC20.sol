//SPDX-License-Identifier: BSD-Clause-3

pragma solidity ^0.8.19;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract BridgeERC20 is Ownable {
  bool public locked;
  bytes32 internal immutable network;
  
  event ContractUnlocked(address _unlocker, bool _locked);
  event ContractLocked(address _locker, bool _locked);
	event DepositSuccessful(address _receiver, uint256 _amount);
  event WithdrawSuccessful(address _receiver, uint256 _amount, bool _locked);

  error InsufficientBalance();
  error UnableToWithdraw();

  mapping(address => mapping(address => uint256)) public deposited;

  constructor(string memory _network) {
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

  function deposit(address _tokenAddress, uint256 _amount) public {
		IERC20 _token;
    _token = IERC20(_tokenAddress);
    deposited[msg.sender][_tokenAddress] += _amount;
    _token.transferFrom(msg.sender, address(this), _amount);
    emit DepositSuccessful(msg.sender, _amount);
  }

  function withdraw(address _tokenAddress, address _receiver, uint256 _amount) public onlyOwner {
    if (locked == true) revert UnableToWithdraw();
    locked = true;
    IERC20 _token;
    if (deposited[_receiver][_tokenAddress] != 0) {
      deposited[_receiver][_tokenAddress] -= _amount;
    }
    _token = IERC20(_tokenAddress);
    _token.approve(address(this), _amount);
    _token.transferFrom(address(this), _receiver, _amount);
    emit WithdrawSuccessful(_receiver, _amount, locked);
  }

  function withdrawTokens(address _tokenAddress, address _receiver, uint256 _amount) public {
    if (_amount > deposited[_receiver][_tokenAddress]) revert InsufficientBalance();
    if (locked == true) revert UnableToWithdraw();
    locked = true;
    deposited[_receiver][_tokenAddress] -= _amount;
    IERC20 _token;
    _token = IERC20(_tokenAddress);
    _token.approve(address(this), _amount);
    _token.transferFrom(address(this), _receiver, _amount);
    emit WithdrawSuccessful(_receiver, _amount, locked);
  }
}
