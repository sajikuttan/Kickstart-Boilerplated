const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');
const mnemonic = 'mother little group sport unhappy step oven treat liar lake earn type'
const apiUrl = 'https://rinkeby.infura.io/v3/0a9c658f875642569f52e70f60cff43e';

const provider = new HDWalletProvider(
  mnemonic,
  // remember to change this to your own phrase!
  apiUrl
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '2000000', from: accounts[0] });

  console.log(JSON.stringify(compiledFactory.abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
