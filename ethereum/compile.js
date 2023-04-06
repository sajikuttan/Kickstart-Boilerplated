const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath);
const CampaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(CampaignPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const complie = JSON.parse(solc.compile(JSON.stringify(input)));
const output = complie['contracts']['Campaign.sol'];
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    )
}