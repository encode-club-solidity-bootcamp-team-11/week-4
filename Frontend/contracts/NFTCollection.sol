//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../node_modules/hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollection is ERC721URIStorage{
    address payable owner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listPrice = 0.01 ether;

    constructor() ERC721 ("NFTMarketplace", "NFTM"){
        owner = payable(msg.sender);

    }

    struct ListedToken{
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    mapping (uint256 => ListedToken) private idToListedToken;

    //Helper Functions
}