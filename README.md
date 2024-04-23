# Shardeum Bridge

This project allows users to bridge thier assets back and forth from any 
chain **as long as it is an EVM-Based Chain**

For this particular use case I'm using it to interact with the 
Shardeum Blockchain as the base chain to which assets are being locked onto.

The flow is fairly simple. To achieve the desired goal fo bridging assets, 
transactioins need to be verified in the background. This is achieved by means 
of a wallet that acts as a relayer. This relayer provides the service to lock 
and unlock the smart contracts depending on the implemented logic to do so. 
This logic must be designed in a way that works in tandem with the relayer on 
the backend.

These are the 6 chains to which Shardeum will be able to move assets back and
forth from:
- Arbitrum Sepolia
- Avalanche Fuji
- Binance Smart Chain
- Ethereum Sepolia (or Holesky)
- Optimism Seploia
- Amoy Polygon

# Smart Contracts
This bridge is composed of 4 contracts:

## BridgeERC20.sol
This smart contract serves as a vault to hold ERC20 tokens. Once the tokens are
locked and verified on the backend with the tx hash; it is  only then that the 
relayer is allowed to unlock the `mint` function from `ERC20TokenBurnable.sol`.

**This smart contract MUST be deployed by the relayer wallet**

## BridgeNative.sol
This smart contract serves as a vault for native currency interactions. While 
the logic is fairly similar to the `BridgeERC20.sol` some differences remain.
Once the native assets are locked in the relayer is allowed to unlock the 
`mint` function from `ERC20TokenBurnable.sol`.

**This smart contract must be deployed by the relayer wallet**

## ERC20Token.sol
This is a standard ERC20 token smart contract which serves the purpose to mint
tokens to test the bridge.

In case of testing these tokens should be deployed by the end user wallet.

## ERC20TokenBurnable.sol
This smart contract is the one in charge to `mint` and `burn` upon checking
whether tokens are being deposited or withdrawn, respectively, from the bridge
vaults for ERC20 Tokens or Native Tokens. The tokens minted from here will be
the wrapped version of the main chain receiving assets from other chains.

**This smart contract must be deployed by the relayer wallet**

# Technology
- Solidity
- Foundry
- EthersJS
- WebPack
- JavaScript
- HTML5
- CSS3

# Install and Run
Before installing the bridge dAPP and testing it you will need to have access
to two wallets and both their private keys. You will also need to fund these
wallets with native tokens of:
- Arbitrum Sepolia
- Avalanche Fuji
- Binance Smart Chain
- Ethereum Sepolia (or Holesky)
- Optimism Seploia
- Amoy Polygon

To install this bridge you will first need to clone this repository from the
`main` branch and `cd` to `shard`:

```sh
~ git clone <repository-url>
~ cd shard
```

Then you need to run install to install all the needed dependencies:
```sh
shard ~ npm install
```

Now you need to create an environment variable on the root of the frontend directory:
```sh
shard/frontend ~ vim .env
```
**You must not change the names of the variables or it is most likely that it 
will break unless you make the appropiate changes on `app.js`**

This is what you'll need to add to your `.env` file. Here you will input the
private key for the relayer wallet under `BRIDGE_WALLET_PRIVATE_KEY`:

```sh
BRIDGE_WALLET_PRIVATE_KEY=''

BRIDGE_NATIVE_CONTRACT_ADDRESS_ARBITRUM='0xb650750316EA8f111651d171779d545B88563d60'
BRIDGE_NATIVE_CONTRACT_ADDRESS_AVAX='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'
BRIDGE_NATIVE_CONTRACT_ADDRESS_BNB='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'
BRIDGE_NATIVE_CONTRACT_ADDRESS_ETHEREUM='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'
BRIDGE_NATIVE_CONTRACT_ADDRESS_OPTIMISM='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'
BRIDGE_NATIVE_CONTRACT_ADDRESS_POLYGON='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'

BRIDGE_ERC20_CONTRACT_ADDRESS_ARBITRUM='0xd90fFBe2bDdd299573daa8A8E9333753a5Be82d7'
BRIDGE_ERC20_CONTRACT_ADDRESS_AVAX='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'
BRIDGE_ERC20_CONTRACT_ADDRESS_BNB='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'
BRIDGE_ERC20_CONTRACT_ADDRESS_ETHEREUM='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'
BRIDGE_ERC20_CONTRACT_ADDRESS_OPTIMISM='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'
BRIDGE_ERC20_CONTRACT_ADDRESS_POLYGON='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'

ARB_TOKEN_CONTRACT_ADDRESS_ARBITRUM='0xe3BD6a788B058f8fD972Fe6F2174EBF25baD3b54'

WAVAX_TOKEN_CONTRACT_ADDRESS_AVAX='0xBc52fE2A1C0974BAd9948041B3C7Bff66340ee09'

BUSD_TOKEN_CONTRACT_ADDRESS_BNB='0xBc52fE2A1C0974BAd9948041B3C7Bff66340ee09'
WBNB_TOKEN_CONTRACT_ADDRESS_BNB='0xe3BD6a788B058f8fD972Fe6F2174EBF25baD3b54'

ONE_INCH_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xBc52fE2A1C0974BAd9948041B3C7Bff66340ee09'
AAVE_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xe3BD6a788B058f8fD972Fe6F2174EBF25baD3b54'
DAI_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xC3631fB4F2AE666c66065Bafd0C46Be223496D15'
EURC_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x799692D062a4F24fc808d97002CF6E36C70bF2ca'
EURT_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xa60d8f39004523C7162ebe1B4497A3DC05F5E38A'
LIDO_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x996646E9A347D6e77FfE586900D45D814047b666'
LINK_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x3d44Ce365BfA91B24507695059410914e79988a5'
PANCAKE_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xd3c491B315c7b7DEb49103CB5ce54b805a903651'
UNI_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x655eBcEeB1E238c50783611d0128cCABC52Ad37F'
USDC_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xAf0c90B436a95Da64e71787e6d59B99fBB5DBAf7'
USDT_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x043A1EB899E3e4d12EBd09ce7135e71D1E4cc52a'
WETH_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0x832F6d2bBECFf3FD430d769CB892BfC04ea7fDdc'
XAUT_TOKEN_CONTRACT_ADDRESS_ETHEREUM='0xE8866dD882ac2f82D4fa077963Ee2d31d0aE1428'

OP_TOKEN_CONTRACT_ADDRESS_OPTIMISM='0xBc52fE2A1C0974BAd9948041B3C7Bff66340ee09'

USDC_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON='0xBc52fE2A1C0974BAd9948041B3C7Bff66340ee09'
USDT_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON='0xe3BD6a788B058f8fD972Fe6F2174EBF25baD3b54'
WMATIC_TOKEN_CONTRACT_ADDRESS_POLYGON='0xC3631fB4F2AE666c66065Bafd0C46Be223496D15'

SONE_INCH_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x5a311FF2e0C0Bed2272f1940299636aF367B2E1a'
SAAVE_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xA36c9221FF8870EF619032b7D785cA1f871542b2'
SARB_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x256A34a59E1B11c2245cCc28c2AACfDd4b57c221'
SAVAX_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x744daBD8ebF9776D6C2b11F466F1Cb175eB12CA8'
SBNB_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xd90fFBe2bDdd299573daa8A8E9333753a5Be82d7'
SBUSD_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xb650750316EA8f111651d171779d545B88563d60'
SDAI_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xA0bE5d27dF7BfFBc59Cb8C4e591Eb1c7D52212D5'
SETH_ARBITRUM_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x814172187e074d298791Aac9FFE8E031f5a714cb'
SETH_ETHEREUM_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x62884680CdD1B678c55f47F1e6201bd9fcd93a5b'
SETH_OPTIMISM_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xfbEAbE53aD0E179bd010Ef1Ffaa99dA700690Cf7'
SEURC_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x1495E57edF705aA5589a46F699a89bF93bc8425E'
SEURT_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x301207057c2A770F2D7bEb8246C37611527fd2cf'
SLIDO_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x9cefc1949661354eCD63fd37B2853a97F39A71Fa'
SLINK_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xFcB2030Dd3FFa9A765b97e3990aA9b8F1635405D'
SMATIC_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x6a6494cb1008195331f97D3ae3F11d6367FC0F98'
SOP_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x09B971bf156E02d8c9E3CCa96e0e97a35B60Beb8'
SPANCAKE_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x97689cc52A51025920b940beb05731Ba926E9E03'
SUNI_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x816c02f6074861aF2c2b114B3352c44554B610c4'
SUSDC_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x88d0BCcFa611AF146C23AB96e69B33321Cf6eaE3'
SUSDC_POLYGON_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x88c3244b47b8790112E34DBEEF728453A63785A9'
SUSDT_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x6D983618F76C94b811cB49756aeb889764940f37'
SUSDT_POLYGON_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x33f5BCf45d6CE8e91872361770304717E3C2DaB8'
SWAVAX_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x10DcB49ed7628fb770ae29920a9d6a5C5A690FDA'
SWBNB_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x83743c500DA1F75E6131AD63Df413e97778E2ECE'
SWETH_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xf77bc1A26BBAabEC24EEBD9D31b543520fAF1560'
SWMATIC_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0x340852D7B2D583d7cf098c9Fc842d6f7Fdf015f7'
SXAUT_TOKEN_CONTRACT_ADDRESS_SHARDEUM='0xB2D10AE3cdfe1964Ba1b142B0bA0a0F2936581b0'
```

You may use these addresses while they work right out of the box
as is. Or you can deploy your own contracts.

I would insist in deploying your own version of all the contracts for a better 
experience.

Nonetheless if you decide to use these you will still need to redeploy and 
update all of the ERC20 Tokens contract addresses since you won't have a 
balance in your wallet that relates to these specific addresses in order to 
interact with the dAPP properly.

I insist though on deploying your own version of these. I provide a series 
of scripts to deploy all the contracts using `Foundry` at:
```sh
shard/frontend/script ~
```

Next, you need to create the main build for the project with:
```sh
shard ~ npm run build
```

Finally you will need to run the project on a live server. This can be easily done
with `VSCode` with the `LiveServer` plugin. Or if you preferr you can serve it
using `Node Express`.
