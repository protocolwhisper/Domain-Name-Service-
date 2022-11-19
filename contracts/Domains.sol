//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol"; // This is how we can get a console.log inside the smart contracts
import {StringUtils} from "../libraries/StringsUtils.sol";

contract Domains {
    mapping(string => address) public domains;
    mapping(string => string) public records;
    string public rugged;

    constructor(string memory rug) payable {
        rugged = rug;
        console.log("%name service deployed ", rug);
    }

    function price(string calldata name) public pure returns (uint256) {
        uint len = StringUtils.strlen(name);
        require(len > 0);
        if (len == 3) {
            return 5 * 10 * 17; //5 MATIC 18 decimals
        } else if (len == 4) {
            return 3 * 10 * 17; // 3 MATIC 18 DECIMALS
        } else {
            return 1 * 10 * 17;
        }
    }

    function register(string calldata name) public payable {
        require(domains[name] == address(0)); // By default it will point to the zero address
        uint _price = price(name);
        require(msg.value > _price, "Not enought matic send");
        domains[name] = msg.sender;
        console.log("%s has registered a domain", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
