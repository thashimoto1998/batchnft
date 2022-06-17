/* eslint-disable */
const Provider = require('@truffle/hdwallet-provider');
const provider = new Provider(process.env.PRIVATE_KEY, process.env.API_URL)
const Web3 = require('web3');
const web3 = new Web3(provider);
import { ethers } from 'hardhat'

const minter = '0x8b8613A2cFe9Aa546a93Eab13F0E1e4c4F0b6054';// anewさんのアドレス→今は暗号屋メタマスク

const receivers: string[] = [];
for (let i = 0; i < 100; i++) {
    receivers.push((ethers.Wallet.createRandom().address));
}
const tokenURI = "https.xxx.yyy.com";
const abi = [
    {
        'inputs': [
          {
            'internalType': "address",
            'name': "minter",
            'type': "address",
          },
          {
            'internalType': "address[]",
            'name': "receivers",
            'type': "address[]",
          },
          {
            'internalType': "string",
            'name': "tokenURI",
            'type': "string",
          },
        ],
        'name': "batchMintAndTransfer",
        'outputs': [],
        'stateMutability': "nonpayable",
        'type': "function",
    },
    {
        'inputs': [
          {
            'internalType': "address",
            'name': "_address",
            'type': "address",
          },
        ],
        'name': "addWhiteListAddress",
        'outputs': [],
        'stateMutability': "nonpayable",
        'type': "function",
    }
];
async function main() {
    const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

    const batch = new web3.BatchRequest();
    await contract.methods.batchMintAndTransfer(minter, receivers, tokenURI).send({from:'0x19c46e72735bb577dbE6AfdAa64c71D682a45aD2',gasLimit: web3.utils.toHex(500000000), gasPrice: web3.utils.toHex(90*10**9)})
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// for (let i = 0; i <receivers.length; i++ ) {
//     batch.add(contract.methods.batchMintAndTransfer(minter, receivers, tokenURI).send());
// }
// batch.execute();