import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { load } from 'ts-dotenv';

const env = load({
  YOUR_QUICKNODE_MUMBAI_URL : String ,
  YOUR_TEST_WALLET_PRIVATE_KEY : String,

})
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: env.YOUR_QUICKNODE_MUMBAI_URL,
      accounts: [env.YOUR_TEST_WALLET_PRIVATE_KEY],
    }
  }
};

export default config;
