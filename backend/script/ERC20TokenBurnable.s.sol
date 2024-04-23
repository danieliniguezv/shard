// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {ERC20TokenBurnable} from "../contracts/ERC20TokenBurnable.sol";

contract BurnableToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_BRIDGE");
        vm.startBroadcast(deployerPrivateKey);
        new ERC20TokenBurnable("1INCH Token", "s1INCH", 18);
        new ERC20TokenBurnable("Aave Token", "sAAVE", 18);
        new ERC20TokenBurnable("Arbitrum", "sARB", 18);
        new ERC20TokenBurnable("Avalanche", "sAVAX", 18);
        new ERC20TokenBurnable("BNB", "sBNB", 18);
        new ERC20TokenBurnable("Binance-Peg BUSD Token", "sBUSD", 18);
        new ERC20TokenBurnable("DAI Stablecoin", "sDAI", 18);
        new ERC20TokenBurnable("Arbitrum Ether", "sARBETH", 18);
        new ERC20TokenBurnable("Ether", "sETH", 18);
        new ERC20TokenBurnable("Optimism Ether", "sOPETH", 18);
        new ERC20TokenBurnable("EURC", "sEURC", 6);
        new ERC20TokenBurnable("Euro Tether", "sEURT", 6);
        new ERC20TokenBurnable("Lido DAO Token", "sLDO", 18);
        new ERC20TokenBurnable("ChainLink Token", "sLINK", 18);
        new ERC20TokenBurnable("Matic", "sMatic", 18);
        new ERC20TokenBurnable("OP Token", "sOP", 18);
        new ERC20TokenBurnable("PancakeSwap Token", "sCake", 18);
        new ERC20TokenBurnable("Uniswap", "sUNI", 18);
        new ERC20TokenBurnable("USDC", "sUSDC", 6);
        new ERC20TokenBurnable("USDC Polygon", "sPUSDC", 6);
        new ERC20TokenBurnable("Tether USD", "sUSDT", 6);
        new ERC20TokenBurnable("Tether USD Polygon", "sPUSDT", 6);
        new ERC20TokenBurnable("Wrapped Avax", "sWAVAX", 6);
        new ERC20TokenBurnable("Wrapped BNB", "sWBNB", 6);
        new ERC20TokenBurnable("Wrapped Ether", "sWETH", 18);
        new ERC20TokenBurnable("Wrapped MATIC", "sWMATIC", 18);
        new ERC20TokenBurnable("Tether Gold", "sXAUT", 6);
        vm.stopBroadcast();
    }
}
