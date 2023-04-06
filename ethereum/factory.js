import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const ADDRESS = '0x08343B53c642E6cb74f4bda6174d18be35587569';

const instance = new web3.eth.Contract(CampaignFactory.abi, ADDRESS);


export default instance