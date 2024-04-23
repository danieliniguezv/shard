// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {ERC20Token} from "contracts/ERC20Token.sol";

contract Token is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_USER");
        vm.startBroadcast(deployerPrivateKey);
        new ERC20Token("1INCH Token", "1INCH", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Aave Token", "AAVE", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("DAI Stablecoin", "DAI", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("EURC", "EURC", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Euro Tether", "EURT", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Lido DAO Token", "LDO", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("ChainLink Token", "LINK", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("PancakeSwap Token", "Cake", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Uniswap", "UNI", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("USDC", "USDC", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Tether USD", "USDT", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Wrapped Ether", "WETH", 10000000, 18, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        new ERC20Token("Tether Gold", "XAUT", 10000000, 6, 0x2D475dD18Fa6cB662350D6dcdD0a4622a700296C);
        vm.stopBroadcast();
    }
}
