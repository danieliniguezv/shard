// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {BridgeNative} from "contracts/BridgeNative.sol";

contract Bridge is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_BRIDGE");
        vm.startBroadcast(deployerPrivateKey);
        BridgeNative bridge = new BridgeNative("Polygon");
        vm.stopBroadcast();
    }
}
