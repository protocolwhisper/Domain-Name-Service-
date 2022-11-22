import { ethers} from "hardhat";
import hre from "hardhat";


const main = async () => {
    const [owner ,randomPerson ] = await hre.ethers.getSigners()
    const domainsfactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainsfactory.deploy("rugged")
    await domainContract.deployed()
    console.log(`Contract deployed to: ${domainContract.address}`)
    console.log(`The contract was deployed by ${owner.address}`)

    // Let's register some domains
    const registerdomain = await domainContract.register("hashbulla" , {value: hre.ethers.utils.parseEther("0.1")})
    await registerdomain.wait()
    //Let's do another transact
    const registerdomaintwo = await domainContract.register("vitalik" , {value: hre.ethers.utils.parseEther("0.1")})
    await registerdomaintwo.wait()
    //Let's set a record 
    const recordone = await domainContract.setRecord("hashbulla" , "I'm Fucking HASHBU")
    await recordone.wait()
    const recordtwo =await domainContract.setRecord("vitalik" , "I created this ens")
    await recordtwo.wait()
    //Let's query the domains
    const query = await domainContract.getAddress("hashbulla")
    console.log(`Owner of the domain rugged is: ${query}`)

    const balance = await hre.ethers.provider.getBalance(domainContract.address)
    console.log(`The balance of the contract nows is ${hre.ethers.utils.formatEther(balance)}`)

    // Trying to set a record that doesn't belong to me 
    //let txn = await domainContract.connect(randomPerson).setRecord(".rugged" , "This is some bullshit")
    //await txn.wait()



}

const runMain =async () => {
    try {
        await main();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();