import { ethers } from 'ethers';
import { bridgeNative, bridgeERC20, erc20Token, erc20TokenBurnable } from './abi.js';

let provider = null;
let signer = null;
let userAddress = null;
let networkName = null;
let savedSigner = null;
let erc20TokenContractBurnable = null;
let isLocked = null;

const connectButton = document.getElementById('connectWallet');
const networkDropdownFrom = document.getElementById('selectNetworkFrom');
const fromChain = document.getElementById('from');
const networkDropdownTo = document.getElementById('selectNetworkTo');
const toChain = document.getElementById('to');
const tokenDropdown = document.getElementById('tokenDropdown');
const form = document.getElementById('amount');
const overlay = document.getElementById('overlay');
const successful = document.getElementById('depositSuccessful');
const tokensBridged = document.getElementById('tokensBridged');

overlay.style.display = 'none';
function createCircularProgress() {
    const progressElement = document.getElementById('progress');
    const rotationSpeed = 10; // Adjust the rotation speed as desired
  
    let rotationAngle = 0;
  
    setInterval(() => {
      rotationAngle += rotationSpeed;
      progressElement.style.transform = `rotate(${rotationAngle}deg)`;
    }, 1000 / 60);
}

const arbitrumNetwork = {
    chainId: '0x66eed',
    chainName: 'Arbitrum Goerli Testnet',
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    }
}

const avaxNetwork = {
    chainId: '0xa869',
    chainName: 'Avalanche Fuji C-Chain',
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
    }
}

const bnbNetwork = {
    chainId: '0x61',
    chainName: 'BNB Smart Chain Testnet',
    rpcUrls: ['https://bsc-testnet.publicnode.com'],
    nativeCurrency: {
        name: 'BNB',
        symbol: 'tBNB',
        decimals: 18,
    }
}

const ethereumNetwork = {
    chainId: '0x5',
    chainName: 'Goerli',
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    }
}

const optimismNetwork = {
    chainId: '0x1a4',
    chainName: 'Optimism Goerli',
    rpcUrls: ['https://goerli.optimism.io'],
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    }
}

const polygonNetwork =  {
    chainId: '0x13881',
    chainName: 'Mumbai',
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    }
}

const splendorNetwork = {
    chainId: '0xaa36a7',
    chainName: 'Sepolia',
    rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/demo'],
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    }
}

document.addEventListener('DOMContentLoaded', () => {
    savedSigner = localStorage.getItem('signer');
    if (savedSigner) {
        connect();
    }
});

connectButton.addEventListener('click', async () => {
    if (window.ethereum == null) {
        console.log('Metamask not installed; using read-only defaults.');
        provider = ethers.getDefaultProvider();
    } else {
        connect();
    }
});

const connect = async () => {
    if (window.ethereum == null) {
        console.log('Metamask is not installed; using read-only defaults.');
        providers = ethers.getDefaultProvider();
    } else {
        try {
            provider = new ethers.BrowserProvider(window.ethereum,'any');
            signer = await provider.getSigner();

            localStorage.setItem('signer', signer.address);

            userAddress = await signer.getAddress();
            document.getElementById('userAddress').innerHTML = userAddress;

            const chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            supportedChains(chainId);
            updateChain(chainId);

            const address = await window.ethereum.request({
                method: 'eth_accounts'
            });
            console.log(address);

            const connected = window.ethereum.isConnected();
            console.log(connected);

            console.log(`Connected to: ${networkName} chainId: ${chainId}`);
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }
}

const supportedChains = async (chainId) => {
    try {
        if (chainId == '0x66eed' || chainId == '0xa869' || chainId == '0x61' || chainId == '0x5' || chainId == '0x1a4' || chainId == '0x13881' || chainId == '0xaa36a7') {

        } else {
            throw new Error(`Unsupported network! Please select a supported network:\n-Splendor\n-Arbitrum\n-Avalanche\n-Binance Smart Chain\n-Ethereum\n-Optimism\n-Polygon`);
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
        switchNetwork('splendor');
    }
}

const updateChain = async (chainId) => {
    if (chainId == arbitrumNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 1;
        networkDropdownTo.selectedIndex = 0;
        networkName = arbitrumNetwork.chainName;
        
        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;
            
        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = true;
        tokenOptions[2].hidden = true;
        tokenOptions[3].hidden = false;
        tokenOptions[4].hidden = true;
        tokenOptions[5].hidden = true;
        tokenOptions[6].hidden = true;
        tokenOptions[7].hidden = true;
        tokenOptions[8].hidden = false;
        tokenOptions[9].hidden = true;
        tokenOptions[10].hidden = true;
        tokenOptions[11].hidden = true;
        tokenOptions[12].hidden = true;
        tokenOptions[13].hidden = true;
        tokenOptions[14].hidden = true;
        tokenOptions[15].hidden = true;
        tokenOptions[16].hidden = true;
        tokenOptions[17].hidden = true;
        tokenOptions[18].hidden = true;
        tokenOptions[19].hidden = true;
        tokenOptions[20].hidden = true;
        tokenOptions[21].hidden = true;
        tokenOptions[22].hidden = true;
        tokenOptions[23].hidden = true;
        tokenOptions[24].hidden = true;
        tokenOptions[25].hidden = true;
        fromChain.textContent = 'Arbitrum ';
        toChain.textContent = '';
    }
    if (chainId == avaxNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 2;
        networkDropdownTo.selectedIndex = 0;
        networkName = avaxNetwork.chainName;

        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;

        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = true;
        tokenOptions[2].hidden = true;
        tokenOptions[3].hidden = true;
        tokenOptions[4].hidden = false;
        tokenOptions[5].hidden = true;
        tokenOptions[6].hidden = true;
        tokenOptions[7].hidden = true;
        tokenOptions[8].hidden = true;
        tokenOptions[9].hidden = true;
        tokenOptions[10].hidden = true;
        tokenOptions[11].hidden = true;
        tokenOptions[12].hidden = true;
        tokenOptions[13].hidden = true;
        tokenOptions[14].hidden = true;
        tokenOptions[15].hidden = true;
        tokenOptions[16].hidden = true;
        tokenOptions[17].hidden = true;
        tokenOptions[18].hidden = true;
        tokenOptions[19].hidden = true;
        tokenOptions[20].hidden = true;
        tokenOptions[21].hidden = false;
        tokenOptions[22].hidden = true;
        tokenOptions[23].hidden = true;
        tokenOptions[24].hidden = true;
        tokenOptions[25].hidden = true;
        fromChain.textContent = 'AVAX ';
        toChain.textContent = '';
    }
    if (chainId == bnbNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 3;
        networkDropdownTo.selectedIndex = 0;
        networkName = bnbNetwork.chainName;
        
        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;

        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = true;
        tokenOptions[2].hidden = true;
        tokenOptions[3].hidden = true;
        tokenOptions[4].hidden = true;
        tokenOptions[5].hidden = false;
        tokenOptions[6].hidden = false;
        tokenOptions[7].hidden = true;
        tokenOptions[8].hidden = true;
        tokenOptions[9].hidden = true;
        tokenOptions[10].hidden = true;
        tokenOptions[11].hidden = true;
        tokenOptions[12].hidden = true;
        tokenOptions[13].hidden = true;
        tokenOptions[14].hidden = true;
        tokenOptions[15].hidden = true;
        tokenOptions[16].hidden = true;
        tokenOptions[17].hidden = true;
        tokenOptions[18].hidden = true;
        tokenOptions[19].hidden = true;
        tokenOptions[20].hidden = true;
        tokenOptions[21].hidden = true;
        tokenOptions[22].hidden = false;
        tokenOptions[23].hidden = true;
        tokenOptions[24].hidden = true;
        tokenOptions[25].hidden = true;
        fromChain.textContent = 'BNB ';
        toChain.textContent = '';
    }
    if (chainId == ethereumNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 4;
        networkDropdownTo.selectedIndex = 0;
        networkName = ethereumNetwork.chainName;

        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;

        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = false;
        tokenOptions[2].hidden = false;
        tokenOptions[3].hidden = true;
        tokenOptions[4].hidden = true;
        tokenOptions[5].hidden = true;
        tokenOptions[6].hidden = true;
        tokenOptions[7].hidden = false;
        tokenOptions[8].hidden = false;
        tokenOptions[9].hidden = false;
        tokenOptions[10].hidden = false;
        tokenOptions[11].hidden = false;
        tokenOptions[12].hidden = false;
        tokenOptions[13].hidden = true;
        tokenOptions[14].hidden = true;
        tokenOptions[15].hidden = false;
        tokenOptions[16].hidden = false;
        tokenOptions[17].hidden = false;
        tokenOptions[18].hidden = true;
        tokenOptions[19].hidden = false;
        tokenOptions[20].hidden = true;
        tokenOptions[21].hidden = true;
        tokenOptions[22].hidden = true;
        tokenOptions[23].hidden = false;
        tokenOptions[24].hidden = true;
        tokenOptions[25].hidden = false;
        fromChain.textContent = 'Ethereum ';
        toChain.textContent = '';
    }
    if (chainId == optimismNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 5;
        networkDropdownTo.selectedIndex = 0;
        networkName = optimismNetwork.chainName;

        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;

        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = true;
        tokenOptions[2].hidden = true;
        tokenOptions[3].hidden = true;
        tokenOptions[4].hidden = true;
        tokenOptions[5].hidden = true;
        tokenOptions[6].hidden = true;
        tokenOptions[7].hidden = true;
        tokenOptions[8].hidden = false;
        tokenOptions[9].hidden = true;
        tokenOptions[10].hidden = true;
        tokenOptions[11].hidden = true;
        tokenOptions[12].hidden = true;
        tokenOptions[13].hidden = true;
        tokenOptions[14].hidden = false;
        tokenOptions[15].hidden = true;
        tokenOptions[16].hidden = true;
        tokenOptions[17].hidden = true;
        tokenOptions[18].hidden = true;
        tokenOptions[19].hidden = true;
        tokenOptions[20].hidden = true;
        tokenOptions[21].hidden = true;
        tokenOptions[22].hidden = true;
        tokenOptions[23].hidden = true;
        tokenOptions[24].hidden = true;
        tokenOptions[25].hidden = true;
        fromChain.textContent = 'Optimism ';
        toChain.textContent = '';
    }
    if (chainId == polygonNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 6;
        networkDropdownTo.selectedIndex = 0;
        networkName = polygonNetwork.chainName;
        
        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = true;
        networkToOptions[2].hidden = true;
        networkToOptions[3].hidden = true;
        networkToOptions[4].hidden = true;
        networkToOptions[5].hidden = true;
        networkToOptions[6].hidden = true;
        networkToOptions[7].hidden = false;

        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = true;
        tokenOptions[2].hidden = true;
        tokenOptions[3].hidden = true;
        tokenOptions[4].hidden = true;
        tokenOptions[5].hidden = true;
        tokenOptions[6].hidden = true;
        tokenOptions[7].hidden = true;
        tokenOptions[8].hidden = true;
        tokenOptions[9].hidden = true;
        tokenOptions[10].hidden = true;
        tokenOptions[11].hidden = true;
        tokenOptions[12].hidden = true;
        tokenOptions[13].hidden = false;
        tokenOptions[14].hidden = true;
        tokenOptions[15].hidden = true;
        tokenOptions[16].hidden = true;
        tokenOptions[17].hidden = true;
        tokenOptions[18].hidden = false;
        tokenOptions[19].hidden = true;
        tokenOptions[20].hidden = false;
        tokenOptions[21].hidden = true;
        tokenOptions[22].hidden = true;
        tokenOptions[23].hidden = true;
        tokenOptions[24].hidden = false;
        tokenOptions[25].hidden = true;
        fromChain.textContent = 'Polygon ';
        toChain.textContent = '';
    }
    if (chainId == splendorNetwork.chainId) {
        networkDropdownFrom.selectedIndex = 7;
        networkDropdownTo.selectedIndex = 0;
        networkName = splendorNetwork.chainName;
        
        const networkToOptions = networkDropdownTo.options;
        networkToOptions[1].hidden = false;
        networkToOptions[2].hidden = false;
        networkToOptions[3].hidden = false;
        networkToOptions[4].hidden = false;
        networkToOptions[5].hidden = false;
        networkToOptions[6].hidden = false;
        networkToOptions[7].hidden = true;
        
        const tokenOptions = tokenDropdown.options;
        tokenOptions[1].hidden = false;
        tokenOptions[2].hidden = false;
        tokenOptions[3].hidden = false;
        tokenOptions[4].hidden = false;
        tokenOptions[5].hidden = false;
        tokenOptions[6].hidden = false;
        tokenOptions[7].hidden = false;
        tokenOptions[8].hidden = false;
        tokenOptions[9].hidden = false;
        tokenOptions[10].hidden = false;
        tokenOptions[11].hidden = false;
        tokenOptions[12].hidden = false;
        tokenOptions[13].hidden = false;
        tokenOptions[14].hidden = false;
        tokenOptions[15].hidden = false;
        tokenOptions[16].hidden = false;
        tokenOptions[17].hidden = false;
        tokenOptions[18].hidden = false;
        tokenOptions[19].hidden = false;
        tokenOptions[20].hidden = false;
        tokenOptions[21].hidden = false;
        tokenOptions[22].hidden = false;
        tokenOptions[23].hidden = false;
        tokenOptions[24].hidden = false;
        tokenOptions[25].hidden = false;
        fromChain.textContent = 'Splendor ';
        toChain.textContent = '';
    }
}

window.ethereum.on('chainChanged', (chainId) => {
    try {
        if (signer) {
            supportedChains(chainId);
            updateChain(chainId);
            console.log(`Network changed to: ${networkName} chainId: ${chainId}`);
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
});

ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
        localStorage.removeItem('signer');
        window.location.reload();
    }
    if (signer) {
        window.location.reload();
    }
});

const addNetwork = async (networkChainName) => {
    const chainId = await window.ethereum.request({
        method: 'eth_chainId'
    });

    if (networkChainName == 'arbitrum') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [arbitrumNetwork],
        });
    }
    if (networkChainName == 'avax') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [avaxNetwork],
        });
    }
    if (networkChainName == 'bnb') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [bnbNetwork],
        });
    }
    if (networkChainName == 'goerli') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ethereumNetwork],
        });
    }
    if (networkChainName == 'optimism') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [optimismNetwork],
        });
    }
    if (networkChainName == 'polygon') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [polygonNetwork],
        });
    }
    if (networkChainName == 'splendor') {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [splendorNetwork],
        });
    }
}

const switchNetwork = async (networkChainName) => {
    if (networkChainName == 'arbitrum') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        'chainId': '0x66eed'
                    }
                ]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'avax') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        'chainId': '0xa869'
                    }
                ]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'bnb') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        'chainId': '0x61'
                    }
                ]
            })
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'ethereum') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        'chainId': '0x5'
                    }
                ]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'optimism') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        'chainId': '0x1a4'
                    }
                ]
            })
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'polygon') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    { 
                        'chainId': '0x13881'
                    }
                ],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
    if (networkChainName == 'splendor') {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    { 
                        'chainId': '0xaa36a7'
                    }
                ],
            });
        } catch(switchError) {
            if (switchError.code === 4902) {
                try {
                    addNetwork(networkChainName);
                } catch (error) {
                    window.alert('Error: ' + error.message);
                }
            }
        }
    }
}

tokenDropdown.addEventListener('click', () => {
    try {
        if (networkDropdownFrom.value == '' || networkDropdownTo.value == '') {
            throw new Error('Please select the networks first!');
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
});

networkDropdownFrom.addEventListener('change', async () => {
    try {
        if (!signer) {
            networkDropdownFrom.value = '';
            throw new Error('Please connect your wallet!');
        }
        const networkName = networkDropdownFrom.value;
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        if (networkName == 'arbitrum') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'avax') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'bnb') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'ethereum') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'optimism') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'polygon') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
        if (networkName == 'splendor') {
            switchNetwork(networkName);
            updateChain(chainId);
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
});

networkDropdownTo.addEventListener('change', async () => {
    let selectedNetworkTo = null;
    let selectedNetworkToText = null;
    selectedNetworkTo = networkDropdownTo.options[networkDropdownTo.selectedIndex];
    selectedNetworkToText = selectedNetworkTo.text;
    if (networkDropdownTo.selectedIndex == 0) {
        toChain.textContent = '';
    } else {
        toChain.textContent = ` ${selectedNetworkToText}`;
    }
    if (networkDropdownFrom.selectedIndex == 7) {
        if (networkDropdownTo.value == 'arbitrum') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = true;
            tokenOptions[2].hidden = true;
            tokenOptions[3].hidden = false;
            tokenOptions[4].hidden = true;
            tokenOptions[5].hidden = true;
            tokenOptions[6].hidden = true;
            tokenOptions[7].hidden = true;
            tokenOptions[8].hidden = false;
            tokenOptions[9].hidden = true;
            tokenOptions[10].hidden = true;
            tokenOptions[11].hidden = true;
            tokenOptions[12].hidden = true;
            tokenOptions[13].hidden = true;
            tokenOptions[14].hidden = true;
            tokenOptions[15].hidden = true;
            tokenOptions[16].hidden = true;
            tokenOptions[17].hidden = true;
            tokenOptions[18].hidden = true;
            tokenOptions[19].hidden = true;
            tokenOptions[20].hidden = true;
            tokenOptions[21].hidden = true;
            tokenOptions[22].hidden = true;
            tokenOptions[23].hidden = true;
            tokenOptions[24].hidden = true;   
            tokenOptions[25].hidden = true;   
        }
        if (networkDropdownTo.value == 'avax') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = true;
            tokenOptions[2].hidden = true;
            tokenOptions[3].hidden = true;
            tokenOptions[4].hidden = false;
            tokenOptions[5].hidden = true;
            tokenOptions[6].hidden = true;
            tokenOptions[7].hidden = true;
            tokenOptions[8].hidden = true;
            tokenOptions[9].hidden = true;
            tokenOptions[10].hidden = true;
            tokenOptions[11].hidden = true;
            tokenOptions[12].hidden = true;
            tokenOptions[13].hidden = true;
            tokenOptions[14].hidden = true;
            tokenOptions[15].hidden = true;
            tokenOptions[16].hidden = true;
            tokenOptions[17].hidden = true;
            tokenOptions[18].hidden = true;
            tokenOptions[19].hidden = true;
            tokenOptions[20].hidden = true;
            tokenOptions[21].hidden = false;
            tokenOptions[22].hidden = true;
            tokenOptions[23].hidden = true;
            tokenOptions[24].hidden = true;
            tokenOptions[25].hidden = true;
        }
        if (networkDropdownTo.value == 'bnb') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = true;
            tokenOptions[2].hidden = true;
            tokenOptions[3].hidden = true;
            tokenOptions[4].hidden = true;
            tokenOptions[5].hidden = false;
            tokenOptions[6].hidden = false;
            tokenOptions[7].hidden = true;
            tokenOptions[8].hidden = true;
            tokenOptions[9].hidden = true;
            tokenOptions[10].hidden = true;
            tokenOptions[11].hidden = true;
            tokenOptions[12].hidden = true;
            tokenOptions[13].hidden = true;
            tokenOptions[14].hidden = true;
            tokenOptions[15].hidden = true;
            tokenOptions[16].hidden = true;
            tokenOptions[17].hidden = true;
            tokenOptions[18].hidden = true;
            tokenOptions[19].hidden = true;
            tokenOptions[20].hidden = true;
            tokenOptions[21].hidden = true;
            tokenOptions[22].hidden = false;
            tokenOptions[23].hidden = true;
            tokenOptions[24].hidden = true;  
            tokenOptions[25].hidden = true;  
        }
        if (networkDropdownTo.value == 'ethereum') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = false;
            tokenOptions[2].hidden = false;
            tokenOptions[3].hidden = true;
            tokenOptions[4].hidden = true;
            tokenOptions[5].hidden = true;
            tokenOptions[6].hidden = true;
            tokenOptions[7].hidden = false;
            tokenOptions[8].hidden = false;
            tokenOptions[9].hidden = false;
            tokenOptions[10].hidden = false;
            tokenOptions[11].hidden = false;
            tokenOptions[12].hidden = false;
            tokenOptions[13].hidden = true;
            tokenOptions[14].hidden = true;
            tokenOptions[15].hidden = false;
            tokenOptions[16].hidden = false;
            tokenOptions[17].hidden = false;
            tokenOptions[18].hidden = true;
            tokenOptions[19].hidden = false;
            tokenOptions[20].hidden = true;
            tokenOptions[21].hidden = true;
            tokenOptions[22].hidden = true;
            tokenOptions[23].hidden = false;
            tokenOptions[24].hidden = true;  
            tokenOptions[25].hidden = false;  
        }
        if (networkDropdownTo.value == 'optimism') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = true;
            tokenOptions[2].hidden = true;
            tokenOptions[3].hidden = true;
            tokenOptions[4].hidden = true;
            tokenOptions[5].hidden = true;
            tokenOptions[6].hidden = true;
            tokenOptions[7].hidden = true;
            tokenOptions[8].hidden = false;
            tokenOptions[9].hidden = true;
            tokenOptions[10].hidden = true;
            tokenOptions[11].hidden = true;
            tokenOptions[12].hidden = true;
            tokenOptions[13].hidden = true;
            tokenOptions[14].hidden = false;
            tokenOptions[15].hidden = true;
            tokenOptions[16].hidden = true;
            tokenOptions[17].hidden = true;
            tokenOptions[18].hidden = true;
            tokenOptions[19].hidden = true;
            tokenOptions[20].hidden = true;
            tokenOptions[21].hidden = true;
            tokenOptions[22].hidden = true;
            tokenOptions[23].hidden = true;
            tokenOptions[24].hidden = true;   
            tokenOptions[25].hidden = true;   
        }
        if (networkDropdownTo.value == 'polygon') {
            const tokenOptions = tokenDropdown.options;
            tokenOptions[1].hidden = true;
            tokenOptions[2].hidden = true;
            tokenOptions[3].hidden = true;
            tokenOptions[4].hidden = true;
            tokenOptions[5].hidden = true;
            tokenOptions[6].hidden = true;
            tokenOptions[7].hidden = true;
            tokenOptions[8].hidden = true;
            tokenOptions[9].hidden = true;
            tokenOptions[10].hidden = true;
            tokenOptions[11].hidden = true;
            tokenOptions[12].hidden = true;
            tokenOptions[13].hidden = false;
            tokenOptions[14].hidden = true;
            tokenOptions[15].hidden = true;
            tokenOptions[16].hidden = true;
            tokenOptions[17].hidden = true;
            tokenOptions[18].hidden = false;
            tokenOptions[19].hidden = true;
            tokenOptions[20].hidden = false;
            tokenOptions[21].hidden = true;
            tokenOptions[22].hidden = true;
            tokenOptions[23].hidden = true;
            tokenOptions[24].hidden = false;  
            tokenOptions[25].hidden = true;  
        }
    }
});

const bridgeButton = document.getElementById('bridgeAsset');
bridgeButton.addEventListener('click', async () => {
    try {
        if (!signer) {
            throw new Error('Please connect your wallet!');
        }
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        if (networkDropdownFrom.value === '') {
            throw new Error('Please select a network to bridge your assets from!');
        }
        if (networkDropdownTo.value === '') {
            throw new Error('Please select a network to bridge your assets to!');
        }
        const selectedToken = tokenDropdown.value;
        if (!selectedToken) {
            throw new Error('Please select a token!');
        }
        let amount = document.getElementById('depositAmount').value;
        if (amount.length === 0) {
            throw new Error('Please enter an amount!');
        }
        setTimeout(() => {
            overlay.style.display = 'flex';
            createCircularProgress();
        }, 3600);
        tokensBridged.textContent = '';
        successful.textContent = '';
        let parsedAmount = null;
        let decimals = null;
        if (tokenDropdown.value == 'eurc' || tokenDropdown.value == 'eurt' || tokenDropdown.value == 'usdc' || tokenDropdown.value == 'usdt' || tokenDropdown.value == 'xaut' || tokenDropdown.value == 'usdcpolygon' || tokenDropdown.value == 'usdtpolygon') {
            decimals = 6;
            parsedAmount = ethers.parseUnits(amount.toString(), decimals);
        } else {
            decimals = 18;
            parsedAmount = ethers.parseUnits(amount.toString(), decimals);
        }
        console.log(parsedAmount);
        if (networkDropdownFrom.value == 'arbitrum' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'eth') {
                    const bridgeNativeContractAddressArbitrum = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_ARBITRUM;
                    const sEthArbitrumTokenContractAddressSplendor = process.env.SETH_ARBITRUM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractArbitrum = new ethers.Contract(bridgeNativeContractAddressArbitrum, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractArbitrum.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sEthArbitrumTokenContractAddressSplendor, parsedAmount, 'arbETH', decimals);
                } else if (tokenDropdown.value == 'arb') {
                    try {
                        const bridgeErc20ContractAddressArbitrum = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_ARBITRUM;
                        const arbTokenContractAddressArbitrum = process.env.ARB_TOKEN_CONTRACT_ADDRESS_ARBITRUM;
                        const sArbTokenContractAddressSplendor = process.env.SARB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        
                        const bridgeErc20ContractArbitrum = new ethers.Contract(bridgeErc20ContractAddressArbitrum, bridgeERC20, signer);
                        const arbTokenContractArbitrum = new ethers.Contract(arbTokenContractAddressArbitrum, erc20Token, signer);

                        const txApprove = await arbTokenContractArbitrum.approve(bridgeErc20ContractAddressArbitrum, parsedAmount);
                        await txApprove.wait();
                        const txDeposit = await bridgeErc20ContractArbitrum.deposit(arbTokenContractAddressArbitrum, parsedAmount);
                        await txDeposit.wait();
                        depositSuccessful(txDeposit.hash, 'splendor', sArbTokenContractAddressSplendor, parsedAmount, 'ARB', decimals);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'avax' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'avax') {
                    const bridgeNativeContractAddressAvax = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_AVAX;
                    const sAvaxTokenContractAddressSplendor = process.env.SAVAX_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAvax = new ethers.Contract(bridgeNativeContractAddressAvax, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractAvax.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sAvaxTokenContractAddressSplendor, parsedAmount, 'AVAX', decimals);
                } else if (tokenDropdown.value == 'wavax') {
                    try {
                        const bridgeErc20ContractAddressAvax = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_AVAX;
                        const wavaxTokenContractAddressAvax = process.env.WAVAX_TOKEN_CONTRACT_ADDRESS_AVAX;
                        const sWavaxTokenContractAddressSplendor = process.env.SWAVAX_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        
                        const bridgeErc20ContractAvax = new ethers.Contract(bridgeErc20ContractAddressAvax, bridgeERC20, signer);
                        const wavaxTokenContractAvax = new ethers.Contract(wavaxTokenContractAddressAvax, erc20Token, signer);

                        const txApprove = await wavaxTokenContractAvax.approve(bridgeErc20ContractAddressAvax, parsedAmount);
                        await txApprove.wait();
                        const txDeposit = await bridgeErc20ContractAvax.deposit(wavaxTokenContractAddressAvax, parsedAmount);
                        await txDeposit.wait();
                        depositSuccessful(txDeposit.hash, 'splendor', sWavaxTokenContractAddressSplendor, parsedAmount, 'WAVAX', decimals);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'bnb' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'bnb') {
                    const bridgeNativeContractAddressBnb = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_BNB;
                    const sBnbTokenContractAddressSplendor = process.env.SBNB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractBnb = new ethers.Contract(bridgeNativeContractAddressBnb, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractBnb.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sBnbTokenContractAddressSplendor, parsedAmount, 'BNB', decimals);
                } else if (tokenDropdown.value != 'bnb') {
                    try {
                        const bridgeErc20ContractAddressBnb = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_BNB;
                        const bridgeErc20ContractBnb = new ethers.Contract(bridgeErc20ContractAddressBnb, bridgeERC20, signer);
                        if (tokenDropdown.value == 'busd') {
                            const busdTokenContractAddressBnb = process.env.BUSD_TOKEN_CONTRACT_ADDRESS_BNB;
                            const sBusdTokenContractAddressSplendor = process.env.SBUSD_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const busdTokenContractBnb = new ethers.Contract(busdTokenContractAddressBnb, erc20Token, signer);

                            const txApprove = await busdTokenContractBnb.approve(bridgeErc20ContractAddressBnb, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractBnb.deposit(busdTokenContractAddressBnb, parsedAmount);
                            await txDeposit.wait();
                            depositSuccessful(txDeposit.hash, 'splendor', sBusdTokenContractAddressSplendor, parsedAmount, 'BUSD', decimals);
                        }
                        if (tokenDropdown.value == 'wbnb') {
                            const wbnbTokenContractAddressBnb = process.env.WBNB_TOKEN_CONTRACT_ADDRESS_BNB;
                            const sWbnbTokenContractAddressSplendor = process.env.SWBNB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const wbnbTokenContractBnb = new ethers.Contract(wbnbTokenContractAddressBnb, erc20Token, signer);

                            const txApprove = await wbnbTokenContractBnb.approve(bridgeErc20ContractAddressBnb, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractBnb.deposit(wbnbTokenContractAddressBnb, parsedAmount);
                            await txDeposit.wait();
                            depositSuccessful(txDeposit.hash, 'splendor', sWbnbTokenContractAddressSplendor, parsedAmount, 'WBNB', decimals);
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'ethereum' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'eth') {
                    const bridgeNativeContractAddressEthereum = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_ETHEREUM;
                    const sEthEthereumTokenContractAddressSplendor = process.env.SETH_ETHEREUM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractEthereum = new ethers.Contract(bridgeNativeContractAddressEthereum, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractEthereum.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sEthEthereumTokenContractAddressSplendor, parsedAmount, 'ETH', decimals);
                } else if (tokenDropdown.value != 'eth') {
                    try {
                        const bridgeErc20ContractAddressEthereum = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_ETHEREUM;
                        const bridgeErc20ContractEthereum = new ethers.Contract(bridgeErc20ContractAddressEthereum, bridgeERC20, signer);
                        if (tokenDropdown.value == '1inch') {
                            const oneInchTokenContractAddressEthereum = process.env.ONE_INCH_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sOneInchTokenContractAddressSplendor = process.env.SONE_INCH_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const oneInchTokenContractEthereum = new ethers.Contract(oneInchTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await oneInchTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(oneInchTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sOneInchTokenContractAddressSplendor, parsedAmount, '1INCH', decimals);
                        }
                        if (tokenDropdown.value == 'aave') {
                            const aaveTokenContractAddressEthereum = process.env.AAVE_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sAaveTokenContractAddressSplendor = process.env.SAAVE_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const aaveTokenContractEthereum = new ethers.Contract(aaveTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await aaveTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(aaveTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sAaveTokenContractAddressSplendor, parsedAmount, 'AAVE', decimals);
                        }
                        if (tokenDropdown.value == 'dai') {
                            const daiTokenContractAddressEthereum = process.env.DAI_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sDaiTokenContractAddressSplendor = process.env.SDAI_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const daiTokenContractEthereum = new ethers.Contract(daiTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await daiTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(daiTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sDaiTokenContractAddressSplendor, parsedAmount, 'DAI', decimals);
                        }
                        if (tokenDropdown.value == 'eurc') {
                            decimals = 6;
                            const eurcTokenContractAddressEthereum = process.env.EURC_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sEurcTokenContractAddressSplendor = process.env.SEURC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const eurcTokenContractEthereum = new ethers.Contract(eurcTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await eurcTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(eurcTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sEurcTokenContractAddressSplendor, parsedAmount, 'EURC', decimals);
                        }
                        if (tokenDropdown.value == 'eurt') {
                            const eurtTokenContractAddressEthereum = process.env.EURT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sEurtTokenContractAddressSplendor = process.env.SEURT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const eurtTokenContractEthereum = new ethers.Contract(eurtTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await eurtTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(eurtTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sEurtTokenContractAddressSplendor, parsedAmount, 'EURT', decimals);
                        }
                        if (tokenDropdown.value == 'lido') {
                            decimals = 18;
                            const lidoTokenContractAddressEthereum = process.env.LIDO_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sLidoTokenContractAddressSplendor = process.env.SLIDO_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const lidoTokenContractEthereum = new ethers.Contract(lidoTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await lidoTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(lidoTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sLidoTokenContractAddressSplendor, parsedAmount, 'LDO', decimals);
                        }
                        if (tokenDropdown.value == 'link') {
                            const linkTokenContractAddressEthereum = process.env.LINK_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sLinkTokenContractAddressSplendor = process.env.SLINK_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const linkTokenContractEthereum = new ethers.Contract(linkTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await linkTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(linkTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sLinkTokenContractAddressSplendor, parsedAmount, 'LINK', decimals);
                        }
                        if (tokenDropdown.value == 'pancake') {
                            const pancakeTokenContractAddressEthereum = process.env.PANCAKE_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sPancakeTokenContractAddressSplendor = process.env.SPANCAKE_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const pancakeTokenContractEthereum = new ethers.Contract(pancakeTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await pancakeTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(pancakeTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sPancakeTokenContractAddressSplendor, parsedAmount, 'CAKE', decimals);
                        }
                        if (tokenDropdown.value == 'uni') {
                            const uniTokenContractAddressEthereum = process.env.UNI_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUniTokenContractAddressSplendor = process.env.SUNI_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const uniTokenContractEthereum = new ethers.Contract(uniTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await uniTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(uniTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sUniTokenContractAddressSplendor, parsedAmount, 'UNI', decimals);
                        }
                        if (tokenDropdown.value == 'usdc') {
                            decimals = 6;
                            const usdcTokenContractAddressEthereum = process.env.USDC_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUsdcTokenContractAddressSplendor = process.env.SUSDC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const usdcTokenContractEthereum = new ethers.Contract(usdcTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await usdcTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(usdcTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sUsdcTokenContractAddressSplendor, parsedAmount, 'USDC', decimals);
                        }
                        if (tokenDropdown.value == 'usdt') {
                            const usdtTokenContractAddressEthereum = process.env.USDT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUsdtTokenContractAddressSplendor = process.env.SUSDT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const usdtTokenContractEthereum = new ethers.Contract(usdtTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await usdtTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(usdtTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sUsdtTokenContractAddressSplendor, parsedAmount, 'USDT', decimals);
                        }
                        if (tokenDropdown.value == 'weth') {
                            decimals = 18;
                            const wethTokenContractAddressEthereum = process.env.WETH_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sWethTokenContractAddressSplendor = process.env.SWETH_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const wethTokenContractEthereum = new ethers.Contract(wethTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await wethTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(wethTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sWethTokenContractAddressSplendor, parsedAmount, 'WETH', decimals);
                        }
                        if (tokenDropdown.value == 'xaut') {
                            decimals = 6;
                            const xautTokenContractAddressEthereum = process.env.XAUT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sXautTokenContractAddressSplendor = process.env.SXAUT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const xautTokenContractEthereum = new ethers.Contract(xautTokenContractAddressEthereum, erc20Token, signer);

                            const txApprove = await xautTokenContractEthereum.approve(bridgeErc20ContractAddressEthereum, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractEthereum.deposit(xautTokenContractAddressEthereum, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sXautTokenContractAddressSplendor, parsedAmount, 'XAUT', decimals);
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'optimism' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'eth') {
                    decimals = 18;
                    const bridgeNativeContractAddressOptimism = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_OPTIMISM;
                    const sEthOptimismTokenContractAddressSplendor = process.env.SETH_OPTIMISM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractOptimism = new ethers.Contract(bridgeNativeContractAddressOptimism, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractOptimism.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sEthOptimismTokenContractAddressSplendor, parsedAmount, 'opETH', decimals);
                } else if (tokenDropdown.value == 'op') {
                    try {
                        const bridgeErc20ContractAddressOptimism = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_OPTIMISM;
                        const opTokenContractAddressOptimism = process.env.OP_TOKEN_CONTRACT_ADDRESS_OPTIMISM;
                        const sOpTokenContractAddressSplendor = process.env.SOP_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        
                        const bridgeErc20ContractOptimism = new ethers.Contract(bridgeErc20ContractAddressOptimism, bridgeERC20, signer);
                        const opTokenContractOptimism = new ethers.Contract(opTokenContractAddressOptimism, erc20Token, signer);

                        const txApprove = await opTokenContractOptimism.approve(bridgeErc20ContractAddressOptimism, parsedAmount);
                        await txApprove.wait();
                        const txDeposit = await bridgeErc20ContractOptimism.deposit(opTokenContractAddressOptimism, parsedAmount);
                        await txDeposit.wait();
                        depositSuccessful(txDeposit.hash, 'splendor', sOpTokenContractAddressSplendor, parsedAmount, 'OP', decimals);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'polygon' && networkDropdownTo.value == 'splendor') {
            try {
                if (tokenDropdown.value == 'matic') {
                    const bridgeNativeContractAddressPolygon = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_POLYGON;
                    const sMaticTokenContractAddressSplendor = process.env.SMATIC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractPolygon = new ethers.Contract(bridgeNativeContractAddressPolygon, bridgeNative, signer);
                    
                    const txLockFunds = await bridgeNativeContractPolygon.lockFunds({value: parsedAmount});
                    await txLockFunds.wait();
                    depositSuccessful(txLockFunds.hash, 'splendor', sMaticTokenContractAddressSplendor, parsedAmount, 'MATIC', decimals);
                } else if (tokenDropdown.value != 'matic') {
                    try {
                        const bridgeErc20ContractAddressPolygon = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_POLYGON;
                        const bridgeErc20ContractPolygon = new ethers.Contract(bridgeErc20ContractAddressPolygon, bridgeERC20, signer);
                        if (tokenDropdown.value == 'usdcpolygon') {
                            decimals = 6;
                            const usdcPolygonTokenContractAddressPolygon = process.env.USDC_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sUsdcPolygonTokenContractAddressSplendor = process.env.SUSDC_POLYGON_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const usdcPolygonTokenContractPolygon = new ethers.Contract(usdcPolygonTokenContractAddressPolygon, erc20Token, signer);

                            const txApprove = await usdcPolygonTokenContractPolygon.approve(bridgeErc20ContractAddressPolygon, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractPolygon.deposit(usdcPolygonTokenContractAddressPolygon, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sUsdcPolygonTokenContractAddressSplendor, parsedAmount, 'pUSDC', decimals);
                        }
                        if (tokenDropdown.value == 'usdtpolygon') {
                            const usdtPolygonTokenContractAddressPolygon = process.env.USDT_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sUsdtPolygonTokenContractAddressSplendor = process.env.SUSDT_POLYGON_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const usdtPolygonTokenContractPolygon = new ethers.Contract(usdtPolygonTokenContractAddressPolygon, erc20Token, signer);

                            const txApprove = await usdtPolygonTokenContractPolygon.approve(bridgeErc20ContractAddressPolygon, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractPolygon.deposit(usdtPolygonTokenContractAddressPolygon, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sUsdtPolygonTokenContractAddressSplendor, parsedAmount, 'pUSDT', decimals);
                        }
                        if (tokenDropdown.value == 'wmatic') {
                            decimals = 18;
                            const wmaticTokenContractAddressPolygon = process.env.WMATIC_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sWmaticTokenContractAddressSplendor = process.env.SWMATIC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            
                            const wmaticTokenContractPolygon = new ethers.Contract(wmaticTokenContractAddressPolygon, erc20Token, signer);

                            const txApprove = await wmaticTokenContractPolygon.approve(bridgeErc20ContractAddressPolygon, parsedAmount);
                            await txApprove.wait();
                            const txDeposit = await bridgeErc20ContractPolygon.deposit(wmaticTokenContractAddressPolygon, parsedAmount);
                            await txDeposit.wait();

                            depositSuccessful(txDeposit.hash, 'splendor', sWmaticTokenContractAddressSplendor, parsedAmount, 'WMATIC', decimals);
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            } 
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'arbitrum') {
            try {
                if (tokenDropdown.value == 'eth') {
                    const bridgeNativeContractAddressArbitrum = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_ARBITRUM;
                    const sEthArbitrumTokenContractAddressSplendor = process.env.SETH_ARBITRUM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const sEthArbitrumTokenContract = new ethers.Contract(sEthArbitrumTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sEthArbitrumTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'arbitrum', bridgeNativeContractAddressArbitrum, '', 'eth', parsedAmount);
                } else if (tokenDropdown.value == 'arb') {
                    try {
                        const sArbTokenContractAddressSplendor = process.env.SARB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        const bridgeErc20ContractAddressArbitrum = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_ARBITRUM;
                        const arbTokenContract = process.env.ARB_TOKEN_CONTRACT_ADDRESS_ARBITRUM;
                        const sArbTokenContract = new ethers.Contract(sArbTokenContractAddressSplendor, erc20TokenBurnable, signer);

                        const txBurn = await sArbTokenContract.burnTokens(parsedAmount);
                        await txBurn.wait();

                        burnSuccessful(txBurn.hash, 'arbitrum', bridgeErc20ContractAddressArbitrum, arbTokenContract, 'arb', parsedAmount);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'avax') {
            try {
                if (tokenDropdown.value == 'avax') {
                    const sAvaxTokenContractAddressSplendor = process.env.SAVAX_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAddressAvax = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_AVAX;
                    const sAvaxTokenContract = new ethers.Contract(sAvaxTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sAvaxTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'avax', bridgeNativeContractAddressAvax, '', 'avax', parsedAmount);
                } else if (tokenDropdown.value == 'wavax') {
                    try {
                        const sWavaxTokenContractAddressSplendor = process.env.SWAVAX_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        const bridgeErc20ContractAddressAvax = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_AVAX;
                        const wavaxTokenContract = process.env.WAVAX_TOKEN_CONTRACT_ADDRESS_AVAX;
                        const sWavaxTokenContract = new ethers.Contract(sWavaxTokenContractAddressSplendor, erc20TokenBurnable, signer);

                        const txBurn = await sWavaxTokenContract.burnTokens(parsedAmount);
                        await txBurn.wait();

                        burnSuccessful(txBurn.hash, 'avax', bridgeErc20ContractAddressAvax, wavaxTokenContract, 'wavax', parsedAmount);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'bnb') {
            try {
                if (tokenDropdown.value == 'bnb') {
                    const sBnbTokenContractAddressSplendor = process.env.SBNB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAddressBnb = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_BNB;
                    const sBnbTokenContract = new ethers.Contract(sBnbTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sBnbTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'bnb', bridgeNativeContractAddressBnb, '', 'bnb', parsedAmount);
                } else if (tokenDropdown.value != 'bnb') {
                    try {
                        const bridgeErc20ContractAddressBnb = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_BNB;
                        if (tokenDropdown.value == 'busd') {
                            const sBusdTokenContractAddressSplendor = process.env.SBUSD_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const busdTokenContract = process.env.BUSD_TOKEN_CONTRACT_ADDRESS_BNB;
                            const sBusdTokenContract = new ethers.Contract(sBusdTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sBusdTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'bnb', bridgeErc20ContractAddressBnb, busdTokenContract, 'busd', parsedAmount);
                        }
                        if (tokenDropdown.value == 'wbnb') {
                            const sWbnbTokenContractAddressSplendor = process.env.SWBNB_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const wbnbTokenContract = process.env.WBNB_TOKEN_CONTRACT_ADDRESS_BNB;
                            const sWbnbTokenContract = new ethers.Contract(sWbnbTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sWbnbTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'bnb', bridgeErc20ContractAddressBnb, wbnbTokenContract, 'wbnb', parsedAmount);   
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'ethereum') {
            try {
                if (tokenDropdown.value == 'eth') {
                    const sEthEthereumTokenContractAddressSplendor = process.env.SETH_ETHEREUM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAddressEthereum = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_ETHEREUM;
                    const sEthEthereumTokenContract = new ethers.Contract(sEthEthereumTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sEthEthereumTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'ethereum', bridgeNativeContractAddressEthereum, '', 'eth', parsedAmount);
                } else if (tokenDropdown.value != 'eth') {
                    try {
                        const bridgeErc20ContractAddressEthereum = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_ETHEREUM;
                        if (tokenDropdown.value == '1inch') {
                            const sOneInchTokenContractAddressSplendor = process.env.SONE_INCH_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const oneInchTokenContract = process.env.ONE_INCH_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sOneInchTokenContract = new ethers.Contract(sOneInchTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sOneInchTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, oneInchTokenContract, '1inch', parsedAmount);
                        }
                        if (tokenDropdown.value == 'aave') {
                            const sAaveTokenContractAddressSplendor = process.env.SAAVE_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const aaveTokenContract = process.env.AAVE_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sAaveTokenContract = new ethers.Contract(sAaveTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sAaveTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, aaveTokenContract, 'aave', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'dai') {
                            const sDaiTokenContractAddressSplendor = process.env.SDAI_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const daiTokenContract = process.env.DAI_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sDaiTokenContract = new ethers.Contract(sDaiTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sDaiTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, daiTokenContract, 'dai', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'eurc') {
                            decimals = 6;
                            const sEurcTokenContractAddressSplendor = process.env.SEURC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const eurcTokenContract = process.env.EURC_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sEurcTokenContract = new ethers.Contract(sEurcTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sEurcTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, eurcTokenContract, 'eurc', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'eurt') {
                            const sEurtTokenContractAddressSplendor = process.env.SEURT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const eurtTokenContract = process.env.EURT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sEurtTokenContract = new ethers.Contract(sEurtTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sEurtTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, eurtTokenContract, 'eurt', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'lido') {
                            decimals = 18;
                            const sLidoTokenContractAddressSplendor = process.env.SLIDO_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const lidoTokenContract = process.env.LIDO_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sLidoTokenContract = new ethers.Contract(sLidoTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sLidoTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, lidoTokenContract, 'lido', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'link') {
                            const sLinkTokenContractAddressSplendor = process.env.SLINK_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const linkTokenContract = process.env.LINK_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sLinkTokenContract = new ethers.Contract(sLinkTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sLinkTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, linkTokenContract, 'link', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'pancake') {
                            const sPancakeTokenContractAddressSplendor = process.env.SPANCAKE_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const pancakeTokenContract = process.env.PANCAKE_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sPancakeTokenContract = new ethers.Contract(sPancakeTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sPancakeTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, pancakeTokenContract, 'pancake', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'uni') {
                            const sUniTokenContractAddressSplendor = process.env.SUNI_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const uniTokenContract = process.env.UNI_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUniTokenContract = new ethers.Contract(sUniTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sUniTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, uniTokenContract, 'uni', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'usdc') {
                            decimals = 6;
                            const sUsdcTokenContractAddressSplendor = process.env.SUSDC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const usdcTokenContract = process.env.USDC_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUsdcTokenContract = new ethers.Contract(sUsdcTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sUsdcTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, usdcTokenContract, 'usdc', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'usdt') {
                            const sUsdtTokenContractAddressSplendor = process.env.SUSDT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const usdtTokenContract = process.env.USDT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sUsdtTokenContract = new ethers.Contract(sUsdtTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sUsdtTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, usdtTokenContract, 'usdt', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'weth') {
                            decimals = 18;
                            const sWethTokenContractAddressSplendor = process.env.SWETH_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const wethTokenContract = process.env.WETH_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sWethTokenContract = new ethers.Contract(sWethTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sWethTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, wethTokenContract, 'weth', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'xaut') {
                            decimals = 6;
                            const sXautTokenContractAddressSplendor = process.env.SXAUT_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const xautTokenContract = process.env.XAUT_TOKEN_CONTRACT_ADDRESS_ETHEREUM;
                            const sXautTokenContract = new ethers.Contract(sXautTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sXautTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'ethereum', bridgeErc20ContractAddressEthereum, xautTokenContract, 'xaut', parsedAmount);   
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'optimism') {
            try {
                if (tokenDropdown.value == 'eth') {
                    decimals = 18;
                    const sEthOptimismTokenContractAddressSplendor = process.env.SETH_OPTIMISM_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAddressOptimism = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_OPTIMISM;
                    const sEthOptimismTokenContract = new ethers.Contract(sEthOptimismTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sEthOptimismTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'optimism', bridgeNativeContractAddressOptimism, '', 'eth', parsedAmount);
                } else if (tokenDropdown.value == 'op') {
                    try {
                        const sOpTokenContractAddressSplendor = process.env.SOP_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                        const opTokenContract = process.env.OP_TOKEN_CONTRACT_ADDRESS_OPTIMISM;
                        const bridgeErc20ContractAddressOptimism = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_OPTIMISM;
                        const sOpTokenContract = new ethers.Contract(sOpTokenContractAddressSplendor, erc20TokenBurnable, signer);

                        const txBurn = await sOpTokenContract.burnTokens(parsedAmount);
                        await txBurn.wait();

                        burnSuccessful(txBurn.hash, 'optimism', bridgeErc20ContractAddressOptimism, opTokenContract, 'op', parsedAmount);
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
        if (networkDropdownFrom.value == 'splendor' && networkDropdownTo.value == 'polygon') {
            try {
                if (tokenDropdown.value == 'matic') {
                    const sMaticTokenContractAddressSplendor = process.env.SMATIC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                    const bridgeNativeContractAddressPolygon = process.env.BRIDGE_NATIVE_CONTRACT_ADDRESS_POLYGON;
                    const sMaticTokenContract = new ethers.Contract(sMaticTokenContractAddressSplendor, erc20TokenBurnable, signer);

                    const txBurn = await sMaticTokenContract.burnTokens(parsedAmount);
                    await txBurn.wait();

                    burnSuccessful(txBurn.hash, 'polygon', bridgeNativeContractAddressPolygon, '', 'matic', parsedAmount);
                } else if (tokenDropdown.value != 'matic') {
                    try {
                        const bridgeErc20ContractAddressPolygon = process.env.BRIDGE_ERC20_CONTRACT_ADDRESS_POLYGON;
                        if (tokenDropdown.value == 'usdcpolygon') {
                            decimals = 6;
                            const sUsdcPolygonTokenContractAddressSplendor = process.env.SUSDC_POLYGON_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const usdcPolygonTokenContract = process.env.USDC_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sUscdPolygonTokenContract = new ethers.Contract(sUsdcPolygonTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sUscdPolygonTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'polygon', bridgeErc20ContractAddressPolygon, usdcPolygonTokenContract, 'usdcpolygon', parsedAmount);
                        }
                        if (tokenDropdown.value == 'usdtpolygon') {
                            const sUsdtPolygonTokenContractAddressSplendor = process.env.SUSDT_POLYGON_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const usdtPolygonTokenContract = process.env.USDT_POLYGON_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sUsdtPolygonTokenContract = new ethers.Contract(sUsdtPolygonTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sUsdtPolygonTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'polygon', bridgeErc20ContractAddressPolygon, usdtPolygonTokenContract, 'usdtpolygon', parsedAmount);   
                        }
                        if (tokenDropdown.value == 'wmatic') {
                            decimals = 18;
                            const sWmaticTokenContractAddressSplendor = process.env.SWMATIC_TOKEN_CONTRACT_ADDRESS_SPLENDOR;
                            const wmaticPolygonTokenContract = process.env.WMATIC_TOKEN_CONTRACT_ADDRESS_POLYGON;
                            const sWmaticTokenContract = new ethers.Contract(sWmaticTokenContractAddressSplendor, erc20TokenBurnable, signer);

                            const txBurn = await sWmaticTokenContract.burnTokens(parsedAmount);
                            await txBurn.wait();

                            burnSuccessful(txBurn.hash, 'polygon', bridgeErc20ContractAddressPolygon, wmaticPolygonTokenContract, 'wmatic', parsedAmount);   
                        }
                    } catch (error) {
                        window.alert('Error: ' + error.message);
                    }
                }
            } catch (error) {
                window.alert('Error: ' + error.message);
            }
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
});

const burnSuccessful = async (txHash, changeNetworkTo, contract, tokenContract, token, parsedAmount) => {
    if (txHash) {
        console.log(`Tokens burned! Tx hash: ${txHash}`);
        successful.textContent = `Tokens burned! Tx hash: ${txHash}`;
        await switchNetwork(changeNetworkTo);
        if (token == 'eth' || token == 'avax' || token == 'bnb' || token == 'matic') {
            await unlockBridgeNativeContract(contract);
            unlockFunds(contract, parsedAmount);
        } else {
            await unlockBridgeErc20Contract(contract);
            withdrawTokens(contract, tokenContract, parsedAmount);
        }
    }
}

const unlockBridgeNativeContract = async (contract) => {
    try {
        const bridgeWallet = new ethers.Wallet(process.env.BRIDGE_WALLET_PRIVATE_KEY, provider);
        const bridgeNativeContract = new ethers.Contract(contract, bridgeNative, bridgeWallet);

        isLocked = await bridgeNativeContract.locked();
        console.log(isLocked);

        const txUnlock = await bridgeNativeContract.unlockContract();
        await txUnlock.wait();

        isLocked = await bridgeNativeContract.locked();
        console.log(isLocked);
    } catch (error) {
        window.alert('Error:' + error.message);
    }
}

const unlockFunds = async (contract, parsedAmount) => {
    const bridgeNativeContract = new ethers.Contract(contract, bridgeNative, signer);
    const txUnlockFunds = await bridgeNativeContract.unlockFunds(userAddress, parsedAmount, '0x');
    await txUnlockFunds.wait();

    console.log(txUnlockFunds);

    tokensBridged.textContent = `Tokens bridged successfuly! Tx Hash: ${txUnlockFunds.hash}`
    form.reset();
    tokenDropdown.value = '';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 7200);
}

const unlockBridgeErc20Contract = async (contract) => {
    const bridgeWallet = new ethers.Wallet(process.env.BRIDGE_WALLET_PRIVATE_KEY, provider);
    const bridgeErc20Contract = new ethers.Contract(contract, bridgeERC20, bridgeWallet);

    isLocked = await bridgeErc20Contract.locked();
    console.log(isLocked);

    const txUnlock = await bridgeErc20Contract.unlockContract();
    await txUnlock.wait();

    isLocked = await bridgeErc20Contract.locked();
    console.log(isLocked);
}

const withdrawTokens = async (contract, tokenContract, parsedAmount) => {
    const bridgeErc20Contract = new ethers.Contract(contract, bridgeERC20, signer);
    const txWithdrawTokens = await bridgeErc20Contract.withdrawTokens(tokenContract, userAddress, parsedAmount);
    await txWithdrawTokens.wait();

    console.log(txWithdrawTokens);
    const tokensBridged = document.getElementById('tokensBridged');
    tokensBridged.textContent = `Tokens bridged successfuly! Tx Hash: ${txWithdrawTokens.hash}`
    form.reset();
    tokenDropdown.value = '';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 7200);
}

const depositSuccessful = async (txHash, changeNetworkTo, contract, parsedAmount, symbol, decimals) => {
    try {
        if (txHash) {
            console.log(`Deposit successful, tx hash: ${txHash}`);
            successful.textContent = `Desposit successful! Tx hash: ${txHash}`;
            await switchNetwork(changeNetworkTo);
            await unlockMintContract(contract);
            mintTokens(contract, parsedAmount, symbol, decimals);
        } else {
            throw new Error('Deposit unsuccessful!');
        }
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
}

const unlockMintContract = async (contract) => {
    const bridgeWallet = new ethers.Wallet(process.env.BRIDGE_WALLET_PRIVATE_KEY, provider);

    erc20TokenContractBurnable = new ethers.Contract(contract, erc20TokenBurnable, bridgeWallet);

    isLocked = await erc20TokenContractBurnable.locked();
    console.log(isLocked);

    const txUnlock = await erc20TokenContractBurnable.unlockContract();
    await txUnlock.wait();

    isLocked = await erc20TokenContractBurnable.locked();
    console.log(isLocked);
}

const mintTokens = async (contract, amount, symbol, decimals) => {
    erc20TokenContractBurnable = new ethers.Contract(contract, erc20TokenBurnable, signer);
    const txMint = await erc20TokenContractBurnable.mint(userAddress, amount);
    await txMint.wait();

    console.log(txMint);

    tokensBridged.textContent = `Tokens bridged successfuly! Tx Hash: ${txMint.hash}`
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 7200);

    form.reset();
    tokenDropdown.value = '';

    try {
        const addToken = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: contract,
                    symbol: symbol,
                    decimals: decimals,
                    image: ''
                }
            }
        });
    } catch (error) {
        window.alert('Error: ' + error.message);
    }
}