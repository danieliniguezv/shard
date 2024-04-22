//SPDX-License-Identifier: BSD-Clause-3

pragma solidity ^0.8.19;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {ERC20Burnable} from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract ERC20TokenBurnable is ERC20, ERC20Burnable, Ownable {
  bool public locked;
  uint8 internal _decimals;

  event ContractUnlocked(address _unlocker, bool _locked);
  event ContractLocked(address _locker, bool _locked);
  event TokensMinted(address _receiver, uint256 _amount);
  event TokensBurned(address _burner, uint256 _amount);

  error NoTokensDeposited();

  constructor(string memory _tokenName, string memory _tokenSymbol, uint8 _setDecimals)
  ERC20(_tokenName, _tokenSymbol) {
    locked = true;
    _decimals = _setDecimals;
  }

  function unlockContract() public onlyOwner {
    locked = false;
    emit ContractUnlocked(msg.sender, locked);
  }

  function lockContract() public onlyOwner {
    locked = true;
    emit ContractLocked(msg.sender, locked);
  }

  function mint(address _receiver, uint256 _amount) public {
    if (locked == true) revert NoTokensDeposited();
    locked = true;
    _mint(_receiver, _amount);
    emit TokensMinted(_receiver, _amount);
  }

  function burnTokens (uint256 _amount) public {
    burn(_amount);
    emit TokensBurned(msg.sender, _amount);
  }

  function decimals() public view override returns (uint8 _tokenDecimals) {
    return _decimals;
  }
}
