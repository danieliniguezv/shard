//SPDX-License-Identifier: BSD-3-Clause

pragma solidity ^0.8.25;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
  uint8 internal _decimal;

  constructor(
    string memory _tokenName, 
    string memory _tokenSymbol,
    uint256 _amount,
    uint8 _setDecimals,
    address _account
  ) ERC20(_tokenName, _tokenSymbol) {
    _decimal = _setDecimals;
    _mint(_account, ((_amount) * 10 ** _setDecimals));
  }

  function decimals() public view override returns (uint8 _decimals) {
    return _decimal;
  }
}
