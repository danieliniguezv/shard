// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {ERC20Token} from "contracts/ERC20Token.sol";

contract Token is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_USER");
        vm.startBroadcast(deployerPrivateKey);
        new ERC20Token("USD Coin (PoS)", "USDC.e", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("(PoS) Tether USD", "USDT", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Wrapped Matic", "WMATIC", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        vm.stopBroadcast();
    }
}
